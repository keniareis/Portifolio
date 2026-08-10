import { SKILLS } from '../constants';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../i18n/useLanguage';
import Reveal from './Reveal';

const SkillsSection = () => {
    const { ref, inView } = useInView<HTMLElement>();
    const { t } = useLanguage();

    return (
        <section
            id="habilidades"
            ref={ref}
            className={`preahvihear-regular mt-32 px-6 lg:px-20 max-w-5xl mx-auto text-center transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
            <h2 className="text-4xl font-bold text-white mb-10">{t.skills.heading}</h2>
            <div className="flex flex-wrap justify-center gap-5">
                {SKILLS.map((skill, index) => (
                    <Reveal
                        key={skill.name}
                        delayMs={index * 40}
                        className="bg-white/5 backdrop-blur-lg border border-neutral-700/40 rounded-lg shadow-md w-24 h-28 flex flex-col items-center justify-center gap-2"
                    >
                        <img className="w-10 h-10 object-contain" src={skill.icon} alt={skill.name} />
                        <h3 className="text-sm text-gray-200">{skill.name}</h3>
                    </Reveal>
                ))}
            </div>
        </section>
    );
};

export default SkillsSection;
