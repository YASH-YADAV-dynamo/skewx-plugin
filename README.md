# SkewX

**Platform of skills** for **accurate, high-performance market data**—built for **trading platforms**, **research**, and **bots**. **Orderbook imbalance** is live (multi-DEX L2, formulas, denoising). Additional modules are described in the plugin metadata (`.claude-plugin/plugin.json`) / `skills/skewx/SKILL.md` when they ship.

**Docs:** from repo root run `npx serve docs -p 3000` and open http://localhost:3000 — static site: `docs/index.html`, `style.css`, `script.js`. Canonical technical detail: `skills/skewx/SKILL.md` + `skills/skewx/reference.md`. See `docs/README.md` for the maintenance map.

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

Or after adding a custom marketplace:

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

For real-time orderbook signals, use the orderbook-imbalance web app.

## License

MIT — see [`LICENSE`](LICENSE) in the repository root.

Privacy summary for the static docs site: [`docs/legal.html`](docs/legal.html).
