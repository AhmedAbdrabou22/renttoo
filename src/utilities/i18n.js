import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import TranslateEn from '../pages/locales/translationAr';
import TranslateAR from '../pages/locales/translationEn';
const resources = {
    en: {
        translation: TranslateEn,
    },
    ar: {
        translation: TranslateAR,
    },
};

i18n.use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'ar',

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
