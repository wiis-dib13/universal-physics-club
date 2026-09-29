# universal-physics-club

Site immersif pour le club de physique universitaire **UNIVERSAL__PHYSICS** — Next.js, TypeScript, Tailwind CSS v4 et Framer Motion, avec des visualisations scientifiques en canvas (champs de particules, formation de texte par particules) et un formulaire d'inscription intégré.

## Démarrer

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** (thème défini dans `src/app/globals.css`)
- **Framer Motion** pour les animations et transitions au scroll
- Canvas 2D fait main pour les champs de particules (`src/components/canvas/`) — pas de dépendance WebGL/Three.js
- Assets scientifiques dans `public/assets/`

## Structure

- `src/app/page.tsx` — assemble toutes les sections de la page unique
- `src/components/sections/` — Hero, Le Club, Expériences interactives, Pourquoi nous rejoindre, Communauté, Rejoindre
- `src/components/RegisterForm.tsx` + `SuccessScreen.tsx` — formulaire d'inscription et écran de succès
- `src/components/canvas/ParticleField.tsx` — champ de particules ambiant réactif à la souris
- `src/components/canvas/TextParticles.tsx` — particules qui convergent pour former le logo au scroll

## À savoir

Le formulaire d'inscription valide les champs et affiche l'écran de bienvenue côté client, mais **n'envoie les données nulle part pour l'instant** (pas de backend/API configuré). Pour collecter les inscriptions, brancher `RegisterForm.tsx` sur une route API, un service comme Supabase/Airtable, ou un email transactionnel.

## Déploiement

Le projet est prêt pour un déploiement sur [Vercel](https://vercel.com/new) ou toute plateforme supportant Next.js.
