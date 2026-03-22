# SkewX — Orderbook Imbalance for DEX Bots

Orderbook imbalance for DEX bots. WebSocket URLs, subscribe formats, noise-reduced formulas. Cross-DEX spread data for comparison and arbitrage.

## Quick commands

| Action | Command |
|--------|---------|
| Install plugin | `@skewx` or `/plugin install skewx@claude-plugins-official` |
| Invoke skill | `@skewx` or `/skewx:skewx` |
| Ask about orderbooks | Ask about orderbook data, DEX connectors, imbalance formulas, or cross-DEX arbitrage — Claude auto-invokes SkewX |

## Install

Add this marketplace (if distributing via custom marketplace), or install from the Anthropic skills platform:

```bash
/plugin install skewx@claude-plugins-official
```

Or after adding a custom marketplace from GitHub:

```bash
/plugin install skewx@your-marketplace
```

## Usage

- **Invoke directly:** `@skewx` or `/skewx:skewx`
- **Automatic:** Claude uses the skill when you ask about orderbook data, DEX connectors, imbalance formulas, or cross-DEX arbitrage.

## What it provides

- **WebSocket URLs** for Pacifica, 01, HotStuff, Paradex, Hibachi, Hyperliquid, Extended, Aster, Nado
- **Subscribe message formats** per DEX
- **Symbol mapping** (e.g. BTC/USD → per-DEX symbols)
- **Distance-weighted imbalance** formula
- **5-stage noise reduction** pipeline
- **Cross-DEX use cases** for bots (spread comparison, arbitrage, liquidity mapping)

## Live data

For real-time orderbook signals, use the [orderbook-imbalance web app](https://github.com/your-username/orderbook-imbalance-indicator).
