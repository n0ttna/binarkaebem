import { cn } from "@/lib/utils";

interface CurrencyPairSelectorProps {
  selected: string | null;
  onSelect: (pair: string) => void;
}

const currencyPairs = [
  { id: "EUR/USD", flag1: "🇪🇺", flag2: "🇺🇸" },
  { id: "GBP/USD", flag1: "🇬🇧", flag2: "🇺🇸" },
  { id: "USD/JPY", flag1: "🇺🇸", flag2: "🇯🇵" },
  { id: "AUD/USD", flag1: "🇦🇺", flag2: "🇺🇸" },
  { id: "USD/CAD", flag1: "🇺🇸", flag2: "🇨🇦" },
  { id: "EUR/GBP", flag1: "🇪🇺", flag2: "🇬🇧" },
  { id: "USD/CHF", flag1: "🇺🇸", flag2: "🇨🇭" },
  { id: "NZD/USD", flag1: "🇳🇿", flag2: "🇺🇸" },
];

export const CurrencyPairSelector = ({ selected, onSelect }: CurrencyPairSelectorProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-medium text-muted-foreground">Выберите валютную пару</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {currencyPairs.map((pair) => (
          <button
            key={pair.id}
            onClick={() => onSelect(pair.id)}
            className={cn(
              "p-4 rounded-xl glass glass-hover transition-all duration-300",
              selected === pair.id && "ring-2 ring-primary glow-primary"
            )}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl">{pair.flag1}</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-xl">{pair.flag2}</span>
            </div>
            <span className="font-mono text-sm font-semibold">{pair.id}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
