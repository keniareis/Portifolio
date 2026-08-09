const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-[#1A073E] text-neutral-400 text-xs flex items-center justify-center h-12 mt-16">
            <p>Copyright © Kenia Reis · {year}</p>
        </footer>
    );
};

export default Footer;
