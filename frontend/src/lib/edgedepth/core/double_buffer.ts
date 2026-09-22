// double_buffer.h — exact port, space by space, bracket by bracket
// Original C++: template <typename T> struct DoubleBuffered { T write_buf; T read_buf; atomic<bool> dirty; mutex write_mutex; mark_dirty() dirty=true; publish() if !dirty return false; lock write_mutex; read_buf=write_buf; dirty=false; return true; }
// Why copy instead of swapping pointers? Write side continuously mutated insert/erase per price level on every depth update. Pointer swap would hand consumer a buffer that next WS callback starts mutating underneath it, so widget half-way through drawing would see levels appear/vanish inside single frame. Copying costs ~50us for 1000-level book, inside frame budget, stable by construction. dirty keeps cost off idle symbols: watchlist 40 pairs only copies handful that ticked this frame.

export class DoubleBuffered<T> {
  write_buf: T;
  read_buf: T;
  dirty = false;
  private write_mutex = { locked: false };

  constructor(initial: T, clone: (v: T) => T) {
    this._clone = clone;
    this.write_buf = clone(initial);
    this.read_buf = clone(initial);
  }
  private _clone: (v: T) => T;

  mark_dirty() {
    this.dirty = true;
  }

  publish(): boolean {
    if (!this.dirty) return false;
    // In JS single-threaded, no real mutex needed, but we keep semantic
    this.read_buf = this._clone(this.write_buf);
    this.dirty = false;
    return true;
  }

  // For orderbook: direct access to write_buf under "lock" semantic
  getWrite(): T {
    return this.write_buf;
  }
  getRead(): T {
    return this.read_buf;
  }
}
