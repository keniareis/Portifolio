import { useState, type ReactNode } from 'react';
import { translations, type Lang } from './translations';
import { LanguageContext } from './context';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Lang>('pt');
    const toggleLang = () => setLang((prev) => (prev === 'pt' ? 'en' : 'pt'));

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
            {children}
        </LanguageContext.Provider>
    );
};
