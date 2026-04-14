"use client";

import { useState } from "react";
import DockIcon from "../DockIcon/DockIcon";
import MacWindow from "../MacWindow/MacWindow";
import TerminalApp from "../TerminalApp/TerminalApp";
import SafariApp from "../SafariApp/SafariApp";
import "./Dock.css";

export default function Dock() {
  const [activeApps, setActiveApps] = useState<string[]>([]);
  const [focusedApp, setFocusedApp] = useState<string | null>(null);

  const toggleApp = (appId: string) => {
    if (activeApps.includes(appId)) {
      setFocusedApp(appId);
    } else {
      setActiveApps([...activeApps, appId]);
      setFocusedApp(appId);
    }
  };

  const closeApp = (appId: string) => {
    setActiveApps(activeApps.filter((id) => id !== appId));
    if (focusedApp === appId) setFocusedApp(null);
  };

  const getZIndex = (appId: string) => (focusedApp === appId ? 100 : 40);

  return (
    <>
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
            src="https://open.spotify.com/embed/user/spotify"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            style={{ border: "none", backgroundColor: "#000" }}
          />
        </MacWindow>
      )}

      <div className="DockContainer">
        <div className="DockNavigation">
          <DockIcon
            href="/home"
            text="Home"
            iconSrc="/icons/Menu.png"
            isActive={true}
          />
          <DockIcon href="/search" text="Finder" iconSrc="/icons/Finder.png" />
          <DockIcon
            href="/messages"
            text="Messages"
            iconSrc="/icons/Messages.png"
          />
          <DockIcon
            href="#"
            text="Safari"
            iconSrc="/icons/Safari.png"
            isActive={activeApps.includes("safari")}
            onClick={() => toggleApp("safari")}
          />

          <div className="DockDivider" />

          <DockIcon
            href="#"
            text="Terminal"
            iconSrc="/icons/Terminal.png"
            isActive={activeApps.includes("terminal")}
            onClick={() => toggleApp("terminal")}
          />
          <DockIcon
            href="#"
            text="Spotify"
            iconSrc="/icons/Spotify.png"
            isActive={activeApps.includes("spotify")}
            onClick={() => toggleApp("spotify")}
          />

          <div className="DockDivider" />

          <DockIcon
            href="/projects"
            text="Projects"
            iconSrc="/icons/Folder.png"
          />
          <DockIcon href="/trash" text="Trash" iconSrc="/icons/Trash.png" />
        </div>
      </div>
    </>
  );
}
