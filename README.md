# UI/UX Design Portfolio

A premium, motion-driven UI/UX design portfolio built to showcase selected work, design thinking, creative direction, and interactive experiences through immersive scroll-based storytelling.

The portfolio combines editorial visual design with smooth motion, scroll-scrub interactions, and carefully choreographed transitions to create an engaging browsing experience.

## ✦ Experience

The portfolio is designed around the idea that a portfolio should feel like an experience rather than a collection of static project pages.

It features:

* Immersive scroll-scrub animations
* Smooth scrolling powered by Lenis
* GSAP + ScrollTrigger motion system
* Interactive project presentations
* Animated typography
* Parallax and image transformations
* Pinned storytelling sections
* Custom cursor interactions
* Responsive layouts
* Smooth page transitions
* Data-driven project case studies
* Reduced-motion accessibility support

## ✦ Tech Stack

| Technology    | Purpose                     |
| ------------- | --------------------------- |
| React         | UI architecture             |
| TypeScript    | Type safety                 |
| Vite          | Development & build tooling |
| GSAP          | Animation engine            |
| ScrollTrigger | Scroll-driven animations    |
| Lenis         | Smooth scrolling            |
| React Router  | Client-side routing         |
| Lucide React  | Interface icons             |
| CSS           | Styling & responsive design |

## ✦ Key Features

### Scroll-Driven Storytelling

GSAP ScrollTrigger is used to create animations that respond directly to the user's scroll position.

Animations include:

* Scrubbed timelines
* Pinning
* Parallax
* Image scaling
* Typography transformations
* Clip-path reveals
* Section transitions
* Staggered content reveals

The goal is to make motion support the content rather than overwhelm it.

### Smooth Scrolling

Lenis provides a fluid scrolling experience while remaining synchronized with GSAP and ScrollTrigger.

The implementation uses a single global Lenis instance and a centralized animation lifecycle to avoid duplicate animation loops and ScrollTrigger conflicts.

### Interactive Cursor

The portfolio includes a custom cursor with contextual interactions for:

* Links
* Buttons
* Interactive media
* Project elements

The cursor is disabled on touch devices and respects reduced-motion preferences.

### Responsive Motion

Animations are adapted for:

* Desktop
* Tablet
* Mobile

Complex interactions are simplified where necessary to preserve usability and performance on smaller devices.

### Accessibility

The portfolio respects:

`prefers-reduced-motion`

When reduced motion is enabled, scroll-heavy effects and unnecessary transitions are reduced while keeping all content and functionality accessible.

## ✦ Project Structure

```text
src/
├── assets/
│   ├── images/
│   ├── videos/
│   └── fonts/
│
├── components/
│   ├── common/
│   ├── navigation/
│   ├── home/
│   ├── work/
│   ├── about/
│   ├── inquire/
│   └── projects/
│
├── data/
│   ├── projects.ts
│   └── site.ts
│
├── hooks/
│   ├── useLenis.ts
│   ├── useGsap.ts
│   └── useMediaQuery.ts
│
├── layouts/
│   └── MainLayout.tsx
│
├── pages/
│   ├── Home.tsx
│   ├── Work.tsx
│   ├── About.tsx
│   ├── Inquire.tsx
│   └── ProjectDetail.tsx
│
├── router/
│   └── index.tsx
│
├── lib/
│   ├── gsap.ts
│   ├── smoothScroll.ts
│   └── animations.ts
│
├── styles/
│   ├── globals.css
│   └── variables.css
│
├── App.tsx
└── main.tsx
```

The application follows a component-driven architecture rather than placing the entire interface and animation system inside `App.tsx`.

## ✦ Animation Architecture

Animations are organized around reusable motion patterns while allowing individual pages to have their own visual storytelling.

The general flow is:

```text
React Components
       ↓
Animation Hooks / Utilities
       ↓
GSAP Timelines
       ↓
ScrollTrigger
       ↓
Lenis Scroll
```

Each animation is scoped to its component and properly cleaned up when the component is unmounted or the route changes.

This helps prevent:

* Duplicate ScrollTriggers
* Memory leaks
* Broken route transitions
* Stale DOM references
* Animation conflicts

## ✦ Routes

| Route         | Description                   |
| ------------- | ----------------------------- |
| `/`           | Portfolio homepage            |
| `/work`       | Selected work                 |
| `/about`      | Philosophy / Bio              |
| `/inquire`    | Contact / Inquiry             |
| `/work/:slug` | Individual project case study |

## ✦ Getting Started

### Prerequisites

Make sure you have:

* Node.js
* npm

installed on your machine.

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the project:

```bash
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local development URL shown by Vite.

## ✦ Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## ✦ Development Philosophy

The project follows a few principles:

**Motion with purpose**

Animations should communicate hierarchy, storytelling, or interaction—not exist simply for visual decoration.

**Component isolation**

Each component should have a clear responsibility and remain maintainable.

**Progressive enhancement**

The website should remain usable even when animation is reduced or unavailable.

**Performance first**

Transform-based animation, scoped GSAP contexts, lazy-loaded assets, and controlled ScrollTriggers are preferred over expensive continuous effects.

**Responsive by design**

Mobile is treated as its own experience rather than a scaled-down desktop layout.

## ✦ Animation Guidelines

When adding new animations:

1. Define the visual purpose.
2. Determine whether the animation should be scroll-driven.
3. Establish the correct trigger start and end.
4. Test forward and reverse scrolling.
5. Test different viewport sizes.
6. Test route navigation.
7. Test reduced-motion behavior.
8. Clean up the animation when the component unmounts.

Avoid adding animations simply to increase visual complexity.

## ✦ Performance

The portfolio is designed to keep motion smooth while minimizing unnecessary work.

Key considerations include:

* Single Lenis instance
* Centralized GSAP ticker
* Scoped GSAP contexts
* ScrollTrigger cleanup
* Responsive animation strategies
* Lazy-loaded media
* Transform-based animation
* Reduced DOM measurements
* Mobile animation simplification

## ✦ Deployment

The application can be deployed to modern frontend hosting platforms such as:

* Vercel
* Netlify
* Cloudflare Pages
* GitHub Pages

Configure the platform to build the project using:

```bash
npm run build
```

and serve the generated production output.

## ✦ License

This project is intended primarily as a personal portfolio and showcase.

If you want to reuse significant portions of the design, animation system, or visual assets, please contact the author first.

---

### Built with

**React · TypeScript · Vite · GSAP · ScrollTrigger · Lenis**

Designed with intention.
Built with motion.
