import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, TrendingUp, TrendingDown, Sparkles, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";

interface SignalNotificationProps {
  signal: 'UP' | 'DOWN' | null;
  pair: string;
  onDismiss?: () => void;
}

export const SignalNotification = ({ signal, pair, onDismiss }: SignalNotificationProps) => {
  const { isTelegram, hapticFeedback } = useTelegramWebApp();
  const [show, setShow] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (signal) {
      setShow(true);
      
      // Haptic feedback для Telegram
      if (isTelegram) {
        hapticFeedback('success');
      }

      // Авто-скрытие через 5 секунд
      const timer = setTimeout(() => {
        setShow(false);
        onDismiss?.();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [signal, isTelegram, hapticFeedback, onDismiss]);

  return (
    <AnimatePresence>
      {show && signal && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] max-w-sm w-full mx-4"
        >
          <div className={cn(
            "glass-card p-4 rounded-2xl border-2 flex items-center gap-4 shadow-2xl",
            signal === 'UP' 
              ? "border-success/50 bg-success/10" 
              : "border-destructive/50 bg-destructive/10"
          )}>
            <div className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center",
              signal === 'UP' 
                ? "bg-success/20" 
                : "bg-destructive/20"
            )}>
              {signal === 'UP' ? (
                <TrendingUp className="w-8 h-8 text-success" />
              ) : (
                <TrendingDown className="w-8 h-8 text-destructive" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Новый сигнал
                </span>
              </div>
              <p className="text-lg font-bold">
                {pair} — {signal === 'UP' ? '📈 ВВЕРХ' : '📉 ВНИЗ'}
              </p>
            </div>

            <button 
              onClick={() => { setShow(false); onDismiss?.(); }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};