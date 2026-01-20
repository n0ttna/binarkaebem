import { motion } from "framer-motion";
import { TrendingUp, Award, Users, Clock, Zap, Shield } from "lucide-react";
import { useDynamicStats } from "@/hooks/useDynamicStats";
import { useI18n } from "@/lib/i18n";

export const QuickStats = () => {
  const { onlineCount, signalsCount, profit, winRate } = useDynamicStats();
  const { t } = useI18n();

  const stats = [
    {
      icon: TrendingUp,
      label: "Win Rate",
      value: `${winRate}%`,
      color: "text-success",
      bg: "from-success/20 to-success/5",
    },
    {
      icon: Zap,
      label: "Сигналов",
      value: signalsCount.toLocaleString(),
      color: "text-primary",
      bg: "from-primary/20 to-primary/5",
    },
    {
      icon: Users,
      label: "Онлайн",
      value: onlineCount.toLocaleString(),
      color: "text-accent",
      bg: "from-accent/20 to-accent/5",
    },
    {
      icon: Award,
      label: "Профит",
      value: `+$${profit.toLocaleString()}`,
      color: "text-gold",
      bg: "from-gold/20 to-gold/5",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.03 }}
          className="glass-card p-3 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </div>
          <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};