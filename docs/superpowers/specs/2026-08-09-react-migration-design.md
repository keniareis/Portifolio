# Migração do portfólio estático para React

Data: 2026-08-09

## Contexto

O repositório tem duas versões do portfólio:

- **Raiz** (`index.html`, `style.css`, `assets/`): site estático original, atualmente publicado no GitHub Pages via "Deploy from a branch" (main/root).
- **`portifolio/`**: reescrita em React 19 + TypeScript + Vite + Tailwind, com `Navbar` e `HomeSection` (hero) já implementados (commits `3de7cd8`, `dffc1bc`).

Objetivo: completar a migração das seções que faltam (Projetos, Habilidades, Contato, rodapé) e publicar a versão React no GitHub Pages, mantendo o site estático da raiz intacto por enquanto.

## Escopo

- Migrar conteúdo 1:1 do site estático (mesmos projetos, skills, textos) para componentes React — sem redesign de conteúdo.
- Corrigir dois bugs pequenos já identificados que afetam este trabalho.
- Configurar publicação via GitHub Actions.
- **Fora de escopo**: remover os arquivos estáticos da raiz, redesenhar conteúdo, adicionar roteamento client-side.

## Arquitetura de componentes

Seguindo o padrão já estabelecido por `Navbar`/`HomeSection` (um componente por seção, sem abstrações genéricas — YAGNI: só há duas grids no site, não justifica um sistema de card configurável):

- `src/components/ProjectsSection.tsx` — `id="projetos"`. Grid de cards com mídia (vídeo `autoplay muted loop` ou imagem), nome, subtítulo, tags e link "Ver mais".
- `src/components/SkillsSection.tsx` — `id="habilidades"`. Grid de ícone + nome da tecnologia.
- `src/components/ContactSection.tsx` — `id="contato"`. Texto de call-to-action, email, ícones LinkedIn/GitHub.
- `src/components/Footer.tsx` — copyright.
- `HomeSection.tsx` recebe `id="sobre"` (o site estático não tinha uma seção "Sobre" separada; a bio já vive no hero, então o link "Sobre" do Navbar aponta pra lá).

`App.tsx` passa a compor: `Navbar`, `HomeSection`, `ProjectsSection`, `SkillsSection`, `ContactSection`, `Footer`.

`src/pages/Home/Home.tsx` (stub morto, não referenciado por nada) é removido.

## Dados

Em `src/constants/index.ts`, dois novos arrays, seguindo o padrão de `NAV_LINKS`:

```ts
export const PROJECTS = [
  {
    name: string,
    subtitle: string,
    media: { type: 'video' | 'image', src: string },
    tags: string[],
    link: string,
  },
  // ... os 6 projetos do site estático:
  // Sabor de Casa, Alumni IFMA, Falta+, Email-Service, Prosper App, Chess System
]

export const SKILLS = [
  { name: string, icon: string },
  // ... as 11 skills do site estático:
  // Java, Spring Boot, NodeJs, Kafka, React, Flutter,
  // Postgres, MySQL, MongoDB, Docker, Git
]
```

Assets: `portifolio/src/assets/` já contém cópia de todos os vídeos/imagens usados pelo site estático — nenhum asset novo precisa ser copiado, só referenciado nos novos componentes.

## Bugfixes incluídos

Encontrados durante a análise inicial do projeto, corrigidos junto por afetarem diretamente este trabalho:

1. `HomeSection.tsx:1` — `import React from 'react'` não utilizado, causa `TS6133` e quebra `npm run build` (`tsc -b`). React 19 com JSX transform automático não precisa do import.
2. `Navbar.tsx:37` — classe `bg-neutral-900` conflitando com `bg-[#300049]` no menu mobile (duas cores de fundo na mesma div, resíduo de edição).

## Deploy (GitHub Pages via GitHub Actions)

Hoje: Pages configurado como "Deploy from a branch" (main/root), servindo o `index.html` estático da raiz.

Mudanças:

1. `portifolio/vite.config.ts`: adicionar `base: '/Portifolio/'` (necessário para assets resolverem corretamente em `https://keniareis.github.io/Portifolio/`).
2. `.github/workflows/deploy.yml`: workflow que, em push para `main`, roda `npm ci && npm run build` dentro de `portifolio/`, sobe `portifolio/dist` como artefato e publica via `actions/deploy-pages`.
3. Trocar o Pages Source do repositório de "Deploy from a branch" para "GitHub Actions" via `gh api` (autenticação já configurada nesta máquina, conta `keniareis`, escopo `repo`).

Enquanto o Source não for trocado, o site estático da raiz continua sendo o publicado — nada quebra durante a transição.

## Verificação

- `npm run build` (garante que `tsc -b` e `vite build` passam, incluindo o novo `base`).
- `npm run lint`.
- Teste manual local via `npm run dev`: clicar em cada link do Navbar e confirmar que rola até a seção correta.
- Após o push: conferir que o workflow do Actions roda verde e que a URL do Pages carrega o site novo.
