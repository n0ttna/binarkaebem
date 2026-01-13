import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2, ArrowRight, Shield, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

interface PlatformRegistrationModalProps {
  isOpen: boolean;
  platform: string;
  onClose: () => void;
  onComplete: () => void;
}

const platformData: Record<string, { name: string; logo: string; url: string; needsId: boolean; gradient: string }> = {
  pocketoption: {
    name: "Pocket Option",
    logo: "💼",
    url: "https://po-ru4.click/register?utm_campaign=816848&utm_source=affiliate&utm_medium=sr&a=jNBsw9ycPZUHEl&ac=register",
    needsId: true,
    gradient: "from-emerald-500 to-cyan-500",
  },
  "1win": {
    name: "1Win",
    logo: "🏆",
    url: "https://one-vv02.life/v3/3193/binary-options/?p=p03h",
    needsId: true,
    gradient: "from-violet-500 to-fuchsia-500",
  },
  binarium: {
    name: "Binarium",
    logo: "🎯",
    url: "https://clck.biz/lp/sure-start/?partner_id=p52452p151899pf2e1",
    needsId: false,
    gradient: "from-orange-500 to-red-500",
  },
};

export const PlatformRegistrationModal = ({ isOpen, platform, onClose, onComplete }: PlatformRegistrationModalProps) => {
  const { t } = useI18n();
  const [hasVisited, setHasVisited] = useState(false);
  const [profileId, setProfileId] = useState("");
  
  const data = platformData[platform];
  if (!data) return null;

  const handleOpenSite = () => {
    window.open(data.url, "_blank");
    setHasVisited(true);
  };

  const handleContinue = () => {
    if (data.needsId && !profileId.trim()) return;
    if (!hasVisited) return;
    onComplete();
  };

  const canContinue = hasVisited && (!data.needsId || profileId.trim().length > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50"
            onClick={onClose}
          />

          {/* Modal - Fixed positioning */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="glass-card rounded-3xl overflow-hidden relative">
                {/* Background */}
                <div className="absolute inset-0 opacity-30">
                  <div className={cn("absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] bg-gradient-to-br", data.gradient)} />
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 rounded-xl glass-button hover:bg-secondary z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative z-10 p-6 md:p-8">
                  {/* Platform logo */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className={cn("w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-2xl flex items-center justify-center text-3xl md:text-4xl bg-gradient-to-br shadow-xl", data.gradient)}
                  >
                    {data.logo}
                  </motion.div>

                  {/* Title */}
                  <h2 className="text-xl md:text-2xl font-black text-center mb-2">{t("register.title")}</h2>
                  <p className="text-sm text-muted-foreground text-center mb-4 md:mb-6">{t("register.subtitle")}</p>

                  {/* Steps */}
                  <div className="space-y-2 mb-4 md:mb-6">
                    {[t("register.step1"), t("register.step2"), data.needsId ? t("register.step3") : null].filter(Boolean).map((step, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                          {i + 1}
                        </div>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>

                  {/* Open site button */}
                  <button
                    onClick={handleOpenSite}
                    className={cn(
                      "w-full py-3.5 md:py-4 rounded-xl font-bold text-base md:text-lg flex items-center justify-center gap-2 mb-3 md:mb-4 transition-all",
                      hasVisited
                        ? "bg-success/20 text-success border border-success/30"
                        : "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground glow-primary interactive-scale"
                    )}
                  >
                    {hasVisited ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        {data.name}
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-5 h-5" />
                        {t("register.openSite")} {data.name}
                      </>
                    )}
                  </button>

                  {/* VPN Warning */}
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-warning/10 border border-warning/20 mb-4 md:mb-6">
                    <Wifi className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                    <p className="text-xs md:text-sm text-warning">{t("register.vpnWarning")}</p>
                  </div>

                  {/* Profile ID input (only for PocketOption and 1Win) */}
                  {data.needsId && hasVisited && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 md:mb-6"
                    >
                      <label className="text-sm text-muted-foreground font-medium mb-2 block">
                        {t("register.profileId")}
                      </label>
                      <input
                        type="text"
                        placeholder={t("register.profileIdPlaceholder")}
                        value={profileId}
                        onChange={(e) => setProfileId(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl glass-input text-base outline-none"
                      />
                    </motion.div>
                  )}

                  {/* Continue button */}
                  <button
                    onClick={handleContinue}
                    disabled={!canContinue}
                    className={cn(
                      "w-full py-3.5 md:py-4 rounded-xl font-bold text-base md:text-lg flex items-center justify-center gap-2 transition-all",
                      canContinue
                        ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground glow-primary interactive-scale"
                        : "glass-button text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    {canContinue ? (
                      <>
                        {t("register.continue")}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    ) : (
                      t("register.visitFirst")
                    )}
                  </button>

                  {/* Security badge */}
                  <div className="flex items-center justify-center gap-2 mt-3 md:mt-4 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4 text-success" />
                    <span>{t("platform.broker")} • SSL</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
