"use client";

import { useState, useRef, useEffect } from "react";
import Header from "../components/Header/Header";
import Dock from "../components/Dock/Dock";
import "./about-me.css";

const DUMMY_DATA = [
  {
    id: "img1",
    src: "/images/AboutMe.jpeg",
    label: "Myself",
    response:
      "Hello! My name is João Luiz Vieira. I'm a web creative who loves to blend the worlds of development and design.",
  },
  {
    id: "img2",
    src: "/images/AboutLove.jpeg",
    label: "W/ girlfriend",
    response:
      "My favorite thing in the world is sharing my life with my girlfriend! I love her more than anything in the world!!!",
  },
  {
    id: "img3",
    src: "/images/AboutHobbies.jpeg",
    label: "Hobbies",
    response:
      "In my free time, I like to study design and technology. I also love creating new projects.",
  },
  {
    id: "img4",
    src: "/images/AboutMusics.jpeg",
    label: "Music",
    response:
      "I'm very passionate about music. I listen to a diverse range of artists, but my absolute favorite is definitely Travis Scott. I love going to shows and festivals to discover new music.",
  },
  {
    id: "img5",
    src: "/images/AboutGames.jpeg",
    label: "Games",
    response:
      "My other favorite thing to do in my free time is play video games! My top favorites are Elden Ring, Cyberpunk 2077, and Hotline Miami. Here is <a href='https://steamcommunity.com/id/joaoluizzv/' target='_blank' rel='noopener noreferrer'>my Steam account</a> if you'd like to take a look.",
  },
  {
    id: "img6",
    src: "/images/AboutDesign.jpeg",
    label: "Design",
    response:
      "Besides programming and studying technology, I also have a deep passion for design! I'm always trying to bring my vision to life in every project I work on.",
  },
];

interface Message {
  id: string;
  type: "text" | "image";
  sender: "system" | "me";
  content: string;
}

let registeredImagePositions: { id: string; x: number; y: number }[] = [];

export default function AboutMePage() {
  const [activeApps, setActiveApps] = useState<string[]>([]);
  const [focusedApp, setFocusedApp] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init1",
      type: "text",
      sender: "system",
      content: "hi! i'm joão luiz,",
    },
    {
      id: "init2",
      type: "text",
      sender: "system",
      content: "What would you like to know more about me?",
    },
  ]);

  const [availableImages, setAvailableImages] = useState(DUMMY_DATA);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendImage = (imageObj: (typeof DUMMY_DATA)[0]) => {
    setAvailableImages((prev) => prev.filter((img) => img.id !== imageObj.id));

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        type: "image",
        sender: "me",
        content: imageObj.src,
      },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `res-${Date.now()}`,
          type: "text",
          sender: "system",
          content: imageObj.response,
        },
      ]);
    }, 800);
  };

  const toggleApp = (appId: string) => {
    if (activeApps.includes(appId)) {
      setFocusedApp(appId);
    } else {
      setActiveApps([...activeApps, appId]);
      setFocusedApp(appId);
    }
  };

  return (
    <div className="MainPage">
      <Header />

      <div className="AboutContainer">
        <div className="ChatWrapper" id="chat-dropzone">
          <div className="ChatHeader">
            <div className="ChatHeaderButtons">
              <div
                className="ChatHeaderBtn close"
                onClick={() => (window.location.href = "/")}
              />
              <div className="ChatHeaderBtn minimize" />
              <div className="ChatHeaderBtn maximize" />
            </div>
            <div className="ChatTitle">
              <span className="Avatar">JL</span>
              joao luiz messages
            </div>
          </div>

          <div className="ChatBody">
            {messages.map((msg) => (
              <div key={msg.id} className={`MessageRow ${msg.sender}`}>
                {msg.type === "text" ? (
                  <div className={`MessageBubble ${msg.sender}`}>
                    {msg.sender === "system" && msg.content.includes("hi!") ? (
                      <span className="IntroText">
                        <em>hi! I'm</em> <strong>João Luiz,</strong>
                      </span>
                    ) : (
                      <p dangerouslySetInnerHTML={{ __html: msg.content }} />
                    )}
                  </div>
                ) : (
                  <div className={`MessageBubble image-bubble ${msg.sender}`}>
                    <img src={msg.content} alt="Sent image" />
                  </div>
                )}
              </div>
            ))}

            {availableImages.length > 0 && (
              <>
                <div className="ChatHint desktop-hint">
                  psst! you can drag any floating photo anywhere on this page,
                  or double-click one to send it 📎
                </div>
                <div className="MobileImageSlider">
                  <div className="MobileImageTrack">
                    {availableImages.map((img) => (
                      <div
                        key={img.id}
                        className="MobileImageItem"
                        onClick={() => handleSendImage(img)}
                      >
                        <img src={img.src} alt={img.label} />
                      </div>
                    ))}
                  </div>
                  <div className="ChatHint mobile-hint">
                    tap to send a photo
                  </div>
                </div>
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 100,
          }}
        >
          {availableImages.map((img) => (
            <FloatingImage
              key={img.id}
              data={img}
              onSend={() => handleSendImage(img)}
            />
          ))}
        </div>
      </div>

      <Dock
        activeApps={activeApps}
        setFocusedApp={setFocusedApp}
        toggleApp={toggleApp}
      />
    </div>
  );
}

