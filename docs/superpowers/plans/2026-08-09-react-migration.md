# React Migration of Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish migrating the static portfolio (Projects, Skills, Contact, footer) into the in-progress React app under `portifolio/`, fix two small pre-existing bugs, and publish the React build to GitHub Pages via GitHub Actions.

**Architecture:** One React function component per page section (already the pattern for `Navbar`/`HomeSection`), composed directly in `App.tsx` — no router, sections are addressed by `id` + anchor links already defined in `NAV_LINKS`. Content (project list, skill list) lives as typed arrays in `src/constants/index.ts`, same pattern as the existing `NAV_LINKS` export.

**Tech Stack:** React 19, TypeScript, Vite 7, Tailwind CSS 3, lucide-react (icons). No test framework is configured in this project (no vitest/jest) — verification per task is `tsc -b` / `vite build` / `eslint` plus a manual check in the browser via `npm run dev`, not automated unit tests.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-09-react-migration-design.md`
- Content parity: reuse the exact project list, skill list, and contact copy from the root `index.html` — no content redesign.
- Do not touch the root static site (`index.html`, `style.css`, `assets/`) — out of scope, kept as-is.
- Do not add a router or change `NAV_LINKS` — anchors only.
- Only the two bugfixes named below touch already-built files (`HomeSection.tsx`, `Navbar.tsx`); nothing else in those files changes.
- `npm run build` (`tsc -b && vite build`) and `npm run lint` must both pass with zero errors after every task that touches `portifolio/`.
- GitHub CLI (`gh`) is installed and authenticated on this machine as `keniareis` with `repo` scope — usable for the GitHub Pages source switch in Task 9.

---

### Task 1: Fix pre-existing bugs in HomeSection and Navbar

**Files:**
- Modify: `portifolio/src/components/HomeSection.tsx:1` (remove unused import, add section id)
- Modify: `portifolio/src/components/Navbar.tsx:37` (remove duplicate background class)

**Interfaces:**
- Produces: `HomeSection`'s root `<section>` now has `id="sobre"`, which `NAV_LINKS`'s `{ label: "Sobre", href: "#sobre" }` (already defined in `constants/index.ts`) will scroll to.

- [ ] **Step 1: Remove the unused `React` import and add `id="sobre"` in HomeSection.tsx**

Current top of file:
```tsx
import React from 'react'
import foto from '../assets/foto.jpg'
import { FileText } from 'lucide-react'
```
and:
```tsx
    <section className="preahvihear-regular flex items-center gap-12 mt-20 px-6 lg:px-20 max-w-7xl mx-auto">
```

Change to:
```tsx
import foto from '../assets/foto.jpg'
import { FileText } from 'lucide-react'
```
and:
```tsx
    <section id="sobre" className="preahvihear-regular flex items-center gap-12 mt-20 px-6 lg:px-20 max-w-7xl mx-auto">
```

- [ ] **Step 2: Remove the conflicting `bg-neutral-900` class in Navbar.tsx**

Current line 37:
```tsx
                    <div className="bg-[#300049] fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col items-center lg:hidden">
```

Change to:
```tsx
                    <div className="bg-[#300049] fixed right-0 z-20 w-full p-12 flex flex-col items-center lg:hidden">
