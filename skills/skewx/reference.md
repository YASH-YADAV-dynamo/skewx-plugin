# DEX WebSocket Reference

Full WebSocket URLs and subscribe message formats for each DEX. For symbol mapping, see the table below.

## WebSocket URLs and Subscribe Messages

### Pacifica
- **URL:** `wss://ws.pacifica.fi/ws`
- **Subscribe:** `{ "method": "subscribe", "params": { "source": "book", "symbol": "<SYM>", "agg_level": 1 } }`
- **Notes:** Full snapshot each tick. Ping `{ "method": "ping" }` every 30s.

### 01 Exchange
- **URL:** `wss://zo-mainnet.n1.xyz/ws/deltas@<SYM>`
- **Subscribe:** None (symbol embedded in URL)
- **Notes:** Delta feed. Update bidMap/askMap from `delta.bids`, `delta.asks` arrays of `[price, size]`.

### HotStuff
- **URL:** `wss://api.hotstuff.trade/ws/`
- **Subscribe:** `{ "jsonrpc": "2.0", "id": "1", "method": "subscribe", "params": { "channel": "orderbook", "symbol": "<SYM>" } }`
- **Notes:** Snapshot/delta. On `update_type === "snapshot"` clear maps. Levels: `{ price, size }`.

### Paradex
- **URL:** `wss://ws.api.prod.paradex.trade/v1?`
- **Subscribe:** `{ "id": 1, "jsonrpc": "2.0", "method": "subscribe", "params": { "channel": "order_book.<SYM>.snapshot@15@50ms" } }`
- **Notes:** Snapshot (update_type 's') and delta ('d'). Levels: `{ price, side: "BUY"|"SELL", size }`.

### Hibachi
- **URL:** `wss://data-api.hibachi.xyz/ws/market`
- **Subscribe:** `{ "method": "subscribe", "parameters": { "subscriptions": [{ "symbol": "<SYM>", "topic": "orderbook" }] } }`
- **Notes:** Snapshot first, then updates. Levels in `data.bid.levels`, `data.ask.levels`: `{ price, quantity }`.

### Hyperliquid
- **URL:** `wss://api.hyperliquid.xyz/ws`
- **Subscribe:** `{ "method": "subscribe", "subscription": { "type": "l2Book", "coin": "<SYM>" } }`
- **Notes:** Full L2 snapshots every ~0.5s. Levels: `{ px, sz, n }`.

### Extended
- **URL:** `wss://api.starknet.extended.exchange/stream.extended.exchange/v1/orderbooks/<SYM>`
- **Subscribe:** None (symbol in URL)
- **Notes:** SNAPSHOT/DELTA. Snapshot levels `{ p, q }`; delta `{ p, q, c }` (c = new absolute).

### Aster
- **URL:** `wss://fstream.asterdex.com/ws/<SYM>@depth20@100ms`
- **Subscribe:** None (symbol in URL)
- **Notes:** Binance-style. Full snapshot each push. `depthUpdate`: `b`/`a` as `[[price, qty], ...]`.

### Nado
- **URL (subscribe stream):** `wss://gateway.prod.nado.xyz/v1/subscribe`
- **Subscribe:** `{ "method": "subscribe", "stream": { "type": "book_depth", "product_id": <ID> }, "id": 1 }`
- **Snapshot URL:** `wss://gateway.prod.nado.xyz/v1/ws` — send `{ "type": "market_liquidity", "product_id": <ID>, "depth": 50 }` once to get initial state.
- **Notes:** Prices/sizes are x18 fixed-point. Divide by 1e18. Product IDs: BTC=1, ETH=3, SOL=4, etc.

## Symbol Mapping (BTC/USD → per-DEX)

| DEX | BTC/USD | ETH/USD | SOL/USD | Other pairs |
|-----|---------|---------|---------|-------------|
| Pacifica | BTC | ETH | SOL | AVAX, MATIC |
| 01 | BTCUSD | ETHUSD | SOLUSD | — |
| HotStuff | BTC-PERP | ETH-PERP | SOL-PERP | XRP-PERP, HYPE-PERP |
| Paradex | BTC-USD-PERP | ETH-USD-PERP | SOL-USD-PERP | — |
| Hibachi | BTC/USDT-P | ETH/USDT-P | SOL/USDT-P | SUI, XRP, BNB, HYPE |
| Hyperliquid | BTC | ETH | SOL | AVAX, MATIC, SUI, XRP, BNB, HYPE |
| Extended | BTC-USD | ETH-USD | SOL-USD | AVAX-USD |
| Aster | btcusdt | ethusdt | solusdt | avaxusdt, suiusdt, xrpusdt, bnbusdt, hypeusdt |
| Nado | 1 | 3 | 4 | 8=AVAX, 10=XRP |

## Level Format

Each adapter produces levels as `{ p: string, a: string, n?: number }` where:
- `p` = price
- `a` = size/quantity
- `n` = order count (optional, some DEXs omit)
