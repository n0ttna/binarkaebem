import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    chat: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      type: string;
    };
    date: number;
    text?: string;
  };
}

async function sendMessage(chatId: number, text: string, options?: {
  reply_markup?: object;
  parse_mode?: string;
}) {
  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: options?.parse_mode || 'HTML',
      reply_markup: options?.reply_markup,
    }),
  });
  return response.json();
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    
    // Endpoint для установки webhook
    if (url.searchParams.get('action') === 'set-webhook') {
      const webhookUrl = url.searchParams.get('webhook_url');
      if (!webhookUrl) {
        return new Response(JSON.stringify({ error: 'webhook_url required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: webhookUrl }),
      });
      const result = await response.json();
      
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Endpoint для получения статистики (для синхронизации онлайна)
    if (url.searchParams.get('action') === 'get-stats') {
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

      return new Response(JSON.stringify({
        onlineCount,
        signalsCount,
        profit,
        winRate: 96,
        timestamp: Date.now(),
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Обработка webhook от Telegram
    const update: TelegramUpdate = await req.json();
    
    if (update.message?.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text;
      const firstName = update.message.from.first_name;
      const userId = update.message.from.id;

      if (text === '/start') {
        // Приветственное сообщение с кнопкой запуска Mini App
        const webAppUrl = 'https://binarkaebem.lovable.app';
        
        await sendMessage(chatId, 
          `🚀 <b>Добро пожаловать, ${firstName}!</b>\n\n` +
          `<b>SignalPro</b> — профессиональная система торговых сигналов для бинарных опционов.\n\n` +
          `📊 <b>Наша статистика:</b>\n` +
          `• Win Rate: <b>96%</b>\n` +
          `• Поддерживаемые платформы: Pocket Option, 1Win, Binarium\n` +
          `• Работаем 24/7\n\n` +
          `👇 Нажми кнопку ниже, чтобы открыть приложение:`,
          {
            reply_markup: {
              inline_keyboard: [[
                {
                  text: "🎯 Открыть SignalPro",
                  web_app: { url: webAppUrl }
                }
              ], [
                {
                  text: "📈 Наш канал",
                  url: "https://t.me/signalpro_channel"
                }
              ]]
            }
          }
        );
      } else if (text === '/help') {
        await sendMessage(chatId,
          `📚 <b>Помощь</b>\n\n` +
          `<b>Доступные команды:</b>\n` +
          `/start — Запустить бота\n` +
          `/help — Показать помощь\n` +
          `/stats — Статистика за сегодня\n\n` +
          `<b>Как пользоваться:</b>\n` +
          `1. Нажми кнопку "Открыть SignalPro"\n` +
          `2. Выбери платформу (Pocket Option, 1Win, Binarium)\n` +
          `3. Зарегистрируйся по партнерской ссылке\n` +
          `4. Выбери валютную пару и время экспирации\n` +
          `5. Получай сигналы и торгуй! 💰`
        );
      } else if (text === '/stats') {
        const now = new Date();
        const totalMinutes = now.getHours() * 60 + now.getMinutes();
        const signalsCount = Math.floor(totalMinutes * 0.3);
        const profit = Math.floor(totalMinutes * 0.8);
        
        await sendMessage(chatId,
          `📊 <b>Статистика за сегодня</b>\n\n` +
          `✅ Win Rate: <b>96%</b>\n` +
          `📡 Сигналов выдано: <b>${signalsCount}</b>\n` +
          `💰 Общая прибыль: <b>+$${profit}</b>\n` +
          `🕐 Время: ${now.toLocaleTimeString('ru-RU')}`
        );
      } else {
        await sendMessage(chatId,
          `❓ Не понял команду.\n\nИспользуй /help для списка команд или нажми кнопку ниже:`,
          {
            reply_markup: {
              inline_keyboard: [[
                {
                  text: "🎯 Открыть SignalPro",
                  web_app: { url: 'https://binarkaebem.lovable.app' }
                }
              ]]
            }
          }
        );
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});