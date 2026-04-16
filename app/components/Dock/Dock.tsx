"use client";

import DockIcon from "../DockIcon/DockIcon";
import "./Dock.css";

interface DockProps {
  activeApps: string[];
  setFocusedApp: (appId: string | null) => void;
  toggleApp: (appId: string) => void;
}

export default function Dock({
  activeApps,
  setFocusedApp,
  toggleApp,
}: DockProps) {
  return (
    <div className="DockContainer">
      <div className="DockNavigation">
        <DockIcon
          href="/"
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
          isActive={activeApps.includes("projetos-window")}
          onClick={() => (window.location.href = "/projects")}
        />
        <DockIcon href="/trash" text="Trash" iconSrc="/icons/Trash.png" />
      </div>
    </div>
  );
}
