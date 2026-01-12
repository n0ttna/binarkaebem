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
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "./LanguageSelector";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { useI18n } from "@/lib/i18n";

interface HeaderProps {
  onLogoClick?: () => void;
}

export const Header = ({ onLogoClick }: HeaderProps) => {
  const [time, setTime] = useState(new Date());
  const { prices, signalsCount } = useCryptoPrices();
  const { t } = useI18n();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative z-50">
      {/* Top ticker bar */}
      <div className="bg-background/60 backdrop-blur-xl border-b border-white/5 overflow-hidden">
        <div className="container mx-auto">
          <div className="flex items-center gap-6 py-2 px-4">
            {/* Online indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <Users className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">12,847</span> {t("header.online")}
              </span>
            </motion.div>

            {/* Market ticker */}
            <div className="flex-1 flex items-center gap-8 overflow-x-auto scrollbar-hide">
              {prices.map((item, i) => (
                <motion.div
                  key={item.pair}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-xs whitespace-nowrap group"
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
            <div className="hidden md:flex items-center gap-3 text-xs">
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
      <div className="glass-panel border-b border-white/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand - Clickable */}
            <motion.button 
              onClick={onLogoClick}
              className="flex items-center gap-4 cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                
                {/* Logo container */}
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center glow-primary overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <Zap className="w-7 h-7 text-white relative z-10" />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                </div>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  <span className="gradient-text">SignalPro</span>
                </h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t("header.tagline")}
                </p>
              </div>
            </motion.button>

            {/* Center Stats - Desktop only */}
            <motion.div 
              className="hidden xl:flex items-center gap-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass-card rounded-2xl p-4 flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{t("header.winrate")}</p>
                    <p className="font-mono text-lg font-bold text-success">87.3%</p>
                  </div>
                </div>
                
                <div className="w-px h-10 bg-border" />
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{t("header.signalsToday")}</p>
                    <p className="font-mono text-lg font-bold">{signalsCount}</p>
                  </div>
                </div>
                
                <div className="w-px h-10 bg-border" />
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{t("header.profit")}</p>
                    <p className="font-mono text-lg font-bold text-success">+$12,450</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Actions - Language only */}
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <LanguageSelector />
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};
