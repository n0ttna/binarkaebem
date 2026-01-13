import { useState, useEffect, useMemo } from "react";

// Get online count based on time of day (200 at night, up to 1500 during day)
const getOnlineByTime = (): number => {
  const hour = new Date().getHours();
  
  // Night (00:00 - 06:00): 200-400
  if (hour >= 0 && hour < 6) {
    return 200 + Math.floor(Math.random() * 200);
  }
  // Morning (06:00 - 10:00): 400-800
  if (hour >= 6 && hour < 10) {
    return 400 + Math.floor((hour - 6) * 100 + Math.random() * 100);
  }
  // Day (10:00 - 18:00): 1000-1500
  if (hour >= 10 && hour < 18) {
    return 1000 + Math.floor(Math.random() * 500);
  }
  // Evening (18:00 - 22:00): 800-1200
  if (hour >= 18 && hour < 22) {
    return 800 + Math.floor(Math.random() * 400);
  }
  // Late evening (22:00 - 00:00): 400-600
  return 400 + Math.floor(Math.random() * 200);
};

// Get signals count based on time since midnight
const getSignalsCountByTime = (): number => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hour * 60 + minutes;
  
  // Approximately 15-20 signals per hour, so by end of day ~400
  const baseSignals = Math.floor(totalMinutes * 0.3);
  const randomFactor = Math.floor(Math.random() * 20);
  
  return baseSignals + randomFactor;
};

// Get profit based on time since midnight
const getProfitByTime = (): number => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hour * 60 + minutes;
  
  // Approximately $50-100 per hour profit
  const baseProfit = Math.floor(totalMinutes * 0.8);
  const randomFactor = Math.floor(Math.random() * 100);
  
  return baseProfit + randomFactor;
};

// Save/load platform from localStorage
const STORAGE_KEY = "signalpro_user_data";

interface UserData {
  platform: string | null;
  profileId: string | null;
  hasCompletedRegistration: boolean;
  lastVisit: string;
}

export const saveUserData = (data: Partial<UserData>) => {
  try {
    const existing = getUserData();
    const newData = { ...existing, ...data, lastVisit: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  } catch (e) {
    console.error("Failed to save user data:", e);
  }
};

export const getUserData = (): UserData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Failed to load user data:", e);
  }
  return {
    platform: null,
    profileId: null,
    hasCompletedRegistration: false,
    lastVisit: new Date().toISOString(),
  };
};

export const useDynamicStats = () => {
  const [onlineCount, setOnlineCount] = useState(getOnlineByTime());
  const [signalsCount, setSignalsCount] = useState(getSignalsCountByTime());
  const [profit, setProfit] = useState(getProfitByTime());

  useEffect(() => {
    // Update stats every 5 seconds with small variations
    const interval = setInterval(() => {
      setOnlineCount((prev) => {
        const target = getOnlineByTime();
        const diff = target - prev;
        // Smooth transition
        return prev + Math.floor(diff * 0.1) + Math.floor(Math.random() * 10) - 5;
      });
      
      setSignalsCount((prev) => {
        // Grow signals during the day
        if (Math.random() > 0.5) {
          return prev + Math.floor(Math.random() * 3) + 1;
        }
        return prev;
      });
      
      setProfit((prev) => {
        // Grow profit during the day
        if (Math.random() > 0.3) {
          return prev + Math.floor(Math.random() * 50) + 10;
        }
        return prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Reset at midnight
  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        setSignalsCount(0);
        setProfit(0);
      }
    };

    const interval = setInterval(checkMidnight, 60000);
    return () => clearInterval(interval);
  }, []);

  return {
    onlineCount: Math.max(200, onlineCount),
    signalsCount: Math.max(0, signalsCount),
    profit: Math.max(0, profit),
    winRate: 96, // Fixed at 96%
  };
};
