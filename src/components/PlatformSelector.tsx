import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Wallet, Trophy, ExternalLink, Shield, Zap } from "lucide-react";

interface PlatformSelectorProps {
  selected: string | null;
  onSelect: (platform: string) => void;
}

const platforms = [
  {
    id: "pocketoption",
    name: "Pocket Option",
    description: "Популярная платформа с быстрым выводом",
    logo: "💼",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    features: ["Моментальный вывод", "Демо-счёт", "Турниры"],
    minDeposit: "$10",
    payout: "до 92%",
    rating: 4.8,
  },
  {
    id: "1win",
    name: "1Win",
    description: "Высокие выплаты и бонусы",
    logo: "🏆",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    features: ["Бонус +500%", "Быстрые сделки", "Крипто"],
    minDeposit: "$1",
    payout: "до 95%",
    rating: 4.7,
  },
];

export const PlatformSelector = ({ selected, onSelect }: PlatformSelectorProps) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-display font-bold mb-2">
          Выберите <span className="gradient-text">платформу</span>
        </h2>
        <p className="text-muted-foreground">
          Мы поддерживаем лучшие брокеры для бинарных опционов
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {platforms.map((platform, index) => (
          <motion.button
            key={platform.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            onClick={() => onSelect(platform.id)}
            className={cn(
              "relative group text-left p-6 rounded-2xl transition-all duration-500",
              "bg-card border border-white/5 hover:border-white/10",
              selected === platform.id && "ring-2 ring-primary glow-primary"
            )}
          >
            {/* Background gradient on hover */}
            <div className={cn(
              "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br",
              platform.gradient
            )} />

            {/* Selection indicator */}
            {selected === platform.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center"
              >
                <Check className="w-5 h-5 text-primary-foreground" />
              </motion.div>
            )}

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl",
                  "bg-gradient-to-br",
                  platform.gradient
                )}>
                  {platform.logo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-xl font-bold">{platform.name}</h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground">{platform.description}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={cn(
                        "text-xs",
                        i < Math.floor(platform.rating) ? "text-gold" : "text-muted"
                      )}>
                        ★
                      </span>
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">{platform.rating}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Wallet className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Мин. депозит</span>
                  </div>
                  <p className="font-mono font-bold text-lg">{platform.minDeposit}</p>
                </div>
                <div className="p-3 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Выплата</span>
                  </div>
                  <p className="font-mono font-bold text-lg text-success">{platform.payout}</p>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {platform.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1.5 rounded-lg bg-secondary/50 text-xs font-medium flex items-center gap-1.5"
                  >
                    <Zap className="w-3 h-3 text-primary" />
                    {feature}
                  </span>
                ))}
              </div>

              {/* Security badge */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-4 h-4 text-success" />
                <span>Проверенный брокер • SSL защита</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
