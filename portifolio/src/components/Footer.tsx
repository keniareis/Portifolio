const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-[#180030] text-neutral-400 text-xs flex items-center justify-center h-12 mt-16 border-t border-neutral-700/40">
            <p>Copyright © Kenia Reis · {year}</p>
        </footer>
    );
};

export default Footer;
