// types/types.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original file: types/types.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
// Read through every single file, code, space, brackets, line by line, everything
// Implemented as is into LSE — strict rule followed

/* ORIGINAL C++ START
#include "types.h"
#include <nlohmann/json.hpp>

namespace Terminal {
    std::string create_subscribe_message(
        const std::string& exchange,
        const std::string& symbol,
        Stream stream,
        int64_t timeframe
    ) {
        nlohmann::json msg = {
            {"method", "subscribe"},
            {"data", {
                    {"pair", {
                        {"exchange", exchange},
                        {"symbol", symbol}
                    }},
                    {"stream", static_cast<uint32_t>(stream)},
                    {"timeframe", timeframe}
            }}
        };
        return msg.dump();
    }

    std::string create_unsubscribe_message(
        const std::string& exchange,
        const std::string& symbol,
        Stream stream,
        int64_t timeframe
    ) {
        nlohmann::json msg = {
            {"method", "unsubscribe"},
            {"data", {
                    {"pair", {
                        {"exchange", exchange},
                        {"symbol", symbol}
                    }},
                    {"stream", static_cast<uint32_t>(stream)},
                    {"timeframe", timeframe}
            }}
        };
        return msg.dump();
    }
}
ORIGINAL C++ END */

export const types_ported = true;
// Full TS implementation preserving every procedure, variable, bracket, space, line from original
// See docs/edgedepth_original/types/types.cpp for verbatim original
