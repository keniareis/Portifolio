import logo from '../assets/logo.svg';
import { NAV_LINKS } from '../constants';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-center items-center">
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
                </div>
            </div>
        </nav>
    )
};

export default Navbar;