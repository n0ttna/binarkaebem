import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  User, 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target, 
  Flame,
  Calendar,
  DollarSign,
  BarChart3,
  Settings,
  Bell,
  Shield,
  Crown,
  Star,
  Zap,
  ChevronRight,
  Copy,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const stats = [
  { label: "Всего сделок", value: "1,247", icon: BarChart3, color: "text-primary" },
  { label: "Успешных", value: "1,087", icon: TrendingUp, color: "text-success" },
  { label: "Убыточных", value: "160", icon: TrendingDown, color: "text-destructive" },
  { label: "Винрейт", value: "87.2%", icon: Target, color: "text-gold" },
];

const recentSignals = [
  { pair: "EUR/USD", direction: "UP", result: "win", profit: "+$45", time: "2 мин назад" },
  { pair: "GBP/USD", direction: "DOWN", result: "win", profit: "+$32", time: "15 мин назад" },
  { pair: "BTC/USD", direction: "UP", result: "loss", profit: "-$50", time: "28 мин назад" },
  { pair: "USD/JPY", direction: "UP", result: "win", profit: "+$67", time: "45 мин назад" },
  { pair: "XAU/USD", direction: "DOWN", result: "win", profit: "+$89", time: "1 час назад" },
];

const achievements = [
  { name: "Первая победа", icon: "🏆", unlocked: true },
  { name: "10 побед подряд", icon: "🔥", unlocked: true },
  { name: "Заработал $1000", icon: "💰", unlocked: true },
  { name: "100 сделок", icon: "📊", unlocked: true },
  { name: "Pro трейдер", icon: "👑", unlocked: false },
  { name: "Легенда", icon: "⭐", unlocked: false },
];

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "settings">("overview");
  const [copied, setCopied] = useState(false);

  const handleCopyRef = () => {
    navigator.clipboard.writeText("SIGNALPRO-VIP847");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg z-50 overflow-hidden"
          >
            <div className="h-full glass-strong border-l border-white/10 flex flex-col">
              {/* Header */}
              <div className="relative p-6 border-b border-white/5">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Profile card */}
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent via-primary to-success flex items-center justify-center text-3xl font-bold">
                      VP
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gold flex items-center justify-center border-2 border-card">
                      <Crown className="w-4 h-4 text-gold-foreground" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-display font-bold">VIP Pro Trader</h2>
                      <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-xs font-semibold">
                        PREMIUM
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">viptrader@email.com</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">С нами с 12 января 2024</span>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mt-6">
                  {[
                    { id: "overview", label: "Обзор", icon: User },
                    { id: "history", label: "История", icon: Clock },
                    { id: "settings", label: "Настройки", icon: Settings },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeTab === "overview" && (
                  <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {stats.map((stat) => (
                        <div key={stat.label} className="p-4 rounded-xl bg-secondary/30">
                          <div className="flex items-center gap-2 mb-2">
                            <stat.icon className={cn("w-4 h-4", stat.color)} />
                            <span className="text-xs text-muted-foreground">{stat.label}</span>
                          </div>
                          <p className="font-mono text-2xl font-bold">{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Balance Card */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-primary" />
                          <span className="text-sm text-muted-foreground">Общая прибыль</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-xs font-semibold">
                          +12.4% сегодня
                        </span>
                      </div>
                      <p className="font-mono text-4xl font-bold text-success mb-2">$4,567.89</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">Сегодня: <span className="text-success font-medium">+$234</span></span>
                        <span className="text-muted-foreground">Неделя: <span className="text-success font-medium">+$1,456</span></span>
                      </div>
                    </div>

                    {/* Streak */}
                    <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                          <Flame className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                          <p className="font-semibold">Серия побед: 7 🔥</p>
                          <p className="text-sm text-muted-foreground">Ваш лучший результат: 12 побед подряд</p>
                        </div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-gold" />
                        Достижения
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {achievements.map((ach) => (
                          <div
                            key={ach.name}
                            className={cn(
                              "p-3 rounded-xl text-center transition-all",
                              ach.unlocked 
                                ? "bg-secondary/50" 
                                : "bg-secondary/20 opacity-50"
                            )}
                          >
                            <span className="text-2xl block mb-1">{ach.icon}</span>
                            <p className="text-xs">{ach.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Referral */}
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-primary" />
                          <span className="font-semibold">Ваш реферальный код</span>
                        </div>
                        <span className="text-xs text-muted-foreground">3 приглашения</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 px-4 py-2 rounded-lg bg-secondary/50 font-mono text-sm">
                          SIGNALPRO-VIP847
                        </code>
                        <button
                          onClick={handleCopyRef}
                          className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                        >
                          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "history" && (
                  <div className="space-y-3">
                    <h3 className="font-semibold mb-3">Последние сигналы</h3>
                    {recentSignals.map((signal, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-4 rounded-xl bg-secondary/30 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center",
                            signal.result === "win" ? "bg-success/20" : "bg-destructive/20"
                          )}>
                            {signal.direction === "UP" ? (
                              <TrendingUp className={cn("w-5 h-5", signal.result === "win" ? "text-success" : "text-destructive")} />
                            ) : (
                              <TrendingDown className={cn("w-5 h-5", signal.result === "win" ? "text-success" : "text-destructive")} />
                            )}
                          </div>
                          <div>
                            <p className="font-mono font-semibold">{signal.pair}</p>
                            <p className="text-xs text-muted-foreground">{signal.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={cn(
                            "font-mono font-bold",
                            signal.result === "win" ? "text-success" : "text-destructive"
                          )}>
                            {signal.profit}
                          </p>
                          <p className={cn(
                            "text-xs",
                            signal.result === "win" ? "text-success" : "text-destructive"
                          )}>
                            {signal.result === "win" ? "Победа" : "Убыток"}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-3">
                    {[
                      { icon: Bell, label: "Уведомления", desc: "Push-уведомления о сигналах" },
                      { icon: Shield, label: "Безопасность", desc: "Двухфакторная аутентификация" },
                      { icon: Star, label: "Подписка", desc: "Premium до 15 марта 2025" },
                      { icon: Settings, label: "Приложение", desc: "Язык, тема, звуки" },
                    ].map((item, i) => (
                      <button
                        key={i}
                        className="w-full p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/5">
                <button className="w-full py-3 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors font-medium">
                  Выйти из аккаунта
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
