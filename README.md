# Personal Website - Larry Ye

A modern, interactive personal portfolio website for **Larry Ye** — Electrical Engineer, Software Developer, Photographer, and Foodie based in the Bay Area.

Built with **SvelteKit 2** and **Svelte 5**, featuring interactive 3D physics, custom gradient typography, dynamic tabbed project showcases, and dual-resume viewing.

---

## 🛠️ Tech Stack & Framework Versions

- **Framework**: [SvelteKit 2](https://kit.svelte.dev/) (`@sveltejs/kit` `^2.0.0`)
- **UI Library**: [Svelte 5](https://svelte.dev/) (`svelte` `^5.0.0`)
- **Build Tool**: [Vite 5](https://vitejs.dev/) (`vite` `^5.4.11`)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) (`^3.4.17`), PostCSS, Autoprefixer
- **Icons**: [Lucide Svelte](https://lucide.dev/) (`lucide-svelte` `^0.471.0`)
- **Adapter**: `@sveltejs/adapter-auto` (Node.js runtime target)
- **Language**: TypeScript & JavaScript (JSDoc typing)

---

## ✨ Features & Highlights

- 🎴 **Interactive 3D Profile Card**: Home page hero feature with mouse-tracking 3D tilt effects (`rotateX` / `rotateY`) and a 180° flip card revealing bio information.
- 🎨 **SVG Text & Gradient Animations**: Animated line-drawing SVG greeting with linear gradients and keyframe fill animations.
- 💡 **Dynamic Spotlight Project Cards**: Project cards on the `/projects` page featuring interactive radial cursor spotlights.
- 🗂️ **Tabbed Content Filtering**: Seamless toggling between **Hardware** and **Software** tracks across projects and resume viewers.
- 📱 **Responsive Design**: Tailored layout break-points for desktop, tablet, and mobile devices using Tailwind CSS.

---

## 📁 Directory & Architecture Overview

```text
personal-website/
├── src/
│   ├── app.css                 # Global CSS (Tailwind layers, animations, gradient borders & text)
│   ├── app.html                # Base HTML template shell
│   ├── app.d.ts                # TypeScript definitions
│   ├── components/             # Reusable UI components
│   │   ├── Button.svelte       # Main CTA button with ripple animation & SvelteKit navigation
│   │   ├── SmallButton.svelte  # Compact button for tab switching
│   │   ├── ProjectCard.svelte  # Interactive card with mouse-follow spotlight effect
│   │   └── PostHeader.svelte   # Header component placeholder
│   └── routes/                 # File-based SvelteKit router
│       ├── +layout.svelte      # Root layout component importing app.css
│       ├── +page.svelte        # Home Page (3D card, hero title, social icons, links)
│       ├── projects/
│       │   └── +page.svelte    # Projects Page (Hardware & Software tabs, ProjectCards)
│       └── resume/
│           └── +page.svelte    # Resume Page (Hardware & Software resume image viewer)
├── static/                     # Public assets (profile photo, project images, resumes, favicons)
├── svelte.config.js            # SvelteKit configuration & adapter settings
├── tailwind.config.js          # Tailwind CSS theme & content paths
├── vite.config.ts              # Vite plugins configuration
├── tsconfig.json               # TypeScript compiler config
└── package.json                # Project metadata, dependencies, and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or v20+)
- `npm`, `pnpm`, or `yarn`

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/simonmeatball/personal-website.git
cd personal-website
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Type Checking & Diagnostics

Run SvelteKit synchronization and `svelte-check` for TypeScript diagnostics:

```bash
npm run check
```

For continuous type-checking during development:

```bash
npm run check:watch
```

### Production Build

To build the application for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📄 License

Private personal project.

