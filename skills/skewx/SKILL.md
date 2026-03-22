---
name: skewx
description: SkewX platform skill—accurate, high-performance market data for trading platforms, research, and bots. Live: orderbook imbalance (multi-DEX WebSockets, distance-weighted formula, 5-stage noise reduction). More skills coming soon.
---

# SkewX (orderbook imbalance — live)

Part of the **SkewX** platform: build DEX connectors, compute noise-reduced imbalance, and interpret cross-DEX spread for platforms, research, and bots. Additional modules (trades, funding, etc.) will follow the same standards.

## WebSocket Connection Details

For full WebSocket URLs, subscribe message formats, and symbol mapping per DEX, see [reference.md](reference.md).

**DEXes covered:** Pacifica, 01 Exchange, HotStuff, Paradex, Hibachi, Hyperliquid, Extended, Aster, Nado.

## Primary Formula: Distance-Weighted Imbalance

The main formula (noise-reduced only):

```
I = (Σ B_i·e^(-λ·d_i) - Σ A_i·e^(-λ·d_i)) / (Σ B_i·e^(-λ·d_i) + Σ A_i·e^(-λ·d_i))
```

Where:
- `d_i` = fractional distance from mid: `|p_i - mid| / mid`
- `mid` = (best_bid + best_ask) / 2
- `λ` (lambda) = decay rate (typical 10). Near-mid levels weigh more.
- `B_i`, `A_i` = bid/ask size at level i

Output range: **[-1, 1]**. Positive = buy pressure, negative = sell pressure.

## 5-Stage Noise Reduction

Apply this pipeline to raw imbalance for cleaner signals:

1. **Spike filter** — If `|value - prev| > 0.3`, replace with median of last 5 samples
2. **EMA** — Exponential moving average, 1s half-life
3. **Kalman filter** — Process noise 0.01, measurement noise 0.1
4. **Robust mean** — Median of last 15 Kalman outputs
5. **Regime** — From smoothed history std: stable (σ<0.02), trending (σ<0.08), volatile (σ≥0.08)

Confidence: stable=1, trending=0.8, volatile=0.5.

## Usefulness for Bots

- **Cross-DEX spread:** Compare imbalance across venues. Divergent imbalances = arbitrage opportunity.
- **Directional signal:** Sustained positive imbalance → short-term bullish bias; negative → bearish.
- **Liquidity mapping:** Identify support/resistance zones, thin vs thick levels.
- **Order flow context:** Distinguish passive resting liquidity from aggressive directional intent.

## Live Data

For real-time orderbook comparison across DEXes, use the orderbook-imbalance web app (WebSocket feeds). This skill provides the methodology so you can implement your own connectors and calculations.
