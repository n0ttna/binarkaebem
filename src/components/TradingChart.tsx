import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, ReferenceLine } from "recharts";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Activity, Wifi } from "lucide-react";

interface TradingChartProps {
  pair: string;
}

const generateInitialData = () => {
  const data = [];
  let price = 1.0850 + Math.random() * 0.01;
  
  for (let i = 0; i < 60; i++) {
    const change = (Math.random() - 0.5) * 0.0005;
    price += change;
    data.push({
      time: i,
      price: price,
      volume: Math.random() * 100,
    });
  }
  return data;
};

export const TradingChart = ({ pair }: TradingChartProps) => {
  const [data, setData] = useState(generateInitialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)];
        const lastPrice = prev[prev.length - 1].price;
        const newPrice = lastPrice + (Math.random() - 0.5) * 0.0008;
        newData.push({
          time: prev[prev.length - 1].time + 1,
          price: newPrice,
          volume: Math.random() * 100,
        });
        return newData;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const { currentPrice, startPrice, isPositive, change, minPrice, maxPrice } = useMemo(() => {
    const current = data[data.length - 1]?.price || 0;
    const start = data[0]?.price || 0;
    const positive = current > start;
    const changePercent = ((current - start) / start) * 100;
    const min = Math.min(...data.map(d => d.price));
    const max = Math.max(...data.map(d => d.price));
    return { currentPrice: current, startPrice: start, isPositive: positive, change: changePercent, minPrice: min, maxPrice: max };
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
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="colorPriceUp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(145, 70%, 42%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(145, 70%, 42%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPriceDown" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0, 75%, 50%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(0, 75%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" hide />
            <YAxis domain={['dataMin - 0.0003', 'dataMax + 0.0003']} hide />
            <ReferenceLine y={startPrice} stroke="hsl(225, 15%, 30%)" strokeDasharray="3 3" />
            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "hsl(145, 70%, 42%)" : "hsl(0, 75%, 50%)"}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={isPositive ? "url(#colorPriceUp)" : "url(#colorPriceDown)"}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
