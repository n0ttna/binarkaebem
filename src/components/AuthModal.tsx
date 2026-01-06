import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff, Zap, Shield, Gift } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  type: "login" | "register";
  onClose: () => void;
  onSwitchType: (type: "login" | "register") => void;
}

export const AuthModal = ({ isOpen, type, onClose, onSwitchType }: AuthModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="glass-strong rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="relative p-6 pb-0">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold">
                      {type === "login" ? "Вход" : "Регистрация"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {type === "login" 
                        ? "Войдите в свой аккаунт" 
                        : "Создайте аккаунт бесплатно"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits for register */}
              {type === "register" && (
                <div className="px-6 pt-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-success/10 text-success text-xs">
                      <Gift className="w-4 h-4" />
                      <span>7 дней Premium</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 text-primary text-xs">
                      <Shield className="w-4 h-4" />
                      <span>Безопасно</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <div className="p-6 space-y-4">
                {type === "register" && (
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Имя</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-secondary/50 border border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-secondary/50 border border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Пароль</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-secondary/50 border border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {type === "login" && (
                  <div className="flex justify-end">
                    <button className="text-sm text-primary hover:underline">
                      Забыли пароль?
                    </button>
                  </div>
                )}

                <button className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg transition-all hover:opacity-90 glow-primary">
                  {type === "login" ? "Войти" : "Создать аккаунт"}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-4 bg-card text-muted-foreground">или</span>
                  </div>
                </div>

                {/* Social login */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium">
                    <span className="text-lg">🔵</span>
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium">
                    <span className="text-lg">📱</span>
                    Telegram
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-0 text-center">
                <p className="text-sm text-muted-foreground">
                  {type === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
                  <button
                    onClick={() => onSwitchType(type === "login" ? "register" : "login")}
                    className="text-primary hover:underline font-medium"
                  >
                    {type === "login" ? "Зарегистрироваться" : "Войти"}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
