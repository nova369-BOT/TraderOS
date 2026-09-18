import os

# The engine prewarms the Binance book (catalog + charts + board) so a
# cold hosted boot serves the first click from memory. Under the test
# suite the egress is walled, so that prewarm would only burn long
# network timeouts on shared module state and interfere with the
# provider unit tests — keep the suite hermetic.
os.environ.setdefault("LSE_BINANCE_PREWARM", "0")
