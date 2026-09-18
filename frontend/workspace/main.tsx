import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './workspace.css';
import TopBar from './TopBar';
import WorkspaceGrid from './grid/WorkspaceGrid';
import { loadState, presetPanes, saveState } from './grid/store';
import { WorkspaceState } from './grid/types';
import { THEMES, ThemeId, Tokens } from './tokens';

function cssVars(t: Tokens): React.CSSProperties {
  return {
    '--bg': t.bg, '--panel': t.panel, '--elev': t.elev, '--input': t.input,
    '--hair': t.hairline, '--bd': t.border, '--bd2': t.borderStrong,
    '--tx1': t.tx1, '--tx2': t.tx2, '--tx3': t.tx3,
    '--up': t.up, '--down': t.down, '--brand': t.brand, '--warn': t.warn,
    '--guide': t.guide,
  } as React.CSSProperties;
}

function App() {
  const [state, setState] = useState<WorkspaceState>(() => loadState());
  useEffect(() => { saveState(state); }, [state]);

  // belt-and-braces: state is sanitised on load, but never trust a theme
  // id enough to let a missing token set crash the whole tree
  const tokens = THEMES[state.theme] ?? THEMES.charcoal;

  return (
    <div className="ws-root" style={cssVars(tokens)}>
      <TopBar
        state={state}
        onChange={setState}
        onTheme={(t: ThemeId) => setState({ ...state, theme: t })}
        onPreset={(n) => setState({ ...state, panes: presetPanes(n) })}
      />
      <WorkspaceGrid state={state} onChange={setState} />
    </div>
  );
}

const el = document.getElementById('ws-root');
if (el) createRoot(el).render(<App />);
