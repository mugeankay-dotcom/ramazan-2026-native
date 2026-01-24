import I18n from 'i18n-js';
import * as Localization from 'expo-localization';
import tr from '../locales/tr.json';
import en from '../locales/en.json';
import de from '../locales/de.json';
import ar from '../locales/ar.json';
import fr from '../locales/fr.json';
import id from '../locales/id.json';
import ur from '../locales/ur.json';

I18n.translations = { tr, en, de, ar, fr, id, ur };
I18n.fallbacks = true;
I18n.defaultLocale = 'tr';

export const setLocale = (locale: string) => {
    I18n.locale = locale;
};

export const getLocale = () => I18n.locale;

export const t = (key: string, options?: object) => {
    return I18n.t(key, options);
};

export const isRTL = () => {
    const locale = I18n.locale;
    return locale === 'ar' || locale === 'ur';
};

export const supportedLanguages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export default I18n;
