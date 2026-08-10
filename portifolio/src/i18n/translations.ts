export type Lang = 'pt' | 'en';

export type Translations = {
    nav: {
        sobre: string;
        projetos: string;
        habilidades: string;
        contato: string;
        curriculo: string;
    };
    hero: {
        greeting: string;
        name: string;
        title: string;
        bio: string;
        cv: string;
        contact: string;
    };
    projects: {
        heading: string;
        verMais: string;
        verImagem: string;
        emAndamento: string;
    };
    skills: {
        heading: string;
    };
    contact: {
        heading: string;
        bio: string;
    };
};

export const translations: Record<Lang, Translations> = {
    pt: {
        nav: {
            sobre: 'Sobre',
            projetos: 'Projetos',
            habilidades: 'Habilidades',
            contato: 'Contato',
            curriculo: 'Currículo',
        },
        hero: {
            greeting: 'Olá! Sou a ',
            name: 'Kenia Reis',
            title: 'Full Stack Developer',
            bio: 'Desenvolvedora Full Stack com experiência em Java, Spring Boot, React, Python, SQL/NoSQL, Kafka e Docker. Atuo também como instrutora de Programação, Jogos e Robótica no projeto Mermãs Digitais, levando tecnologia para meninas e adolescentes. Estudante de Ciência da Computação no IFMA, sempre em busca de aprender novas tecnologias e resolver problemas com código limpo e boas práticas.',
            cv: 'Currículo',
            contact: 'Contato',
        },
        projects: {
            heading: 'Projetos',
            verMais: 'Ver mais',
            verImagem: 'Ver imagem',
            emAndamento: 'Em andamento',
        },
        skills: {
            heading: 'Habilidades',
        },
        contact: {
            heading: 'Vamos conversar!',
            bio: 'Busco oportunidades para integrar equipes colaborativas e atuar no desenvolvimento de soluções de software com impacto real. Estou aberta a novas oportunidades, projetos e parcerias. Se quiser trocar ideias ou discutir uma possível colaboração, vamos nos conectar!',
        },
    },
    en: {
        nav: {
            sobre: 'About',
            projetos: 'Projects',
            habilidades: 'Skills',
            contato: 'Contact',
            curriculo: 'Resume',
        },
        hero: {
            greeting: "Hi! I'm ",
            name: 'Kenia Reis',
            title: 'Full Stack Developer',
            bio: "Full Stack Developer experienced in Java, Spring Boot, React, Python, SQL/NoSQL, Kafka, and Docker. I also work as a Programming, Games, and Robotics instructor at the Mermãs Digitais project, bringing technology to girls and teenagers. Computer Science student at IFMA, always looking to learn new technologies and solve problems with clean code and best practices.",
            cv: 'Resume',
            contact: 'Contact',
        },
        projects: {
            heading: 'Projects',
            verMais: 'See more',
            verImagem: 'View image',
            emAndamento: 'In progress',
        },
        skills: {
            heading: 'Skills',
        },
        contact: {
            heading: "Let's talk!",
            bio: "I'm looking for opportunities to join collaborative teams and work on software solutions with real impact. I'm open to new opportunities, projects, and partnerships. If you'd like to exchange ideas or discuss a possible collaboration, let's connect!",
        },
    },
};
