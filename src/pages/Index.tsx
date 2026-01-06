import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { PlatformSelector } from "@/components/PlatformSelector";
import { CurrencyPairSelector } from "@/components/CurrencyPairSelector";
import { ExpirationSelector } from "@/components/ExpirationSelector";
import { TradingChart } from "@/components/TradingChart";
import { SignalDisplay } from "@/components/SignalDisplay";
import { AuthModal } from "@/components/AuthModal";
import { ProfileModal } from "@/components/ProfileModal";
import { ChevronRight, RotateCcw, ArrowRight, CheckCircle2 } from "lucide-react";

type Step = "platform" | "pair" | "expiration" | "signal";

const Index = () => {
  const [platform, setPlatform] = useState<string | null>(null);
  const [pair, setPair] = useState<string | null>(null);
  const [expiration, setExpiration] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>("platform");
  
  // Modals
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; type: "login" | "register" }>({ isOpen: false, type: "login" });
  const [profileModal, setProfileModal] = useState(false);

  const handlePlatformSelect = (p: string) => {
    setPlatform(p);
    setTimeout(() => setCurrentStep("pair"), 300);
  };

  const handlePairSelect = (p: string) => {
    setPair(p);
    setTimeout(() => setCurrentStep("expiration"), 300);
  };

  const handleExpirationSelect = (e: number) => {
    setExpiration(e);
    setTimeout(() => setCurrentStep("signal"), 300);
  };

  const handleReset = () => {
    setPlatform(null);
    setPair(null);
    setExpiration(null);
    setCurrentStep("platform");
  };

  const steps = [
    { id: "platform", label: "Платформа", done: !!platform },
    { id: "pair", label: "Валютная пара", done: !!pair },
    { id: "expiration", label: "Экспирация", done: !!expiration },
    { id: "signal", label: "Сигнал", done: currentStep === "signal" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[150px]" />
      </div>

      <Header 
        onAuthClick={(type) => setAuthModal({ isOpen: true, type })}
        onProfileClick={() => setProfileModal(true)}
      />

      <main className="relative container mx-auto px-4 py-8 max-w-5xl">
        {/* Progress Steps */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-2">
              <motion.div
                initial={false}
                animate={{
                  scale: currentStep === step.id ? 1.1 : 1,
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  step.done
                    ? "bg-success/20 text-success"
                    : currentStep === step.id
                    ? "bg-primary text-primary-foreground glow-primary"
                    : "bg-secondary/50 text-muted-foreground"
                }`}
              >
                {step.done ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-xs">
                    {index + 1}
                  </span>
                )}
                <span className="hidden sm:inline">{step.label}</span>
              </motion.div>
              {index < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === "platform" && (
            <motion.div
              key="platform"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <PlatformSelector selected={platform} onSelect={handlePlatformSelect} />
            </motion.div>
          )}

          {currentStep === "pair" && (
            <motion.div
              key="pair"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <CurrencyPairSelector selected={pair} onSelect={handlePairSelect} />
              
              {/* Back button */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setPlatform(null);
                    setCurrentStep("platform");
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Назад к выбору платформы
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === "expiration" && (
            <motion.div
              key="expiration"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <ExpirationSelector selected={expiration} onSelect={handleExpirationSelect} />
              
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setPair(null);
                    setCurrentStep("pair");
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Назад к выбору пары
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === "signal" && platform && pair && expiration && (
            <motion.div
              key="signal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Selection Summary */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-strong rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Платформа:</span>
                    <span className="px-3 py-1 rounded-lg bg-secondary/50 font-semibold">
                      {platform === "pocketoption" ? "💼 Pocket Option" : "🏆 1Win"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Пара:</span>
                    <span className="px-3 py-1 rounded-lg bg-secondary/50 font-mono font-semibold">
                      {pair}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Экспирация:</span>
                    <span className="px-3 py-1 rounded-lg bg-secondary/50 font-semibold">
                      {expiration >= 60 ? `${expiration / 60} мин` : `${expiration} сек`}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors group"
                >
                  <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="text-sm font-medium">Изменить</span>
                </button>
              </motion.div>

              {/* Chart & Signal */}
              <div className="grid lg:grid-cols-2 gap-6">
                <TradingChart pair={pair} />
                <SignalDisplay platform={platform} pair={pair} expiration={expiration} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={authModal.isOpen}
        type={authModal.type}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        onSwitchType={(type) => setAuthModal({ isOpen: true, type })}
      />
      
      <ProfileModal
        isOpen={profileModal}
        onClose={() => setProfileModal(false)}
      />
    </div>
  );
};

export default Index;
