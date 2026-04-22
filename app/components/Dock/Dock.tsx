"use client";

import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  return (
    <div className="DockContainer">
      <div className="DockNavigation">
        <DockIcon
          href="/"
          text="Home"
          iconSrc="/icons/Menu.png"
          isActive={pathname === "/"}
        />
        <DockIcon
          href="/design"
          text="Design"
          iconSrc="/icons/Finder.png"
          isActive={pathname === "/design"}
        />
        <DockIcon
          href="/about-me"
          text="About Me"
          iconSrc="/icons/Messages.png"
          isActive={pathname === "/about-me"}
        />

        <DockIcon
          href="/projects"
          text="Projects"
          iconSrc="/icons/Folder.png"
          isActive={pathname.startsWith("/projects")}
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
          text="Trash"
          iconSrc="/icons/Trash.png"
          isActive={false}
        />
      </div>
    </div>
  );
}
