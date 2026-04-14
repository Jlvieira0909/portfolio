import { useState, useEffect } from "react";
import "./TerminalApp.css";

export default function TerminalApp() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const sequence = [
      "Last login: Tue Apr 14 08:02:59 on ttys001",
      "joao@macbook-pro ~ % ./init_portfolio.sh",
      "Initializing environment...",
      "Loading frontend modules: [██████████] 100%",
      "React............OK",
      "TypeScript.......OK",
      "Next.js..........OK",
      " ",
      "   ____        __      __  _     ",
      "  / __ \\____  / /___  / /_(_)___ ",
      " / / / / __ \\/ / __ \\/ __/ / __ \\",
      "/ /_/ / /_/ / / /_/ / /_/ / /_/ /",
      "\\____/\\____/_/\\____/\\__/_/\\____/ ",
      " ",
      "Welcome to the terminal.",
      "joao@macbook-pro ~ % ",
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      setLines((prev) => [...prev, sequence[currentLine]]);
      currentLine++;
      if (currentLine === sequence.length) clearInterval(interval);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="TerminalContainer">
      {lines.map((line, index) => (
        <pre key={index} className="TerminalLine">
          {line}
        </pre>
      ))}
      <span className="TerminalCursor">_</span>
    </div>
  );
}
