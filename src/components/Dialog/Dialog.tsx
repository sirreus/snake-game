import React from "react";

import "./styles.css";
import StartButton from "../StartButton";

type DialogType = "start" | "end";

interface IDialog {
  type: DialogType;
  text?: string;
  startGameHandler: () => void;
}

export const Dialog: React.FC<IDialog> = ({ text, type, startGameHandler }) => {
  const makeClass = (baseClass: string) =>
    [baseClass, type === "start" ? "start" : "game-over"].join(" ");

  return (
    <div className="modal">
      <dialog className={makeClass("dialog")}>
        <h2 className={makeClass("dialog-title")}>
          {type === "start" ? "Welcome!" : "GAME OVER"}
        </h2>
        {type === "end" && (
          <span className={makeClass("dialog-text")}>{text}</span>
        )}
        <StartButton text="Start again!" onClick={startGameHandler} />
      </dialog>
    </div>
  );
};
