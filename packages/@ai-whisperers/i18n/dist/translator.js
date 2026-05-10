import es from './locales/es.json';
import en from './locales/en.json';
import gn from './locales/gn.json';
const messages = { es, en, gn };
export function useTranslations(locale = 'es') {
    const t = (key) => {
        const keys = key.split('.');
        let obj = messages[locale];
        for (const k of keys) {
            if (obj && typeof obj === 'object')
                obj = obj[k];
            else
                return key;
        }
        return typeof obj === 'string' ? obj : key;
    };
    return { t, locale };
}
//# sourceMappingURL=translator.js.map