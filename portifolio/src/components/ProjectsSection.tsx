import { PROJECTS } from '../constants';

const ProjectsSection = () => {
    return (
        <section id="projetos" className="preahvihear-regular mt-32 px-6 lg:px-20 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-10">Projetos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {PROJECTS.map((project) => (
                    <div
                        key={project.name}
                        className="border border-purple-900/50 rounded-lg p-5 flex flex-col justify-between bg-neutral-900/40"
                    >
                        <div className="rounded-md overflow-hidden mb-4">
                            {project.media.type === "video" ? (
                                <video className="w-full" autoPlay muted loop>
                                    <source src={project.media.src} type="video/mp4" />
                                </video>
                            ) : (
                                <img className="w-full" src={project.media.src} alt={project.name} />
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-white">{project.name}</h4>
                                <p className="text-sm text-gray-400">{project.subtitle}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className="flex flex-wrap justify-end gap-1">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-purple-950 text-purple-400 text-xs rounded px-3 py-1"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs text-gray-400 hover:text-purple-400 transition"
                                >
                                    Ver mais
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectsSection;
