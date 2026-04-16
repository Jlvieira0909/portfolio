"use client";

import { useState } from "react";
import Header from "../../components/Header/Header";
import Dock from "../../components/Dock/Dock";
import "./casestudy.css";

export default function CaseStudyPage() {
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

      <div className="CaseStudyContainer">
        <div className="CaseStudyContent">
          <a href="/projects" className="BackButton">
            {"< back"}
          </a>

          <p className="Breadcrumb">portfolio &gt; UX/UI Design &gt; 2026</p>
          <h1 className="CaseStudyTitle">designing for better returns</h1>

          <div className="HeroImage">
            <img src="https://picsum.photos/seed/hero/1200/600" alt="Hero" />
          </div>

          <div className="OverviewGrid">
            <div className="OverviewItem">
              <h4>overview</h4>
              <p>
                Uma plataforma inovadora para melhorar o retorno de
                investimentos.
              </p>
            </div>
            <div className="OverviewItem">
              <h4>role</h4>
              <p>Product Designer, Front-end Developer</p>
            </div>
            <div className="OverviewItem">
              <h4>skills & tools</h4>
              <p>Figma, React, TypeScript, Next.js</p>
            </div>
          </div>

          <div className="CaseStudyBody">
            <h2>The Challenge</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.
            </p>

            <img
              src="https://picsum.photos/seed/content1/1000/500"
              alt="Content 1"
            />

            <h2>The Solution</h2>
            <p>
              Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet.
              Nunc ut sem vitae risus tristique posuere.
            </p>

            <img
              src="https://picsum.photos/seed/content2/1000/500"
              alt="Content 2"
            />
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
