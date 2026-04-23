"use client";

import { useState } from "react";
import DesktopItem from "../DesktopItem/DesktopItem";
import MacWindow from "../MacWindow/MacWindow";
import TerminalApp from "../TerminalApp/TerminalApp";
import SafariApp from "../SafariApp/SafariApp";
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
        <div className="IntroImageContainer">
          <span className="IntroTextOverlay top">Hello,</span>
          <span className="IntroTextOverlay bottom">i'm João!</span>
          <img
            src="/images/portfolio001.png"
            alt="João Luiz"
            className="IntroPhoto"
          />
        </div>

        <div className="IntroTexts">
          <p>
            Take a look at my projects
            <br />
            As a front-end developer & web designer
            <br />
            And Computer Engineering Undergraduate
          </p>
        </div>
      </div>

      <div className="DesktopIconsGrid">
        <DesktopItem
          id="projetos"
          text="Projects"
          iconSrc="/icons/Folder.png"
          hoverImage="https://picsum.photos/seed/p1/100/100"
          onClick={() => (window.location.href = "/projects")}
        />
        <DesktopItem
          id="curriculo"
          text="Resume"
          iconSrc="/icons/Folder.png"
          hoverImage="https://picsum.photos/seed/c1/100/100"
          onClick={() => window.open("/curriculo.pdf", "_blank")}
        />
        <DesktopItem
          id="sobre"
          text="About Me"
          iconSrc="/icons/Folder.png"
          hoverImage="https://picsum.photos/seed/a1/100/100"
          onClick={() => (window.location.href = "/about-me")}
        />
        <DesktopItem
          id="design"
          text="Design"
          iconSrc="/icons/Folder.png"
          hoverImage="https://picsum.photos/seed/d1/100/100"
          onClick={() => (window.location.href = "/design")}
        />
      </div>

      {activeApps.includes("safari") && (
        <MacWindow
          title="Safari"
          onClose={() => closeApp("safari")}
          onFocus={() => setFocusedApp("safari")}
          onMinimize={() => setFocusedApp(null)}
          zIndex={getZIndex("safari")}
          initialPosition={{ x: -150, y: -80 }}
        >
          <SafariApp />
        </MacWindow>
      )}

      {activeApps.includes("terminal") && (
        <MacWindow
          title="joao — -zsh — 80x24"
          onClose={() => closeApp("terminal")}
          onFocus={() => setFocusedApp("terminal")}
          onMinimize={() => setFocusedApp(null)}
          zIndex={getZIndex("terminal")}
          initialPosition={{ x: 80, y: 50 }}
        >
          <TerminalApp />
        </MacWindow>
      )}

      {activeApps.includes("spotify") && (
        <MacWindow
          title="Spotify"
          onClose={() => closeApp("spotify")}
          onFocus={() => setFocusedApp("spotify")}
          onMinimize={() => setFocusedApp(null)}
          zIndex={getZIndex("spotify")}
          width="400px"
          height="500px"
          initialPosition={{ x: 220, y: -20 }}
        >
          <iframe
            src="https://open.spotify.com/embed/album/41GuZcammIkupMPKH2OJ6I?si=qAZ3ihuBSFefAuFRXBFh6g"
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
