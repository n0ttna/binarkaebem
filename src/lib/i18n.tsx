import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "ru" | "en" | "uz" | "tg";

export const languages: { id: Language; label: string; flag: string }[] = [
  { id: "ru", label: "Русский", flag: "🇷🇺" },
  { id: "en", label: "English", flag: "🇺🇸" },
  { id: "uz", label: "O'zbek", flag: "🇺🇿" },
  { id: "tg", label: "Тоҷикӣ", flag: "🇹🇯" },
];

const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Header
    "header.online": "онлайн",
    "header.marketOpen": "Рынок открыт",
    "header.tagline": "Торговые сигналы нового поколения",
    "header.winrate": "Винрейт",
    "header.signalsToday": "Сигналов сегодня",
    "header.profit": "Прибыль",
    
    // Landing
    "landing.title": "Торговые сигналы",
    "landing.titleHighlight": "нового поколения",
    "landing.subtitle": "Получайте точные сигналы для бинарных опционов с винрейтом до 95%. Бесплатно и без регистрации.",
    "landing.startButton": "Начать торговлю",
    "landing.stats.accuracy": "Точность",
    "landing.stats.signals": "Сигналов",
    "landing.stats.users": "Пользователей",
    "landing.stats.platforms": "Платформы",
    "landing.features.realtime": "Сигналы в реальном времени",
    "landing.features.realtimeDesc": "Мгновенное получение торговых сигналов",
    "landing.features.accuracy": "Высокая точность",
    "landing.features.accuracyDesc": "Винрейт более 87%",
    "landing.features.free": "Полностью бесплатно",
    "landing.features.freeDesc": "Без подписок и скрытых платежей",
    
    // Platform selector
    "platform.title": "Выберите",
    "platform.titleHighlight": "платформу",
    "platform.subtitle": "Мы работаем только с проверенными лицензированными брокерами",
    "platform.minDeposit": "Мин. депозит",
    "platform.payout": "Выплата",
    "platform.broker": "Проверенный брокер",
    "platform.select": "Выбрать",
    
    // Registration modal
    "register.title": "Регистрация на платформе",
    "register.subtitle": "Для получения сигналов необходимо зарегистрироваться на платформе",
    "register.step1": "Перейдите на сайт платформы",
    "register.step2": "Пройдите регистрацию",
    "register.step3": "Вернитесь и введите ID профиля",
    "register.openSite": "Открыть сайт",
    "register.vpnWarning": "Если ссылка не работает — включите VPN",
    "register.profileId": "ID профиля",
    "register.profileIdPlaceholder": "Введите ваш ID с платформы",
    "register.continue": "Продолжить",
    "register.visitFirst": "Сначала посетите сайт платформы",
    
    // Currency pair selector
    "pair.title": "Выберите",
    "pair.titleHighlight": "валютную пару",
    "pair.subtitle": "активов с точностью сигналов до 90%",
    "pair.search": "Поиск актива...",
    "pair.hot": "🔥 Горячие",
    "pair.forex": "💱 Forex",
    "pair.crypto": "₿ Крипто",
    "pair.commodities": "🥇 Товары",
    "pair.all": "📊 Все",
    "pair.notFound": "Ничего не найдено",
    "pair.tryAnother": "Попробуйте изменить запрос",
    
    // Expiration selector
    "expiration.title": "Время",
    "expiration.titleHighlight": "экспирации",
    "expiration.subtitle": "Выберите время закрытия сделки для получения точного сигнала",
    "expiration.turbo": "Турбо",
    "expiration.short": "Короткие",
    "expiration.medium": "Средние",
    "expiration.long": "Длинные",
    "expiration.highRisk": "Высокий риск",
    "expiration.mediumRisk": "Средний риск",
    "expiration.lowRisk": "Низкий риск",
    "expiration.recommended": "Рекомендуется",
    
    // Signal
    "signal.analyzing": "Анализ рынка...",
    "signal.connecting": "Подключение к серверу...",
    "signal.syncChart": "Синхронизация графика...",
    "signal.analyzeCandle": "Анализ свечного паттерна...",
    "signal.checkIndicators": "Проверка индикаторов RSI, MACD...",
    "signal.analyzeVolume": "Анализ объёмов...",
    "signal.calculateProb": "Расчёт вероятности...",
    "signal.generateSignal": "Генерация сигнала...",
    "signal.confidence": "Уверенность",
    "signal.callUp": "CALL ↑",
    "signal.putDown": "PUT ↓",
    "signal.betUp": "Ставьте на повышение",
    "signal.betDown": "Ставьте на понижение",
    "signal.expiresIn": "До экспирации осталось",
    "signal.expired": "Время истекло",
    "signal.win": "ПОБЕДА!",
    "signal.loss": "Убыток",
    "signal.getNew": "Получить новый сигнал",
    "signal.waitEnd": "Дождитесь окончания сигнала",
    
    // Steps
    "step.platform": "Платформа",
    "step.pair": "Актив",
    "step.time": "Время",
    "step.signal": "Сигнал",
    "step.back": "Назад",
    "step.change": "Изменить",
    
    // Chart
    "chart.live": "LIVE",
    "chart.realtime": "График в реальном времени",
    "chart.max": "Макс",
    "chart.min": "Мин",
    "chart.avg": "Средн",
    "chart.spread": "Спред",
  },
  en: {
    "header.online": "online",
    "header.marketOpen": "Market open",
    "header.tagline": "Next-gen trading signals",
    "header.winrate": "Winrate",
    "header.signalsToday": "Signals today",
    "header.profit": "Profit",
    
    "landing.title": "Trading signals",
    "landing.titleHighlight": "of new generation",
    "landing.subtitle": "Get accurate signals for binary options with winrate up to 95%. Free and no registration required.",
    "landing.startButton": "Start trading",
    "landing.stats.accuracy": "Accuracy",
    "landing.stats.signals": "Signals",
    "landing.stats.users": "Users",
    "landing.stats.platforms": "Platforms",
    "landing.features.realtime": "Real-time signals",
    "landing.features.realtimeDesc": "Instant trading signals delivery",
    "landing.features.accuracy": "High accuracy",
    "landing.features.accuracyDesc": "Winrate over 87%",
    "landing.features.free": "Completely free",
    "landing.features.freeDesc": "No subscriptions or hidden fees",
    
    "platform.title": "Select",
    "platform.titleHighlight": "platform",
    "platform.subtitle": "We work only with verified licensed brokers",
    "platform.minDeposit": "Min. deposit",
    "platform.payout": "Payout",
    "platform.broker": "Verified broker",
    "platform.select": "Select",
    
    "register.title": "Platform Registration",
    "register.subtitle": "To receive signals, you need to register on the platform",
    "register.step1": "Go to the platform website",
    "register.step2": "Complete registration",
    "register.step3": "Return and enter your profile ID",
    "register.openSite": "Open website",
    "register.vpnWarning": "If link doesn't work — enable VPN",
    "register.profileId": "Profile ID",
    "register.profileIdPlaceholder": "Enter your ID from the platform",
    "register.continue": "Continue",
    "register.visitFirst": "Visit platform website first",
    
    "pair.title": "Select",
    "pair.titleHighlight": "currency pair",
    "pair.subtitle": "assets with signal accuracy up to 90%",
    "pair.search": "Search asset...",
    "pair.hot": "🔥 Hot",
    "pair.forex": "💱 Forex",
    "pair.crypto": "₿ Crypto",
    "pair.commodities": "🥇 Commodities",
    "pair.all": "📊 All",
    "pair.notFound": "Nothing found",
    "pair.tryAnother": "Try a different query",
    
    "expiration.title": "Expiration",
    "expiration.titleHighlight": "time",
    "expiration.subtitle": "Select trade closing time to get accurate signal",
    "expiration.turbo": "Turbo",
    "expiration.short": "Short",
    "expiration.medium": "Medium",
    "expiration.long": "Long",
    "expiration.highRisk": "High risk",
    "expiration.mediumRisk": "Medium risk",
    "expiration.lowRisk": "Low risk",
    "expiration.recommended": "Recommended",
    
    "signal.analyzing": "Analyzing market...",
    "signal.connecting": "Connecting to server...",
    "signal.syncChart": "Syncing chart...",
    "signal.analyzeCandle": "Analyzing candlestick pattern...",
    "signal.checkIndicators": "Checking RSI, MACD indicators...",
    "signal.analyzeVolume": "Analyzing volumes...",
    "signal.calculateProb": "Calculating probability...",
    "signal.generateSignal": "Generating signal...",
    "signal.confidence": "Confidence",
    "signal.callUp": "CALL ↑",
    "signal.putDown": "PUT ↓",
    "signal.betUp": "Bet on rise",
    "signal.betDown": "Bet on fall",
    "signal.expiresIn": "Expires in",
    "signal.expired": "Time expired",
    "signal.win": "WIN!",
    "signal.loss": "Loss",
    "signal.getNew": "Get new signal",
    "signal.waitEnd": "Wait for signal to end",
    
    "step.platform": "Platform",
    "step.pair": "Asset",
    "step.time": "Time",
    "step.signal": "Signal",
    "step.back": "Back",
    "step.change": "Change",
    
    "chart.live": "LIVE",
    "chart.realtime": "Real-time chart",
    "chart.max": "Max",
    "chart.min": "Min",
    "chart.avg": "Avg",
    "chart.spread": "Spread",
  },
  uz: {
    "header.online": "onlayn",
    "header.marketOpen": "Bozor ochiq",
    "header.tagline": "Yangi avlod savdo signallari",
    "header.winrate": "G'alaba darajasi",
    "header.signalsToday": "Bugungi signallar",
    "header.profit": "Foyda",
    
    "landing.title": "Savdo signallari",
    "landing.titleHighlight": "yangi avlod",
    "landing.subtitle": "95% gacha aniqlik bilan binar optsionlar uchun aniq signallarni oling. Bepul va ro'yxatdan o'tmasdan.",
    "landing.startButton": "Savdoni boshlash",
    "landing.stats.accuracy": "Aniqlik",
    "landing.stats.signals": "Signallar",
    "landing.stats.users": "Foydalanuvchilar",
    "landing.stats.platforms": "Platformalar",
    "landing.features.realtime": "Real vaqt signallari",
    "landing.features.realtimeDesc": "Savdo signallarini tezkor olish",
    "landing.features.accuracy": "Yuqori aniqlik",
    "landing.features.accuracyDesc": "87% dan yuqori g'alaba darajasi",
    "landing.features.free": "Butunlay bepul",
    "landing.features.freeDesc": "Obuna va yashirin to'lovlarsiz",
    
    "platform.title": "Tanlang",
    "platform.titleHighlight": "platforma",
    "platform.subtitle": "Biz faqat tasdiqlangan litsenziyalangan brokerlar bilan ishlaymiz",
    "platform.minDeposit": "Min. depozit",
    "platform.payout": "To'lov",
    "platform.broker": "Tasdiqlangan broker",
    "platform.select": "Tanlash",
    
    "register.title": "Platformada ro'yxatdan o'tish",
    "register.subtitle": "Signal olish uchun platformada ro'yxatdan o'tishingiz kerak",
    "register.step1": "Platforma saytiga o'ting",
    "register.step2": "Ro'yxatdan o'ting",
    "register.step3": "Qaytib keling va profil ID-ni kiriting",
    "register.openSite": "Saytni ochish",
    "register.vpnWarning": "Agar havola ishlamasa — VPN-ni yoqing",
    "register.profileId": "Profil ID",
    "register.profileIdPlaceholder": "Platformadan ID-ni kiriting",
    "register.continue": "Davom etish",
    "register.visitFirst": "Avval platforma saytiga tashrif buyuring",
    
    "pair.title": "Tanlang",
    "pair.titleHighlight": "valyuta juftligi",
    "pair.subtitle": "90% gacha signal aniqligi bilan aktivlar",
    "pair.search": "Aktiv qidirish...",
    "pair.hot": "🔥 Issiq",
    "pair.forex": "💱 Forex",
    "pair.crypto": "₿ Kripto",
    "pair.commodities": "🥇 Tovarlar",
    "pair.all": "📊 Hammasi",
    "pair.notFound": "Hech narsa topilmadi",
    "pair.tryAnother": "Boshqa so'rovni sinab ko'ring",
    
    "expiration.title": "Muddati",
    "expiration.titleHighlight": "tugash",
    "expiration.subtitle": "Aniq signal olish uchun savdo yopilish vaqtini tanlang",
    "expiration.turbo": "Turbo",
    "expiration.short": "Qisqa",
    "expiration.medium": "O'rtacha",
    "expiration.long": "Uzoq",
    "expiration.highRisk": "Yuqori xavf",
    "expiration.mediumRisk": "O'rtacha xavf",
    "expiration.lowRisk": "Past xavf",
    "expiration.recommended": "Tavsiya etiladi",
    
    "signal.analyzing": "Bozorni tahlil qilish...",
    "signal.connecting": "Serverga ulanish...",
    "signal.syncChart": "Grafikni sinxronlash...",
    "signal.analyzeCandle": "Sham shakli tahlili...",
    "signal.checkIndicators": "RSI, MACD ko'rsatkichlarini tekshirish...",
    "signal.analyzeVolume": "Hajmlarni tahlil qilish...",
    "signal.calculateProb": "Ehtimollikni hisoblash...",
    "signal.generateSignal": "Signal yaratish...",
    "signal.confidence": "Ishonch",
    "signal.callUp": "CALL ↑",
    "signal.putDown": "PUT ↓",
    "signal.betUp": "Ko'tarilishga tikish",
    "signal.betDown": "Tushishga tikish",
    "signal.expiresIn": "Tugashga qoldi",
    "signal.expired": "Vaqt tugadi",
    "signal.win": "G'ALABA!",
    "signal.loss": "Zarar",
    "signal.getNew": "Yangi signal olish",
    "signal.waitEnd": "Signal tugashini kuting",
    
    "step.platform": "Platforma",
    "step.pair": "Aktiv",
    "step.time": "Vaqt",
    "step.signal": "Signal",
    "step.back": "Orqaga",
    "step.change": "O'zgartirish",
    
    "chart.live": "JONLI",
    "chart.realtime": "Real vaqt grafigi",
    "chart.max": "Maks",
    "chart.min": "Min",
    "chart.avg": "O'rtacha",
    "chart.spread": "Spread",
  },
  tg: {
    "header.online": "онлайн",
    "header.marketOpen": "Бозор кушода",
    "header.tagline": "Сигналҳои савдои насли нав",
    "header.winrate": "Дараҷаи ғалаба",
    "header.signalsToday": "Сигналҳои имрӯза",
    "header.profit": "Фоида",
    
    "landing.title": "Сигналҳои савдо",
    "landing.titleHighlight": "насли нав",
    "landing.subtitle": "Сигналҳои дақиқро барои опсияҳои бинарӣ бо дақиқии то 95% гиред. Ройгон ва бе қайд.",
    "landing.startButton": "Оғози савдо",
    "landing.stats.accuracy": "Дақиқӣ",
    "landing.stats.signals": "Сигналҳо",
    "landing.stats.users": "Истифодабарандагон",
    "landing.stats.platforms": "Платформаҳо",
    "landing.features.realtime": "Сигналҳои вақти воқеӣ",
    "landing.features.realtimeDesc": "Гирифтани фаврии сигналҳои савдо",
    "landing.features.accuracy": "Дақиқии баланд",
    "landing.features.accuracyDesc": "Дараҷаи ғалаба зиёда аз 87%",
    "landing.features.free": "Пурра ройгон",
    "landing.features.freeDesc": "Бе обуна ва пардохтҳои пинҳонӣ",
    
    "platform.title": "Интихоб кунед",
    "platform.titleHighlight": "платформа",
    "platform.subtitle": "Мо танҳо бо брокерҳои тасдиқшуда кор мекунем",
    "platform.minDeposit": "Депозити мин.",
    "platform.payout": "Пардохт",
    "platform.broker": "Брокери тасдиқшуда",
    "platform.select": "Интихоб",
    
    "register.title": "Қайд дар платформа",
    "register.subtitle": "Барои гирифтани сигналҳо, шумо бояд дар платформа қайд шавед",
    "register.step1": "Ба сайти платформа гузаред",
    "register.step2": "Қайдро гузаронед",
    "register.step3": "Баргардед ва ID-и профилро ворид кунед",
    "register.openSite": "Кушодани сайт",
    "register.vpnWarning": "Агар пайванд кор накунад — VPN-ро фаъол созед",
    "register.profileId": "ID-и профил",
    "register.profileIdPlaceholder": "ID-и худро аз платформа ворид кунед",
    "register.continue": "Идома",
    "register.visitFirst": "Аввал сайти платформаро боздид кунед",
    
    "pair.title": "Интихоб кунед",
    "pair.titleHighlight": "ҷуфти асъор",
    "pair.subtitle": "активҳо бо дақиқии сигнал то 90%",
    "pair.search": "Ҷустуҷӯи актив...",
    "pair.hot": "🔥 Гарм",
    "pair.forex": "💱 Форекс",
    "pair.crypto": "₿ Крипто",
    "pair.commodities": "🥇 Молҳо",
    "pair.all": "📊 Ҳама",
    "pair.notFound": "Чизе ёфт нашуд",
    "pair.tryAnother": "Дархости дигарро санҷед",
    
    "expiration.title": "Вақти",
    "expiration.titleHighlight": "анҷом",
    "expiration.subtitle": "Барои гирифтани сигнали дақиқ вақти пӯшидани савдоро интихоб кунед",
    "expiration.turbo": "Турбо",
    "expiration.short": "Кӯтоҳ",
    "expiration.medium": "Миёна",
    "expiration.long": "Дароз",
    "expiration.highRisk": "Хатари баланд",
    "expiration.mediumRisk": "Хатари миёна",
    "expiration.lowRisk": "Хатари паст",
    "expiration.recommended": "Тавсия мешавад",
    
    "signal.analyzing": "Таҳлили бозор...",
    "signal.connecting": "Пайвастшавӣ ба сервер...",
    "signal.syncChart": "Ҳамоҳангсозии график...",
    "signal.analyzeCandle": "Таҳлили шакли шамъ...",
    "signal.checkIndicators": "Санҷиши нишондиҳандаҳои RSI, MACD...",
    "signal.analyzeVolume": "Таҳлили ҳаҷмҳо...",
    "signal.calculateProb": "Ҳисоби эҳтимолият...",
    "signal.generateSignal": "Эҷоди сигнал...",
    "signal.confidence": "Боварӣ",
    "signal.callUp": "CALL ↑",
    "signal.putDown": "PUT ↓",
    "signal.betUp": "Ба боло гузоред",
    "signal.betDown": "Ба поён гузоред",
    "signal.expiresIn": "То анҷом монд",
    "signal.expired": "Вақт гузашт",
    "signal.win": "ҒАЛАБА!",
    "signal.loss": "Зарар",
    "signal.getNew": "Гирифтани сигнали нав",
    "signal.waitEnd": "Анҷоми сигналро интизор шавед",
    
    "step.platform": "Платформа",
    "step.pair": "Актив",
    "step.time": "Вақт",
    "step.signal": "Сигнал",
    "step.back": "Бозгашт",
    "step.change": "Тағйир",
    
    "chart.live": "ЗИНДА",
    "chart.realtime": "Графики вақти воқеӣ",
    "chart.max": "Макс",
    "chart.min": "Мин",
    "chart.avg": "Миёна",
    "chart.spread": "Спред",
  },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "ru";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.ru[key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
};
