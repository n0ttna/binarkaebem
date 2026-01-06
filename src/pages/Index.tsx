import { useState } from "react";
import { Header } from "@/components/Header";
import { PlatformSelector } from "@/components/PlatformSelector";
import { CurrencyPairSelector } from "@/components/CurrencyPairSelector";
import { ExpirationSelector } from "@/components/ExpirationSelector";
import { TradingChart } from "@/components/TradingChart";
import { SignalDisplay } from "@/components/SignalDisplay";
import { ChevronRight, RotateCcw } from "lucide-react";

const Index = () => {
  const [platform, setPlatform] = useState<string | null>(null);
  const [pair, setPair] = useState<string | null>(null);
  const [expiration, setExpiration] = useState<number | null>(null);

  const isComplete = platform && pair && expiration;

  const handleReset = () => {
    setPlatform(null);
    setPair(null);
    setExpiration(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="relative container mx-auto px-4 py-8 max-w-4xl">
        {!isComplete ? (
          <div className="space-y-8">
            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                      (step === 1 && platform) ||
                      (step === 2 && pair) ||
                      (step === 3 && expiration)
                        ? "bg-primary text-primary-foreground glow-primary"
                        : step === 1 ||
                          (step === 2 && platform) ||
                          (step === 3 && platform && pair)
                        ? "bg-secondary text-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Platform Selection */}
            <PlatformSelector selected={platform} onSelect={setPlatform} />

            {/* Step 2: Currency Pair Selection */}
            {platform && (
              <CurrencyPairSelector selected={pair} onSelect={setPair} />
            )}

            {/* Step 3: Expiration Time */}
            {platform && pair && (
              <ExpirationSelector selected={expiration} onSelect={setExpiration} />
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Selection Summary */}
            <div className="glass rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Платформа: </span>
                  <span className="font-semibold">
                    {platform === "pocketoption" ? "Pocket Option" : "1Win"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Пара: </span>
                  <span className="font-mono font-semibold">{pair}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Экспирация: </span>
                  <span className="font-semibold">
                    {expiration! >= 60 ? `${expiration! / 60} мин` : `${expiration} сек`}
                  </span>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm font-medium">Изменить</span>
              </button>
            </div>

            {/* Chart */}
            <TradingChart pair={pair!} />

            {/* Signal */}
            <SignalDisplay
              platform={platform!}
              pair={pair!}
              expiration={expiration!}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
