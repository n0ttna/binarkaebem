import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { LandingPage } from "@/components/LandingPage";
import { PlatformSelector } from "@/components/PlatformSelector";
import { PlatformRegistrationModal } from "@/components/PlatformRegistrationModal";
import { CurrencyPairSelector } from "@/components/CurrencyPairSelector";
import { ExpirationSelector } from "@/components/ExpirationSelector";
import { TradingChart } from "@/components/TradingChart";
import { SignalDisplay } from "@/components/SignalDisplay";
import { RotateCcw, CheckCircle2, ArrowLeft, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getUserData, saveUserData } from "@/hooks/useDynamicStats";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";

type Step = "landing" | "platform" | "register" | "pair" | "expiration" | "signal";

const Index = () => {
  const { t } = useI18n();
  const { isTelegram, user, hapticFeedback, showBackButton, hideBackButton, isReady } = useTelegramWebApp();
  const [platform, setPlatform] = useState<string | null>(null);
  const [pair, setPair] = useState<string | null>(null);
  const [expiration, setExpiration] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>("landing");
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  // Check if user has already completed registration before
  useEffect(() => {
    const userData = getUserData();
    if (userData.hasCompletedRegistration && userData.platform) {
      setPlatform(userData.platform);
      // Skip to pair selection if returning user
      setCurrentStep("pair");
    }
  }, []);

  const handleStartTrading = () => {
    if (isTelegram) hapticFeedback('medium');
    const userData = getUserData();
    if (userData.hasCompletedRegistration && userData.platform) {
      // Returning user - skip to pair selection
      setPlatform(userData.platform);
      setCurrentStep("pair");
    } else {
      setCurrentStep("platform");
    }
  };

  const handlePlatformSelect = (p: string) => {
    if (isTelegram) hapticFeedback('light');
    setPlatform(p);
    // Show registration modal
    setShowRegistrationModal(true);
  };

  const handleRegistrationComplete = () => {
    if (isTelegram) hapticFeedback('success');
    setShowRegistrationModal(false);
    // Save user data to localStorage
    saveUserData({
      platform: platform,
      hasCompletedRegistration: true,
    });
    setCurrentStep("pair");
  };

  const handlePairSelect = (p: string) => {
    if (isTelegram) hapticFeedback('light');
    setPair(p);
    setTimeout(() => setCurrentStep("expiration"), 400);
  };

  const handleExpirationSelect = (e: number) => {
    if (isTelegram) hapticFeedback('medium');
    setExpiration(e);
    setTimeout(() => setCurrentStep("signal"), 400);
  };

  const handleReset = () => {
    setPair(null);
    setExpiration(null);
    // Keep platform from localStorage but go back to pair selection
    const userData = getUserData();
    if (userData.hasCompletedRegistration && userData.platform) {
      setPlatform(userData.platform);
      setCurrentStep("pair");
    } else {
      setPlatform(null);
      setCurrentStep("landing");
    }
  };

  const handleFullReset = () => {
    // Complete reset including clearing saved data
    localStorage.removeItem("signalpro_user_data");
    setPlatform(null);
    setPair(null);
    setExpiration(null);
    setCurrentStep("landing");
  };

  const handleLogoClick = () => {
    setPair(null);
    setExpiration(null);
    setCurrentStep("landing");
  };

  const goBack = () => {
    if (isTelegram) hapticFeedback('light');
    if (currentStep === "platform") {
      setCurrentStep("landing");
    } else if (currentStep === "pair") {
      // Don't go back to platform if already registered
      const userData = getUserData();
      if (!userData.hasCompletedRegistration) {
        setPlatform(null);
        setCurrentStep("platform");
      } else {
        setCurrentStep("landing");
      }
    } else if (currentStep === "expiration") {
      setPair(null);
      setCurrentStep("pair");
    } else if (currentStep === "signal") {
      setExpiration(null);
      setCurrentStep("expiration");
    }
  };

  // Telegram back button integration
  useEffect(() => {
    if (!isTelegram) return;
    
    if (currentStep !== "landing") {
      showBackButton(goBack);
    } else {
      hideBackButton();
    }
    
    return () => hideBackButton();
  }, [currentStep, isTelegram, showBackButton, hideBackButton]);

  const steps = [
    { id: "platform", label: t("step.platform"), done: !!platform },
    { id: "pair", label: t("step.pair"), done: !!pair },
    { id: "expiration", label: t("step.time"), done: !!expiration },
    { id: "signal", label: t("step.signal"), done: currentStep === "signal" },
  ];

  const showSteps = currentStep !== "landing" && currentStep !== "register";

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

      <Header onLogoClick={handleLogoClick} />

      <main className="relative container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        {/* Progress Steps */}
        {showSteps && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 md:gap-3 mb-8 md:mb-12 overflow-x-auto scrollbar-hide"
          >
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2 md:gap-3 shrink-0">
                <motion.div
                  initial={false}
                  animate={{
                    scale: currentStep === step.id ? 1.05 : 1,
                  }}
                  className={`relative flex items-center gap-1.5 md:gap-2.5 px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-semibold transition-all duration-500 ${
                    step.done
                      ? "glass-card text-success"
                      : currentStep === step.id
                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground glow-primary shadow-xl"
                      : "glass-button text-muted-foreground"
                  }`}
                >
                  {step.done ? (
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                  ) : currentStep === step.id ? (
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-current/10 flex items-center justify-center text-[10px] md:text-xs">
                      {index + 1}
                    </span>
                  )}
                  <span className="hidden sm:inline">{step.label}</span>
                </motion.div>
                
                {index < steps.length - 1 && (
                  <div className={`w-4 md:w-8 h-0.5 rounded-full transition-colors duration-500 ${
                    step.done ? "bg-success" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* Back button */}
        <AnimatePresence>
          {currentStep !== "landing" && currentStep !== "signal" && currentStep !== "register" && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={goBack}
              className="mb-4 md:mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">{t("step.back")}</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LandingPage onStart={handleStartTrading} />
            </motion.div>
          )}

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
              className="space-y-4 md:space-y-6"
            >
              {/* Selection Summary */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-4 md:p-5 flex flex-wrap items-center justify-between gap-3 md:gap-4"
              >
                <div className="flex flex-wrap items-center gap-2 md:gap-4">
                  <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-xl bg-secondary/50">
                    <span className="text-xl md:text-2xl">
                      {platform === "pocketoption" ? "💼" : platform === "1win" ? "🏆" : "🎯"}
                    </span>
                    <div>
                      <p className="text-[10px] md:text-xs text-muted-foreground">{t("step.platform")}</p>
                      <p className="text-sm md:text-base font-semibold">
                        {platform === "pocketoption" ? "Pocket Option" : platform === "1win" ? "1Win" : "Binarium"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-xl bg-secondary/50">
                    <span className="text-xl md:text-2xl">💱</span>
                    <div>
                      <p className="text-[10px] md:text-xs text-muted-foreground">{t("step.pair")}</p>
                      <p className="text-sm md:text-base font-mono font-semibold">{pair}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-xl bg-secondary/50">
                    <span className="text-xl md:text-2xl">⏱️</span>
                    <div>
                      <p className="text-[10px] md:text-xs text-muted-foreground">{t("step.time")}</p>
                      <p className="text-sm md:text-base font-semibold">
                        {expiration >= 60 ? `${expiration / 60} min` : `${expiration} sec`}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="glass-button flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl group"
                >
                  <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="text-sm font-semibold">{t("step.change")}</span>
                </button>
              </motion.div>

              {/* Chart & Signal */}
              <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
                <TradingChart pair={pair} />
                <SignalDisplay platform={platform} pair={pair} expiration={expiration} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Registration Modal */}
      {platform && (
        <PlatformRegistrationModal
          isOpen={showRegistrationModal}
          platform={platform}
          onClose={() => {
            setShowRegistrationModal(false);
            setPlatform(null);
          }}
          onComplete={handleRegistrationComplete}
        />
      )}
    </div>
  );
};

export default Index;
