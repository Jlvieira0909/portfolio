"use client";

import { useState } from "react";
import Header from "../components/Header/Header";
import Dock from "../components/Dock/Dock";
import "./projects.css";

const dummyProjects = [
  {
    id: "demo",
    title: "designing for better returns",
    subtitle: "UX/UI Case Study",
    image: "https://picsum.photos/seed/p1/600/400",
  },
  {
    id: "demo",
    title: "automating kyc",
    subtitle: "Product Design",
    image: "https://picsum.photos/seed/p2/600/400",
  },
  {
    id: "demo",
    title: "build better habits",
    subtitle: "Mobile App",
    image: "https://picsum.photos/seed/p3/600/400",
  },
  {
    id: "demo",
    title: "glimpse into your emotions",
    subtitle: "Web Platform",
    image: "https://picsum.photos/seed/p4/600/400",
  },
];

export default function ProjectsPage() {
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

  return (
    <div className="MainPage">
      <Header />

      <div className="ProjectsContainer">
        <div className="FinderWindow">
          <div className="FinderSidebar">
            <div className="SidebarSection">
              <h3>Favorites</h3>
              <ul>
                <li>AirDrop</li>
                <li>Recents</li>
                <li>Applications</li>
                <li className="active">Desktop</li>
                <li>Documents</li>
                <li>Downloads</li>
              </ul>
            </div>
            <div className="SidebarSection">
              <h3>Tags</h3>
              <ul>
                <li>
                  <span className="TagDot red"></span> Red
                </li>
                <li>
                  <span className="TagDot orange"></span> Orange
                </li>
                <li>
                  <span className="TagDot yellow"></span> Yellow
                </li>
                <li>
                  <span className="TagDot green"></span> Green
                </li>
                <li>
                  <span className="TagDot blue"></span> Blue
                </li>
              </ul>
            </div>
          </div>

          <div className="FinderMain">
            <div className="FinderTopbar">
              <div className="NavControls">
                <button onClick={() => (window.location.href = "/")}>
                  {"<"}
                </button>
                <button disabled>{">"}</button>
                <span className="CurrentFolder">projects</span>
              </div>
              <div className="ViewControls">
                <div className="ViewToggle">
                  <span className="active">▦</span>
                  <span>☰</span>
                  <span>|||</span>
                </div>
                <div className="SearchBar">
                  <span>🔍</span>
                  <input type="text" placeholder="Search" />
                </div>
              </div>
            </div>

            <div className="FinderGrid">
              {dummyProjects.map((project, index) => (
                <div
                  key={index}
                  className="ProjectFolder"
                  onClick={() =>
                    (window.location.href = `/projects/${project.id}`)
                  }
                >
                  <div className="ProjectThumbnail">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="ProjectInfo">
                    <h4>{project.title}</h4>
                    <p>{project.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
