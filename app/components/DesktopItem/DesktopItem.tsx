"use client";

import { useState, useRef, useEffect } from "react";
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const itemRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const clickStartPos = useRef({ x: 0, y: 0 });
  const isMoved = useRef(false);

  useEffect(() => {
    const calculatePosition = () => {
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 160;
      const introEl = document.querySelector(".DesktopIntro");
      let exclRect = { left: 0, right: 0, top: 0, bottom: 0 };

      if (introEl) {
        const rect = introEl.getBoundingClientRect();
        exclRect = {
          left: rect.left - 80,
          right: rect.right + 60,
          top: rect.top - 60,
          bottom: rect.bottom + 60,
        };
      } else {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        exclRect = {
          left: centerX - 450,
          right: centerX + 450,
          top: centerY - 300,
          bottom: centerY + 300,
        };
      }

      const isOverlapping = (x: number, y: number) => {
        const iconRight = x + 90;
        const iconBottom = y + 100;

        if (
          iconRight > exclRect.left &&
          x < exclRect.right &&
          iconBottom > exclRect.top &&
          y < exclRect.bottom
        ) {
          return true;
        }

        for (const pos of registeredPositions) {
          if (pos.id !== id) {
            if (Math.abs(x - pos.x) < 110 && Math.abs(y - pos.y) < 110) {
              return true;
            }
          }
        }
        return false;
      };

      let randomX = 0;
      let randomY = 0;
      let attempts = 0;
      const maxAttempts = 2000;

      do {
        randomX = Math.floor(Math.random() * maxX);
        randomY = Math.floor(Math.random() * maxY);

        randomX = Math.max(20, randomX);
        randomY = Math.max(60, randomY);

        attempts++;
      } while (isOverlapping(randomX, randomY) && attempts < maxAttempts);

      if (attempts >= maxAttempts) {
        const corners = [
          { x: 20, y: 60 },
          { x: window.innerWidth - 110, y: 60 },
          { x: 20, y: window.innerHeight - 180 },
          { x: window.innerWidth - 110, y: window.innerHeight - 180 },
        ];
        const fallback = corners[registeredPositions.length % 4];
        randomX = fallback.x;
        randomY = fallback.y;
      }

      setPosition({ x: randomX, y: randomY });

      registeredPositions = registeredPositions.filter((p) => p.id !== id);
      registeredPositions.push({ id, x: randomX, y: randomY });

      if (itemRef.current) {
        itemRef.current.style.transform = `translate(${randomX}px, ${randomY}px)`;
      }
    };

    const timeout = setTimeout(calculatePosition, 100);

    return () => {
      clearTimeout(timeout);
      registeredPositions = registeredPositions.filter((p) => p.id !== id);
    };
  }, [id]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    isMoved.current = false;

    clickStartPos.current = { x: e.clientX, y: e.clientY };
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = Math.abs(e.clientX - clickStartPos.current.x);
    const deltaY = Math.abs(e.clientY - clickStartPos.current.y);

    if (deltaX > 5 || deltaY > 5) {
      isMoved.current = true;
    }

    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;

    setPosition({ x: newX, y: newY });

    if (itemRef.current) {
      itemRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (!isMoved.current) {
      onClick();
    }
  };

  return (
    <div
      ref={itemRef}
      className={`DesktopItem ${isDragging ? "dragging" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="IconContainer">
        <img
          src={iconSrc}
          alt={text}
          width={48}
          height={48}
          draggable={false}
        />
        {isHovered && hoverImage && (
          <div className="HoverImageWrapper">
            <img src={hoverImage} alt="preview" />
          </div>
        )}
      </div>
      <span className="DesktopItemText">{text}</span>
    </div>
  );
}
