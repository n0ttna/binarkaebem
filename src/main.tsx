import { createRoot } from "react-dom/client";
import { I18nProvider } from "./lib/i18n";
import { ThemeProvider } from "./components/ThemeProvider";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <I18nProvider>
      <App />
    </I18nProvider>
  </ThemeProvider>
);
