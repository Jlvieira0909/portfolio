"use client";

import "./SafariApp.css";

export default function SafariApp() {
  return (
    <div className="SafariContainer">
      <div className="SafariToolbar">
        <div className="SafariNavControls">
          <button className="SafariNavBtn">{"<"}</button>
          <button className="SafariNavBtn disabled">{">"}</button>
        </div>
        <div className="SafariSearchBar">
          <input
            type="text"
            placeholder="Search or enter website name"
            readOnly
          />
        </div>
        <div className="SafariToolbarRight"></div>
      </div>
      <div className="SafariContent">
        <div className="SafariFavorites">
          <h2>Favorites</h2>
          <div className="SafariGrid">
            <a
              href="https://www.linkedin.com/in/joaoluizv/"
              target="_blank"
              rel="noreferrer"
              className="SafariFavItem"
            >
              <div className="SafariFavIcon" style={{ background: "#0a66c2" }}>
                in
              </div>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.behance.net/joaoluiz7"
              target="_blank"
              rel="noreferrer"
              className="SafariFavItem"
            >
              <div className="SafariFavIcon" style={{ background: "#1769ff" }}>
                Bē
              </div>
              <span>Behance</span>
            </a>
            <a
              href="https://www.instagram.com/hypemind.inc"
              target="_blank"
              rel="noreferrer"
              className="SafariFavItem"
            >
              <div
                className="SafariFavIcon"
                style={{
                  background:
                    "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                }}
              >
                Ig
              </div>
              <span>Instagram</span>
            </a>
            <a
              href="https://github.com/Jlvieira0909"
              target="_blank"
              rel="noreferrer"
              className="SafariFavItem"
            >
              <div className="SafariFavIcon" style={{ background: "#24292e" }}>
                Gh
              </div>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
