"use client";

import { useState } from "react";
import Header from "./components/Header/Header";
import Desktop from "./components/Desktop/Desktop";
import Dock from "./components/Dock/Dock";

export default function Home() {
  const [activeApps, setActiveApps] = useState<string[]>([]);
  const [focusedApp, setFocusedApp] = useState<string | null>(null);

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
      <div className="MainPageContent">
        <Desktop
          activeApps={activeApps}
          focusedApp={focusedApp}
          toggleApp={toggleApp}
          closeApp={closeApp}
          setFocusedApp={setFocusedApp}
        />
      </div>
      <Dock
        activeApps={activeApps}
        setFocusedApp={setFocusedApp}
        toggleApp={toggleApp}
      />
    </div>
  );
}
