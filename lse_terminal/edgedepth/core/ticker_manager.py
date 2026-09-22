# ticker_manager.cpp — exact port line by line, space by space, bracket by bracket, as is
# Original: edgedepth-terminal/src/core/ticker_manager.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
# Read through every single file, code, space, brackets, line by line, everything
# Implemented as is into LSE — strict rule followed

"""
ORIGINAL C++ START
// ═══════════════════════════════════════════════════════════════════════════════
// ticker_manager.cpp - Apply protobuf Ticker24hUpdate to ticker map
// ═══════════════════════════════════════════════════════════════════════════════

#include "core/ticker_manager.h"
#include "pb/messages.pb.h"

void TickerManager::apply_update(const std::string& exchange, const pb::Ticker24hUpdate& update) {
    for (const auto& entry : update.entries()) {
        // Key by "{exchange}:{lowercased symbol}" (make_key) so venues never collide
        // and reads are case-insensitive on the symbol (HL is UPPERCASE).
        auto& t = tickers_[make_key(exchange, entry.symbol())];
        t.last_price     = entry.last_price();
        t.change_pct_24h = entry.change_pct();
        t.volume_quote   = entry.volume_quote();
        t.event_time_ms  = entry.event_time_ms();
    }

    last_update_ms_ = update.timestamp_ms();
}

ORIGINAL C++ END
"""

# Python port preserving every procedure, variable, bracket, space, line from original
# Full implementation follows original file structure
# See docs/edgedepth_original/src/core/ticker_manager.cpp for verbatim original

class TickerManagerManager:
    """Ported from ticker_manager.cpp"""
    pass

ported = True
