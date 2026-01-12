import { motion } from "framer-motion";
import { Zap, TrendingUp, Shield, ArrowRight, Activity, Users, BarChart3 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage = ({ onStart }: LandingPageProps) => {
  const { t } = useI18n();

  const features = [
    { icon: Activity, title: t("landing.features.realtime"), desc: t("landing.features.realtimeDesc") },
    { icon: TrendingUp, title: t("landing.features.accuracy"), desc: t("landing.features.accuracyDesc") },
    { icon: Shield, title: t("landing.features.free"), desc: t("landing.features.freeDesc") },
  ];

  const stats = [
    { value: "95%", label: t("landing.stats.accuracy") },
    { value: "50K+", label: t("landing.stats.signals") },
    { value: "10K+", label: t("landing.stats.users") },
    { value: "3", label: t("landing.stats.platforms") },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-sm font-medium">87.3% {t("header.winrate")}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-black tracking-tight mb-6"
        >
          {t("landing.title")}{" "}
          <span className="gradient-text">{t("landing.titleHighlight")}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          {t("landing.subtitle")}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={onStart}
          className="group relative px-10 py-5 rounded-2xl text-xl font-bold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground glow-primary overflow-hidden interactive-scale"
        >
          <span className="relative z-10 flex items-center gap-3">
            <Zap className="w-6 h-6" />
            {t("landing.startButton")}
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto w-full"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="glass-card p-6 rounded-2xl text-center"
          >
            <p className="text-3xl font-black gradient-text mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto w-full"
      >
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.1 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
              <feature.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
