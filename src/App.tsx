import React from "react";

import { use100vh } from "react-div-100vh";

import Game from "./Game";

import "./App.css";
import { useMobile } from "./hooks/useMobile";

function App() {
  const isMobile = useMobile();
  const height = use100vh();

  return (
    <div
      className="game"
      style={{ height: isMobile ? `${height}px` : "inherit" }}
    >
      <header className="header">Snakemaster</header>
      <Game />
    </div>
  );
}

export default App;
