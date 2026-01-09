import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, RefreshCw, Target, Clock, Sparkles, Lock, AlertTriangle, CheckCircle2 } from "lucide-react";
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
  const [canRefresh, setCanRefresh] = useState(false);
  const [signalResult, setSignalResult] = useState<"pending" | "win" | "loss" | null>(null);

  const analysisSteps = [
    { label: "Подключение к серверу...", icon: "🔗" },
    { label: "Синхронизация графика...", icon: "📊" },
    { label: "Анализ свечного паттерна...", icon: "🕯️" },
    { label: "Проверка индикаторов RSI, MACD...", icon: "📈" },
    { label: "Анализ объёмов...", icon: "📉" },
    { label: "Расчёт вероятности...", icon: "🎯" },
    { label: "Генерация сигнала...", icon: "✨" },
  ];

  const generateSignal = useCallback(() => {
    setLoading(true);
    setSignal(null);
    setAnalysisStep(0);
    setCanRefresh(false);
    setSignalResult(null);

    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < analysisSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 400);

    const timer = setTimeout(() => {
      clearInterval(stepInterval);
      const randomSignal: SignalType = Math.random() > 0.5 ? "UP" : "DOWN";
      const randomConfidence = Math.floor(78 + Math.random() * 18);
      setSignal(randomSignal);
      setConfidence(randomConfidence);
      setLoading(false);
      setCountdown(expiration);
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearInterval(stepInterval);
    };
  }, [expiration, analysisSteps.length]);

  useEffect(() => {
    const cleanup = generateSignal();
    return cleanup;
  }, [platform, pair, expiration, generateSignal]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanRefresh(true);
            // Simulate result
            setSignalResult(Math.random() > 0.2 ? "win" : "loss");
            return 0;
          }
          return prev - 1;
        });
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card rounded-3xl p-8 relative overflow-hidden"
      >
        {/* Background animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/30 rounded-full blur-[100px] animate-pulse" />
        </div>

        <div className="relative flex flex-col items-center justify-center min-h-[380px]">
          {/* Spinner */}
          <div className="relative mb-10">
            <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              </div>
            </div>
          </div>

          {/* Analysis steps */}
          <div className="space-y-3 w-full max-w-sm">
            {analysisSteps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: index <= analysisStep ? 1 : 0.3,
                  x: 0 
                }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-all duration-300",
                  index < analysisStep 
                    ? "bg-success/20 text-success" 
                    : index === analysisStep 
                    ? "bg-primary/20 text-primary animate-pulse" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {index < analysisStep ? "✓" : step.icon}
                </div>
                <span className={cn(
                  "text-sm transition-colors font-medium",
                  index <= analysisStep ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.label}
                </span>
                {index === analysisStep && (
                  <div className="ml-auto flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                )}
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
        <div className={cn(
          "relative rounded-3xl p-8 overflow-hidden glass-card",
          signalResult === "win" && "ring-2 ring-success/50",
          signalResult === "loss" && "ring-2 ring-destructive/50"
        )}>
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[80px] transition-colors duration-500",
              signal === "UP" ? "bg-success/20" : "bg-destructive/20"
            )} />
          </div>

          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={cn(
              "w-48 h-48 rounded-full absolute animate-pulse-ring opacity-30",
              signal === "UP" ? "bg-success" : "bg-destructive"
            )} />
            <div className={cn(
              "w-36 h-36 rounded-full absolute animate-pulse-ring opacity-40",
              signal === "UP" ? "bg-success" : "bg-destructive"
            )} style={{ animationDelay: "0.5s" }} />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Result badge */}
            {signalResult && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2",
                  signalResult === "win" 
                    ? "bg-success text-white glow-success" 
                    : "bg-destructive text-white glow-danger"
                )}
              >
                {signalResult === "win" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    ПОБЕДА! +$50
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4" />
                    Убыток -$50
                  </>
                )}
              </motion.div>
            )}

            {/* Signal Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12, stiffness: 100 }}
              className={cn(
                "w-32 h-32 rounded-full flex items-center justify-center mb-6",
                signal === "UP" 
                  ? "bg-gradient-to-br from-success via-emerald-500 to-green-600 glow-success" 
                  : "bg-gradient-to-br from-destructive via-red-500 to-rose-600 glow-danger",
                !signalResult && "animate-signal-glow"
              )}
            >
              <div className="absolute inset-2 rounded-full bg-gradient-to-t from-black/30 to-transparent" />
              {signal === "UP" ? (
                <ArrowUp className="w-16 h-16 text-white relative z-10 drop-shadow-lg" strokeWidth={3} />
              ) : (
                <ArrowDown className="w-16 h-16 text-white relative z-10 drop-shadow-lg" strokeWidth={3} />
              )}
            </motion.div>

            {/* Signal Text */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "text-5xl font-black mb-2 tracking-tight",
                signal === "UP" ? "text-success text-glow" : "text-destructive text-glow"
              )}
            >
              {signal === "UP" ? "CALL ↑" : "PUT ↓"}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground mb-6"
            >
              {signal === "UP" ? "Ставьте на повышение" : "Ставьте на понижение"}
            </motion.p>

            {/* Confidence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Target className="w-4 h-4" />
                  <span>Уверенность</span>
                </div>
                <span className="font-mono text-2xl font-bold">{confidence}%</span>
              </div>
              
              <div className="h-3 bg-muted/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence}%` }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                  className={cn(
                    "h-full rounded-full",
                    signal === "UP" 
                      ? "bg-gradient-to-r from-success to-emerald-400" 
                      : "bg-gradient-to-r from-destructive to-red-400"
                  )}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Timer Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={cn(
            "glass-card rounded-2xl p-5",
            countdown === 0 && "opacity-60"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                countdown > 0 ? "bg-primary/20" : "bg-muted"
              )}>
                <Clock className={cn(
                  "w-6 h-6",
                  countdown > 0 ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {countdown > 0 ? "До экспирации осталось" : "Время истекло"}
                </p>
                <p className={cn(
                  "font-mono text-3xl font-bold",
                  countdown > 0 ? "text-primary" : "text-muted-foreground"
                )}>
                  {formatTime(countdown)}
                </p>
              </div>
            </div>
            
            {/* Progress ring */}
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-muted/30"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className={countdown > 0 ? "text-primary" : "text-muted"}
                  initial={{ strokeDasharray: "176 176", strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: 176 - (countdown / expiration) * 176 }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                {Math.round((countdown / expiration) * 100)}%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Refresh Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={canRefresh ? generateSignal : undefined}
          disabled={!canRefresh}
          className={cn(
            "w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300",
            canRefresh 
              ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground glow-primary hover:opacity-90 cursor-pointer interactive-scale" 
              : "glass-button text-muted-foreground cursor-not-allowed"
          )}
        >
          {canRefresh ? (
            <>
              <RefreshCw className="w-5 h-5" />
              Получить новый сигнал
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Дождитесь окончания сигнала ({formatTime(countdown)})
            </>
          )}
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};