```

- [ ] **Step 3: Verify build and lint pass**

Run (from `portifolio/`):
```bash
npm run build
npm run lint
```
Expected: both exit 0, no `TS6133` error, no lint errors.

- [ ] **Step 4: Commit**

```bash
git add portifolio/src/components/HomeSection.tsx portifolio/src/components/Navbar.tsx
git commit -m "fix: remove unused React import and duplicate navbar background class"
```

---

### Task 2: Remove dead Home page

**Files:**
- Delete: `portifolio/src/pages/Home/Home.tsx`
- Delete directory: `portifolio/src/pages/` (if empty after the file removal)

**Interfaces:**
- None — this file is not imported anywhere (`App.tsx` renders `HomeSection` directly).

- [ ] **Step 1: Delete the file and its now-empty parent directories**

```bash
rm portifolio/src/pages/Home/Home.tsx
rmdir portifolio/src/pages/Home
rmdir portifolio/src/pages
```

- [ ] **Step 2: Verify build and lint pass**

Run (from `portifolio/`):
```bash
npm run build
npm run lint
```
Expected: both exit 0 (nothing referenced this file, so no breakage).

- [ ] **Step 3: Commit**

```bash
git add -A portifolio/src/pages
git commit -m "chore: remove unused Home page stub"
```

---

### Task 3: Add Projects data and ProjectsSection component

**Files:**
- Modify: `portifolio/src/constants/index.ts` (add `Project` type and `PROJECTS` array)
- Create: `portifolio/src/components/ProjectsSection.tsx`
- Modify: `portifolio/src/App.tsx` (render `ProjectsSection` after `HomeSection`)

**Interfaces:**
- Produces: `PROJECTS: Project[]` exported from `constants/index.ts`, where `Project = { name: string; subtitle: string; media: { type: "video" | "image"; src: string }; tags: string[]; link: string }`.
- Produces: `ProjectsSection` default-exported component, renders a `<section id="projetos">`.
- Consumes: none from earlier tasks.

- [ ] **Step 1: Add `Project` type and `PROJECTS` data to constants/index.ts**

Append to `portifolio/src/constants/index.ts` (keep the existing `NAV_LINKS` export as-is):
```ts
import sdcVideo from '../assets/Sdc.mp4';
import alumniVideo from '../assets/alumni.mp4';
import faltamaisVideo from '../assets/faltamais.mp4';
import emailImg from '../assets/email.png';
import prosperImg from '../assets/prosper.png';
import chessSystemImg from '../assets/chessSystem.png';

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
```

- [ ] **Step 2: Create ProjectsSection.tsx**

`portifolio/src/components/ProjectsSection.tsx`:
```tsx
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
```

- [ ] **Step 3: Render ProjectsSection in App.tsx**

`portifolio/src/App.tsx`, current content:
```tsx
import HomeSection from "./components/HomeSection"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <>
      <Navbar/>
      <div >
        <HomeSection/>
      </div>
    </>
  )
}

export default App
```

Change to:
```tsx
import HomeSection from "./components/HomeSection"
import Navbar from "./components/Navbar"
import ProjectsSection from "./components/ProjectsSection"

const App = () => {
  return (
    <>
      <Navbar/>
      <div>
        <HomeSection/>
        <ProjectsSection/>
      </div>
    </>
  )
}

export default App
```

- [ ] **Step 4: Verify build, lint, and visually confirm in the browser**

Run (from `portifolio/`):
```bash
npm run build
npm run lint
```
Expected: both exit 0.

Then run `npm run dev`, open the printed local URL in a browser, and confirm:
- The "Projetos" section renders below the hero with 6 cards.
- Each video autoplays and loops; each image loads.
- Clicking "Projetos" in the navbar scrolls to this section.
Stop the dev server after confirming.

- [ ] **Step 5: Commit**

```bash
git add portifolio/src/constants/index.ts portifolio/src/components/ProjectsSection.tsx portifolio/src/App.tsx
git commit -m "feat: add projects section"
```

---

### Task 4: Add Skills data and SkillsSection component

**Files:**
- Modify: `portifolio/src/constants/index.ts` (add `Skill` type and `SKILLS` array)
- Create: `portifolio/src/components/SkillsSection.tsx`
- Modify: `portifolio/src/App.tsx` (render `SkillsSection` after `ProjectsSection`)

**Interfaces:**
- Produces: `SKILLS: Skill[]` exported from `constants/index.ts`, where `Skill = { name: string; icon: string }`.
- Produces: `SkillsSection` default-exported component, renders a `<section id="habilidades">`.
- Consumes: none from earlier tasks (independent of `PROJECTS`/`ProjectsSection`).

- [ ] **Step 1: Add `Skill` type and `SKILLS` data to constants/index.ts**

Append to `portifolio/src/constants/index.ts`:
```ts
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
```

- [ ] **Step 2: Create SkillsSection.tsx**

`portifolio/src/components/SkillsSection.tsx`:
```tsx
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
```

- [ ] **Step 3: Render SkillsSection in App.tsx**

`portifolio/src/App.tsx`, add the import and render it after `ProjectsSection`:
```tsx
import HomeSection from "./components/HomeSection"
import Navbar from "./components/Navbar"
import ProjectsSection from "./components/ProjectsSection"
import SkillsSection from "./components/SkillsSection"

const App = () => {
  return (
    <>
      <Navbar/>
      <div>
        <HomeSection/>
        <ProjectsSection/>
        <SkillsSection/>
      </div>
    </>
  )
}

