# 💻 João Luiz | Interactive OS Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

> An interactive, OS-inspired web portfolio blending front-end development and graphic design.

**[🔗 View Live Demo](https://www.joaoluiz.me/)**

![Portfolio Preview](https://github.com/Jlvieira0909/portfolio/blob/master/public/images/portfolioThumb.png?raw=true)

---

## ✨ Features

This portfolio is not just a static page; it's a fully interactive experience designed to mimic a desktop environment, showcasing both technical logic and visual aesthetics.

- 🖱️ **Interactive Desktop Environment:** Draggable folders and files with a custom collision-detection algorithm. Icons will never spawn on top of central images or text.
- 💬 **Dynamic "About Me" Chat:** An interactive messaging interface where dragging and dropping floating polaroids triggers automated system responses.
- 🌗 **Smart Theming (Dark/Light Mode):** Seamless theme transitions utilizing native CSS variables. Features advanced techniques like `mix-blend-mode: difference` so text perfectly contrasts against dynamic image backgrounds.
- 🎲 **Dynamic Favicon Injection:** The site runs a client-side script that randomly injects 1 of 11 unique favicons every time the application is loaded or refreshed.
- 📂 **Dynamic Routing:** A scalable `[slug]` based case-study architecture to easily add new design and development projects without duplicating layouts.

---

## 🛠️ Tech Stack

**Core:** Next.js (App Router), React, TypeScript  
**Styling:** Pure CSS3, CSS Modules, Native Variables, Keyframe Animations  
**Design:** Figma, Adobe Photoshop, Adobe Illustrator

---

## 🧠 Architecture Highlight: The "Exclusion Zone" Math

To keep the desktop environment feeling organic but structured, I wrote a custom `useEffect` hook that calculates a mathematical "Exclusion Zone" using `getBoundingClientRect()`.

Whenever a user opens the page, the application scans the exact DOM position of the central images and UI elements, creating an invisible forcefield. This ensures that the randomized draggable folders (`Math.random()`) never overlap with important text or components, regardless of the user's screen size or device.

---

## 🚀 Local Installation

Want to run this OS on your local machine?

```bash
# Clone the repository
git clone https://github.com/Jlvieira0909/portfolio.git

# Navigate to the directory
cd portfolio

# Install dependencies
npm install

# Start the local server
npm run dev
```
