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
import { ChevronRight, RotateCcw, CheckCircle2, ArrowLeft, Sparkles } from "lucide-react";

type Step = "platform" | "pair" | "expiration" | "signal";

const Index = () => {
  const [platform, setPlatform] = useState<string | null>(null);
  const [pair, setPair] = useState<string | null>(null);
  const [expiration, setExpiration] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>("platform");
  const [isLoggedIn] = useState(true); // Demo state
  const [isPremium] = useState(true); // Demo state
  
  // Modals
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; type: "login" | "register" }>({ isOpen: false, type: "login" });
  const [profileModal, setProfileModal] = useState(false);

  const handlePlatformSelect = (p: string) => {
    setPlatform(p);
    setTimeout(() => setCurrentStep("pair"), 400);
  };

  const handlePairSelect = (p: string) => {
    setPair(p);
    setTimeout(() => setCurrentStep("expiration"), 400);
  };

  const handleExpirationSelect = (e: number) => {
    setExpiration(e);
    setTimeout(() => setCurrentStep("signal"), 400);
  };

  const handleReset = () => {
    setPlatform(null);
    setPair(null);
    setExpiration(null);
    setCurrentStep("platform");
  };

  const goBack = () => {
    if (currentStep === "pair") {
      setPlatform(null);
      setCurrentStep("platform");
    } else if (currentStep === "expiration") {
      setPair(null);
      setCurrentStep("pair");
    } else if (currentStep === "signal") {
      setExpiration(null);
      setCurrentStep("expiration");
    }
  };

  const steps = [
    { id: "platform", label: "Платформа", done: !!platform },
    { id: "pair", label: "Актив", done: !!pair },
    { id: "expiration", label: "Время", done: !!expiration },
    { id: "signal", label: "Сигнал", done: currentStep === "signal" },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/3 rounded-full blur-[200px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <Header 
        onAuthClick={(type) => setAuthModal({ isOpen: true, type })}
        onProfileClick={() => setProfileModal(true)}
        isLoggedIn={isLoggedIn}
        isPremium={isPremium}
      />

      <main className="relative container mx-auto px-4 py-8 max-w-6xl">
        {/* Progress Steps */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-3">
              <motion.div
                initial={false}
                animate={{
                  scale: currentStep === step.id ? 1.05 : 1,
                }}
                className={`relative flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-500 ${
                  step.done
                    ? "glass-card text-success"
                    : currentStep === step.id
                    ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground glow-primary shadow-xl"
                    : "glass-button text-muted-foreground"
                }`}
              >
                {step.done ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : currentStep === step.id ? (
                  <Sparkles className="w-5 h-5" />
                ) : (
                  <span className="w-6 h-6 rounded-full bg-current/10 flex items-center justify-center text-xs">
                    {index + 1}
                  </span>
                )}
                <span className="hidden sm:inline">{step.label}</span>
              </motion.div>
              
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 rounded-full transition-colors duration-500 ${
                  step.done ? "bg-success" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Back button for steps after first */}
        <AnimatePresence>
          {currentStep !== "platform" && currentStep !== "signal" && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={goBack}
              className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Назад</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === "platform" && (
            <motion.div
              key="platform"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <PlatformSelector selected={platform} onSelect={handlePlatformSelect} />
            </motion.div>
          )}

          {currentStep === "pair" && (
            <motion.div
              key="pair"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <CurrencyPairSelector selected={pair} onSelect={handlePairSelect} />
            </motion.div>
          )}

          {currentStep === "expiration" && (
            <motion.div
              key="expiration"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ExpirationSelector selected={expiration} onSelect={handleExpirationSelect} />
            </motion.div>
          )}

          {currentStep === "signal" && platform && pair && expiration && (
            <motion.div
              key="signal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Selection Summary */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-secondary/50">
                    <span className="text-2xl">{platform === "pocketoption" ? "💼" : "🏆"}</span>
                    <div>
                      <p className="text-xs text-muted-foreground">Платформа</p>
                      <p className="font-semibold">{platform === "pocketoption" ? "Pocket Option" : "1Win"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-secondary/50">
                    <span className="text-2xl">💱</span>
                    <div>
                      <p className="text-xs text-muted-foreground">Актив</p>
                      <p className="font-mono font-semibold">{pair}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-secondary/50">
                    <span className="text-2xl">⏱️</span>
                    <div>
                      <p className="text-xs text-muted-foreground">Экспирация</p>
                      <p className="font-semibold">
                        {expiration >= 60 ? `${expiration / 60} мин` : `${expiration} сек`}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="glass-button flex items-center gap-2 px-5 py-3 rounded-xl group"
                >
                  <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="font-semibold">Изменить</span>
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
