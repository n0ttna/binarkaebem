import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, Star, TrendingUp, TrendingDown, Clock, Flame } from "lucide-react";

interface CurrencyPairSelectorProps {
  selected: string | null;
  onSelect: (pair: string) => void;
}

const allPairs = [
  // Forex Majors
  { id: "EUR/USD", flag1: "🇪🇺", flag2: "🇺🇸", category: "forex", volatility: "medium", trend: "up", change: 0.12, popular: true },
  { id: "GBP/USD", flag1: "🇬🇧", flag2: "🇺🇸", category: "forex", volatility: "high", trend: "down", change: -0.34, popular: true },
  { id: "USD/JPY", flag1: "🇺🇸", flag2: "🇯🇵", category: "forex", volatility: "medium", trend: "up", change: 0.28, popular: true },
  { id: "USD/CHF", flag1: "🇺🇸", flag2: "🇨🇭", category: "forex", volatility: "low", trend: "up", change: 0.08, popular: false },
  { id: "AUD/USD", flag1: "🇦🇺", flag2: "🇺🇸", category: "forex", volatility: "medium", trend: "down", change: -0.15, popular: true },
  { id: "USD/CAD", flag1: "🇺🇸", flag2: "🇨🇦", category: "forex", volatility: "medium", trend: "up", change: 0.21, popular: false },
  { id: "NZD/USD", flag1: "🇳🇿", flag2: "🇺🇸", category: "forex", volatility: "medium", trend: "down", change: -0.18, popular: false },
  // Forex Crosses
  { id: "EUR/GBP", flag1: "🇪🇺", flag2: "🇬🇧", category: "forex", volatility: "low", trend: "up", change: 0.05, popular: false },
  { id: "EUR/JPY", flag1: "🇪🇺", flag2: "🇯🇵", category: "forex", volatility: "high", trend: "up", change: 0.42, popular: true },
  { id: "GBP/JPY", flag1: "🇬🇧", flag2: "🇯🇵", category: "forex", volatility: "high", trend: "down", change: -0.56, popular: true },
  { id: "EUR/CHF", flag1: "🇪🇺", flag2: "🇨🇭", category: "forex", volatility: "low", trend: "up", change: 0.03, popular: false },
  { id: "AUD/JPY", flag1: "🇦🇺", flag2: "🇯🇵", category: "forex", volatility: "high", trend: "up", change: 0.31, popular: false },
  { id: "CAD/JPY", flag1: "🇨🇦", flag2: "🇯🇵", category: "forex", volatility: "medium", trend: "down", change: -0.22, popular: false },
  { id: "CHF/JPY", flag1: "🇨🇭", flag2: "🇯🇵", category: "forex", volatility: "medium", trend: "up", change: 0.19, popular: false },
  { id: "EUR/AUD", flag1: "🇪🇺", flag2: "🇦🇺", category: "forex", volatility: "medium", trend: "up", change: 0.27, popular: false },
  { id: "GBP/CHF", flag1: "🇬🇧", flag2: "🇨🇭", category: "forex", volatility: "medium", trend: "down", change: -0.11, popular: false },
  // Crypto
  { id: "BTC/USD", flag1: "₿", flag2: "🇺🇸", category: "crypto", volatility: "high", trend: "up", change: 2.34, popular: true },
  { id: "ETH/USD", flag1: "Ξ", flag2: "🇺🇸", category: "crypto", volatility: "high", trend: "down", change: -0.89, popular: true },
  { id: "LTC/USD", flag1: "Ł", flag2: "🇺🇸", category: "crypto", volatility: "high", trend: "up", change: 1.56, popular: false },
  { id: "XRP/USD", flag1: "✕", flag2: "🇺🇸", category: "crypto", volatility: "high", trend: "up", change: 3.21, popular: false },
  // Commodities
  { id: "XAU/USD", flag1: "🥇", flag2: "🇺🇸", category: "commodity", volatility: "medium", trend: "up", change: 0.45, popular: true },
  { id: "XAG/USD", flag1: "🥈", flag2: "🇺🇸", category: "commodity", volatility: "medium", trend: "down", change: -0.32, popular: false },
  { id: "OIL/USD", flag1: "🛢️", flag2: "🇺🇸", category: "commodity", volatility: "high", trend: "up", change: 1.23, popular: true },
];

const categories = [
  { id: "all", label: "Все", icon: Star },
  { id: "popular", label: "Популярные", icon: Flame },
  { id: "forex", label: "Forex", icon: TrendingUp },
  { id: "crypto", label: "Крипто", icon: TrendingDown },
  { id: "commodity", label: "Товары", icon: Clock },
];

export const CurrencyPairSelector = ({ selected, onSelect }: CurrencyPairSelectorProps) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("popular");

  const filteredPairs = useMemo(() => {
    return allPairs.filter((pair) => {
      const matchesSearch = pair.id.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = 
        activeCategory === "all" ||
        (activeCategory === "popular" && pair.popular) ||
        pair.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold mb-2">
          Выберите <span className="gradient-text">валютную пару</span>
        </h2>
        <p className="text-muted-foreground">
          {allPairs.length} активов доступно для торговли
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск пары... (EUR, BTC, Gold...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-card border border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pairs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto scrollbar-hide pr-1">
        <AnimatePresence mode="popLayout">
          {filteredPairs.map((pair, index) => (
            <motion.button
              key={pair.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.02 }}
              onClick={() => onSelect(pair.id)}
              className={cn(
                "relative p-4 rounded-xl bg-card border border-white/5 hover:border-white/10 transition-all group",
                selected === pair.id && "ring-2 ring-primary glow-primary border-primary/50"
              )}
            >
              {/* Popular badge */}
              {pair.popular && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                  <Flame className="w-3 h-3 text-gold-foreground" />
                </div>
              )}

              {/* Flags */}
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-2xl">{pair.flag1}</span>
                <span className="text-muted-foreground/50">/</span>
                <span className="text-2xl">{pair.flag2}</span>
              </div>

              {/* Pair name */}
              <p className="font-mono font-semibold text-sm mb-2">{pair.id}</p>

              {/* Change indicator */}
              <div className={cn(
                "flex items-center justify-center gap-1 text-xs font-medium",
                pair.trend === "up" ? "text-success" : "text-destructive"
              )}>
                {pair.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {pair.change > 0 ? "+" : ""}{pair.change}%
              </div>

              {/* Volatility indicator */}
              <div className="mt-2 flex justify-center gap-0.5">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      level <= (pair.volatility === "low" ? 1 : pair.volatility === "medium" ? 2 : 3)
                        ? "bg-primary"
                        : "bg-muted"
                    )}
                  />
                ))}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {filteredPairs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Ничего не найдено</p>
          <p className="text-sm">Попробуйте другой запрос</p>
        </div>
      )}
    </motion.div>
  );
};
