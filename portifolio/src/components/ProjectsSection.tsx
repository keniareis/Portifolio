import { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { PROJECTS, type Project } from '../constants';

const ProjectsSection = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        if (!selectedProject) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setSelectedProject(null);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedProject]);

    return (
        <section id="projetos" className="preahvihear-regular mt-32 px-6 lg:px-20 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-10">Projetos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {PROJECTS.map((project) => (
                    <div
                        key={project.name}
                        className="border border-purple-900/50 rounded-lg p-5 flex flex-col justify-between bg-neutral-900/40"
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="rounded-md overflow-hidden mb-4 cursor-pointer group relative"
                        >
                            {project.media.type === "video" ? (
                                <video className="w-full" autoPlay muted loop>
                                    <source src={project.media.src} type="video/mp4" />
                                </video>
                            ) : (
                                <img className="w-full" src={project.media.src} alt={project.name} />
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 transition text-white text-sm font-semibold">
                                    Ver imagem
                                </span>
                            </div>
                        </button>
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
                                    className="flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 transition"
                                >
                                    Ver mais <ArrowUpRight size={14} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedProject && (
                <div
                    className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6"
                    onClick={() => setSelectedProject(null)}
                >
                    <button
                        type="button"
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-6 right-6 text-white hover:text-purple-400 transition"
                        aria-label="Fechar"
                    >
                        <X size={32} />
                    </button>
                    <div className="max-w-4xl w-full" onClick={(event) => event.stopPropagation()}>
                        {selectedProject.media.type === "video" ? (
                            <video className="w-full rounded-lg" autoPlay muted loop controls>
                                <source src={selectedProject.media.src} type="video/mp4" />
                            </video>
                        ) : (
                            <img
                                className="w-full rounded-lg"
                                src={selectedProject.media.src}
                                alt={selectedProject.name}
                            />
                        )}
                        <p className="text-white text-center mt-4 font-semibold">{selectedProject.name}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProjectsSection;
