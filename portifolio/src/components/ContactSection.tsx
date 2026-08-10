import { Github, Linkedin } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../i18n/useLanguage';
import Reveal from './Reveal';

const ContactSection = () => {
    const { ref, inView } = useInView<HTMLElement>();
    const { t } = useLanguage();

    return (
        <section
            id="contato"
            ref={ref}
            className={`preahvihear-regular mt-32 px-6 lg:px-20 max-w-3xl mx-auto text-center transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
            <Reveal>
                <h2 className="text-2xl font-semibold text-white mb-4">{t.contact.heading}</h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {t.contact.bio}
                </p>
                <a href="mailto:keniaolivereis@gmail.com" className="text-white hover:text-purple-400 transition">
                    keniaolivereis@gmail.com
                </a>
            </Reveal>
            <Reveal delayMs={120} className="flex justify-center items-center gap-4 mt-6">
                <a
                    href="https://www.linkedin.com/in/keniareis/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-300 hover:text-purple-400 transition"
                >
                    <Linkedin size={28} />
                </a>
                <a
                    href="https://github.com/keniareis"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-300 hover:text-purple-400 transition"
                >
                    <Github size={28} />
                </a>
            </Reveal>
        </section>
    );
};

export default ContactSection;
