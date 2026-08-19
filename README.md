# Jai Lakhmani — Developer Portfolio & CMS Studio 🌌

<div align="center">

  <p align="center">
    <strong>Production-ready developer portfolio showcasing real-time SaaS platforms and RAG-powered AI products with a built-in Projects CMS Studio.</strong>
  </p>

  <p align="center">
    <a href="#-key-features">Key Features</a> •
    <a href="#-admin-dashboard--cms">Admin Dashboard</a> •
    <a href="#-interactive-3d-universe">3D Universe</a> •
    <a href="#-featured-projects">Featured Projects</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-project-structure">Project Structure</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-contact">Contact</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
    <img src="https://img.shields.io/badge/Lenis_Scroll-FF5722?style=for-the-badge&logoColor=white" alt="Lenis Scroll" />
  </p>
</div>

---

## 🌟 Overview

This repository houses the personal developer portfolio and CMS studio of **Jai Lakhmani** — a full-stack engineer specializing in scalable SaaS architectures, real-time systems, and Retrieval-Augmented Generation (RAG) AI applications.

The site combines a cyber-dark aesthetic, an interconnected full-page **Three.js & React Three Fiber** visual universe, and a dedicated **Admin Dashboard (`/admin`)** that enables adding, modifying, reordering, and deleting projects anytime with instant live updates on the portfolio.

---

## ✨ Key Features

