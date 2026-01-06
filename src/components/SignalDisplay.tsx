import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, Loader2, RefreshCw, Target, Clock, Sparkles } from "lucide-react";
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
  const [analysisStep, setAnalysisStep] = useState(0);

  const analysisSteps = [
    "Подключение к серверу...",
    "Анализ тренда...",
    "Проверка индикаторов...",
    "Расчёт вероятности...",
    "Генерация сигнала...",
  ];

  useEffect(() => {
    setLoading(true);
    setSignal(null);
    setAnalysisStep(0);

    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < analysisSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 500);

    const timer = setTimeout(() => {
      clearInterval(stepInterval);
      const randomSignal: SignalType = Math.random() > 0.5 ? "UP" : "DOWN";
      const randomConfidence = Math.floor(78 + Math.random() * 18);
      setSignal(randomSignal);
      setConfidence(randomConfidence);
      setLoading(false);
      setCountdown(expiration);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(stepInterval);
    };
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

  const refreshSignal = () => {
    setLoading(true);
    setSignal(null);
    setAnalysisStep(0);

    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < analysisSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 500);

    setTimeout(() => {
      clearInterval(stepInterval);
      const randomSignal: SignalType = Math.random() > 0.5 ? "UP" : "DOWN";
      const randomConfidence = Math.floor(78 + Math.random() * 18);
      setSignal(randomSignal);
      setConfidence(randomConfidence);
      setLoading(false);
      setCountdown(expiration);
    }, 2500);
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-strong rounded-2xl p-8"
      >
        <div className="flex flex-col items-center justify-center min-h-[320px]">
          <div className="relative mb-8">
            <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
          </div>

          <div className="space-y-3 w-full max-w-xs">
            {analysisSteps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: index <= analysisStep ? 1 : 0.3,
                  x: 0 
                }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors",
                  index < analysisStep ? "bg-success text-success-foreground" :
                  index === analysisStep ? "bg-primary text-primary-foreground animate-pulse" :
                  "bg-muted text-muted-foreground"
                )}>
                  {index < analysisStep ? "✓" : index + 1}
                </div>
                <span className={cn(
                  "text-sm transition-colors",
                  index <= analysisStep ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="signal"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="space-y-4"
      >
        {/* Main Signal Card */}
        <div
          className={cn(
            "relative rounded-2xl p-8 overflow-hidden",
            signal === "UP" ? "bg-success/5" : "bg-destructive/5"
          )}
        >
          {/* Glow effect */}
          <div className={cn(
            "absolute inset-0 opacity-30",
            signal === "UP" ? "glow-success" : "glow-danger"
          )} />

          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn(
              "w-40 h-40 rounded-full absolute animate-pulse-ring",
              signal === "UP" ? "bg-success/20" : "bg-destructive/20"
            )} />
            <div className={cn(
              "w-32 h-32 rounded-full absolute animate-pulse-ring",
              signal === "UP" ? "bg-success/30" : "bg-destructive/30"
            )} style={{ animationDelay: "0.5s" }} />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Signal Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className={cn(
                "w-28 h-28 rounded-full flex items-center justify-center mb-6 animate-signal-glow",
                signal === "UP" 
                  ? "bg-gradient-to-br from-success to-emerald-600 glow-success" 
                  : "bg-gradient-to-br from-destructive to-red-600 glow-danger"
              )}
            >
              {signal === "UP" ? (
                <ArrowUp className="w-14 h-14 text-white" strokeWidth={3} />
              ) : (
                <ArrowDown className="w-14 h-14 text-white" strokeWidth={3} />
              )}
            </motion.div>

            {/* Signal Text */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "font-display text-5xl font-bold mb-4 text-glow",
                signal === "UP" ? "text-success" : "text-destructive"
              )}
            >
              {signal === "UP" ? "CALL ↑" : "PUT ↓"}
            </motion.h2>

            {/* Confidence */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">Уверенность сигнала</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-48 h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence}%` }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className={cn(
                      "h-full rounded-full",
                      signal === "UP" 
                        ? "bg-gradient-to-r from-success to-emerald-400" 
                        : "bg-gradient-to-r from-destructive to-red-400"
                    )}
                  />
                </div>
                <span className="font-mono text-2xl font-bold">{confidence}%</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Timer Card */}
        {countdown > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Время до экспирации</p>
                <p className="font-mono text-2xl font-bold text-primary">{formatTime(countdown)}</p>
              </div>
            </div>
            
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: `${(countdown / expiration) * 100}%` }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </motion.div>
        )}

        {/* Refresh Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={refreshSignal}
          className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg transition-all duration-300 hover:opacity-90 glow-primary flex items-center justify-center gap-2 group"
        >
          <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          Получить новый сигнал
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};
