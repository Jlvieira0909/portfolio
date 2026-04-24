export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  role: string;
  year: string;
  tools: string[];
}

export const projectsData: Record<string, Project> = {
  Portfolio: {
    id: "Portfolio",
    title: "Portfolio",
    subtitle: "Web Portfolio",
    description:
      "A deep dive into the development of my personal portfolio, focused on recreating the immersive macOS experience on the web. Built with Next.js, React, and extensive CSS manipulation and complex state management to create an interactive and nostalgic interface.",
    heroImage: "/images/portfolioThumb.png",
    role: "Front-end Developer & Designer",
    year: "2026",
    tools: ["Next.js", "React", "TypeScript", "CSS"],
  },
  cryptoLP: {
    id: "cryptoLP",
    title: "SuperTeam LP",
    subtitle: "UI/UX Project for Crypto Website",
    description:
      "Design and development of a conversion-focused Landing Page for a crypto ecosystem. The goal was to create a modern, reliable interface with a high user retention rate.",
    heroImage: "/images/LpThumb.png",
    role: "UI/UX Designer",
    year: "2025",
    tools: ["Figma", "Illustrator"],
  },
  Astroworld: {
    id: "Astroworld",
    title: "Astroworld Posters",
    subtitle: "Music Design Project",
    description:
      "Visual exploration and creation of posters based on the aesthetic of the Astroworld album. Focused on digital collage and experimental typography.",
    heroImage:
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/05bb1c167477657.6429ec7d3fcdd.png",
    role: "Graphic Designer",
    year: "2023",
    tools: ["Photoshop", "Illustrator"],
  },
  Gallery: {
    id: "Gallery",
    title: "The Gallery",
    subtitle: "Web Gallery For my Designs",
    description:
      "An interactive virtual gallery built to showcase my graphic design work in an immersive and responsive way.",
    heroImage: "/images/GalleryThumb.png",
    role: "Front-end Developer & Designer",
    year: "2025",
    tools: ["React", "CSS Grid"],
  },
  Omni: {
    id: "Omni",
    title: "Omni Design",
    subtitle: "Web Portfolio for Industrial Design",
    description:
      "Creation of a clean and minimalist portfolio focused on highlighting industrial design pieces with smooth transitions.",
    heroImage: "/images/OmniThumb.png",
    role: "Front-end Developer & Web Designer",
    year: "2024",
    tools: ["Figma", "React"],
  },
  Pokedex: {
    id: "Pokedex",
    title: "WebPokédex",
    subtitle: "Simple WebPokédex Utilizing APIs",
    description:
      "Web application that consumes the PokéAPI to list, search, and detail Pokémon stats. Focused on consuming REST APIs and asynchronous state management.",
    heroImage: "/images/pokedexThumb.png",
    role: "Front-end Developer",
    year: "2021",
    tools: ["JavaScript", "HTML/CSS", "REST API"],
  },
  SzbForm: {
    id: "SzbForm",
    title: "Sizebay Script Form",
    subtitle: "Form for Script Creation",
    description:
      "Development of a complex internal form to automate script creation, optimizing the technical team's workflow.",
    heroImage: "/images/ScriptFormThumb.png",
    role: "Front-end Developer & Web Designer",
    year: "2026",
    tools: ["React", "TypeScript", "Next.JS"],
  },
  SzbBtns: {
    id: "SzbBtns",
    title: "Sizebay Buttons Gallery",
    subtitle: "Web Buttons Gallery",
    description:
      "Interactive library of buttons and UI components for standardizing the internal design system.",
    heroImage: "/images/SzbBtnsThumb.png",
    role: "Front-end Developer & Web Designer",
    year: "2025",
    tools: ["React", "CSS Modules", "TypeScript", "Next.JS", "Figma"],
  },
};
