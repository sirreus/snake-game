import React from "react";

import { useMobile } from "./hooks/useMobile";

import Game from "./Game";

import "./App.css";

function App() {
  const isMobile = useMobile();
  return (
    <div
      className="game"
      style={{ height: isMobile ? window.innerHeight : "100vh" }}
    >
      <header className="header">Snakemaster</header>
      <Game />
    </div>
  );
}

export default App;
