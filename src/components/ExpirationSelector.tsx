import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Clock, Zap, Timer, Hourglass } from "lucide-react";

interface ExpirationSelectorProps {
  selected: number | null;
  onSelect: (time: number) => void;
}

const expirationTimes = [
  { value: 30, label: "30 сек", icon: Zap, category: "turbo", description: "Турбо" },
  { value: 60, label: "1 мин", icon: Zap, category: "turbo", description: "Турбо" },
  { value: 120, label: "2 мин", icon: Timer, category: "short", description: "Короткие" },
  { value: 180, label: "3 мин", icon: Timer, category: "short", description: "Короткие" },
  { value: 300, label: "5 мин", icon: Clock, category: "medium", description: "Средние" },
  { value: 600, label: "10 мин", icon: Clock, category: "medium", description: "Средние" },
  { value: 900, label: "15 мин", icon: Hourglass, category: "long", description: "Длинные" },
  { value: 1800, label: "30 мин", icon: Hourglass, category: "long", description: "Длинные" },
];

const categoryColors = {
  turbo: "from-orange-500 to-red-500",
  short: "from-yellow-500 to-orange-500",
  medium: "from-green-500 to-emerald-500",
  long: "from-blue-500 to-indigo-500",
};

export const ExpirationSelector = ({ selected, onSelect }: ExpirationSelectorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold mb-2">
          Время <span className="gradient-text">экспирации</span>
        </h2>
        <p className="text-muted-foreground">
          Выберите время закрытия сделки
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {expirationTimes.map((time, index) => {
          const Icon = time.icon;
          return (
            <motion.button
              key={time.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelect(time.value)}
              className={cn(
                "relative p-5 rounded-2xl bg-card border border-white/5 hover:border-white/10 transition-all group overflow-hidden",
                selected === time.value && "ring-2 ring-primary glow-primary"
              )}
            >
              {/* Gradient background on hover */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br",
                categoryColors[time.category as keyof typeof categoryColors]
              )} />

              <div className="relative z-10">
                {/* Icon */}
                <div className={cn(
                  "w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center bg-gradient-to-br",
                  categoryColors[time.category as keyof typeof categoryColors]
                )}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Time */}
                <p className="font-display text-2xl font-bold mb-1">{time.label}</p>
                
                {/* Category label */}
                <p className="text-xs text-muted-foreground">{time.description}</p>
              </div>

              {/* Selection indicator */}
              {selected === time.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <span className="text-primary-foreground text-xs">✓</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Info cards */}
      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-orange-500" />
            <div>
              <p className="font-medium text-sm">Турбо опционы (30с - 1м)</p>
              <p className="text-xs text-muted-foreground">Высокий риск, быстрый результат</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-medium text-sm">Средние опционы (5-10м)</p>
              <p className="text-xs text-muted-foreground">Оптимальный баланс риск/прибыль</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