- **🛠️ Dedicated Projects CMS Studio (`/admin`)**: Full CRUD admin panel to create, update, reorder, and delete showcased projects with live preview and passkey protection.
- **🪐 Interconnected 3D Universe**: Real-time WebGL rendering with 5 scroll-synchronized stages that morph fluidly across Hero, About, Projects, Skills, and Contact sections.
- **⚡ Device-Tiered Performance Optimization**: Automatic device capability detection (CPU concurrency, network speed, viewport) dynamically adapting particle count and shader passes for a silky 60 FPS on any device.
- **🌊 Kinetic Smooth Scrolling**: Integrated with [Lenis](https://lenis.darkroom.engineering/) for inertia-based smooth scrolling paired with responsive spring camera drifts.
- **🎯 Interactive Physics & Parallax**: Cursor repulsion physics across a dynamic 360-particle cloud with magnetic parallax tilt effects on cards and 3D geometries.
- **🛡️ Directional Text Readability Vignettes**: Dynamic CSS/WebGL composition gradients ensuring flawless high-contrast text readability over 3D scenes.
- **♿ Accessibility & Reduced Motion**: Full support for `prefers-reduced-motion`, gracefully toning down 3D animations and visual intensity.
- **📱 Responsive & Modern UI**: Built with Tailwind CSS v4, `@tailwindcss/postcss`, Radix/Base UI primitives, and custom micro-interactions.

---

## 🛠️ Admin Dashboard & CMS (`/admin`)

Access the management dashboard at [`/admin`](http://localhost:3000/admin) to manage your projects:

- **🔒 Passkey Authentication**: Protected by `ADMIN_PASSWORD` (defaults to `admin123` in local development).
- **➕ Add & Edit Projects**:
  - Title, Subtitle / Tagline.
  - Interactive Tech Stack chip tags with quick suggestions.
  - Dynamic Bullet Points builder (add, edit, delete).
  - Custom Action Links (e.g. Live Dashboard, GitHub, Widget Demo, Docs).
- **↕️ Reorder Projects**: Move projects up or down to change display priority.
- **🗑️ Delete Confirmation**: Safe deletion with modal confirmations.
- **⚡ Instant Sync**: Changes immediately persist to the data store and update the live portfolio.

---

## 🪐 Interactive 3D Universe

The 3D background is powered by `@react-three/fiber`, `@react-three/drei`, and `@react-three/postprocessing`. It dynamically transitions across 5 stages based on scroll progress:

```
[ 0.00 - 0.22 ]  Stage 1: Hero Quantum Prism        -> Glass PBR Cube + Cyan Wireframe + Glowing Octahedron Core
[ 0.22 - 0.45 ]  Stage 2: About Neural Lattice       -> Hexagonal Neural Torus + Floating Purple Polyhedron
[ 0.45 - 0.70 ]  Stage 3: Projects Dual Pillars      -> Holographic Cyan & Purple Prism Pillars
[ 0.70 - 0.88 ]  Stage 4: Skills Cybernetic Reactor  -> Tri-Axial Reactor Rings + 9 Orbiting Satellite Nodes
[ 0.88 - 1.00 ]  Stage 5: Contact Horizon Beacon     -> Central Luminous Signal Core + Radiating Wave Rings
```

---

## 🚀 Featured Projects

### 1. **Fynco — SaaS Task Management Platform**
> *Scalable, real-time multi-tenant project management platform.*
- **Tech Stack**: Next.js, TypeScript, Appwrite, Hono, TanStack Query, shadcn/ui, Tailwind CSS
- **Highlights**:
  - Implemented real-time Kanban, Calendar, and Table views with optimistic updates.
  - Built high-performance REST APIs with Hono and Appwrite database indexing.
  - Multi-layer client-side caching using TanStack Query.

### 2. **Trellis — AI-Driven Customer Support Bot**
> *Context-aware enterprise AI support bot with RAG and voice synthesis.*
- **Tech Stack**: Next.js, Vercel AI SDK, Convex, Vapi, Monorepo, shadcn/ui, RAG
- **Highlights**:
  - Retrieval-Augmented Generation (RAG) using high-dimensional vector embeddings for low-latency contextual AI answers.
  - Embeddable cross-origin chatbot widget designed for zero-config integration.
  - Voice AI integration powered by Vapi.
  - Multi-tenant organization dashboard with bot governance controls.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **CMS & Data Layer** | Next.js API Routes, Server Actions, Persistent JSON Data Store |
| **3D & Visuals** | [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei), [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), `@tailwindcss/postcss`, [shadcn/ui](https://ui.shadcn.com/), Lucide Icons |
| **Smooth Scroll & Animation** | [Lenis](https://lenis.darkroom.engineering/), CSS Keyframe & Hardware-Accelerated Transforms |
| **Backend & Cloud (Projects)** | Node.js, Hono.js, Convex, Appwrite, MongoDB, PostgreSQL |
| **AI & LLM Tools** | Vercel AI SDK, RAG, Embeddings, Tool Calling, Vapi |
| **Fonts** | Geist Sans & Geist Mono (`next/font/google`) |

---

## 📁 Project Structure

```text
├── public/                     # Static assets and favicon
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── page.tsx        # Projects CMS & Admin Dashboard Studio
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   └── auth/route.ts # Admin passkey authentication API
│   │   │   └── projects/route.ts # Projects CRUD API (GET, POST, PUT, DELETE)
│   │   ├── favicon.ico
│   │   ├── globals.css         # Tailwind v4 directives & custom theme variables
│   │   ├── layout.tsx          # Root layout with metadata and Geist font providers
│   │   └── page.tsx            # Main single-page portfolio layout
│   ├── components/
│   │   ├── footer.tsx          # Sticky footer with CMS studio link
│   │   ├── navbar.tsx          # Sticky navigation bar with active section tracking
│   │   ├── providers/
│   │   │   └── smooth-scroll.tsx # Lenis smooth scroll provider
│   │   ├── sections/
│   │   │   ├── hero.tsx        # Hero section with live status badge and CTA
│   │   │   ├── about.tsx       # Bio and core engineering focus
│   │   │   ├── projects.tsx    # Dynamic project cards with individual 3D tilt
│   │   │   ├── skills.tsx      # Comprehensive categorized skills matrix
│   │   │   └── contact.tsx     # Contact details and direct communication links
│   │   ├── three/
│   │   │   ├── effects.tsx     # Post-processing Bloom composer
│   │   │   ├── full-page-universe.tsx # 3D Geometries, particles, stages & physics
│   │   │   ├── scene-loader.tsx # Lazy client loader for Three.js canvas
│   │   │   └── scene.tsx       # R3F Canvas orchestrator & camera/lighting controller
│   │   └── ui/
│   │       ├── animated-section.tsx # Scroll entrance transition wrapper
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       └── card.tsx
│   ├── data/
│   │   └── projects.json       # Persistent projects store
│   ├── hooks/
│   │   ├── use-scroll-animation.ts # Intersection observer visibility trigger
│   │   └── use-tilt.ts             # 3D mouse tilt spring calculation hook
│   ├── lib/
│   │   ├── device-capability.ts    # Hardware concurrency & connection tier detector
│   │   ├── projects-store.ts       # Server-side project CRUD store utility
│   │   └── utils.ts                # Class merge utilities (clsx & tailwind-merge)
│   └── types/
│       └── project.ts              # Project & ProjectLink TypeScript interfaces
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm`, `pnpm`, `yarn`, or `bun`

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

### 2. Environment Configuration (Optional)

Create a `.env.local` file in the root directory:

```env
ADMIN_PASSWORD=your_secure_password_here
```
*(If omitted, the default admin password is `admin123` for local development).*

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

- **Portfolio**: [http://localhost:3000](http://localhost:3000)
- **Admin Studio**: [http://localhost:3000/admin](http://localhost:3000/admin)

### 5. Build for Production

```bash
npm run build
npm run start
```

### 6. Linting & Type Checking

```bash
npm run lint
npx tsc --noEmit
```

---

## 📬 Contact & Connect

**Jai Lakhmani** — Full-Stack Developer (SaaS & AI Engineering)

- 📧 **Email**: [jailakhmani12345@gmail.com](mailto:jailakhmani12345@gmail.com)
- 🐙 **GitHub**: [github.com](https://github.com)
- 💼 **LinkedIn**: [linkedin.com](https://linkedin.com)

---

<div align="center">
  <sub>Built with ❤️ using Next.js 16, React 19, Three.js, and Tailwind CSS v4.</sub>
</div>
