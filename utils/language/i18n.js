import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import it from "./translation/it";
import zh from "./zh";
// const fallbackLng = "en";
// const availableLanguages = ["en", "it", "zh"];

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "zh",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      //   en: {
      //     translation: {
      //       // here we will place our translations...
      //       welcomeMsg: "Welcome!",
      //     },
      //   },
      // it: {
      //   translation: it,
      // },
      zh: {
        translation: zh,
      },
    },
  });

export default i18n;
