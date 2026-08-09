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
import emailImg from '../assets/email.png';
import prosperImg from '../assets/prosper.png';
import chessSystemImg from '../assets/chessSystem.png';

export const NAV_LINKS = [
    { label: "Sobre", href: "#sobre" },
    { label: "Projetos", href: "#projetos" },
    { label: "Habilidades", href: "#habilidades" },
    { label: "Contato", href: "#contato" },
]

export type Project = {
    name: string;
    subtitle: string;
    media: { type: "video" | "image"; src: string };
    tags: string[];
    link: string;
};

export const PROJECTS: Project[] = [
    {
        name: "Sabor de Casa",
        subtitle: "Bakery Flow",
        media: { type: "video", src: sdcVideo },
        tags: ["Flutter", "Dart", "SQLite"],
        link: "https://github.com/keniareis/app-BakeryFlow",
    },
    {
        name: "Alumni IFMA",
        subtitle: "Plataforma",
        media: { type: "video", src: alumniVideo },
        tags: ["Java", "SpringBoot", "React"],
        link: "https://github.com/Alumni-IFMA",
    },
    {
        name: "Falta+",
        subtitle: "Class Control",
        media: { type: "video", src: faltamaisVideo },
        tags: ["NodeJs", "Express", "html/css"],
        link: "https://github.com/keniareis/Falta_mais",
    },
    {
        name: "Email-Service",
        subtitle: "Uber Challenge",
        media: { type: "image", src: emailImg },
        tags: ["Java", "Spring boot", "AWS"],
        link: "https://github.com/keniareis/Email-Service-Uber-Challenge",
    },
    {
        name: "Prosper App",
        subtitle: "Gerenciador",
        media: { type: "image", src: prosperImg },
        tags: ["Dart", "Flutter", "Firebase"],
        link: "https://github.com/hiagozavarize/prosper_app",
    },
    {
        name: "Chess System",
        subtitle: "Xadrez no Terminal",
        media: { type: "image", src: chessSystemImg },
        tags: ["Java"],
        link: "https://github.com/keniareis/Chess-System",
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