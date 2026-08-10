import { createContext } from 'react';
import type { Lang, Translations } from './translations';

export type LanguageContextValue = {
    lang: Lang;
    toggleLang: () => void;
    t: Translations;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);
