import React from "react";
import { Position } from "../../types";

import "./styles.css";

interface IPixel {
  snakePosition: Position[];
  foodPosition: Position;
  currentColumn: number;
  currentRow: number;
}

export const Pixel: React.FC<IPixel> = ({
  snakePosition,
  foodPosition,
  currentColumn,
  currentRow,
}) => {
  const amISnake = snakePosition.some(
    (segment) => segment.x === currentColumn && segment.y === currentRow
  );
  const amIFood =
    foodPosition.x === currentColumn && foodPosition.y === currentRow;
  return (
    <div
      className={
        amISnake
          ? "field-pixel snake"
          : amIFood
          ? "field-pixel food"
          : "field-pixel"
      }
    />
  );
};
