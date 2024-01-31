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

  const GameDescription = () => (
    <div className="game-description">
      <p className={makeClass("dialog-text")}>
        <b>GAME OBJECT: </b>Eat all food on playground to raise your snake.
      </p>

      <p className={makeClass("dialog-text")}>
        Control your snake's movement with keyboard buttons (arrows):
        <ul style={{ margin: 0 }}>
          <li>UP</li>
          <li>RIGHT</li>
          <li>DOWN</li>
          <li>LEFT</li>
        </ul>
      </p>

      <p className={makeClass("dialog-text")}>
        <b>END GAME: </b>
        <ul style={{ margin: 0 }}>
          <li>if the snake eats itself</li>
          <li>if the snake crosses the field's border</li>
        </ul>
      </p>
    </div>
  );

  return (
    <div className="modal">
      <dialog className={makeClass("dialog")}>
        <h2 className={makeClass("dialog-title")}>
          {type === "start" ? "Welcome!" : "GAME OVER"}
        </h2>

        {type === "end" && (
          <span className={makeClass("dialog-text")}>{text}</span>
        )}

        {type === "start" && <GameDescription />}

        <StartButton
          text={type === "start" ? "Start!" : "Start again!"}
          onClick={startGameHandler}
        />
      </dialog>
    </div>
  );
};
