import DockIcon from "../DockIcon/DockIcon";
import "./Dock.css";

export default function Dock() {
  return (
    <div className="DockContainer">
      <div className="DockNavigation">
        <DockIcon href="/home" text="Home" iconSrc="/icons/Menu.png" />
        <DockIcon href="/search" text="Search" iconSrc="/icons/Finder.png" />
        <DockIcon href="/safari" text="Safari" iconSrc="/icons/Safari.png" />
        <DockIcon
          href="/projects"
          text="Projects"
          iconSrc="/icons/Folder.png"
        />
        <DockIcon
          href="/terminal"
          text="Terminal"
          iconSrc="/icons/Terminal.png"
        />
        <DockIcon href="/spotify" text="Spotify" iconSrc="/icons/Spotify.png" />
      </div>
    </div>
  );
}
