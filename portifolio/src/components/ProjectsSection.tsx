import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, X } from 'lucide-react';
import { IN_PROGRESS_PROJECTS, PROJECTS, type Project } from '../constants';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../i18n/useLanguage';
import Reveal from './Reveal';

const ProjectsSection = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const { ref, inView } = useInView<HTMLElement>();
    const { lang, t } = useLanguage();

    useEffect(() => {
        if (!selectedProject) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setSelectedProject(null);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedProject]);

    return (
        <section
            id="projetos"
            ref={ref}
            className={`preahvihear-regular mt-32 px-6 lg:px-20 max-w-7xl mx-auto transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
            <h2 className="text-4xl font-bold text-white text-center mb-10">{t.projects.heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {PROJECTS.map((project, index) => (
                    <Reveal
                        key={project.name}
                        delayMs={index * 80}
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
                                    {t.projects.verImagem}
                                </span>
                            </div>
                        </button>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-white">{project.name}</h4>
                                <p className="text-sm text-gray-400">{project.subtitle[lang]}</p>
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
                                    {t.projects.verMais} <ArrowUpRight size={14} />
                                </a>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">🚧 {t.projects.emAndamento}</p>
                <div className="flex flex-wrap justify-center gap-3">
                    {IN_PROGRESS_PROJECTS.map((project, index) => (
                        <Reveal
                            key={project.name.en}
                            delayMs={index * 80}
                            className="flex items-center gap-2 border border-purple-900/50 rounded-full px-4 py-2 bg-neutral-900/40"
                        >
                            <span className="text-sm text-white font-semibold">
                                {project.name[lang]}
                                {project.subtitle && (
                                    <span className="text-gray-400 font-normal"> · {project.subtitle[lang]}</span>
                                )}
                            </span>
                            <span className="text-xs text-gray-400">{project.tags.join(' · ')}</span>
                        </Reveal>
                    ))}
                </div>
            </div>

            {selectedProject && createPortal(
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
                </div>,
                document.body
            )}
        </section>
    );
};

export default ProjectsSection;
