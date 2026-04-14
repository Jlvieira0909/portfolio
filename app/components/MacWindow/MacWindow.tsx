import { ReactNode, useState, useRef, useEffect } from "react";
import "./MacWindow.css";

interface MacWindowProps {
  title: string;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  children: ReactNode;
  width?: string;
  height?: string;
}

export default function MacWindow({
  title,
  onClose,
  onFocus,
  zIndex,
  children,
  width = "600px",
  height = "400px",
}: MacWindowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (zIndex === 100) {
      setIsMinimized(false);
    }
  }, [zIndex]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    onFocus();
    if (isMaximized) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || isMaximized) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      className={`MacWindowOverlay ${isMinimized ? "minimized" : ""}`}
      style={{ zIndex }}
      onPointerDown={onFocus}
    >
      <div
        className={`MacWindowDragWrapper ${isMaximized ? "maximized" : ""}`}
        style={{
          transform: isMaximized
            ? "none"
            : `translate(${position.x}px, ${position.y}px)`,
          width: isMaximized ? "100vw" : width,
          height: isMaximized ? "100vh" : height,
        }}
      >
        <div className={`MacWindowContainer ${isDragging ? "dragging" : ""}`}>
          <div
            className="MacWindowTitleBar"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <div className="MacWindowButtons">
              <button
                className="MacWindowBtn close"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  onFocus();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <path
                    d="M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                className="MacWindowBtn minimize"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  onFocus();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(true);
                }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <path
                    d="M1.5 4H6.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                className="MacWindowBtn maximize"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  onFocus();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMaximized(!isMaximized);
                  setPosition({ x: 0, y: 0 });
                }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <path
                    d="M1.5 4.5V1.5H4.5M6.5 3.5V6.5H3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="MacWindowTitle">{title}</div>
          </div>
          <div className="MacWindowContent">{children}</div>
        </div>
      </div>
    </div>
  );
}
