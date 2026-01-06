import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  Clock
} from "lucide-react";

interface HeaderProps {
  onAuthClick: (type: "login" | "register") => void;
  onProfileClick: () => void;
}

export const Header = ({ onAuthClick, onProfileClick }: HeaderProps) => {
  const [time, setTime] = useState(new Date());
  const [marketData] = useState([
    { pair: "BTC/USD", price: "42,856.32", change: 2.34, up: true },
    { pair: "ETH/USD", price: "2,456.78", change: -0.89, up: false },
    { pair: "EUR/USD", price: "1.0892", change: 0.12, up: true },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative z-50">
      {/* Top ticker bar */}
      <div className="bg-card/40 border-b border-white/5 overflow-hidden">
        <div className="flex items-center gap-8 py-2 px-4 animate-shimmer">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>12,847 онлайн</span>
          </div>
          <div className="flex items-center gap-6 overflow-hidden">
            {marketData.map((item, i) => (
              <motion.div
                key={item.pair}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 text-xs whitespace-nowrap"
              >
                <span className="text-muted-foreground">{item.pair}</span>
                <span className="font-mono font-medium">{item.price}</span>
                <span className={`flex items-center gap-0.5 ${item.up ? "text-success" : "text-destructive"}`}>
                  {item.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {item.change}%
                </span>
              </motion.div>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            <Globe className="w-3 h-3" />
            <span>Рынок открыт</span>
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="glass-strong border-b border-white/5">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center glow-primary">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h1 className="font-display text-xl font-bold flex items-center gap-2">
                  SignalPro
                  <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] font-semibold uppercase tracking-wider">
                    Premium
                  </span>
                </h1>
                <p className="text-xs text-muted-foreground">Торговые сигналы нового поколения</p>
              </div>
            </motion.div>

            {/* Center Stats */}
            <motion.div 
              className="hidden lg:flex items-center gap-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Винрейт</p>
                    <p className="font-mono font-bold text-success">87.3%</p>
                  </div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Сигналов</p>
                    <p className="font-mono font-bold">2,451</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono text-muted-foreground">
                  {time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                <span className="text-muted-foreground/50">UTC+3</span>
              </div>
            </motion.div>

            {/* Right Actions */}
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Notifications */}
              <button className="relative p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group">
                <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
              </button>

              {/* Auth Buttons */}
              <button
                onClick={() => onAuthClick("login")}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
              >
                Войти
              </button>
              
              <button
                onClick={() => onAuthClick("register")}
                className="px-4 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all glow-primary"
              >
                Регистрация
              </button>

              {/* Profile Button */}
              <button
                onClick={onProfileClick}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center text-sm font-bold">
                    VP
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-card" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium">VIP Pro</p>
                  <p className="text-[10px] text-gold">Premium</p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};
