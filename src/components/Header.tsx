import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Globe,
  Users,
  BarChart3,
  Clock,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { useDynamicStats } from "@/hooks/useDynamicStats";
import { useI18n } from "@/lib/i18n";

interface HeaderProps {
  onLogoClick?: () => void;
}

export const Header = ({ onLogoClick }: HeaderProps) => {
  const [time, setTime] = useState(new Date());
  const { prices } = useCryptoPrices();
  const { onlineCount, signalsCount, profit, winRate } = useDynamicStats();
  const { t } = useI18n();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString("ru-RU");
  };

  return (
    <header className="relative z-50">
      {/* Top ticker bar */}
      <div className="bg-background/60 backdrop-blur-xl border-b border-border/50 overflow-hidden">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 md:gap-6 py-2 px-4">
            {/* Online indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-xs shrink-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <Users className="w-3 h-3 text-muted-foreground hidden sm:block" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">{formatNumber(onlineCount)}</span>
                <span className="hidden sm:inline"> {t("header.online")}</span>
              </span>
            </motion.div>

            {/* Market ticker - scrollable on mobile */}
            <div className="flex-1 flex items-center gap-4 md:gap-8 overflow-x-auto scrollbar-hide">
              {prices.map((item, i) => (
                <motion.div
                  key={item.pair}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 md:gap-3 text-xs whitespace-nowrap group shrink-0"
                >
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">{item.pair}</span>
                  <span className="font-mono font-semibold">${item.price}</span>
                  <span className={cn(
                    "flex items-center gap-1 font-medium px-1.5 py-0.5 rounded-md",
                    item.up ? "text-success bg-success/10" : "text-destructive bg-destructive/10"
                  )}>
                    {item.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {item.up ? "+" : ""}{item.change}%
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Status */}
            <div className="hidden md:flex items-center gap-3 text-xs shrink-0">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-success/10 text-success">
                <Globe className="w-3 h-3" />
                <span className="font-medium">{t("header.marketOpen")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span className="font-mono">
                  {time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="glass-panel border-b border-border/50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo & Brand - Clickable */}
            <motion.button 
              onClick={onLogoClick}
              className="flex items-center gap-3 cursor-pointer shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center glow-primary overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-white relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                </div>
              </div>
              
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                  <span className="gradient-text">SignalPro</span>
                </h1>
                <p className="text-[10px] md:text-xs text-muted-foreground">
                  {t("header.tagline")}
                </p>
              </div>
            </motion.button>

            {/* Center Stats - Desktop only */}
            <motion.div 
              className="hidden lg:flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass-card rounded-2xl p-3 flex items-center gap-4 xl:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">{t("header.winrate")}</p>
                    <p className="font-mono text-base font-bold text-success">{winRate}%</p>
                  </div>
                </div>
                
                <div className="w-px h-8 bg-border" />
                
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">{t("header.signalsToday")}</p>
                    <p className="font-mono text-base font-bold">{formatNumber(signalsCount)}</p>
                  </div>
                </div>
                
                <div className="w-px h-8 bg-border" />
                
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">{t("header.profit")}</p>
                    <p className="font-mono text-base font-bold text-success">+${formatNumber(profit)}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Actions - Theme & Language */}
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ThemeToggle />
              <LanguageSelector />
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};
