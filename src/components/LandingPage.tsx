import { motion } from "framer-motion";
import { Zap, TrendingUp, Shield, ArrowRight, Activity, Users, BarChart3, Clock, CheckCircle2, Star, Globe, Trophy } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useDynamicStats } from "@/hooks/useDynamicStats";

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage = ({ onStart }: LandingPageProps) => {
  const { t } = useI18n();
  const { signalsCount, profit, winRate, onlineCount } = useDynamicStats();

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 md:py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-5xl mx-auto"
      >
        {/* Live Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card mb-6 md:mb-8"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
          </span>
          <span className="text-sm font-semibold text-success">{winRate}% {t("header.winrate")}</span>
          <div className="w-px h-4 bg-border" />
          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {onlineCount.toLocaleString()} online
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 md:mb-6 leading-tight"
        >
          {t("landing.title")}{" "}
          <span className="gradient-text">{t("landing.titleHighlight")}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 px-4"
        >
          {t("landing.subtitle")}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={onStart}
          className="group relative px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground glow-primary overflow-hidden interactive-scale"
        >
          <span className="relative z-10 flex items-center gap-3">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
            {t("landing.startButton")}
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </motion.button>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 md:mt-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span>{t("landing.trustFree")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-success" />
            <span>{t("landing.trustSecure")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-success" />
            <span>{t("landing.trustInstant")}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Live Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-4xl mx-auto mt-12 md:mt-16"
      >
        <div className="relative">
          {/* Glow effect behind */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-3xl rounded-3xl" />
          
          <div className="relative glass-card rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{t("landing.liveStats")}</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="text-center p-4 rounded-2xl bg-secondary/30">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-success" />
                </div>
                <p className="text-2xl md:text-3xl font-black gradient-text mb-1">{winRate}%</p>
                <p className="text-xs md:text-sm text-muted-foreground">{t("landing.stats.accuracy")}</p>
              </div>
              
              <div className="text-center p-4 rounded-2xl bg-secondary/30">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl md:text-3xl font-black mb-1">{signalsCount.toLocaleString()}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{t("landing.stats.signals")}</p>
              </div>
              
              <div className="text-center p-4 rounded-2xl bg-secondary/30">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-accent" />
                </div>
                <p className="text-2xl md:text-3xl font-black text-success mb-1">+${profit.toLocaleString()}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{t("header.profit")}</p>
              </div>
              
              <div className="text-center p-4 rounded-2xl bg-secondary/30">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-gold" />
                </div>
                <p className="text-2xl md:text-3xl font-black mb-1">3</p>
                <p className="text-xs md:text-sm text-muted-foreground">{t("landing.stats.platforms")}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid md:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-16 max-w-4xl mx-auto w-full"
      >
        {[
          { 
            icon: Activity, 
            title: t("landing.features.realtime"), 
            desc: t("landing.features.realtimeDesc"),
            gradient: "from-primary to-cyan-500"
          },
          { 
            icon: TrendingUp, 
            title: t("landing.features.accuracy"), 
            desc: t("landing.features.accuracyDesc"),
            gradient: "from-success to-emerald-500"
          },
          { 
            icon: Shield, 
            title: t("landing.features.free"), 
            desc: t("landing.features.freeDesc"),
            gradient: "from-accent to-violet-500"
          },
        ].map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.1 }}
            className="glass-card p-5 md:p-6 rounded-2xl group hover:scale-[1.02] transition-transform"
          >
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}>
              <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <h3 className="text-base md:text-lg font-bold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Platforms preview */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-10 md:mt-16 text-center"
      >
        <p className="text-sm text-muted-foreground mb-4">{t("landing.supportedPlatforms")}</p>
        <div className="flex items-center justify-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card">
            <span className="text-2xl">💼</span>
            <span className="font-semibold text-sm">Pocket Option</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card">
            <span className="text-2xl">🏆</span>
            <span className="font-semibold text-sm">1Win</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card">
            <span className="text-2xl">🎯</span>
            <span className="font-semibold text-sm">Binarium</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
