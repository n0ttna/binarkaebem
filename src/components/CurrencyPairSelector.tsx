import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, Star, Flame } from "lucide-react";

interface CurrencyPairSelectorProps {
  selected: string | null;
  onSelect: (pair: string) => void;
}

type PairItem = {
  id: string;
  category: "otc";
  popular: boolean;
};

const recommendedOtcPairs: PairItem[] = [
  { id: "AED/CNY", category: "otc", popular: true },
  { id: "AUD/CAD", category: "otc", popular: true },
  { id: "AUD/CHF", category: "otc", popular: true },
  { id: "BHD/CNY", category: "otc", popular: true },
  { id: "CHF/JPY", category: "otc", popular: true },
  { id: "EUR/JPY", category: "otc", popular: true },
  { id: "EUR/USD", category: "otc", popular: true },
  { id: "GBP/USD", category: "otc", popular: true },
  { id: "JOD/CNY", category: "otc", popular: true },
  { id: "LBP/USD", category: "otc", popular: true },
  { id: "NGN/USD", category: "otc", popular: true },
  { id: "OMR/CNY", category: "otc", popular: true },
  { id: "UAH/USD", category: "otc", popular: true },
  { id: "USD/BRL", category: "otc", popular: true },
  { id: "USD/CAD", category: "otc", popular: true },
  { id: "USD/CLP", category: "otc", popular: true },
  { id: "USD/EGP", category: "otc", popular: true },
  { id: "USD/PHP", category: "otc", popular: true },
  { id: "USD/RUB", category: "otc", popular: true },
  { id: "USD/THB", category: "otc", popular: true },
  { id: "USD/VND", category: "otc", popular: true },
  { id: "ZAR/USD", category: "otc", popular: true },
  // Доп. рекомендованные из списка
  { id: "EUR/HUF", category: "otc", popular: true },
  { id: "KES/USD", category: "otc", popular: true },
  { id: "EUR/CAD", category: "otc", popular: true },
  { id: "AUD/JPY", category: "otc", popular: true },
  { id: "EUR/TRY", category: "otc", popular: true },
  { id: "USD/INR", category: "otc", popular: true },
  { id: "AUD/NZD", category: "otc", popular: true },
  { id: "USD/JPY", category: "otc", popular: true },
  { id: "CAD/JPY", category: "otc", popular: true },
  { id: "TND/USD", category: "otc", popular: true },
  { id: "NZD/USD", category: "otc", popular: true },
];

const categories = [
  { id: "all", label: "Все", icon: Star },
  { id: "popular", label: "Рекомендуемые", icon: Flame },
];

export const CurrencyPairSelector = ({ selected, onSelect }: CurrencyPairSelectorProps) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("popular");

  const getPairParts = (id: string) => {
    const [base, quote] = id.split("/");
    return { base: base || id, quote: quote || "" };
  };

  const filteredPairs = useMemo(() => {
    return recommendedOtcPairs.filter((pair) => {
      const matchesSearch = pair.id.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = 
        activeCategory === "all" ||
        (activeCategory === "popular" && pair.popular);
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
          Представлены рекомендуемые валютные пары
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
                <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-secondary/40">
                  {getPairParts(pair.id).base}
                </span>
                <span className="text-muted-foreground/50">/</span>
                <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-secondary/40">
                  {getPairParts(pair.id).quote}
                </span>
              </div>

              {/* Pair name */}
              <p className="font-mono font-semibold text-sm mb-2">{pair.id}</p>

              {/* Label */}
              <div className="mt-2 flex items-center justify-center">
                <span className="px-2 py-0.5 rounded-full bg-secondary/50 text-[10px] text-muted-foreground">
                  OTC
                </span>
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
