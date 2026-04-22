"use client";

import { useState, useRef, useEffect } from "react";
import Header from "../components/Header/Header";
import Dock from "../components/Dock/Dock";
import "./about-me.css";

const DUMMY_DATA = [
  {
    id: "img1",
    src: "https://picsum.photos/seed/me/400/300",
    label: "me",
    response:
      "Sou o João Luiz! Um desenvolvedor Front-end & Designer apaixonado por criar experiências interativas.",
  },
  {
    id: "img2",
    src: "https://picsum.photos/seed/setup/400/300",
    label: "setup",
    response:
      "Esse é o meu cantinho. Adoro passar horas aqui programando e desenhando novas interfaces.",
  },
  {
    id: "img3",
    src: "https://picsum.photos/seed/hobby/400/300",
    label: "hobbies",
    response:
      "Quando não estou codando, provavelmente estou jogando algum jogo retro ou explorando design gráfico vintage.",
  },
  {
    id: "img4",
    src: "https://picsum.photos/seed/coffee/400/300",
    label: "fuel",
    response:
      "Café é o meu combustível oficial para resolver bugs complexos no React e Next.js.",
  },
  {
    id: "img5",
    src: "https://picsum.photos/seed/travel/400/300",
    label: "travel",
    response:
      "Amo conhecer lugares novos. Sempre me inspira a trazer novas perspectivas para o meu design.",
  },
  {
    id: "img6",
    src: "https://picsum.photos/seed/friends/400/300",
    label: "w/ friends",
    response:
      "Aproveitar o tempo offline com a galera é essencial para manter a criatividade em alta.",
  },
];

interface Message {
  id: string;
  type: "text" | "image";
  sender: "system" | "me";
  content: string;
}

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
      content:
        "Desenvolvedor Front-end e Designer. Eu adoro transformar ideias complexas em interfaces elegantes e funcionais.",
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
                        <em>hi! i'm</em> <strong>joão luiz,</strong>
                      </span>
                    ) : (
                      <p>{msg.content}</p>
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
              <div className="ChatHint">
                psst! you can drag any floating photo anywhere on this page, or
                double-click one to send it 📎
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {availableImages.map((img) => (
          <FloatingImage
            key={img.id}
            data={img}
            onSend={() => handleSendImage(img)}
          />
        ))}
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
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 200;

    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    if (
      Math.abs(randomX - centerX) < 300 &&
      Math.abs(randomY - centerY) < 300
    ) {
      randomX = randomX > centerX ? randomX + 250 : randomX - 250;
      randomY = randomY > centerY ? randomY + 250 : randomY - 250;
    }

    randomX = Math.max(20, Math.min(randomX, maxX));
    randomY = Math.max(50, Math.min(randomY, maxY));

    setPosition({ x: randomX, y: randomY });

    if (itemRef.current) {
      itemRef.current.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${
        Math.random() * 20 - 10
      }deg)`;
    }

    setTimeout(() => setIsVisible(true), Math.random() * 500);
  }, []);

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
