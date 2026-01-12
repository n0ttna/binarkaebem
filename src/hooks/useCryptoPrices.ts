import { useState, useEffect } from "react";

interface CryptoPrice {
  pair: string;
  price: string;
  change: number;
  up: boolean;
}

export const useCryptoPrices = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([
    { pair: "BTC/USD", price: "Loading...", change: 0, up: true },
    { pair: "ETH/USD", price: "Loading...", change: 0, up: true },
    { pair: "EUR/USD", price: "1.0892", change: 0.12, up: true },
    { pair: "XAU/USD", price: "2,024.50", change: 0.45, up: true },
  ]);
  const [signalsCount, setSignalsCount] = useState(247);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
        );
        const data = await response.json();

        if (data.bitcoin && data.ethereum) {
          setPrices([
            {
              pair: "BTC/USD",
              price: data.bitcoin.usd.toLocaleString("en-US", { maximumFractionDigits: 2 }),
              change: parseFloat(data.bitcoin.usd_24h_change?.toFixed(2) || "0"),
              up: (data.bitcoin.usd_24h_change || 0) >= 0,
            },
            {
              pair: "ETH/USD",
              price: data.ethereum.usd.toLocaleString("en-US", { maximumFractionDigits: 2 }),
              change: parseFloat(data.ethereum.usd_24h_change?.toFixed(2) || "0"),
              up: (data.ethereum.usd_24h_change || 0) >= 0,
            },
            { pair: "EUR/USD", price: "1.0892", change: 0.12, up: true },
            { pair: "XAU/USD", price: "2,024.50", change: 0.45, up: true },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch crypto prices:", error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate signals count update
  useEffect(() => {
    const interval = setInterval(() => {
      setSignalsCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return { prices, signalsCount };
};
