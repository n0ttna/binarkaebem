import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Trophy, Target, Award, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface StreakCounterProps {
  wins: number;
  total: number;
}

export const StreakCounter = ({ wins, total }: StreakCounterProps) => {
  const [streak, setStreak] = useState(0);
  const [showBonus, setShowBonus] = useState(false);

  useEffect(() => {
    // Load streak from storage
    const savedStreak = localStorage.getItem('signalpro_streak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }
  }, []);

  useEffect(() => {
    // Check for streak milestones
    if (streak > 0 && streak % 5 === 0) {
      setShowBonus(true);
      setTimeout(() => setShowBonus(false), 3000);
    }
    
    // Save streak
    localStorage.setItem('signalpro_streak', streak.toString());
  }, [streak]);

  const incrementStreak = () => {
    setStreak(prev => prev + 1);
  };

  const resetStreak = () => {
    setStreak(0);
  };

  const winRate = total > 0 ? Math.round((wins / total) * 100) : 96;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-2xl p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <span className="font-semibold text-sm">Серия побед</span>
        </div>
        <motion.span 
          key={streak}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          className="text-2xl font-black gradient-text"
        >
          {streak}
        </motion.span>
      </div>

      {/* Streak milestones */}
      <div className="flex items-center gap-1 mb-2">
        {[5, 10, 15, 20, 25].map((milestone) => (
          <div 
            key={milestone}
            className={`flex-1 h-1.5 rounded-full transition-colors ${
              streak >= milestone ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-secondary'
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Target className="w-3 h-3" />
          До бонуса: {5 - (streak % 5)}
        </span>
        <span className="flex items-center gap-1">
          <Trophy className="w-3 h-3 text-gold" />
          Win Rate: {winRate}%
        </span>
      </div>

      {/* Bonus animation */}
      {showBonus && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              className="text-4xl mb-2"
            >
              🎉
            </motion.div>
            <p className="font-bold gradient-text">Бонус x{Math.floor(streak / 5)}!</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};