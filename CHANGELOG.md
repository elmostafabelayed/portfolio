# Récapitulatif Complet des Dernières Modifications

Ce document recense l'ensemble des modifications apportées au projet **El Mostafa Belayd Portfolio** (anciennement le dépôt de base *masterPortfolio*).

---

## 1. Vue d'ensemble de la transformation

Le projet a subi une refonte complète et une modernisation intégrale :
- **Ancienne base** : Projet Create React App (CRA) datant de React 16, avec des dépendances dépréciées (`react-scripts 3.2.0`, `baseui`, `styletron`, `apollo-boost`, Webpack 4 legacy).
- **Nouvelle architecture** : Application monopage moderne, performante, responsive et accessible sous **Vite 7**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Motion**, et **Lucide React**.
- **Contenu personnalisé** : Dédié au profil d'**El Mostafa Belayd** (Développeur Web Full-Stack Junior à Fès, Maroc), avec support bilingue complet (**Français / Anglais**), mode sombre/clair, études de cas de projets détaillées, et formulaire de contact interactif.

---

## 2. Synthèse Git des fichiers impactés

| Statut Git | Fichier / Dossier | Description |
| :--- | :--- | :--- |
| **Nouveau (`??`)** | [`index.html`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/index.html) | Point d'entrée HTML racine pour Vite avec métadonnées SEO, Open Graph et JSON-LD |
| **Nouveau (`??`)** | [`vite.config.ts`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/vite.config.ts) | Configuration de build Vite avec plugins React & Tailwind CSS v4 |
| **Nouveau (`??`)** | [`tsconfig.json`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/tsconfig.json) | Configuration TypeScript stricte (ES2022, bundler resolution) |
| **Nouveau (`??`)** | [`src/main.tsx`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/src/main.tsx) | Point de montage React 19 (`createRoot`) |
| **Nouveau (`??`)** | [`src/App.tsx`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/src/App.tsx) | Composant racine principal du portfolio |
| **Nouveau (`??`)** | [`src/data/content.ts`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/src/data/content.ts) | Source de données unique bilingue (EN & FR) et configuration du site |
| **Nouveau (`??`)** | [`src/hooks/usePortfolio.ts`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/src/hooks/usePortfolio.ts) | Hooks personnalisés (thème, langue, scroll, métadonnées dynamiques) |
| **Nouveau (`??`)** | [`src/components/TechIcon.tsx`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/src/components/TechIcon.tsx) | Rendu d'icônes SVG pour la stack technique |
| **Nouveau (`??`)** | [`src/components/HeroVisual.tsx`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/src/components/HeroVisual.tsx) | Animation SVG interactive et futuriste pour le Hero |
| **Nouveau (`??`)** | [`src/components/ProjectVisual.tsx`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/src/components/ProjectVisual.tsx) | Maquettes visuelles en code SVG pour chaque projet |
| **Nouveau (`??`)** | [`src/components/ProjectDialog.tsx`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/src/components/ProjectDialog.tsx) | Modale d'étude de cas détaillée accessible (dialog native) |
| **Nouveau (`??`)** | [`src/components/ContactForm.tsx`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/src/components/ContactForm.tsx) | Formulaire de contact validé avec lien `mailto:` et copie presse-papier |
| **Nouveau (`??`)** | [`src/styles/global.css`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/src/styles/global.css) | Système de design global (variables CSS, thèmes dark/light, typographie) |
| **Nouveau (`??`)** | [`src/styles/project-visuals.css`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/src/styles/project-visuals.css) | Styles dédiés aux maquettes visuelles et consoles des projets |
| **Nouveau (`??`)** | [`public/favicon.svg`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/public/favicon.svg) | Favicon vectoriel moderne avec le monogramme `EM.` |
| **Nouveau (`??`)** | [`public/manifest.webmanifest`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/public/manifest.webmanifest) | Manifeste PWA moderne |
| **Nouveau (`??`)** | [`public/social-card.svg`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/public/social-card.svg) | Carte de prévisualisation pour le partage sur réseaux sociaux (Open Graph) |
| **Modifié (`M`)** | [`package.json`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/package.json) | Mise à jour des dépendances vers React 19, Vite, Tailwind v4, scripts npm |
| **Modifié (`M`)** | [`.github/workflows/nodejs.yml`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/.github/workflows/nodejs.yml) | Workflow CI GitHub Actions mis à niveau vers Node.js 22 |
| **Modifié (`M`)** | [`.gitignore`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/.gitignore) | Ajout des règles d'exclusion pour `/dist`, `*.tsbuildinfo`, rapports Playwright |
| **Modifié (`M`)** | [`Dockerfile`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/Dockerfile) | Base image `node:22-alpine` et port `5173` |
| **Modifié (`M`)** | [`docker-compose.yaml`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/docker-compose.yaml) | Ports et montages adaptés au serveur de dev Vite |
| **Modifié (`M`)** | [`public/robots.txt`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/public/robots.txt) | Fichier robots moderne propre |
| **Modifié (`M`)** | [`README.md`](file:///home/elmostafa/Documents/el_mostafa/masterPortfolio/README.md) | Documentation complète réécrite pour l'installation, CV, et déploiement |
| **Supprimé (`D`)** | `CNAME` | Ancien domaine personnalisé retiré |
| **Supprimé (`D`)** | `public/404.html` | Ancienne page 404 obsolète de CRA supprimée |
| **Supprimé (`D`)** | `public/index.html` | Remplacée par `index.html` à la racine pour Vite |
| **Supprimé (`D`)** | `public/manifest.json` | Remplacé par `manifest.webmanifest` |
| **Supprimé (`D`)** | `public/sitemap.xml` | Ancien sitemap avec URLs obsolètes retiré |

---

## 3. Détail des fonctionnalités & implémentations

### A. Données et internationalisation bilingue (`src/data/content.ts`)
- Données structurées et typées en TypeScript pour l'**anglais** (`en`) et le **français** (`fr`).
- Commutateur de langue instantané sans rechargement de page.
- **Section Profil & À propos** :
  - Identité : El Mostafa Belayd, Développeur Web Full-Stack Junior à Fès, Maroc.
  - Formation : Diplôme de Technicien Spécialisé en Développement Digital (Option Web Full-Stack) à l'OFPPT, Piscine 1337 (méthodologie 42 Network), Baccalauréat Sciences Physiques.
- **Section Projets mis en avant** :
  1. **Jobsy** : Plateforme freelance full-stack (React.js, Laravel, MySQL, Axios, API RESTful) développée lors d'un stage chez UNiCREATIVE.
  2. **Water Leak Guardian** : Système IoT & backend (ESP32, Arduino C++, Laravel REST API, MySQL, capteurs de débit d'eau, électrovanne automatique).
  3. **Notes App** : Application React SPA avec gestion d'état centralisée (Redux Toolkit), opérations CRUD et filtres dynamiques.
- **Compétences organisées par catégories** :
  - Frontend : HTML5, CSS3, JavaScript, React.js, Redux Toolkit, Bootstrap.
  - Backend : PHP, Laravel, RESTful APIs.
  - Bases de données : MySQL, SQL, JSON Server, opérations CRUD.
  - Systèmes : C, Linux, Bash, GCC.
  - IoT & Embarqué : ESP32, Arduino, Wi-Fi, capteurs, relais.
  - Outils : Git, GitHub, VS Code, Arduino IDE.

### B. Gestion de l'état et ergonomie (`src/hooks/usePortfolio.ts` & `src/App.tsx`)
- **Thème Sombre / Clair** :
  - Support du mode sombre par défaut avec palette HSL soignée.
  - Sauvegarde dans `localStorage` sous la clé `em-theme`.
  - Mise à jour dynamique de la balise `<meta name="theme-color">`.
- **Préférence de Langue** :
  - Sauvegarde sous la clé `em-language`.
  - Mise à jour automatique de `<html lang="...">`, `<title>`, et des métabalises Open Graph / SEO.
- **Barre de progression de lecture** :
  - Échelle dynamique en haut de l'écran lors du défilement.
- **Navigation active et scroll smooth** :
  - Détection automatique de la section visible pour mettre en évidence les liens de la barre de navigation.
  - Bouton de retour en haut de page dynamique.
- **Accessibilité (a11y)** :
  - Respect du paramètre utilisateur `prefers-reduced-motion`.
  - Lien d'évitement (*Skip to main content*).
  - Gestion du focus clavier sur les modales et navigation au clavier (fermeture via touche `Escape`).

### C. Composants interactifs
- **`HeroVisual.tsx`** :
  - Effet visuel moderne avec carte interactive réagissant au curseur, statut en temps réel, indicateurs de stack technique et lignes de code simulées.
- **`ProjectVisual.tsx` & `ProjectDialog.tsx`** :
  - Rendu visuel personnalisé pour chaque projet avec maquettes adaptatives.
  - Modale native `<dialog>` complète affichant le contexte, l'aperçu, la contribution, le focus technique, la stack et la liste des fonctionnalités.
  - Schéma d'architecture dynamique pour le projet IoT *Water Leak Guardian* (`Capteurs → ESP32 → Wi-Fi → Laravel REST API → MySQL`).
- **`ContactForm.tsx`** :
  - Formulaire accessible avec validation en temps réel des champs requis et du format d'email.
  - Action `mailto:` préparée avec sujet et corps de message pré-remplis vers `elmostafabelayd@gmail.com`.
  - Bouton de copie rapide de l'adresse email dans le presse-papier avec confirmation visuelle.
  - Liens directs vers le téléphone (`+212 688835120`), GitHub et LinkedIn.

### D. Modernisation de la configuration & DevOps
- **`package.json`** :
  - Version Node.js cible : `>=22.12.0`.
  - Remplacement de `react-scripts` par `vite` pour des démarrages quasi instantanés (HMR).
  - Intégration de `@tailwindcss/vite` 4.
  - Polices hébergées localement via `@fontsource-variable/inter`, `@fontsource-variable/space-grotesk` et `@fontsource/jetbrains-mono` pour éliminer la dépendance aux CDN externes et améliorer les performances.
- **`Dockerfile` & `docker-compose.yaml`** :
  - Mise à jour vers Node 22 Alpine.
  - Port exposé `5173`.
  - Montage de volumes en développement pour le rechargement à chaud.
- **GitHub Actions (`.github/workflows/nodejs.yml`)** :
  - Utilise `actions/checkout@v4` et `actions/setup-node@v4` avec cache npm automatique.
  - Exécute `npm ci`, `npm run typecheck` et `npm run build`.

---

## 4. Commandes de développement et de build

```bash
# 1. Installation propre des dépendances
npm ci

# 2. Lancement du serveur de développement local
npm run dev

# 3. Vérification des types TypeScript
npm run typecheck

# 4. Compilation de production dans le dossier dist/
npm run build

# 5. Prévisualisation locale de la version compilée
npm run preview
```

---

*Fichier généré automatiquement pour documenter l'état actuel et l'historique complet des récentes modifications du portfolio.*
