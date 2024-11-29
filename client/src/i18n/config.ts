import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ru from './locales/ru/translation.json';
import ua from './locales/ua/translation.json';
i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'ru',
        resources: {
            ru: {
                translations: ru,
            },
            ua: {
                translations: ua,
            },
        },
        defaultNS: 'translations',
    });
export default i18n;