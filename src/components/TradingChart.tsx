import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ComposedChart, Customized, ResponsiveContainer, XAxis, YAxis, ReferenceLine } from "recharts";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Activity, Wifi } from "lucide-react";

interface TradingChartProps {
  pair: string;
  /**
   * Optional direction bias to visually align candles with the current signal.
   * This is purely visual (UI), not trading logic.
   */
  signalBias?: "UP" | "DOWN" | null;
  /** Forces chart to re-seed when a new signal is generated */
  syncKey?: number;
}

type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

const seededRandom = (seed: number) => {
  // simple deterministic PRNG (mulberry32)
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const generateInitialCandles = (seed: number, bias: "UP" | "DOWN" | null) => {
  const rand = seededRandom(seed);
  const data: Candle[] = [];
  let price = 1.085 + rand() * 0.01;

  const biasFactor = bias === "UP" ? 0.00003 : bias === "DOWN" ? -0.00003 : 0;

  for (let i = 0; i < 60; i++) {
    const open = price;
    const delta = (rand() - 0.5) * 0.0008 + biasFactor;
    const close = open + delta;
    const wick = 0.00015 + rand() * 0.0002;
    const high = Math.max(open, close) + wick * rand();
    const low = Math.min(open, close) - wick * rand();
    data.push({ time: i, open, high, low, close });
    price = close;
  }
  return data;
};

const getYDomain = (candles: Candle[]) => {
  const lows = candles.map((c) => c.low);
  const highs = candles.map((c) => c.high);
  const min = Math.min(...lows);
  const max = Math.max(...highs);
  const pad = (max - min) * 0.08;
  return [min - pad, max + pad] as const;
};

export const TradingChart = ({ pair, signalBias = null, syncKey = 0 }: TradingChartProps) => {
  const seed = useMemo(() => {
    // stable seed per pair, but changes when syncKey changes
    const base = Array.from(pair).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return base + syncKey * 1000;
  }, [pair, syncKey]);

  const [data, setData] = useState<Candle[]>(() => generateInitialCandles(seed, signalBias));

  useEffect(() => {
    setData(generateInitialCandles(seed, signalBias));
  }, [seed, signalBias]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        if (prev.length === 0) return prev;
        const rand = Math.random;

        const newData = prev.slice(1);
        const last = prev[prev.length - 1];

        const biasFactor = signalBias === "UP" ? 0.00003 : signalBias === "DOWN" ? -0.00003 : 0;
        const open = last.close;
        const delta = (rand() - 0.5) * 0.0009 + biasFactor;
        const close = open + delta;
        const wick = 0.00015 + rand() * 0.0002;
        const high = Math.max(open, close) + wick * rand();
        const low = Math.min(open, close) - wick * rand();

        newData.push({
          time: last.time + 1,
          open,
          high,
          low,
          close,
        });

        return newData;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [signalBias]);

  const { currentPrice, startPrice, isPositive, change, minPrice, maxPrice, domain } = useMemo(() => {
    const current = data[data.length - 1]?.close || 0;
    const start = data[0]?.open || 0;
    const positive = current > start;
    const changePercent = ((current - start) / start) * 100;
    const min = Math.min(...data.map((d) => d.low));
    const max = Math.max(...data.map((d) => d.high));
    const yDomain = getYDomain(data);
    return { currentPrice: current, startPrice: start, isPositive: positive, change: changePercent, minPrice: min, maxPrice: max, domain: yDomain };
  }, [data]);

  const CandleLayer = useMemo(() => {
    const up = "hsl(var(--success))";
    const down = "hsl(var(--destructive))";

    // Recharts passes a lot of props; we only need scales.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function Candles(props: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const xAxis = (Object.values(props?.xAxisMap ?? {})[0] as any) ?? null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const yAxis = (Object.values(props?.yAxisMap ?? {})[0] as any) ?? null;
      if (!xAxis?.scale || !yAxis?.scale) return null;
      const xScale = xAxis.scale;
      const yScale = yAxis.scale;

      const candleWidth = 6;
      const wickWidth = 2;

      return (
        <g>
          {data.map((c) => {
            const x = xScale(c.time);
            const yOpen = yScale(c.open);
            const yClose = yScale(c.close);
            const yHigh = yScale(c.high);
            const yLow = yScale(c.low);
            const isUp = c.close >= c.open;
            const color = isUp ? up : down;
            const bodyY = Math.min(yOpen, yClose);
            const bodyH = Math.max(2, Math.abs(yClose - yOpen));

            return (
              <g key={c.time}>
                {/* Wick */}
                <line
                  x1={x}
                  x2={x}
                  y1={yHigh}
                  y2={yLow}
                  stroke={color}
                  strokeWidth={wickWidth}
                  strokeOpacity={0.9}
                />
                {/* Body */}
                <rect
                  x={x - candleWidth / 2}
                  y={bodyY}
                  width={candleWidth}
                  height={bodyH}
                  fill={color}
                  fillOpacity={0.75}
                  rx={2}
                />
              </g>
            );
          })}
        </g>
      );
    };
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-2xl font-bold">{pair}</h3>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/20 text-success text-xs">
                  <Wifi className="w-3 h-3" />
                  LIVE
                </span>
              </div>
              <p className="text-sm text-muted-foreground">График в реальном времени</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <p className="font-mono text-3xl font-bold">{currentPrice.toFixed(5)}</p>
              <Activity className={cn(
                "w-5 h-5 animate-pulse",
                isPositive ? "text-success" : "text-destructive"
              )} />
            </div>
            <div className={cn(
              "flex items-center gap-1 justify-end text-sm font-semibold",
              isPositive ? "text-success" : "text-destructive"
            )}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {isPositive ? "+" : ""}{change.toFixed(3)}%
            </div>
          </div>
        </div>

        {/* Mini stats */}
        <div className="flex gap-4 mt-4">
          <div className="flex-1 p-3 rounded-xl bg-secondary/30">
            <p className="text-xs text-muted-foreground mb-1">Макс</p>
            <p className="font-mono font-semibold text-success">{maxPrice.toFixed(5)}</p>
          </div>
          <div className="flex-1 p-3 rounded-xl bg-secondary/30">
            <p className="text-xs text-muted-foreground mb-1">Мин</p>
            <p className="font-mono font-semibold text-destructive">{minPrice.toFixed(5)}</p>
          </div>
          <div className="flex-1 p-3 rounded-xl bg-secondary/30">
            <p className="text-xs text-muted-foreground mb-1">Спред</p>
            <p className="font-mono font-semibold">0.00012</p>
          </div>
        </div>
      </div>
      
      {/* Chart */}
      <div className="h-[280px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 6, right: 8, left: 8, bottom: 6 }}>
            <XAxis dataKey="time" hide />
            <YAxis domain={domain as unknown as [number, number]} hide />
            <ReferenceLine y={startPrice} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.35} strokeDasharray="3 3" />
            <Customized component={CandleLayer} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
