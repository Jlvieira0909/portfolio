import Image from "next/image";
import "./DockIcon.css";

export default function DockIcon(args: {
  href: string;
  text: string;
  iconSrc: string;
}) {
  return (
    <a href={args.href} className="DockLink">
      <span className="DockLinkText">{args.text}</span>
      <Image
        src={args.iconSrc}
        alt={args.text}
        width={128}
        height={128}
        className="DockIcon"
      />
    </a>
  );
}
