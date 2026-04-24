"use client";

import { useState } from "react";
import Header from "../components/Header/Header";
import Dock from "../components/Dock/Dock";
import "./projects.css";

const dummyProjects = [
  {
    id: "Portfolio",
    title: "Portfolio",
    subtitle: "Web Portfolio",
    image: "/images/portfolioThumb.png",
  },
  {
    id: "cryptoLP",
    title: "SuperTeam LP",
    subtitle: "UI/UX Project for Crypto Website",
    image: "/images/LpThumb.png",
  },
  {
    id: "Astroworld",
    title: "Astroworld Posters",
    subtitle: "Music Design Project",
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/05bb1c167477657.6429ec7d3fcdd.png",
  },
  {
    id: "Gallery",
    title: "The Gallery",
    subtitle: "Web Gallery For my Designs",
    image: "/images/GalleryThumb.png",
  },
  {
    id: "Omni",
    title: "Omni Design",
    subtitle: "Web Porftolio for Industrial Deisgn",
    image: "/images/OmniThumb.png",
  },
  {
    id: "Pokedex",
    title: "WebPokédex",
    subtitle: "Simple WebPokédex Utilizing API's",
    image: "/images/pokedexThumb.png",
  },
  {
    id: "SzbForm",
    title: "Sizebay Script Form",
    subtitle: "Form for Scripts Creation",
    image: "/images/ScriptFormThumb.png",
  },
  {
    id: "SzbBtns",
    title: "Sizebay Buttons Gallery",
    subtitle: "Web Buttons Gallery",
    image: "/images/SzbBtnsThumb.png",
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
