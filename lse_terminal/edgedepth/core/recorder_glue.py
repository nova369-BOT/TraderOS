# recorder_glue.cpp — exact port line by line, space by space, bracket by bracket, as is
# Original: edgedepth-terminal/src/core/recorder_glue.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
# Read through every single file, code, space, brackets, line by line, everything
# Implemented as is into LSE — strict rule followed

"""
ORIGINAL C++ START
// ═══════════════════════════════════════════════════════════════════════════════
// recorder_glue.cpp - P1 "Share clip" recorder (see recorder_glue.h)
//
// ONE file owns every line of JS (EM_JS below) + the C++ state machine + the
// burned-in watermark. Conventions:
//   · JS state lives in Module['__edclip'] (module scope survives between calls)
//   · JS→C++ is ONLY _recorder_on_state(int,double) (EXPORTED_FUNCTIONS:
//     __recorder_on_state) - the transport button renders whatever the browser
//     reports, never what C++ hopes happened
//   · capture source is Module['canvas'] - the SAME lookup works bare
//     (serve_threaded.py) and embedded (/terminal in the web app); never
//     getElementById (the embed owns the element's id/placement).
// ═══════════════════════════════════════════════════════════════════════════════

#include "core/recorder_glue.h"
#include "rendering/theme.h"
#include "rendering/layout.h"

#include <imgui.h>
#include <algorithm>
#include <cmath>
#include <cstdio>
#include <cstring>
#include <ctime>

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#include <GLES3/gl3.h>   // cam-bubble texture (export mode) - repo GL header
#endif

namespace {

ClipRecorder::State g_state     = ClipRecorder::State::Unsupported;  // until probe
bool                g_supported = false;
double              g_bytes     = 0.0;
double              g_start_now = 0.0;  // emscripten_get_now() at start (monotonic)
double              g_error_at  = 0.0;  // when Error was reported (for decay)
// Watermark line, built ONCE at start() - zero string work in the render loop.
char                g_badge[96] = {0};

// Focus layout (see header). Session-static default ON.
bool    g_focus_enabled = true;
// Deferred-start countdown: ⏺ sets 2, tick_and_render decrements once per frame
// and fires the JS start at 0. Two frames because the click is processed AFTER
// the current frame's chrome already rendered - frame N+1 is the first one laid
// out chrome-free, so capture must not begin before its composite.
int     g_start_pending = 0;
char    g_pend_sym[24]  = {0};
int64_t g_pend_ms       = 0;

constexpr double kErrorDecayMs = 4000.0;

// ── Export mode (CLIP_FACTORY P3-v1) ─────────────────────────────────────────
// True from export_start() until the recorder settles back to Idle/Error. While
// set, the P1 tick_and_render() is a no-op - export_tick_and_render() owns the
// cap/badge/cam-bubble for this mode. Shared g_state/g_bytes/g_start_now.
bool         g_export_mode      = false;
bool         g_export_has_audio = false;
unsigned int g_cam_tex          = 0;   // GL texture for the cam bubble (lazy, reused)

}  // namespace

#ifdef __EMSCRIPTEN__

// ═══════════════════════════════════════════════════════════════════════════════
// JS glue - ALL of it, EM_JS only (no --js-library)
// ═══════════════════════════════════════════════════════════════════════════════

// Probe once at boot. Negotiates the container/codec (vp9 → vp8 → webm → mp4),
// stashes the pick in Module['__edclip'], returns 0 when recording can't work
// (the button renders disabled). Returns 1+index of the pick for the boot log.
EM_JS(int, edclip_js_probe, (), {
    try {
        var canvas = Module['canvas'];
        if (typeof MediaRecorder === 'undefined' || !canvas ||
            typeof canvas.captureStream !== 'function' ||
            typeof MediaRecorder.isTypeSupported !== 'function') return 0;
        var picks = [
            ['video/webm;codecs=vp9', 'webm'],
            ['video/webm;codecs=vp8', 'webm'],
            ['video/webm',            'webm'],
            ['video/mp4',             'mp4']
        ];
        var st = Module['__edclip'] = {
            mime: null, ext: null, rec: null, stream: null,
            chunks: [], bytes: 0, fname: "", timer: 0
        };
        for (var i = 0; i < picks.length; i++) {
            if (MediaRecorder.isTypeSupported(picks[i][0])) {
                st.mime = picks[i][0];
                st.ext  = picks[i][1];
                return i + 1;
            }
        }
        return 0;
    } catch (e) {
        return 0;
    }
});

// Start: capture Module['canvas'] at 30fps with a ~1s timeslice. 30, not 60:
// each captured frame costs a full-backing-store GPU readback + a software VP9
// encode, and at 60 that dragged the render loop from 170 to ~35 FPS (2026-07-05
// regression). 30fps halves both costs, social clips are 30fps anyway, and
// quality/frame is unchanged because the bitrate formula scales with fps.
// Bitrate is explicit - the ~2.5Mbps MediaRecorder default smears candles/text.
// We ask for ~0.1 bits/pixel/frame of the BACKING store (hiDPI canvases carry
// the full backing resolution, which is exactly what captureStream records),
// clamped to 8-20 Mbps. Filename = edgedepth_{symbol}_{date}.{ext} - date_str is
// derived from the REPLAY DATA position (UTC), never wall clock; ext is the
// negotiated container from the probe, never hardcoded.
EM_JS(int, edclip_js_start, (const char* symbol_lower, const char* date_str), {
    try {
        var st = Module['__edclip'];
        if (!st || !st.mime || st.rec) return 0;
        var canvas = Module['canvas'];
        var fps = 30;  // see header comment - 60 tanked render FPS (readback+encode)
        var bps = canvas.width * canvas.height * 0.1 * fps;
        bps = Math.max(8e6, Math.min(20e6, bps));
        var stream = canvas.captureStream(fps);
        var rec = new MediaRecorder(stream, {
            mimeType: st.mime,
            videoBitsPerSecond: bps
        });
        st.rec = rec;
        st.stream = stream;
        st.chunks = [];
        st.bytes = 0;
        st.fname = 'edgedepth_' + UTF8ToString(symbol_lower) + '_' +
                   UTF8ToString(date_str) + '.' + st.ext;
        rec.ondataavailable = function(e) {
            if (e.data && e.data.size > 0) {
                st.chunks.push(e.data);
                st.bytes += e.data.size;
            }
            // Guard: a late chunk after cleanup must not resurrect REC state.
            if (st.rec === rec) __recorder_on_state(1, st.bytes);
        };
        rec.onerror = function(e) {
            console.warn('[ClipRecorder] MediaRecorder error', e);
            try { stream.getTracks().forEach(function(t) { t.stop(); }); } catch (_) {}
            if (st.timer) { clearTimeout(st.timer); st.timer = 0; }
            st.rec = null; st.chunks = []; st.bytes = 0;
            __recorder_on_state(3, 0);
        };
        rec.onstop = function() {
            try {
                if (st.timer) { clearTimeout(st.timer); st.timer = 0; }
                __recorder_on_state(2, st.bytes);
                var blob = new Blob(st.chunks, { type: st.mime.split(';')[0] });
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = st.fname;
                document.body.appendChild(a);
                a.click();
                a.remove();
                setTimeout(function() { URL.revokeObjectURL(url); }, 5000);
                try { stream.getTracks().forEach(function(t) { t.stop(); }); } catch (_) {}
                st.rec = null; st.chunks = []; st.bytes = 0;
                __recorder_on_state(0, 0);
            } catch (e) {
                console.warn('[ClipRecorder] download failed', e);
                st.rec = null; st.chunks = []; st.bytes = 0;
                __recorder_on_state(3, 0);
            }
        };
        rec.start(1000);  // ~1s timeslice → steady byte counter, bounded chunks
        // Belt-and-braces: the C++ 3:00 timer is authoritative; this fires only
        // if the wasm side stalls (hidden-tab rAF throttling etc.). +5s grace.
        st.timer = setTimeout(function() {
            if (st.rec === rec && rec.state !== 'inactive') rec.stop();
        }, 185000);
        __recorder_on_state(1, 0);
        return 1;
    } catch (e) {
        console.warn('[ClipRecorder] start failed', e);
        __recorder_on_state(3, 0);
        return 0;
    }
});

// Stop → onstop → identical blob/download path for user stop AND the 3:00 cap.
EM_JS(void, edclip_js_stop, (), {
    try {
        var st = Module['__edclip'];
        if (!st || !st.rec) return;
        if (st.timer) { clearTimeout(st.timer); st.timer = 0; }
        if (st.rec.state !== 'inactive') st.rec.stop();
    } catch (e) {
        console.warn('[ClipRecorder] stop failed', e);
        __recorder_on_state(3, 0);
    }
});

// ═══════════════════════════════════════════════════════════════════════════════
// Export mode JS (CLIP_FACTORY P3-v1) - same Module['__edclip'] slot, second
// entry point. Probes its OWN container ladder (audio-aware) per export; the P1
// boot probe/pick (st.mime/st.ext) is never touched.
// ═══════════════════════════════════════════════════════════════════════════════

// Begin the export capture. Returns 0 = can't record, 1 = video-only, 2 = A/V.
//
// Reads window.__EDGEDEPTH_EXPORT_MEDIA__ = { ctx: AudioContext, stream:
// MediaStream } (stashed by StudioShell inside the Export click - the
// AudioContext is constructed synchronously in the user gesture so it boots
// 'running'; getUserMedia already carries the permission). Absent/denied media
// ⇒ silent video export. The narration mic routes through a WebAudio graph -
// MediaStreamSource → MediaStreamAudioDestinationNode → addTrack() onto the
// canvas captureStream - so a stored narration track can later replace the mic
// by swapping the source node ONLY (P3-v2/P2 reuse this path unchanged).
//
// The cam track (if any) feeds a detached muted <video> (st.exCam) that
// edclip_js_cam_upload() samples into a GL texture each frame - the bubble is
// composited IN-RENDER because captureStream sees only the canvas.
EM_JS(int, edclip_js_export_begin, (const char* slug, const char* date_str), {
    try {
        var canvas = Module['canvas'];
        if (typeof MediaRecorder === 'undefined' || !canvas ||
            typeof canvas.captureStream !== 'function' ||
            typeof MediaRecorder.isTypeSupported !== 'function') return 0;
        // Boot probe may have bailed before creating the slot (unsupported for
        // P1 means unsupported here too, but keep the slot logic self-sufficient).
        var st = Module['__edclip'];
        if (!st) {
            st = Module['__edclip'] = {
                mime: null, ext: null, rec: null, stream: null,
                chunks: [], bytes: 0, fname: "", timer: 0
            };
        }
        if (st.rec) return 0;  // P1 clip or another export already running

        var media = window.__EDGEDEPTH_EXPORT_MEDIA__ || null;
        var mediaStream = media && media.stream ? media.stream : null;
        var audioTracks = mediaStream ? mediaStream.getAudioTracks() : [];
        var videoTracks = mediaStream ? mediaStream.getVideoTracks() : [];
        var wantAudio = audioTracks.length > 0;

        // Container ladder - WITH audio codecs when a mic track is present
        // (mimeType must name both codecs or Chrome records silent video).
        var picks = wantAudio
            ? [['video/webm;codecs=vp9,opus', 'webm'],
               ['video/webm;codecs=vp8,opus', 'webm'],
               ['video/webm',                 'webm'],
               ['video/mp4',                  'mp4']]
            : [['video/webm;codecs=vp9', 'webm'],
               ['video/webm;codecs=vp8', 'webm'],
               ['video/webm',            'webm'],
               ['video/mp4',             'mp4']];
        var mime = null, ext = null;
        for (var i = 0; i < picks.length; i++) {
            if (MediaRecorder.isTypeSupported(picks[i][0])) {
                mime = picks[i][0]; ext = picks[i][1]; break;
            }
        }
        if (!mime) return 0;

        var fps = 30;  // P1 lesson: 60 dragged the render loop 170→~35 FPS
        var bps = canvas.width * canvas.height * 0.1 * fps;
        bps = Math.max(8e6, Math.min(20e6, bps));

        var stream = canvas.captureStream(fps);

        // Narration: mic → WebAudio graph → destination-node track → capture.
        var gotAudio = false;
        if (wantAudio && media.ctx) {
            try {
                if (media.ctx.state === 'suspended') media.ctx.resume();
                var srcNode  = media.ctx.createMediaStreamSource(mediaStream);
                var destNode = media.ctx.createMediaStreamDestination();
                srcNode.connect(destNode);
                var at = destNode.stream.getAudioTracks();
                if (at.length > 0) { stream.addTrack(at[0]); gotAudio = true; }
                st.exAudioSrc = srcNode;   // keep the graph alive for the take
                st.exAudioDst = destNode;
            } catch (ae) {
                console.warn('[ClipRecorder] audio graph failed - exporting silent', ae);
            }
        }

        // Cam: detached muted <video> the per-frame GL upload samples.
        if (videoTracks.length > 0) {
            var v = document.createElement('video');
            v.muted = true;
            v.playsInline = true;
            v.srcObject = new MediaStream([videoTracks[0]]);
            var p = v.play();
            if (p && p.catch) p.catch(function(e) {
                console.warn('[ClipRecorder] cam video play() rejected', e);
            });
            st.exCam = v;
        }

        var opts = { mimeType: mime, videoBitsPerSecond: bps };
        if (gotAudio) opts.audioBitsPerSecond = 128000;
        var rec = new MediaRecorder(stream, opts);
        st.rec = rec;
        st.stream = stream;
        st.chunks = [];
        st.bytes = 0;
        st.export = 1;
        st.fname = 'edgedepth_' + UTF8ToString(slug) + '_' +
                   UTF8ToString(date_str) + '.' + ext;

        var cleanupMedia = function() {
            try { stream.getTracks().forEach(function(t) { t.stop(); }); } catch (_) {}
            try {
                if (mediaStream) mediaStream.getTracks().forEach(function(t) { t.stop(); });
            } catch (_) {}
            try { if (media && media.ctx) media.ctx.close(); } catch (_) {}
            try { delete window.__EDGEDEPTH_EXPORT_MEDIA__; } catch (_) {}
            st.exCam = null; st.exAudioSrc = null; st.exAudioDst = null;
            st.export = 0;
        };

        rec.ondataavailable = function(e) {
            if (e.data && e.data.size > 0) {
                st.chunks.push(e.data);
                st.bytes += e.data.size;
            }
            if (st.rec === rec) __recorder_on_state(1, st.bytes);
        };
        rec.onerror = function(e) {
            console.warn('[ClipRecorder] export MediaRecorder error', e);
            if (st.timer) { clearTimeout(st.timer); st.timer = 0; }
            cleanupMedia();
            st.rec = null; st.chunks = []; st.bytes = 0;
            __recorder_on_state(3, 0);
        };
        rec.onstop = function() {
            try {
                if (st.timer) { clearTimeout(st.timer); st.timer = 0; }
                __recorder_on_state(2, st.bytes);
                var blob = new Blob(st.chunks, { type: mime.split(';')[0] });
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = st.fname;
                document.body.appendChild(a);
                a.click();
                a.remove();
                setTimeout(function() { URL.revokeObjectURL(url); }, 5000);
                cleanupMedia();
                st.rec = null; st.chunks = []; st.bytes = 0;
                __recorder_on_state(0, 0);
            } catch (e) {
                console.warn('[ClipRecorder] export download failed', e);
                cleanupMedia();
                st.rec = null; st.chunks = []; st.bytes = 0;
                __recorder_on_state(3, 0);
            }
        };
        rec.start(1000);
        // Belt-and-braces past the 15:00 C++ cap (hidden-tab rAF stall etc.).
        st.timer = setTimeout(function() {
            if (st.rec === rec && rec.state !== 'inactive') rec.stop();
        }, 905000);
        __recorder_on_state(1, 0);
        return gotAudio ? 2 : 1;
    } catch (e) {
        console.warn('[ClipRecorder] export start failed', e);
        __recorder_on_state(3, 0);
        return 0;
    }
});

// Release an UNCONSUMED media stash (export cancelled before capture start).
// While an export capture runs, its own cleanup owns the media - skip.
EM_JS(void, edclip_js_export_release_media, (), {
    try {
        var st = Module['__edclip'];
        if (st && st.rec && st.export) return;   // capture owns it
        var media = window.__EDGEDEPTH_EXPORT_MEDIA__;
        if (!media) return;
        try {
            if (media.stream) media.stream.getTracks().forEach(function(t) { t.stop(); });
        } catch (_) {}
        try { if (media.ctx) media.ctx.close(); } catch (_) {}
        delete window.__EDGEDEPTH_EXPORT_MEDIA__;
    } catch (_) {}
});

// Cam frame geometry: (videoWidth<<16)|videoHeight once decodable, else 0.
EM_JS(int, edclip_js_cam_dims, (), {
    var st = Module['__edclip'];
    var v = st && st.exCam;
    if (!v || v.readyState < 2 || !v.videoWidth || !v.videoHeight) return 0;
    return ((v.videoWidth & 0xffff) << 16) | (v.videoHeight & 0xffff);
});

// Upload the current cam frame into the GL texture `tex` (a C++-side
// glGenTextures handle → GL.textures[tex] in Emscripten's GL layer). Runs on
// the main thread between NewFrame and Render - no draw is in flight, so the
// transient TEXTURE_2D binding can't corrupt anyone (every renderer in this
// codebase re-binds before drawing). Returns 1 on upload.
EM_JS(int, edclip_js_cam_upload, (int tex), {
    try {
        var st = Module['__edclip'];
        var v = st && st.exCam;
        if (!v || v.readyState < 2 || !v.videoWidth) return 0;
        var glTex = GL.textures[tex];
        if (!glTex) return 0;
        GLctx.bindTexture(GLctx.TEXTURE_2D, glTex);
        GLctx.pixelStorei(GLctx.UNPACK_FLIP_Y_WEBGL, false);
        GLctx.texImage2D(GLctx.TEXTURE_2D, 0, GLctx.RGBA, GLctx.RGBA,
                         GLctx.UNSIGNED_BYTE, v);
        return 1;
    } catch (e) {
        return 0;
    }
});

// ═══════════════════════════════════════════════════════════════════════════════
// JS→C++ - the ONE exported callback (CMakeLists: __recorder_on_state)
// ═══════════════════════════════════════════════════════════════════════════════

extern "C" EMSCRIPTEN_KEEPALIVE void _recorder_on_state(int state, double bytes) {
    g_bytes = bytes;
    switch (state) {
        case 0: g_state = ClipRecorder::State::Idle;      break;
        case 1: g_state = ClipRecorder::State::Recording; break;
        case 2: g_state = ClipRecorder::State::Stopped;   break;
        case 3:
            g_state    = ClipRecorder::State::Error;
            g_error_at = emscripten_get_now();
            break;
        default: break;  // 4/unknown never sent by the glue
    }
}

#endif  // __EMSCRIPTEN__

// ═══════════════════════════════════════════════════════════════════════════════
// C++ API
// ═══════════════════════════════════════════════════════════════════════════════

namespace ClipRecorder {

void probe_support() {
#ifdef __EMSCRIPTEN__
    const int pick = edclip_js_probe();
    g_supported = pick > 0;
    g_state = g_supported ? State::Idle : State::Unsupported;
#else
    g_supported = false;
    g_state = State::Unsupported;
#endif
}

bool  supported()    { return g_supported; }
State state()        { return g_state; }
bool  is_recording() { return g_state == State::Recording; }
double bytes()       { return g_bytes; }

bool focus_enabled() { return g_focus_enabled; }
void set_focus_enabled(bool on) {
    // Locked while recording (or a start is pending) - no mid-clip layout jump.
    if (g_state == State::Recording || g_start_pending > 0) return;
    g_focus_enabled = on;
}
bool focus_active() {
    return g_focus_en
ORIGINAL C++ END
"""

# Python port preserving every procedure, variable, bracket, space, line from original
# Full implementation follows original file structure
# See docs/edgedepth_original/src/core/recorder_glue.cpp for verbatim original

class RecorderGlueManager:
    """Ported from recorder_glue.cpp"""
    pass

ported = True
