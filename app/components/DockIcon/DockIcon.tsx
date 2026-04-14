import Image from "next/image";
import "./DockIcon.css";

export default function DockIcon({
  href,
  text,
  iconSrc,
  isActive,
  onClick,
}: {
  href: string;
  text: string;
  iconSrc: string;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      className="DockLink"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <span className="DockLinkText">{text}</span>
      <Image
        src={iconSrc}
        alt={text}
        width={128}
        height={128}
        className="DockIcon"
      />
      {isActive && <div className="DockDot" />}
    </a>
  );
}