function FloatingImage({
  data,
  onSend,
}: {
  data: (typeof DUMMY_DATA)[0];
  onSend: () => void;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  const itemRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const clickStartPos = useRef({ x: 0, y: 0 });
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isMoved = useRef(false);

  useEffect(() => {
    const calculatePosition = () => {
      const maxX = window.innerWidth - 180;
      const maxY = window.innerHeight - 180;

      const chatEl = document.getElementById("chat-dropzone");
      let exclRect = { left: 0, right: 0, top: 0, bottom: 0 };

      if (chatEl) {
        const rect = chatEl.getBoundingClientRect();
        exclRect = {
          left: rect.left - 60,
          right: rect.right + 60,
          top: rect.top - 60,
          bottom: rect.bottom + 60,
        };
      } else {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        exclRect = {
          left: centerX - 350,
          right: centerX + 350,
          top: centerY - 300,
          bottom: centerY + 300,
        };
      }

      const isOverlapping = (x: number, y: number) => {
        const photoRight = x + 160;
        const photoBottom = y + 160;

        if (
          photoRight > exclRect.left &&
          x < exclRect.right &&
          photoBottom > exclRect.top &&
          y < exclRect.bottom
        ) {
          return true;
        }

        for (const pos of registeredImagePositions) {
          if (pos.id !== data.id) {
            if (Math.abs(x - pos.x) < 120 && Math.abs(y - pos.y) < 120) {
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
        randomY = Math.max(50, randomY);
        attempts++;
      } while (isOverlapping(randomX, randomY) && attempts < maxAttempts);

      if (attempts >= maxAttempts) {
        const corners = [
          { x: 20, y: 60 },
          { x: window.innerWidth - 180, y: 60 },
          { x: 20, y: window.innerHeight - 200 },
          { x: window.innerWidth - 180, y: window.innerHeight - 200 },
        ];
        const fallback = corners[registeredImagePositions.length % 4];
        randomX = fallback.x;
        randomY = fallback.y;
      }

      setPosition({ x: randomX, y: randomY });

      registeredImagePositions = registeredImagePositions.filter(
        (p) => p.id !== data.id
      );
      registeredImagePositions.push({ id: data.id, x: randomX, y: randomY });

      if (itemRef.current) {
        itemRef.current.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${
          Math.random() * 20 - 10
        }deg)`;
      }

      setTimeout(() => setIsVisible(true), Math.random() * 500);
    };

    const timeout = setTimeout(calculatePosition, 100);

    return () => {
      clearTimeout(timeout);
      registeredImagePositions = registeredImagePositions.filter(
        (p) => p.id !== data.id
      );
    };
  }, [data.id]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    setIsPressing(true);
    isMoved.current = false;

    clickStartPos.current = { x: e.clientX, y: e.clientY };
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);

    if (itemRef.current) {
      itemRef.current.style.zIndex = "1000";
    }

    longPressTimer.current = setTimeout(() => {
      if (!isMoved.current) {
        setIsPressing(false);
        onSend();
      }
    }, 1000);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = Math.abs(e.clientX - clickStartPos.current.x);
    const deltaY = Math.abs(e.clientY - clickStartPos.current.y);

    if (deltaX > 5 || deltaY > 5) {
      isMoved.current = true;
      setIsPressing(false);
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    }

    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;

    setPosition({ x: newX, y: newY });

    if (itemRef.current) {
      itemRef.current.style.transform = `translate(${newX}px, ${newY}px) scale(1.05)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setIsPressing(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }

    if (itemRef.current) {
      itemRef.current.style.transform = `translate(${position.x}px, ${
        position.y
      }px) rotate(${Math.random() * 10 - 5}deg)`;
      itemRef.current.style.zIndex = "10";
    }

    const chatZone = document.getElementById("chat-dropzone");
    if (chatZone && isMoved.current) {
      const rect = chatZone.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        onSend();
      }
    }
  };

  return (
    <div
      ref={itemRef}
      className={`FloatingImage ${isDragging ? "dragging" : ""} ${
        isPressing ? "pressing" : ""
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onSend();
      }}
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: "auto",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
      }}
    >
      <div className="FloatingImageContent">
        <div className="ImageWrapper">
          <img src={data.src} alt={data.label} draggable={false} />
          <div className="BlueLoaderOverlay" />
        </div>
        <span className="FloatingLabel">{data.label}</span>
      </div>
    </div>
  );
}
