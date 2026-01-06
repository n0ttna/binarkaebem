import { cn } from "@/lib/utils";

interface PlatformSelectorProps {
  selected: string | null;
  onSelect: (platform: string) => void;
}

const platforms = [
  {
    id: "pocketoption",
    name: "Pocket Option",
    logo: "💼",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "1win",
    name: "1Win",
    logo: "🏆",
    color: "from-blue-500 to-cyan-500",
  },
];

export const PlatformSelector = ({ selected, onSelect }: PlatformSelectorProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-medium text-muted-foreground">Выберите платформу</h2>
      <div className="grid grid-cols-2 gap-4">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => onSelect(platform.id)}
            className={cn(
              "relative p-6 rounded-xl glass glass-hover group transition-all duration-300",
              selected === platform.id && "ring-2 ring-primary glow-primary"
            )}
          >
            <div className={cn(
              "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br",
              platform.color
            )} />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <span className="text-4xl">{platform.logo}</span>
              <span className="font-display font-semibold text-lg">{platform.name}</span>
            </div>
            {selected === platform.id && (
              <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-primary animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
