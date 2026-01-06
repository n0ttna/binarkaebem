import { Activity, Zap } from "lucide-react";

export const Header = () => {
  return (
    <header className="glass border-b border-white/5 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-primary">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg">Signal Pro</h1>
            <p className="text-xs text-muted-foreground">Торговые сигналы</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
          <Activity className="w-4 h-4 text-success animate-pulse" />
          <span className="text-sm font-medium text-success">Онлайн</span>
        </div>
      </div>
    </header>
  );
};
