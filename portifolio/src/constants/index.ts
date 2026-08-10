import javaIcon from '../assets/java.png';
import springIcon from '../assets/spring.png';
import nodejsIcon from '../assets/nodejs.png';
import kafkaIcon from '../assets/kafka-logo.png';
import reactIcon from '../assets/React-icon.png';
import flutterIcon from '../assets/flutter.png';
import postgresIcon from '../assets/postgres.png';
import mysqlIcon from '../assets/sql.png';
import mongodbIcon from '../assets/mongodb-icon.svg';
import dockerIcon from '../assets/docker.png';
import gitIcon from '../assets/git.png';
import sdcVideo from '../assets/Sdc.mp4';
import alumniVideo from '../assets/alumni.mp4';
import faltamaisVideo from '../assets/faltamais.mp4';
import prosperImg from '../assets/prosper.png';

export const NAV_LINKS = [
    { key: "sobre", href: "#sobre" },
    { key: "projetos", href: "#projetos" },
    { key: "habilidades", href: "#habilidades" },
    { key: "contato", href: "#contato" },
] as const;

export type Project = {
    name: string;
    subtitle: { pt: string; en: string };
    media: { type: "video" | "image"; src: string };
    tags: string[];
    link: string;
};

export const PROJECTS: Project[] = [
    {
        name: "Sabor de Casa",
        subtitle: { pt: "Fluxo de Padaria", en: "Bakery Flow" },
        media: { type: "video", src: sdcVideo },
        tags: ["Flutter", "Dart", "SQLite"],
        link: "https://github.com/keniareis/app-BakeryFlow",
    },
    {
        name: "Alumni IFMA",
        subtitle: { pt: "Plataforma Acadêmica", en: "Academic Platform" },
        media: { type: "video", src: alumniVideo },
        tags: ["Java", "SpringBoot", "React"],
        link: "https://alumni-academic-management-api.onrender.com",
    },
    {
        name: "Falta+",
        subtitle: { pt: "Controle de Aulas", en: "Class Control" },
        media: { type: "video", src: faltamaisVideo },
        tags: ["NodeJs", "Express", "html/css"],
        link: "https://github.com/keniareis/Falta_mais",
    },
    {
        name: "Prosper App",
        subtitle: { pt: "Gerenciador de Dívidas", en: "Debt Manager" },
        media: { type: "image", src: prosperImg },
        tags: ["Dart", "Flutter", "Firebase"],
        link: "https://github.com/hiagozavarize/prosper_app",
    },
];

export type InProgressProject = { name: { pt: string; en: string }; tags: string[] };

export const IN_PROGRESS_PROJECTS: InProgressProject[] = [
    { name: { pt: "LabTrack", en: "LabTrack" }, tags: ["Java", "React", "React Native"] },
    {
        name: { pt: "Plataforma de Documentação", en: "Documentation Platform" },
        tags: ["Java", "React"],
    },
];

export type Skill = { name: string; icon: string };

export const SKILLS: Skill[] = [
    { name: "Java", icon: javaIcon },
    { name: "Spring Boot", icon: springIcon },
    { name: "NodeJs", icon: nodejsIcon },
    { name: "Kafka", icon: kafkaIcon },
    { name: "React", icon: reactIcon },
    { name: "Flutter", icon: flutterIcon },
    { name: "Postgres", icon: postgresIcon },
    { name: "MySQL", icon: mysqlIcon },
    { name: "MongoDB", icon: mongodbIcon },
    { name: "Docker", icon: dockerIcon },
    { name: "Git", icon: gitIcon },
];