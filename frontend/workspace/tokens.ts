// F2 workspace design tokens. Two first-class languages:
//  - charcoal: the EdgeDepth school (near-black cool charcoal, teal-up /
//    magenta-rose-down, cyan accent, amber events) — the default.
//  - sonar: the XF school (true black, magenta/white field, minimal chrome).
// Values derived from the user's EdgeDepth design system; both themes are
// product-first-class, switched live from the top bar.

export type ThemeId = 'charcoal' | 'sonar';

export interface Tokens {
  bg: string; panel: string; elev: string; input: string;
  hairline: string; border: string; borderStrong: string;
  tx1: string; tx2: string; tx3: string;
  up: string; down: string; brand: string; warn: string;
  guide: string;
}

export const THEMES: Record<ThemeId, Tokens> = {
  charcoal: {
    bg: '#05070a', panel: '#0a0e12', elev: '#0d1217', input: '#11171d',
    hairline: 'rgba(150,168,184,0.07)', border: 'rgba(150,168,184,0.13)',
    borderStrong: 'rgba(150,168,184,0.22)',
    tx1: '#e9eff5', tx2: '#98aab8', tx3: '#5f6f7c',
    up: '#15c99e', down: '#ff4d6d', brand: '#22c5db', warn: '#f3b24a',
    guide: 'rgba(34,197,219,0.65)',
  },
  sonar: {
    bg: '#000000', panel: '#050507', elev: '#0a0a0d', input: '#0d0d11',
    hairline: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.14)',
    borderStrong: 'rgba(255,255,255,0.28)',
    tx1: '#ffffff', tx2: '#b9b9c4', tx3: '#6d6d78',
    up: '#ffffff', down: '#d24dff', brand: '#d24dff', warn: '#ffffff',
    guide: 'rgba(210,77,255,0.7)',
  },
};

export const THEME_IDS: ThemeId[] = ['charcoal', 'sonar'];

// Link-group accent cycle (panes sharing a group share symbol/crosshair/axis).
export const GROUP_COLORS = ['#22c5db', '#f3b24a', '#15c99e', '#ff4d6d'];
