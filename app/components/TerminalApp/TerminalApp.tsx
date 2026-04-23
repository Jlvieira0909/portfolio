"use client";

import { useState, useEffect } from "react";
import "./TerminalApp.css";

const MY_ASCII_ART = `
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⠤⠒⠈⠉⣠⣤⣤⣄⠈⠁⠒⢤⣤⣤⡀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿
⠀⠀⣠⣶⣿⣿⣶⣎⠁⠀⠀⠀⠀⠻⠋⠁⠈⠀⠀⠀⠈⠉⠻⡇⠀⠀⠀⠀⠛⠛⠛⠛⠛⢻⣿⣿⣿⠟⠁
⠀⣼⣿⡟⠉⡹⡿⡿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⢄⠀⠀⠀⠑⢜⣆⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⠋⠀⠀
⢠⣿⣿⣧⣶⣷⣦⣄⠀⠀⠀⠀⠀⣀⣠⢤⠤⠤⠤⣵⣤⣤⠐⢒⡏⡄⠀⠀⠀⠀⠀⣼⣿⣿⣿⠃⠀⠀⠀
⢸⣿⣿⡟⡍⠙⣿⣿⡆⠀⠀⠀⠸⡁⢿⣿⠇⠀⠀⣼⠿⠿⠀⢠⡟⡇⠀⠀⠀⠀⣰⣿⣿⣿⡇⠀⠀⠀⠀
⠈⣿⣿⡆⣇⢀⣿⣿⡇⠀⠀⠀⠀⠑⠤⣀⡀⠤⠊⠀⠑⠂⠰⠟⠁⡇⠀⠀⠀⢀⣿⣿⣿⣿⠁⠀⠀⠀⠀
⠀⠙⢿⣿⣾⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠁⠀⠀⢠⠁⡹⠋⠩⣭⣤⣤⡀⠀⠀
⠀⠀⠀⠉⢹⣏⡉⢦⠀⠀⠀⠀⠀⠀⢤⠄⣀⣀⣀⣀⣀⣀⡀⢀⠆⠀⠀⠀⣂⠒⠂⢉⠐⠚⠚⢲⠇⠀⠀
⠀⡔⠀⠏⠓⢷⣼⡿⡓⡦⡀⠀⠀⠀⠀⠀⣠⣀⣀⡀⠀⠀⢠⠎⠀⠀⠀⠀⠙⠛⠋⠉⠉⠉⠉⠁⠀⠀⠀
⠀⠈⠈⠑⠒⠛⢇⣨⣿⣼⣃⡀⠀⠀⠀⠀⠀⠉⠀⠀⣀⠴⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠷⠶⠶⠶⠶⠶⢒⣉⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⡀⠀⠀⠀⡟⢿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⠁⠀⠀⡇⠀⢻⡿⣿⣶⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠟⠈⡻⣿⡿⣶⠤⢼⣧⣴⡅⠉⠋⡁⣀⣌⣹⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣄⡜⠀⠘⠋⠀⣠⣆⣨⣯⠓⠯⠩⠭⠷⠛⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠺⠯⣛⣉⣭⠱⠤⠚⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;

export default function TerminalApp() {
  const [step, setStep] = useState(0);
  const [typedCommand, setTypedCommand] = useState("");

  const command = "./welcome.sh";

  useEffect(() => {
    if (step === 0) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedCommand(command.slice(0, i + 1));
        i++;
        if (i === command.length) {
          clearInterval(interval);
          setTimeout(() => setStep(1), 500);
        }
      }, 100);

      return () => clearInterval(interval);
    } else if (step === 1) {
      const timer = setTimeout(() => setStep(2), 600);
      return () => clearTimeout(timer);
    }
  }, [step, command]);

  return (
    <div className="TerminalContainer">
      <div className="TerminalLine">
        <Prompt />
        <span className="TerminalCommand">{typedCommand}</span>
        {step === 0 && <span className="TerminalCursor" />}
      </div>

      {step >= 1 && (
        <div className="TerminalOutput">
          <pre className="TerminalAscii">{MY_ASCII_ART}</pre>
          <div className="TerminalText">
            <span className="ColorGreen">
              ✔ System initialized successfully.
            </span>
            <br />
            <span className="ColorBlue">ℹ Loading user profile...</span>
            <br />
            <br />
            <span className="ColorYellow">Name:</span> João Luiz
            <br />
            <span className="ColorYellow">Role:</span> Frontend Developer &
            Designer
            <br />
            <span className="ColorYellow">Location:</span> SC, Brazil
            <br />
            <br />
            <span className="ColorMagenta"> Executing startup scripts...</span>
            <br />
            <span className="ColorCyan">
              Type help to see available commands.
            </span>
          </div>
        </div>
      )}

      {step >= 2 && (
        <div className="TerminalLine">
          <Prompt />
          <span className="TerminalCursor" />
        </div>
      )}
    </div>
  );
}

function Prompt() {
  return (
    <span className="TerminalPrompt">
      <span className="PromptUser">joao@macbook-pro</span>
      <span className="PromptPath">~</span>
      <span className="PromptChar">%</span>
    </span>
  );
}
