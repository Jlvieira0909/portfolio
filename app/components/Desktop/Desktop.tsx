"use client";

import { useState, ReactNode } from "react";
import DesktopItem from "../DesktopItem/DesktopItem";
import MacWindow from "../MacWindow/MacWindow";
import TerminalApp from "../TerminalApp/TerminalApp";
import SafariApp from "../SafariApp/SafariApp";
import Image from "next/image";
import "./Desktop.css";

interface DesktopProps {
  activeApps: string[];
  focusedApp: string | null;
  toggleApp: (appId: string) => void;
  closeApp: (appId: string) => void;
  setFocusedApp: (appId: string | null) => void;
}

export default function Desktop({
  activeApps,
  focusedApp,
  toggleApp,
  closeApp,
  setFocusedApp,
}: DesktopProps) {
  const getZIndex = (appId: string) => (focusedApp === appId ? 100 : 40);

  return (
    <main className="Desktop">
      <div className="DesktopIntro">
        <div className="ProfilePhotoContainer">
          <Image
            src="/sua-foto.jpg"
            alt="Sua Foto de Perfil"
            width={180}
            height={180}
            className="ProfilePhoto"
          />
        </div>
        <div className="IntroTexts">
          <h1>João Vieira</h1>
          <p className="Tagline">Desenvolvedor Front-end & Designer</p>
          <p className="Description">
            Computer Engineering undergraduate and Front-end Developer bridging
            the gap between robust software architecture and elegant UI/UX
            design. Experienced in crafting seamless web applications, intuitive
            interfaces, and scalable integrations. Passionate about merging
            logical problem-solving with creative visual design.
          </p>
        </div>
      </div>

      <DesktopItem
        id="projetos"
        text="Projects"
        iconSrc="/icons/Folder.png"
        onClick={() => (window.location.href = "/projects")}
      />
      <DesktopItem
        id="curriculo"
        text="Resume"
        iconSrc="/icons/Folder.png"
        onClick={() => window.open("/curriculo.pdf", "_blank")}
      />
      <DesktopItem
        id="sobre"
        text="About Me"
        iconSrc="/icons/Folder.png"
        onClick={() => (window.location.href = "/about-me")}
      />
      <DesktopItem
        id="design"
        text="Design"
        iconSrc="/icons/Folder.png"
        onClick={() => (window.location.href = "/design")}
      />

      {activeApps.includes("safari") && (
        <MacWindow
          title="Safari"
          onClose={() => closeApp("safari")}
          onFocus={() => setFocusedApp("safari")}
          zIndex={getZIndex("safari")}
        >
          <SafariApp />
        </MacWindow>
      )}

      {activeApps.includes("terminal") && (
        <MacWindow
          title="joao — -zsh — 80x24"
          onClose={() => closeApp("terminal")}
          onFocus={() => setFocusedApp("terminal")}
          zIndex={getZIndex("terminal")}
        >
          <TerminalApp />
        </MacWindow>
      )}

      {activeApps.includes("projetos-window") && (
        <MacWindow
          title="Meus Projetos"
          onClose={() => closeApp("projetos-window")}
          onFocus={() => setFocusedApp("projetos-window")}
          zIndex={getZIndex("projetos-window")}
        >
          <div style={{ padding: "20px" }}>
            <h2>Meus Projetos Incríveis</h2>
            <p>Lista de projetos aqui...</p>
          </div>
        </MacWindow>
      )}

      {activeApps.includes("spotify") && (
        <MacWindow
          title="Spotify"
          onClose={() => closeApp("spotify")}
          onFocus={() => setFocusedApp("spotify")}
          zIndex={getZIndex("spotify")}
          width="400px"
          height="500px"
        >
          <iframe
            src="https://open.spotify.com/embed/playlist/"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            style={{ border: "none", backgroundColor: "#000" }}
          />
        </MacWindow>
      )}
    </main>
  );
}