export default App
```

- [ ] **Step 4: Verify build, lint, and visually confirm in the browser**

Run (from `portifolio/`):
```bash
npm run build
npm run lint
```
Expected: both exit 0.

Then run `npm run dev`, open the local URL, and confirm:
- The "Habilidades" section renders below Projects with 11 icon cards.
- Each icon image loads (including the `.svg` for MongoDB).
- Clicking "Habilidades" in the navbar scrolls to this section.
Stop the dev server after confirming.

- [ ] **Step 5: Commit**

```bash
git add portifolio/src/constants/index.ts portifolio/src/components/SkillsSection.tsx portifolio/src/App.tsx
git commit -m "feat: add skills section"
```

---

### Task 5: Add ContactSection component

**Files:**
- Create: `portifolio/src/components/ContactSection.tsx`
- Modify: `portifolio/src/App.tsx` (render `ContactSection` after `SkillsSection`)

**Interfaces:**
- Produces: `ContactSection` default-exported component, renders a `<section id="contato">`.
- Consumes: `Github`, `Linkedin` icons from `lucide-react` (already a project dependency, same package `HomeSection.tsx` uses for `FileText`).

- [ ] **Step 1: Create ContactSection.tsx**

`portifolio/src/components/ContactSection.tsx`:
```tsx
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
```

- [ ] **Step 2: Render ContactSection in App.tsx**

`portifolio/src/App.tsx`, add the import and render it after `SkillsSection`:
```tsx
import HomeSection from "./components/HomeSection"
import Navbar from "./components/Navbar"
import ProjectsSection from "./components/ProjectsSection"
import SkillsSection from "./components/SkillsSection"
import ContactSection from "./components/ContactSection"

const App = () => {
  return (
    <>
      <Navbar/>
      <div>
        <HomeSection/>
        <ProjectsSection/>
        <SkillsSection/>
        <ContactSection/>
      </div>
    </>
  )
}

export default App
```

- [ ] **Step 3: Verify build, lint, and visually confirm in the browser**

Run (from `portifolio/`):
```bash
npm run build
npm run lint
```
Expected: both exit 0.

Then run `npm run dev`, open the local URL, and confirm:
- The "Vamos conversar!" section renders below Habilidades with the email link and LinkedIn/GitHub icons.
- Clicking "Contato" in the navbar scrolls to this section.
- The email link opens a mail client (`mailto:`); LinkedIn/GitHub icons open the correct profiles in a new tab.
Stop the dev server after confirming.

- [ ] **Step 4: Commit**

```bash
git add portifolio/src/components/ContactSection.tsx portifolio/src/App.tsx
git commit -m "feat: add contact section"
```

---

### Task 6: Add Footer component

**Files:**
- Create: `portifolio/src/components/Footer.tsx`
- Modify: `portifolio/src/App.tsx` (render `Footer` as the last element)

**Interfaces:**
- Produces: `Footer` default-exported component.

- [ ] **Step 1: Create Footer.tsx**

`portifolio/src/components/Footer.tsx`:
```tsx
const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-[#1A073E] text-neutral-400 text-xs flex items-center justify-center h-12 mt-16">
            <p>Copyright © Kenia Reis · {year}</p>
        </footer>
    );
};

export default Footer;
```

- [ ] **Step 2: Render Footer in App.tsx**

`portifolio/src/App.tsx`, final version:
```tsx
import HomeSection from "./components/HomeSection"
import Navbar from "./components/Navbar"
import ProjectsSection from "./components/ProjectsSection"
import SkillsSection from "./components/SkillsSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"

const App = () => {
  return (
    <>
      <Navbar/>
      <div>
        <HomeSection/>
        <ProjectsSection/>
        <SkillsSection/>
        <ContactSection/>
      </div>
      <Footer/>
    </>
  )
}

export default App
```

- [ ] **Step 3: Verify build, lint, and visually confirm in the browser**

Run (from `portifolio/`):
```bash
npm run build
npm run lint
```
Expected: both exit 0.

Then run `npm run dev`, open the local URL, and confirm the footer renders at the bottom of the page with the current year. Stop the dev server after confirming.

- [ ] **Step 4: Commit**

```bash
git add portifolio/src/components/Footer.tsx portifolio/src/App.tsx
git commit -m "feat: add footer"
```

---

### Task 7: Configure Vite base path for GitHub Pages

**Files:**
- Modify: `portifolio/vite.config.ts`

**Interfaces:**
- None — build-time config only, no runtime code depends on this.

- [ ] **Step 1: Add the `base` option**

Current `portifolio/vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

