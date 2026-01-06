import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface ExpirationSelectorProps {
  selected: number | null;
  onSelect: (time: number) => void;
}

const expirationTimes = [
  { value: 30, label: "30 сек" },
  { value: 60, label: "1 мин" },
  { value: 120, label: "2 мин" },
  { value: 180, label: "3 мин" },
  { value: 300, label: "5 мин" },
  { value: 600, label: "10 мин" },
];

export const ExpirationSelector = ({ selected, onSelect }: ExpirationSelectorProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-medium text-muted-foreground">Время экспирации</h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {expirationTimes.map((time) => (
          <button
            key={time.value}
            onClick={() => onSelect(time.value)}
            className={cn(
              "p-4 rounded-xl glass glass-hover transition-all duration-300 flex flex-col items-center gap-2",
              selected === time.value && "ring-2 ring-primary glow-primary"
            )}
          >
            <Clock className="w-5 h-5 text-muted-foreground" />
            <span className="font-semibold text-sm">{time.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
