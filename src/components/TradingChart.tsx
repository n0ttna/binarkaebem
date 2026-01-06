import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface TradingChartProps {
  pair: string;
}

const generateInitialData = () => {
  const data = [];
  let price = 1.0850 + Math.random() * 0.01;
  
  for (let i = 0; i < 50; i++) {
    price += (Math.random() - 0.5) * 0.0005;
    data.push({
      time: i,
      price: price,
    });
  }
  return data;
};

export const TradingChart = ({ pair }: TradingChartProps) => {
  const [data, setData] = useState(generateInitialData);
  const [isPositive, setIsPositive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)];
        const lastPrice = prev[prev.length - 1].price;
        const newPrice = lastPrice + (Math.random() - 0.5) * 0.0008;
        newData.push({
          time: prev[prev.length - 1].time + 1,
          price: newPrice,
        });
        setIsPositive(newPrice > prev[0].price);
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentPrice = data[data.length - 1]?.price || 0;
  const startPrice = data[0]?.price || 0;
  const change = ((currentPrice - startPrice) / startPrice) * 100;

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-xl font-bold">{pair}</h3>
          <p className="text-muted-foreground text-sm">Живой график</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl font-bold">{currentPrice.toFixed(5)}</p>
          <p className={cn(
            "text-sm font-semibold",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? "+" : ""}{change.toFixed(3)}%
          </p>
        </div>
      </div>
      
      <div className="h-[200px] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="5%" 
                  stopColor={isPositive ? "hsl(142, 76%, 45%)" : "hsl(0, 85%, 55%)"} 
                  stopOpacity={0.3}
                />
                <stop 
                  offset="95%" 
                  stopColor={isPositive ? "hsl(142, 76%, 45%)" : "hsl(0, 85%, 55%)"} 
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" hide />
            <YAxis domain={['dataMin - 0.0002', 'dataMax + 0.0002']} hide />
            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "hsl(142, 76%, 45%)" : "hsl(0, 85%, 55%)"}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
