import React from "react";

interface IGameDescription {
  isMobile: boolean;
}

export const GameDescription: React.FC<IGameDescription> = ({ isMobile }) => (
  <div className="game-description">
    <p className="dialog-text start">
      <b>GAME OBJECTIVE: </b>Eat all food on playground to raise your snake.
    </p>

    {isMobile ? (
      <p className="dialog-text start">
        Control your snake's movement by swiping on the mobile phone screen to
        set directions UP, RIGHT, DOWN, LEFT.
      </p>
    ) : (
      <>
        <p className="dialog-text start">
          Control your snake's movement with keyboard buttons (arrows):
        </p>
        <ul style={{ margin: "0 0 8px 0" }}>
          <li className="dialog-text start">UP</li>
          <li className="dialog-text start">RIGHT</li>
          <li className="dialog-text start">DOWN</li>
          <li className="dialog-text start">LEFT</li>
        </ul>
      </>
    )}

    <p className="dialog-text start">
      <b>YOU LOSE IF: </b>
    </p>
    <ul style={{ margin: "0 0 8px 0" }}>
      <li className="dialog-text start">the snake eats itself</li>
      <li className="dialog-text start">
        the snake crosses the field's border
      </li>
    </ul>
  </div>
);
