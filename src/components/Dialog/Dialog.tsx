import React, { useState } from "react";

import { useMobile } from "../../hooks/useMobile";

import StartButton from "../StartButton";
import { GameDescription } from "./components/GameDescription";
import { DialogNameForm } from "./components/DialogNameForm";

import "./styles.css";

type DialogType = "start" | "end";

interface IDialog {
  type: DialogType;
  text?: string;
  startGameHandler: () => void;
}

export const Dialog: React.FC<IDialog> = ({ text, type, startGameHandler }) => {
  const isMobile = useMobile();
  const [userName, setUserName] = useState<string | null>(null);

  const nameFromStorage = sessionStorage.getItem("userName");

  const makeClass = (baseClass: string) =>
    [baseClass, type === "start" ? "start" : "game-over"].join(" ");

  const startGame = () => {
    if (userName) sessionStorage.setItem("userName", userName);

    startGameHandler();
  };

  return (
    <div className="modal">
      <dialog className={makeClass("dialog")}>
        <h2 className={makeClass("dialog-title")}>
          {type === "start"
            ? `Hello ${nameFromStorage || "Gamer"}!`
            : "GAME OVER"}
        </h2>

        {type === "start" && (
          <DialogNameForm
            inputName={userName}
            onInputChange={setUserName}
            savedName={nameFromStorage}
          />
        )}

        {type === "end" && (
          <span className={makeClass("dialog-text")}>{text}</span>
        )}

        {type === "start" && <GameDescription isMobile={isMobile} />}

        <StartButton
          text={type === "start" ? "Start!" : "Start again!"}
          onClick={() => startGame()}
        />
      </dialog>
    </div>
  );
};
