"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Dock from "../components/Dock/Dock";
import MacWindow from "../components/MacWindow/MacWindow";
import "./design.css";

const galleryPlaceholders = [
  "/design/Design01.jpg",
  "/design/Design02.jpg",
  "/design/Design03.jpg",
  "/design/Design04.jpg",
  "/design/Design05.jpg",
  "/design/Design06.jpg",
  "/design/Design07.jpg",
  "/design/Design08.jpg",
  "/design/Design09.jpg",
  "/design/Design10.jpg",
  "/design/Design11.jpg",
  "/design/Design12.jpg",
  "/design/Design13.jpg",
  "/design/Design14.jpg",
  "/design/Design15.jpg",
  "/design/Design16.jpg",
];

export default function DesignPage() {
  const [activeApps, setActiveApps] = useState<string[]>([]);
  const [focusedApp, setFocusedApp] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const [isIntroPlaying, setIsIntroPlaying] = useState(true);
  const [introImageIndex, setIntroImageIndex] = useState(0);

  useEffect(() => {
    if (isIntroPlaying) {
      const interval = setInterval(() => {
        setIntroImageIndex((prev) => {
          if (prev >= galleryPlaceholders.length - 1) {
            clearInterval(interval);
            setIsIntroPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 80);

      return () => clearInterval(interval);
    }
  }, [isIntroPlaying]);

  useEffect(() => {
    if (!isIntroPlaying) {
      galleryPlaceholders.forEach((_, index) => {
        setTimeout(() => {
          setLoadedImages((prev) => new Set(prev).add(index));
        }, index * 80);
      });
    }
  }, [isIntroPlaying]);

  const toggleApp = (appId: string) => {
    if (activeApps.includes(appId)) {
      setFocusedApp(appId);
    } else {
      setActiveApps([...activeApps, appId]);
      setFocusedApp(appId);
    }
  };

  const closeApp = (appId: string) => {
    setActiveApps(activeApps.filter((id) => id !== appId));
    if (focusedApp === appId) setFocusedApp(null);
  };

  return (
    <div className="MainPage">
      <Header />

      <div className="DesignContent">
        <div className="DesignHeader">
          <a href="/" className="BackButton">
            {"< back"}
          </a>
          <h2 className="DesignTitle">graphic design &gt; 2020-2026</h2>
        </div>

        {isIntroPlaying ? (
          <div className="IntroLoader">
            <img src={galleryPlaceholders[introImageIndex]} alt="Loading..." />
          </div>
        ) : (
          <div className="GalleryGrid">
            {galleryPlaceholders.map((src, index) => (
              <div
                key={index}
                className={`GalleryItem ${
                  loadedImages.has(index) ? "loaded" : ""
                }`}
                onClick={() => {
                  setSelectedImage(src);
                  toggleApp("preview");
                }}
              >
                <img src={src} alt={`Project ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
      </div>

      {activeApps.includes("preview") && selectedImage && (
        <MacWindow
          title="preview"
          onClose={() => {
            closeApp("preview");
            setSelectedImage(null);
          }}
          onFocus={() => setFocusedApp("preview")}
          onMinimize={() => setFocusedApp(null)}
          zIndex={focusedApp === "preview" ? 100 : 40}
          width="700px"
          height="650px"
        >
          <div className="PreviewContainer">
            <img src={selectedImage} alt="Preview" className="PreviewImage" />
          </div>
        </MacWindow>
      )}

      <Dock
        activeApps={activeApps}
        setFocusedApp={setFocusedApp}
        toggleApp={toggleApp}
      />
    </div>
  );
}
