import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SyncedStats {
  onlineCount: number;
  signalsCount: number;
  profit: number;
  winRate: number;
}

// Локальная генерация статистики (fallback и начальные значения)
const getLocalStats = (): SyncedStats => {
  const hour = new Date().getHours();
  let onlineCount: number;
  
  if (hour >= 0 && hour < 6) {
    onlineCount = 200 + Math.floor(Math.random() * 200);
  } else if (hour >= 6 && hour < 10) {
    onlineCount = 400 + Math.floor((hour - 6) * 100 + Math.random() * 100);
  } else if (hour >= 10 && hour < 18) {
    onlineCount = 1000 + Math.floor(Math.random() * 500);
  } else if (hour >= 18 && hour < 22) {
    onlineCount = 800 + Math.floor(Math.random() * 400);
  } else {
    onlineCount = 400 + Math.floor(Math.random() * 200);
  }

  const now = new Date();
  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  const signalsCount = Math.floor(totalMinutes * 0.3) + Math.floor(Math.random() * 20);
  const profit = Math.floor(totalMinutes * 0.8) + Math.floor(Math.random() * 100);

  return {
    onlineCount,
    signalsCount,
    profit,
    winRate: 96,
  };
};

export const useSyncedStats = () => {
  const [stats, setStats] = useState<SyncedStats>(getLocalStats);
  const [lastSyncTime, setLastSyncTime] = useState<number>(0);

  // Синхронизация с сервером
  const syncWithServer = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke('telegram-webhook', {
        body: {},
        method: 'GET',
      });

      // Fallback to URL params approach
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/telegram-webhook?action=get-stats`,
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        }
      );

      if (response.ok) {
        const serverStats = await response.json();
        setStats(serverStats);
        setLastSyncTime(Date.now());
      }
    } catch (error) {
      console.log('Using local stats (server sync failed)');
      // Продолжаем использовать локальные данные
    }
  }, []);

  // Обновление с небольшими вариациями
  const updateWithVariation = useCallback(() => {
    setStats(prev => {
      const localTarget = getLocalStats();
      
      return {
        onlineCount: Math.max(200, prev.onlineCount + Math.floor((localTarget.onlineCount - prev.onlineCount) * 0.1) + Math.floor(Math.random() * 10) - 5),
        signalsCount: Math.random() > 0.5 ? prev.signalsCount + Math.floor(Math.random() * 3) + 1 : prev.signalsCount,
        profit: Math.random() > 0.3 ? prev.profit + Math.floor(Math.random() * 50) + 10 : prev.profit,
        winRate: 96,
      };
    });
  }, []);

  useEffect(() => {
    // Первоначальная синхронизация
    syncWithServer();

    // Обновление каждые 5 секунд с вариациями
    const variationInterval = setInterval(updateWithVariation, 5000);
    
    // Синхронизация с сервером каждые 30 секунд
    const syncInterval = setInterval(syncWithServer, 30000);

    return () => {
      clearInterval(variationInterval);
      clearInterval(syncInterval);
    };
  }, [syncWithServer, updateWithVariation]);

  // Сброс в полночь
  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        setStats(prev => ({ ...prev, signalsCount: 0, profit: 0 }));
      }
    };

    const interval = setInterval(checkMidnight, 60000);
    return () => clearInterval(interval);
  }, []);

  return stats;
};