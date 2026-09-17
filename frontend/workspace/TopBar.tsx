import React, { useState } from 'react';
import {
  addPane, deleteWorkspace, listWorkspaces, loadWorkspace, saveWorkspace,
} from './grid/store';
import { WorkspaceState } from './grid/types';
import { ThemeId } from './tokens';

interface Props {
  state: WorkspaceState;
  onChange: (s: WorkspaceState) => void;
  onTheme: (t: ThemeId) => void;
  onPreset: (n: 1 | 2 | 4 | 9) => void;
}

export default function TopBar({ state, onChange, onTheme, onPreset }: Props) {
  const [wsOpen, setWsOpen] = useState(false);
  const names = listWorkspaces();

  const save = () => {
    const name = window.prompt('Workspace name');
    if (name && name.trim()) saveWorkspace(name.trim(), state);
  };

  return (
    <div className="ws-topbar">
      <span className="ws-brand">TRADEROS · WORKSPACE <em>F2</em></span>
      <span className="ws-sep" />
      <button onClick={() => onChange(addPane(state))} title="Add a pane">+ PANE</button>
      <button onClick={() => onPreset(1)}>1</button>
      <button onClick={() => onPreset(2)}>2</button>
      <button onClick={() => onPreset(4)}>4</button>
      <button onClick={() => onPreset(9)}>9</button>
      <span className="ws-sep" />
      <button
        onClick={() => onTheme(state.theme === 'charcoal' ? 'sonar' : 'charcoal')}
        title="Switch design language"
      >{state.theme === 'charcoal' ? 'CHARCOAL' : 'SONAR'}</button>
      <span className="ws-sep" />
      <button onClick={save} title="Save the whole UI as a named workspace">SAVE</button>
      <button onClick={() => setWsOpen((v) => !v)} title="Load / delete workspaces">
        WORKSPACES{names.length ? ` (${names.length})` : ''}
      </button>
      {wsOpen && (
        <div className="ws-menu">
          {names.length === 0 && <div className="ws-menu-empty">none saved yet</div>}
          {names.map((n) => (
            <div className="ws-menu-row" key={n}>
              <button onClick={() => {
                const s = loadWorkspace(n);
                if (s) onChange(s);
                setWsOpen(false);
              }}>{n}</button>
              <button className="ws-menu-del" title="Delete"
                      onClick={() => deleteWorkspace(n)}>×</button>
            </div>
          ))}
        </div>
      )}
      <span className="ws-hint">
        drag = snap · shift+drag = freeform · corner = resize · LNK = link group
      </span>
    </div>
  );
}
