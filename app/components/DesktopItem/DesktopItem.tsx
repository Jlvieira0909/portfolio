"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import "./DesktopItem.css";

interface DesktopItemProps {
  id: string;
  text: string;
  iconSrc: string;
  onClick: () => void;
}

export default function DesktopItem({
  id,
  text,
  iconSrc,
  onClick,
}: DesktopItemProps) {
  const [isDragging, setIsDragging] = useState(false);

  const itemRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);

    dragStart.current = {
      x: e.clientX - position.current.x,
      y: e.clientY - position.current.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    position.current = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    };

    if (itemRef.current) {
      itemRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      ref={itemRef}
      className={`DesktopItem ${isDragging ? "dragging" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onDoubleClick={handleDoubleClick}
    >
      <div className="IconContainer">
        <Image
          src={iconSrc}
          alt={text}
          width={50}
          height={50}
          draggable={false}
        />
      </div>
      <span className="DesktopItemText">{text}</span>
    </div>
  );
}
