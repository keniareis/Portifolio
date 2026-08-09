import { SKILLS } from '../constants';

const SkillsSection = () => {
    return (
        <section id="habilidades" className="preahvihear-regular mt-32 px-6 lg:px-20 max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-10">Habilidades</h2>
            <div className="flex flex-wrap justify-center gap-5">
                {SKILLS.map((skill) => (
                    <div
                        key={skill.name}
                        className="bg-neutral-900 rounded-lg shadow-md w-24 h-28 flex flex-col items-center justify-center gap-2"
                    >
                        <img className="w-10 h-10 object-contain" src={skill.icon} alt={skill.name} />
                        <h3 className="text-sm text-gray-200">{skill.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SkillsSection;
