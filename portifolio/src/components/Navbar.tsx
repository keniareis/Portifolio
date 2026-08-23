import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import { NAV_LINKS } from '../constants';
import { useLanguage } from '../i18n/useLanguage';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const { lang, toggleLang, t } = useLanguage();

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev);
    }

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setHidden(currentScrollY > lastScrollY && currentScrollY > 80);
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/40 transition-transform duration-300 ${
                hidden && !mobileMenuOpen ? '-translate-y-full' : 'translate-y-0'
            }`}
        >
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0 justify-center">
                        <img className="h-10 w-10 mr-2" src={logo} alt="logo" />
                        <span className="text-xl tracking-tight">Kenia Reis</span>
                    </div>
                    <ul className="hidden lg:flex ml-14 space-x-12">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <a href={link.href}>{t.nav[link.key]}</a>
                            </li>
                        ))}
                    </ul>
                    <div className="hidden lg:flex justify-center space-x-6 items-center">
                        <button
                            onClick={toggleLang}
                            className="text-xs border border-neutral-600 rounded-md px-2 py-1 hover:border-purple-400 transition"
                        >
                            {lang === 'pt' ? 'EN' : 'PT'}
                        </button>
                        <a href="#" className='bg-gradient-to-r from-purple-500 to-purple-800 py-2 px-3 rounded-md'>{t.nav.curriculo}</a>
                    </div>
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={toggleMobileMenu}>
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div className="bg-[#300049] fixed right-0 z-20 w-full p-12 flex flex-col items-center lg:hidden">
                        <ul>
                            {NAV_LINKS.map((item) => (
                                <li key={item.href} className="py-2">
                                    <a href={item.href} onClick={() => setMobileMenuOpen(false)}>{t.nav[item.key]}</a>
                                </li>
                            ))}
                        </ul>
                        <div className="flex items-center space-x-6">
                            <button
                                onClick={toggleLang}
                                className="text-xs border border-neutral-600 rounded-md px-2 py-1 hover:border-purple-400 transition"
                            >
                                {lang === 'pt' ? 'EN' : 'PT'}
                            </button>
                            <a href="#" className='bg-gradient-to-r from-purple-500 to-purple-800 py-2 px-3 border rounded-md'>{t.nav.curriculo}</a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
};

export default Navbar;