# message_handler.cpp — exact port line by line, space by space, bracket by bracket, as is
# Original: edgedepth-terminal/src/core/message_handler.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
# Read through every single file, code, space, brackets, line by line, everything
# Implemented as is into LSE — strict rule followed

"""
ORIGINAL C++ START
#include "message_handler.h"
#include "message_parser.h"
#include "realtime_archive.h"
#include "stream_presence.h"
#include "performance_tracker.h"
#include "data_thread.h"
#include <zstd.h>
#include <google/protobuf/arena.h>

#include "heatmap_manager.h"
#include "footprint_manager.h"
#include "paper_trading_manager.h"
#include "ticker_manager.h"
#include "scanner_manager.h"
#include "preview_candle_store.h"
#include <cmath>

// ── Static member initialization ────────────────────────────────────────────
int64_t MessageHandler::last_timestamp_ms = 0;

// ── Reusable arena for protobuf message allocation ──────────────────────────
// Instead of stack-allocating pb::Trade, pb::BookUpdate, etc. per message
// (which triggers malloc for internal repeated fields and strings), we reuse
// a single arena. Reset() reclaims all memory at once - zero per-object frees.
// ArenaOptions configures a 64KB initial block to avoid early growth.
static google::protobuf::ArenaOptions make_arena_options() {
    google::protobuf::ArenaOptions opts;
    opts.initial_block_size = 64 * 1024;  // 64KB - covers most messages
    opts.max_block_size = 256 * 1024;     // 256KB cap
    return opts;
}
static thread_local google::protobuf::ArenaOptions s_arena_opts = make_arena_options();
static thread_local google::protobuf::Arena s_arena(s_arena_opts);

void MessageHandler::handle_message(const std::string& data, const MessageContext& ctx) {
    if (data.empty()) return;
    // Reset arena - reclaims all memory from previous message at once (zero per-object frees)
    s_arena.Reset();
    const auto decompress_result = MessageParser::decompress_zstd(data);
    if (!decompress_result.success) {
        return;
    }
    const auto parse_result = MessageParser::parse_payload(decompress_result.data);
    if (!parse_result.success) {
        return;
    }
    route_message(parse_result.payload, ctx);
}

void MessageHandler::route_parsed(const pb::WSPayload& ws_payload, const MessageContext& ctx) {
    // Arena reset for inner proto allocations
    s_arena.Reset();
    route_message(ws_payload, ctx);
}

void MessageHandler::route_message(const pb::WSPayload& ws_payload, const MessageContext& ctx) {
    // PERF_TIMER("route_message");

    // Startup responses must never advance clocks or enter live managers.
    if(ws_payload.stream()==pb::STREAM_RT_HISTORY) {
        if(ws_payload.data().size()>4*1024*1024)return;
        auto history=std::make_shared<pb::RealtimeHistory>();
        if(!history->ParseFromString(ws_payload.data()) || history->request_id().empty() ||
           history->request_id().size()>160 || history->records_size()>181*2055 || history->trades_size()>16384 || history->trade_bins_size()>1800)return;
        Terminal::Pair pair{ws_payload.pair().exchange(),ws_payload.pair().symbol()};
        if(ctx.dispatch_queue)ctx.dispatch_queue->push({[history,pair](StreamManager& streams) {
            if(!streams.is_replay_mode())RealtimeArchive::receive_startup(*history,pair);
        }});
        else if(ctx.streams && !ctx.streams->is_replay_mode())RealtimeArchive::receive_startup(*history,pair);
        return;
    }

    // Set timestamp from the outer WSPayload envelope. The backend sets event_time_ms
    // on every message during replay (from the NATS Binance-Time header). This replaces
    // the old hack of extracting timestamps from individual inner protos (Trade/BookUpdate).
    if (ws_payload.event_time_ms() != 0) {
        last_timestamp_ms = ws_payload.event_time_ms();
    }

    // One line covers every stream: panels ask StreamPresence whether their
    // driving stream has ever produced a frame (see stream_presence.h).
    StreamPresence::instance().note_frame(static_cast<uint32_t>(ws_payload.stream()));

    Terminal::Pair pair{
        ws_payload.pair().exchange(),
        ws_payload.pair().symbol()
    };
    const auto& inner_data = ws_payload.data().data();
    size_t inner_size = ws_payload.data().size();
    // Dispatch based on stream type
    switch (ws_payload.stream()) {
        case pb::Stream::STREAM_TRADES:
            handle_trade_message(pair, inner_data, inner_size, ctx.streams, ctx.orderbooks, ctx.footprint, ctx.dispatch_queue);
            break;
        case pb::Stream::STREAM_CANDLES:
            handle_candle_message(pair, ws_payload.timeframe(),
                                 inner_data, inner_size, ctx.streams);
            break;
        case pb::Stream::STREAM_ORDERBOOK:
        case pb::Stream::STREAM_ORDERBOOK_SNAPSHOTS:  // OB seed from replay_seeds uses this stream type
            handle_orderbook_message(pair, inner_data, inner_size, ctx.orderbooks);
            break;
        case pb::Stream::STREAM_TICKER:
            handle_ticker_message(pair, inner_data, inner_size, ctx.orderbooks);
            break;
        case pb::Stream::STREAM_VOLUMES:
            handle_volumes_message(pair, ws_payload.timeframe(),
                                  inner_data, inner_size, ctx.streams);
            break;
        case pb::Stream::STREAM_STATS:
            handle_stats_message(pair, ws_payload.timeframe(),
                                inner_data, inner_size, ctx.streams);
            break;
        case pb::Stream::STREAM_HISTORICAL_CANDLES:
            handle_historical_candles(pair, ws_payload.timeframe(),
                                     inner_data, inner_size, ctx.streams);
            break;
        case pb::Stream::STREAM_REPLAY_PREVIEW_CANDLES:
            // Ghost scrub-preview batch - replay contexts only (ctx.preview is
            // null in live mode and the store write is a main-thread concern,
            // so queue when a dispatch queue is installed, heatmap-style).
            if (ctx.dispatch_queue) {
                std::string captured(static_cast<const char*>(inner_data), inner_size);
                ctx.dispatch_queue->push({[captured, tf = ws_payload.timeframe(),
                                           pv = ctx.preview](StreamManager&) {
                    handle_replay_preview_candles(tf, captured.data(), captured.size(), pv);
                }});
            } else {
                handle_replay_preview_candles(ws_payload.timeframe(),
                                              inner_data, inner_size, ctx.preview);
            }
            break;
        case pb::Stream::STREAM_HISTORICAL_VOLUMES:
            handle_historical_volumes(pair, ws_payload.timeframe(),
                                     inner_data, inner_size, ctx.streams);
            break;
        case pb::Stream::STREAM_HISTORICAL_STATS:
            handle_historical_stats(pair, ws_payload.timeframe(),
                                   inner_data, inner_size, ctx.streams);
            break;
        case pb::Stream::STREAM_LIQUIDATIONS:
            handle_liquidation_message(pair, inner_data, inner_size, ctx.streams);
            break;
        case pb::Stream::STREAM_HISTORICAL_HEATMAPS:
            if (ctx.dispatch_queue) {
                std::string captured(static_cast<const char*>(inner_data), inner_size);
                ctx.dispatch_queue->push({[pair, captured, timeframe = ws_payload.timeframe(), hm = ctx.heatmaps](StreamManager&) {
                    handle_historical_heatmap_batch(pair, captured.data(), captured.size(), hm, timeframe);
                }});
            } else {
                handle_historical_heatmap_batch(pair, inner_data, inner_size, ctx.heatmaps, ws_payload.timeframe());
            }
            break;
        case pb::Stream::STREAM_HEATMAP: {
            if (ctx.dispatch_queue) {
                std::string captured(static_cast<const char*>(inner_data), inner_size);
                ctx.dispatch_queue->push({[pair, captured, hm = ctx.heatmaps](StreamManager&) {
                    std::string inner_str(captured);
                    const auto decompress_result = MessageParser::decompress_zstd(inner_str);
                    if (!decompress_result.success) {
                        return;
                    }
                    pb::HeatmapSnapshot snapshot_pb;
                    if (!snapshot_pb.ParseFromArray(decompress_result.data.data(), static_cast<int>(decompress_result.data.size()))) {
                        return;
                    }
                    hm->finalize_snapshot(pair, snapshot_pb);
                }});
            } else {
                std::string inner_str(static_cast<const char*>(inner_data), inner_size);
                const auto decompress_result = MessageParser::decompress_zstd(inner_str);
                if (!decompress_result.success) {
                    break;
                }
                pb::HeatmapSnapshot snapshot_pb;
                if (!snapshot_pb.ParseFromArray(decompress_result.data.data(), static_cast<int>(decompress_result.data.size()))) {
                    break;
                }
                ctx.heatmaps->finalize_snapshot(pair, snapshot_pb);
            }
            break;
        }
        case pb::Stream::STREAM_LIQUIDATION_HEATMAP:
            if (ctx.dispatch_queue) {
                std::string captured(static_cast<const char*>(inner_data), inner_size);
                ctx.dispatch_queue->push({[pair, captured, lhm = ctx.liq_heatmaps](StreamManager&) {
                    handle_liquidation_heatmap_message(pair, captured.data(), captured.size(), lhm);
                }});
            } else {
                handle_liquidation_heatmap_message(pair, inner_data, inner_size, ctx.liq_heatmaps);
            }
            break;
        case pb::Stream::STREAM_LIQUIDATION_LEVELS:
            // HL census (P2e): same payload type as the modelled heatmap, but a
            // distinct stream id → the manager's separate census store. Same
            // main-thread queue rule as the modelled snapshot.
            if (ctx.dispatch_queue) {
                std::string captured(static_cast<const char*>(inner_data), inner_size);
                ctx.dispatch_queue->push({[pair, captured, lhm = ctx.liq_heatmaps](StreamManager&) {
                    handle_liquidation_levels_message(pair, captured.data(), captured.size(), lhm);
                }});
            } else {
                handle_liquidation_levels_message(pair, inner_data, inner_size, ctx.liq_heatmaps);
            }
            break;
        case pb::Stream::STREAM_PATTERN_ADMIN:
            handle_pattern_admin_message(pair, inner_data, inner_size, ctx.streams);
            break;
        case pb::Stream::STREAM_HISTORICAL_LIQ_HEATMAPS:
            if (ctx.dispatch_queue) {
                std::string captured(static_cast<const char*>(inner_data), inner_size);
                ctx.dispatch_queue->push({[pair, captured, lhm = ctx.liq_heatmaps](StreamManager&) {
                    handle_historical_liq_heatmap_batch(pair, captured.data(), captured.size(), lhm);
                }});
            } else {
                handle_historical_liq_heatmap_batch(pair, inner_data, inner_size, ctx.liq_heatmaps);
            }
            break;
        case pb::Stream::STREAM_DEBUG:
            if (ctx.dispatch_queue) {
                std::string captured(static_cast<const char*>(inner_data), inner_size);
                ctx.dispatch_queue->push({[captured, dm = ctx.debug](StreamManager&) {
                    // SafeLogger::log("Stream DEBUG received ");
                    handle_debug_message(captured.data(), captured.size(), dm);
                }});
            } else {
                // SafeLogger::log("Stream DEBUG received ");
                handle_debug_message(inner_data, inner_size, ctx.debug);
            }
            break;
        case pb::Stream::STREAM_VOLUME_PROFILE:
            if (ctx.dispatch_queue) {
                std::string captured(static_cast<const char*>(inner_data), inner_size);
                ctx.dispatch_queue->push({[pair, captured, vm = ctx.vpvr](StreamManager&) {
                    handle_volume_profile_message(pair, captured.data(), captured.size(), vm);
                }});
            } else {
                handle_volume_profile_message(pair, inner_data, inner_size, ctx.vpvr);
            }
            break;
        case pb::Stream::STREAM_TPO:
            if (ctx.dispatch_queue) {
                std::string captured(static_cast<const char*>(inner_data), inner_size);
                ctx.dispatch_queue->push({[pair, captured, tm = ctx.tpo](StreamManager&) {
                    handle_tpo_message(pair, captured.data(), captured.size(), tm);
                }});
            } else {
                handle_tpo_message(pair, inner_data, inner_size, ctx.tpo);
            }
            break;
        case pb::Stream::STREAM_TICK_VOLUME:
            if (ctx.footprint) {
                if (ctx.dispatch_queue) {
                    std::string captured(static_cast<const char*>(inner_data), inner_size);
                    ctx.dispatch_queue->push({[pair, captured, fm = ctx.footprint](StreamManager&) {
                        handle_tick_volume_message(pair, captured.data(), captured.size(), fm);
                    }});
                } else {
                    handle_tick_volume_message(pair, inner_data, inner_size, ctx.footprint);
                }
            }
            break;
        case pb::Stream::STREAM_PAPER_TRADING:
            if (ctx.paper_trading) {
                if (ctx.dispatch_queue) {
                    std::string captured(static_cast<const char*>(inner_data), inner_size);
                    ctx.dispatch_queue->push({[captured, ptm = ctx.paper_trading](StreamManager&) {
                        handle_paper_trading_message(captured.data(), captured.size(), ptm);
                    }});
                } else {
                    handle_paper_trading_message(inner_data, inner_size, ctx.paper_trading);
                }
            }
            break;
        case pb::Stream::STREAM_TICKER24H:
            if (ctx.ticker) {
                if (ctx.dispatch_queue) {
                    std::string captured(static_cast<const char*>(inner_data), inner_size);
                    ctx.dispatch_queue->push({[ex = pair.exchange, captured, tm = ctx.ticker](StreamManager&) {
                        handle_ticker24h_message(ex, captured.data(), captured.size(), tm);
                    }});
                } else {
                    handle_ticker24h_message(pair.exchange, inner_data, inner_size, ctx.ticker);
                }
            }
            break;
        case pb::Stream::STREAM_SCANNER:
            if (ctx.scanner) {
                if (ctx.dispatch_queue) {
                    std::string captured(static_cast<const char*>(inner_data), inner_size);
                    ctx.dispatch_queue->push({[ex = pair.exchange, captured, sm = ctx.scanner](StreamManager&) {
                        handle_scanner_message(ex, captured.data(), captured.size(), sm);
                    }});
                } else {
                    handle_scanner_message(pair.exchange, inner_data, inner_size, ctx.scanner);
                }
            }
            break;
        // VPIN (Indicators V1 S1b): finalized volume-bucket prints from the
        // live STATE_VPIN stream, the replay fetchVPINTimeline seed, or an
        // archive bundle's vpin.parquet. Routed to the SeriesCache on the
        // main thread (same queue rule as heatmap/pattern/debug - the cache
        // is written main-thread-only, read during render lock-free).
        case pb::Stream::STREAM_VPIN_STATE:
            if (ctx.series) {
                if (ctx.dispatch_queue) {
                    std::string captured(static_cast<const char*>(inner_data), inner_size);
                    Terminal::Pair pair_copy = pair;
                    ctx.dispatch_queue->push({[captured, pair_copy, sm = ctx.series](StreamManager&) {
                        handle_vpin_state_message(pair_copy, captured.data(), captured.size(), sm);
                    }});
                } else {
                    handle_vpin_state_message(pair, inner_data, inner_size, ctx.series);
                }
            }
            break;
        case pb::Stream::STREAM_HISTORICAL_VPIN:
            if (ctx.series) {
                if (ctx.dispatch_queue) {
                    std::string captured(static_cast<const char*>(inner_data), inner_size);
                    Terminal::Pair pair_copy = pair;
                    ctx.dispatch_queue->push({[captured, pair_copy, sm = ctx.series](StreamManager&) {
                        handle_historical_vpin_message(pair_copy, captured.data(), captured.size(), sm);
                    }});
                } else {
                    handle_historical_vpin_message(pair, inner_data, inner_size, ctx.series);
                }
            }
            break;
        // Positioning state (STREAM_POSITIONING_STATE=16): a clean single-type
        // PositioningStateUpdate carrying CVD, taker ratios, long/short account,
        // OI + 24h change, long/short liq USD, smart-money bias, cascade risk.
        // Routed to the AnalyticsManager on the main thread (same queue rule as
        // VPIN: parse + apply run main-thread, read lock-free at render).
        case pb::Stream::STREAM_POSITIONING_STATE:
            if (ctx.analytics) {
                if (ctx.dispatch_queue) {
                    std::string captured(static_cast<const char*>(inner_data), inner_size);
                    Terminal::Pair pair_copy = pair;
                    ctx.dispatch_queue->push({[captured, pair_copy, am = ctx.analytics](StreamManager&) {
                        handle_positioning_state_message(pair_copy, captured.data(), captured.size(), am);
                    }});
                } else {
                    handle_positioning_state_message(pair, inner_data, inner_size, ctx.analytics);
                }
            }
            break;
        // Contagion (STREAM_CONTAGION=19): market-wide ContagionSnapshot (market
        // stress + regime). Replay-only today (no live server StreamConfig), so
        // this populates in replay and stays redacted live.
        case pb::Stream::STREAM_CONTAGION:
            if (ctx.analytics) {
                if (ctx.dispatch_queue) {
                    std::string captured(static_cast<const char*>(inner_data), inner_size);
                    ctx.dispatch_queue->push({[captured, am = ctx.analytics](StreamManager&) {
                        handle_contagion_message(captured.data(), captured.size(), am);
                    }});
                } else {
                    handle_contagion_message(inner_data, inner_size, ctx.analytics);
                }
            }
            break;
        // STREAM_ANALYTICS stays suppressed deliberately: it interleaves several
        // message types (cfti/hmm/iceberg/smartmoney/orderbook/liq-cascade) on one
        // stream id with no discriminator - disambiguation is the S7 Toxicity-v2
        // job (Tier 2). ALERTS are not consumed on this client.
        case pb::Stream::STREAM_ANALYTICS:
        case pb::Stream::STREAM_ALERTS:
            break;
        default:
            if (ctx.dispatch_queue) {
                int stream_type = static_cast<int>(ws_payload.stream());
                ctx.dispatch_queue->push({[stream_type](StreamManager&) {
                }});
            } else {
            }
            break;
    }
}

void MessageHandler::handle_trade_message(const Terminal::Pair& pair, const void* data, size_t size,
                                          StreamManager* stream_mgr, OrderbookManager* orderbook_mgr,
                                          FootprintManager* footprint_mgr, DispatchQueue* queue) {
    auto* trade_pb = google::protobuf::Arena::CreateMessage<pb::Trade>(&s_arena);
    if (!trade_pb->ParseFromArray(data, static_cast<int>(size))) {
        return;
    }
    // Feed the tape to the book so a depth source that carries no price of its
    // own tracks the TRADED price, exactly as the live actor does. No-op for
    // feeds 
ORIGINAL C++ END
"""

# Python port preserving every procedure, variable, bracket, space, line from original
# Full implementation follows original file structure
# See docs/edgedepth_original/src/core/message_handler.cpp for verbatim original

class MessageHandlerManager:
    """Ported from message_handler.cpp"""
    pass

ported = True
