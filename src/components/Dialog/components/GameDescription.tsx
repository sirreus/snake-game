import React from "react";

export const GameDescription = () => (
  <div className="game-description">
    <p className="dialog-text start">
      <b>GAME OBJECT: </b>Eat all food on playground to raise your snake.
    </p>

    <p className="dialog-text start">
      Control your snake's movement with keyboard buttons (arrows):
    </p>
    <ul style={{ margin: "0 0 8px 0" }}>
      <li className="dialog-text start">UP</li>
      <li className="dialog-text start">RIGHT</li>
      <li className="dialog-text start">DOWN</li>
      <li className="dialog-text start">LEFT</li>
    </ul>

    <p className="dialog-text start">
      <b>END GAME: </b>
    </p>
    <ul style={{ margin: "0 0 8px 0" }}>
      <li className="dialog-text start">if the snake eats itself</li>
      <li className="dialog-text start">
        if the snake crosses the field's border
      </li>
    </ul>
  </div>
);
