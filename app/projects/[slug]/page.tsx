"use client";

import { useState, use } from "react";
import Header from "../../components/Header/Header";
import Dock from "../../components/Dock/Dock";
import { projectsData } from "../../data/projectsData";
import "./casestudy.css";

export default function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

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

  const project = projectsData[slug];

  if (!project) {
    return (
      <div className="MainPage">
        <Header />
        <div className="NotFoundContainer">
          <h2>Project not found</h2>
          <button onClick={() => (window.location.href = "/projects")}>
            {"< back to projects"}
          </button>
        </div>
        <Dock
          activeApps={activeApps}
          setFocusedApp={setFocusedApp}
          toggleApp={toggleApp}
        />
      </div>
    );
  }

  return (
    <div className="MainPage">
      <Header />

      <div className="CaseStudyContent">
        <div className="CaseStudyHeader">
          <button
            className="BackButton"
            onClick={() => (window.location.href = "/projects")}
          >
            {"< back"}
          </button>
          <span className="CaseStudyBreadcrumb">
            projects &gt; {project.id}
          </span>
        </div>

        <div className="CaseStudyHero">
          <img src={project.heroImage} alt={project.title} />
        </div>

        <div className="CaseStudyBody">
          <div className="CaseStudyTitleArea">
            <h1>{project.title}</h1>
            <h2>{project.subtitle}</h2>
          </div>

          <div className="CaseStudyMeta">
            <div className="MetaColumn">
              <span className="MetaLabel">ROLE</span>
              <span className="MetaValue">{project.role}</span>
            </div>
            <div className="MetaColumn">
              <span className="MetaLabel">YEAR</span>
              <span className="MetaValue">{project.year}</span>
            </div>
            <div className="MetaColumn">
              <span className="MetaLabel">TOOLS</span>
              <span className="MetaValue">{project.tools.join(", ")}</span>
            </div>
          </div>

          <div className="CaseStudyDescription">
            <p>{project.description}</p>
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
