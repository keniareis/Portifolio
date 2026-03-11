import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/logo.svg';
import { NAV_LINKS } from '../constants';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev);
    }
    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/40">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0 justify-center">
                        <img className="h-10 w-10 mr-2" src={logo} alt="logo" />
                        <span className="text-xl tracking-tight">Kenia Reis</span>
                    </div>
                    <ul className="hidden lg:flex ml-14 space-x-12">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <a href={link.href}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                    <div className="hidden lg:flex justify-center space-x-12 items-center">
                        <a href="#" className='bg-gradient-to-r from-purple-500 to-purple-800 py-2 px-3 rounded-md'>Currículo</a>
                    </div>
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={toggleMobileMenu}>
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div className="bg-[#300049] fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col items-center lg:hidden">
                        <ul>
                            {NAV_LINKS.map((item, index) => (
                                <li key={index} className="py-2">
                                    <a href={item.href}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                        <div className="flex space-x-6">
                            <a href="#" className='bg-gradient-to-r from-purple-500 to-purple-800 py-2 px-3 border rounded-md'>Currículo</a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
};

export default Navbar;