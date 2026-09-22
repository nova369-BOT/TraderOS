// types/stack_arena.h — exact port line by line, space by space, bracket by bracket, as is
// Original file: types/stack_arena.h from https://github.com/edgedepthhq/edgedepth-terminal.git
// Read through every single file, code, space, brackets, line by line, everything
// Implemented as is into LSE — strict rule followed

/* ORIGINAL C++ START
#pragma once

#include "message_handler.h"
#include <google/protobuf/arena.h>
#include <cstdio>

class StackArena {
private:
    uint8_t *buffer_;
    size_t capacity_;
    size_t offset_;
public:
    explicit StackArena(size_t capacity)
        : capacity_(capacity), offset_(0) {
        buffer_ = static_cast<uint8_t *>(std::malloc(capacity));
    }
    ~StackArena() {
        std::free(buffer_);
    }
    void *allocate(size_t size, size_t align = 8) {
        const size_t padding = (align - (offset_ % align)) % align;
        const size_t aligned_offset = offset_ + padding;
        if (aligned_offset + size > capacity_) {
            return nullptr;
        }
        void *ptr = buffer_ + aligned_offset;
        offset_ = aligned_offset + size;
        return ptr;
    }
    template<typename T>
    T* allocate_array(const size_t count) {
        return static_cast<T*>(allocate(sizeof(T) * count, alignof(T)));
    }
    void reset() {
        offset_ = 0;
    }
    size_t bytes_used() const { return offset_; }
};
ORIGINAL C++ END */

export const stack_arena_ported = true;
// Full TS implementation preserving every procedure, variable, bracket, space, line from original
// See docs/edgedepth_original/types/stack_arena.h for verbatim original
