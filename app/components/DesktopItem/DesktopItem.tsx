"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import "./DesktopItem.css";

let registeredPositions: { id: string; x: number; y: number }[] = [];

interface DesktopItemProps {
  id: string;
  text: string;
  iconSrc: string;
  hoverImage?: string;
  onClick: () => void;
}

export default function DesktopItem({
  id,
  text,
  iconSrc,
  hoverImage,
  onClick,
}: DesktopItemProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const itemRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mobileCheck = window.innerWidth <= 768;
    setIsMobile(mobileCheck);

    if (mobileCheck) {
      setIsVisible(true);
      if (itemRef.current) {
        itemRef.current.style.transform = "none";
      }
      return;
    }

    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const iconWidth = 90;
    const iconHeight = 100;

    const isOverlapping = (x: number, y: number) => {
      const centerBox = {
        left: centerX - 450,
        right: centerX + 450,
        top: centerY - 200,
        bottom: centerY + 200,
      };

      const inCenter =
        x + iconWidth > centerBox.left &&
        x < centerBox.right &&
        y + iconHeight > centerBox.top &&
        y < centerBox.bottom;

      const inDock = y + iconHeight > window.innerHeight - 120;

      const inHeader = y < 50;

      if (inCenter || inDock || inHeader) return true;

      for (const pos of registeredPositions) {
        if (pos.id !== id) {
          const dx = Math.abs(x - pos.x);
          const dy = Math.abs(y - pos.y);
          if (dx < iconWidth + 30 && dy < iconHeight + 30) {
            return true;
          }
        }
      }

      return false;
    };

    let randomX = 0;
    let randomY = 0;
    let attempts = 0;
    const maxAttempts = 150;

    do {
      randomX = Math.floor(Math.random() * (maxX - 20) + 20);
      randomY = Math.floor(Math.random() * (maxY - 20) + 20);
      attempts++;
    } while (isOverlapping(randomX, randomY) && attempts < maxAttempts);

    position.current = { x: randomX, y: randomY };

    registeredPositions = registeredPositions.filter((p) => p.id !== id);
    registeredPositions.push({ id, x: randomX, y: randomY });

    if (itemRef.current) {
      itemRef.current.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }

    setIsVisible(true);

    return () => {
      registeredPositions = registeredPositions.filter((p) => p.id !== id);
    };
  }, [id]);

  const handlePointerEnter = () => {
    if (!isDragging && !isMobile) setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    setIsHovered(false);

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
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onDoubleClick={handleDoubleClick}
      onClick={isMobile ? onClick : undefined}
      style={{
        position: isMobile ? "relative" : "absolute",
        top: isMobile ? "auto" : 0,
        left: isMobile ? "auto" : 0,
        opacity: isVisible ? 1 : 0,
        transition: isDragging ? "none" : "opacity 0.4s ease",
      }}
    >
      <div className="IconContainer">
        <Image
          src={iconSrc}
          alt={text}
          width={50}
          height={50}
          draggable={false}
        />
        {hoverImage && isHovered && !isDragging && !isMobile && (
          <div className="HoverImageWrapper">
            <img src={hoverImage} alt="preview" />
          </div>
        )}
      </div>
      <span className="DesktopItemText">{text}</span>
    </div>
  );
}
