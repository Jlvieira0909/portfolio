import { ReactNode, useState, useRef, useEffect } from "react";
import "./MacWindow.css";

interface MacWindowProps {
  title: string;
  onClose: () => void;
  onFocus: () => void;
  onMinimize?: () => void;
  zIndex: number;
  children: ReactNode;
  width?: string;
  height?: string;
  initialPosition?: { x: number; y: number };
}

export default function MacWindow({
  title,
  onClose,
  onFocus,
  onMinimize,
  zIndex,
  children,
  width = "600px",
  height = "400px",
  initialPosition = { x: 0, y: 0 },
}: MacWindowProps) {
  const [position, setPosition] = useState(initialPosition);
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
          height: isMaximized ? "calc(100vh - 28px)" : height,
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
                <svg viewBox="0 0 10 10">
                  <path
                    d="M1 1L9 9M9 1L1 9"
                    stroke="currentColor"
                    strokeWidth="1.2"
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
                  if (onMinimize) onMinimize();
                }}
              >
                <svg viewBox="0 0 10 10">
                  <path d="M1 5H9" stroke="currentColor" strokeWidth="1.2" />
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
                }}
              >
                <svg viewBox="0 0 10 10">
                  <path
                    d="M1 1H9V9H1V1Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
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