Change to:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Portifolio/',
  plugins: [react()],
})
```

- [ ] **Step 2: Verify the build produces asset paths prefixed with /Portifolio/**

Run (from `portifolio/`):
```bash
npm run build
grep -o 'src="/Portifolio/[^"]*"' dist/index.html
```
Expected: `npm run build` exits 0, and the grep prints at least one match (the built `<script src="/Portifolio/assets/...">` tag), confirming the base path is applied.

- [ ] **Step 3: Verify the built site still works locally**

Run (from `portifolio/`):
```bash
npm run preview
```
Open the printed local URL (it will include the `/Portifolio/` path) in a browser and confirm the page loads with styling and images intact, not a blank/broken page. Stop the preview server after confirming.

- [ ] **Step 4: Commit**

```bash
git add portifolio/vite.config.ts
git commit -m "build: set Vite base path for GitHub Pages project site"
```

---

### Task 8: Add GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- None — CI config only.

- [ ] **Step 1: Create the workflow file**

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: portifolio/package-lock.json
      - name: Install dependencies
        run: npm ci
        working-directory: portifolio
      - name: Build
        run: npm run build
        working-directory: portifolio
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: portifolio/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

`workflow_dispatch` is included so Task 9 can re-trigger a run on demand without needing a new commit.

- [ ] **Step 2: Re-check the YAML for structural errors**

There is no YAML linter installed in this project, so re-read the file and confirm: every nested level is indented by exactly 2 spaces relative to its parent, every `steps:` list item starts with `- `, and `on:`, `permissions:`, `jobs:` are all top-level (0-indent) keys. A malformed workflow will fail immediately when it runs in Task 8 Step 3 or Task 9 Step 2, which is the actual verification — this step is just a quick sanity pass before pushing.

- [ ] **Step 3: Commit and push**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions workflow to deploy portifolio to GitHub Pages"
git push
```

This push triggers a workflow run. Because the repository's Pages source is still "Deploy from a branch" at this point, the `deploy` job is expected to fail (or the `configure-pages`/`deploy-pages` steps will report the site isn't configured for Actions) — that gets fixed in Task 9. Confirm the `build` job (checkout/install/build/upload-artifact) succeeds:

```bash
"/c/Program Files/GitHub CLI/gh.exe" run list --workflow=deploy.yml --limit 1
"/c/Program Files/GitHub CLI/gh.exe" run view --log
```
Expected: the `build` job's steps are all green; the `deploy` job may be red/skipped — that's expected at this point.

---

### Task 9: Switch GitHub Pages to Actions and verify the live site

**Files:**
- None (GitHub repository configuration only, via `gh api`).

**Interfaces:**
- None.

- [ ] **Step 1: Switch the Pages build type to "workflow" (GitHub Actions)**

```bash
"/c/Program Files/GitHub CLI/gh.exe" api -X PUT repos/keniareis/Portifolio/pages -f build_type=workflow
```
Expected: JSON response with `"build_type": "workflow"`. If the API returns a 404 (no Pages site exists yet), use `-X POST` instead of `-X PUT` on the same endpoint with the same body.

- [ ] **Step 2: Re-trigger the deploy workflow**

```bash
"/c/Program Files/GitHub CLI/gh.exe" workflow run deploy.yml
"/c/Program Files/GitHub CLI/gh.exe" run watch
```
Expected: `run watch` follows the newest run to completion with both `build` and `deploy` jobs green.

- [ ] **Step 3: Verify the published site**

```bash
"/c/Program Files/GitHub CLI/gh.exe" api repos/keniareis/Portifolio/pages --jq .html_url
curl -s -o /dev/null -w "%{http_code}\n" "$("/c/Program Files/GitHub CLI/gh.exe" api repos/keniareis/Portifolio/pages --jq .html_url)"
```
Expected: the URL printed is `https://keniareis.github.io/Portifolio/`, and the `curl` status code is `200`.

Then open that URL in a browser and confirm:
- The new React site loads (not the old static one).
- Navbar links scroll to Sobre/Projetos/Habilidades/Contato.
- Project videos/images and skill icons load correctly (this confirms the `base: '/Portifolio/'` path from Task 7 is correct in production).

- [ ] **Step 4: No commit needed**

This task only changes GitHub repository settings and triggers CI — there is no working-tree change to commit.
