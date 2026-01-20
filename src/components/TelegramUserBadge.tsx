import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";

export const TelegramUserBadge = () => {
  const { isTelegram, user } = useTelegramWebApp();

  if (!isTelegram || !user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card text-sm"
    >
      {user.photo_url ? (
        <img 
          src={user.photo_url} 
          alt={user.first_name} 
          className="w-6 h-6 rounded-full"
        />
      ) : (
        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
          <User className="w-3 h-3 text-primary" />
        </div>
      )}
      <span className="font-medium">
        {user.first_name}
        {user.is_premium && <span className="ml-1">⭐</span>}
      </span>
    </motion.div>
  );
};