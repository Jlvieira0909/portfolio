import DockIcon from "../DockIcon/DockIcon";
import "./Dock.css";

export default function Dock() {
  return (
    <div className="DockContainer">
      <div className="DockNavigation">
        <DockIcon href="/home" text="Home" iconSrc="/icons/Menu.png" />
        <DockIcon href="/search" text="Search" iconSrc="/icons/Finder.png" />
        <DockIcon
          href="/settings"
          text="Settings"
          iconSrc="/icons/Safari.png"
        />
        <DockIcon
          href="/settings"
          text="Settings"
          iconSrc="/icons/Folder.png"
        />
        <DockIcon
          href="/settings"
          text="Settings"
          iconSrc="/icons/Terminal.png"
        />
      </div>
    </div>
  );
}
