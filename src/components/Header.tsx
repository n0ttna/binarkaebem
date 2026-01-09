import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Bell, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  ChevronDown,
  Globe,
  Users,
  BarChart3,
  Clock,
  Crown,
  Sparkles,
  Shield,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onAuthClick: (type: "login" | "register") => void;
  onProfileClick: () => void;
  isLoggedIn?: boolean;
  isPremium?: boolean;
}

export const Header = ({ onAuthClick, onProfileClick, isLoggedIn = false, isPremium = false }: HeaderProps) => {
  const [time, setTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [marketData] = useState([
    { pair: "BTC/USD", price: "42,856.32", change: 2.34, up: true },
    { pair: "ETH/USD", price: "2,456.78", change: -0.89, up: false },
    { pair: "EUR/USD", price: "1.0892", change: 0.12, up: true },
    { pair: "XAU/USD", price: "2,024.50", change: 0.45, up: true },
  ]);

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
                <span className="font-semibold text-foreground">12,847</span> онлайн
              </span>
            </motion.div>

            {/* Market ticker */}
            <div className="flex-1 flex items-center gap-8 overflow-x-auto scrollbar-hide">
              {marketData.map((item, i) => (
                <motion.div
                  key={item.pair}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-xs whitespace-nowrap group"
                >
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">{item.pair}</span>
                  <span className="font-mono font-semibold">{item.price}</span>
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
                <span className="font-medium">Рынок открыт</span>
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
            {/* Logo & Brand */}
            <motion.div 
              className="flex items-center gap-4"
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
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                  <span className="gradient-text">SignalPro</span>
                  {isPremium && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-gold/20 to-amber-500/20 text-gold text-[10px] font-bold uppercase tracking-wider border border-gold/30 glow-gold"
                    >
                      <Crown className="w-3 h-3" />
                      Premium
                    </motion.span>
                  )}
                </h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Торговые сигналы нового поколения
                </p>
              </div>
            </motion.div>

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
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Винрейт</p>
                    <p className="font-mono text-lg font-bold text-success">87.3%</p>
                  </div>
                </div>
                
                <div className="w-px h-10 bg-border" />
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Сигналов сегодня</p>
                    <p className="font-mono text-lg font-bold">247</p>
                  </div>
                </div>
                
                <div className="w-px h-10 bg-border" />
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Прибыль</p>
                    <p className="font-mono text-lg font-bold text-success">+$12,450</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Actions */}
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="glass-button p-3 rounded-xl group"
                >
                  <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-destructive animate-pulse" />
                </button>
                
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-80 glass-card rounded-2xl p-4 z-50"
                    >
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Уведомления
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 rounded-xl bg-success/10 border border-success/20">
                          <p className="text-success font-medium">Сигнал EUR/USD выиграл! +$45</p>
                          <p className="text-xs text-muted-foreground mt-1">2 минуты назад</p>
                        </div>
                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                          <p className="font-medium">Новый горячий сигнал доступен</p>
                          <p className="text-xs text-muted-foreground mt-1">5 минут назад</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {isLoggedIn ? (
                <>
                  {/* Settings */}
                  <button className="glass-button p-3 rounded-xl group">
                    <Settings className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </button>

                  {/* Profile Button */}
                  <button
                    onClick={onProfileClick}
                    className="glass-button flex items-center gap-3 px-4 py-2 rounded-xl group"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent via-primary to-success flex items-center justify-center text-sm font-bold">
                        VP
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success border-2 border-card" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-semibold">VIP Pro</p>
                      <div className="flex items-center gap-1 text-[10px] text-gold">
                        <Crown className="w-3 h-3" />
                        Premium
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors ml-1" />
                  </button>
                </>
              ) : (
                <>
                  {/* Auth Buttons */}
                  <button
                    onClick={() => onAuthClick("login")}
                    className="glass-button px-5 py-2.5 rounded-xl text-sm font-semibold"
                  >
                    Войти
                  </button>
                  
                  <button
                    onClick={() => onAuthClick("register")}
                    className="relative px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground glow-primary overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Регистрация
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </button>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};
