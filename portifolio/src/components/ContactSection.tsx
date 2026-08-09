import { Github, Linkedin } from 'lucide-react';

const ContactSection = () => {
    return (
        <section id="contato" className="preahvihear-regular mt-32 px-6 lg:px-20 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Vamos conversar!</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Busco oportunidades para integrar equipes colaborativas e atuar no desenvolvimento de
                soluções de software com impacto real. Estou aberta a novas oportunidades, projetos e
                parcerias. Se quiser trocar ideias ou discutir uma possível colaboração, vamos nos conectar!
            </p>
            <a href="mailto:keniaolivereis@gmail.com" className="text-white hover:text-purple-400 transition">
                keniaolivereis@gmail.com
            </a>
            <div className="flex justify-center items-center gap-4 mt-6">
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
            </div>
        </section>
    );
};

export default ContactSection;
