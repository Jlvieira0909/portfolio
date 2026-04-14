import { useState } from "react";
import "./SafariApp.css";

export default function SafariApp() {
  const [url, setUrl] = useState("home");
  const [inputUrl, setInputUrl] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let query = inputUrl.toLowerCase().trim();

    if (query === "" || query === "home") {
      setUrl("home");
      setInputUrl("");
      return;
    }

    const allowedUrls = [
      "https://seu-projeto-1.vercel.app",
      "https://seu-projeto-2.vercel.app",
    ];

    let checkUrl = query.startsWith("http") ? query : `https://${query}`;

    if (allowedUrls.includes(checkUrl)) {
      setUrl(checkUrl);
      setInputUrl(checkUrl);
    } else {
      setUrl("error");
    }
  };

  const openExternal = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className="SafariContainer">
      <div className="SafariToolbar">
        <div className="SafariNavButtons">
          <button
            className="SafariNavBtn"
            onClick={() => {
              setUrl("home");
              setInputUrl("");
            }}
          >
            {"<"}
          </button>
          <button className="SafariNavBtn" disabled>
            {">"}
          </button>
        </div>
        <form className="SafariAddressBar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search or enter website name"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
        </form>
      </div>

      <div className="SafariContent">
        {url === "home" && (
          <div className="SafariHome">
            <h2>Favorites</h2>
            <div className="SafariGrid">
              <div
                className="SafariAppIcon"
                onClick={() => openExternal("https://linkedin.com/in/joaoluiz")}
              >
                <div className="IconBox ln">in</div>
                <span>LinkedIn</span>
              </div>
              <div
                className="SafariAppIcon"
                onClick={() => openExternal("https://behance.net/")}
              >
                <div className="IconBox bh">Bē</div>
                <span>Behance</span>
              </div>
              <div
                className="SafariAppIcon"
                onClick={() => openExternal("https://instagram.com/")}
              >
                <div className="IconBox ig">Ig</div>
                <span>Instagram</span>
              </div>
              <div
                className="SafariAppIcon"
                onClick={() => openExternal("https://github.com/")}
              >
                <div className="IconBox gh">Gh</div>
                <span>GitHub</span>
              </div>
            </div>
          </div>
        )}

        {url === "error" && (
          <div className="SafariError">
            <div className="ErrorIcon">⚠️</div>
            <h3>Safari Cannot Open the Page</h3>
            <p>
              Safari can't open the page <strong>"{inputUrl}"</strong> because
              the server enforces strict Cross-Origin Resource Sharing (CORS)
              policies.
            </p>
            <p className="ErrorSub">
              Em outras palavras: sites gigantes não permitem ser abertos dentro
              de iframes por segurança.
            </p>
            <button
              className="ErrorBtn"
              onClick={() => {
                setUrl("home");
                setInputUrl("");
              }}
            >
              Go Back
            </button>
          </div>
        )}

        {url !== "home" && url !== "error" && (
          <iframe src={url} className="SafariIframe" title="Browser" />
        )}
      </div>
    </div>
  );
}
