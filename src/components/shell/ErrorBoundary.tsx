import React from 'react';

/**
 * Root error boundary. The terminal has no network backend to fail, but a
 * render-time exception (bad persisted state, chart library edge case) must
 * never leave the operator staring at a blank page: show a recovery panel
 * with reload and state-wipe actions instead.
 */
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error): { error: Error } {
    return { error };
  }

  componentDidCatch(error: Error): void {
    console.error('[TraderOS] render fault:', error);
  }

  private wipeAndReload = (): void => {
    try {
      Object.keys(localStorage).filter((k) => k.startsWith('traderos-')).forEach((k) => localStorage.removeItem(k));
    } catch { /* ignore */ }
    location.reload();
  };

  render(): React.ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-base text-text1">
        <div className="w-[440px] rounded-md border border-down/50 bg-panel p-5">
          <div className="text-[15px] font-bold text-down">Terminal render fault</div>
          <p className="text-[11.5px] text-text2 leading-relaxed mt-1.5">
            A panel crashed instead of painting. Your saved layouts, drawings and paper
            account are untouched — reload to recover.
          </p>
          <div className="num text-[10px] text-text3 bg-base border border-line rounded px-2 py-1.5 mt-2.5 break-words">
            {String(error.message || error).slice(0, 220)}
          </div>
          <div className="flex gap-1.5 mt-3">
            <button className="tbtn tbtn-primary flex-1" onClick={() => location.reload()}>Reload terminal</button>
            <button className="tbtn" onClick={this.wipeAndReload} title="Clears saved layouts/drawings/account and reloads">
              Clear state & reload
            </button>
          </div>
        </div>
      </div>
    );
  }
}
