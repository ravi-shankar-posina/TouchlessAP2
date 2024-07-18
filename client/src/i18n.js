// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import translationEN from "./locales/en/translation.json";
import translationJP from "./locales/jp/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationES from "./locales/es/translation.json";

// the translations
const resources = {
  en: { translation: translationEN },
  jp: { translation: translationJP },
  fr: { translation: translationFR },
  es: { translation: translationES },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en", // fallback language if selected language translation is missing

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
