import React, { useState, useEffect, useCallback, useRef } from "react";
import Pixel from "./components/Pixel";
import Dialog from "./components/Dialog";
import InfoText from "./components/InfoText";

const GRID_SIZE = 50;
const INITIAL_SPEED = 200;

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

interface Position {
  x: number;
  y: number;
}

const Game: React.FC = () => {
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [snake, setSnake] = useState<Position[]>([{ x: 25, y: 25 }]);
  const [food, setFood] = useState<Position>({ x: 10, y: 10 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED);
  const gameRunning = useRef(true);

  const fieldArray = Array.from({ length: GRID_SIZE });

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        setDirection("UP");
        break;
      case "ArrowDown":
        setDirection("DOWN");
        break;
      case "ArrowLeft":
        setDirection("LEFT");
        break;
      case "ArrowRight":
        setDirection("RIGHT");
        break;
      default:
        break;
    }
  }, []);

  const gameController = useCallback(() => {
    if (!gameRunning.current) return;

    // Move the snake
    const newSnake = [...snake];
    const head = { ...newSnake[0] };
    switch (direction) {
      case "UP":
        head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
        break;
      case "DOWN":
        head.y = (head.y + 1) % GRID_SIZE;
        break;
      case "LEFT":
        head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
        break;
      case "RIGHT":
        head.x = (head.x + 1) % GRID_SIZE;
        break;
      default:
        break;
    }

    // Check for collision with field boundaries if snake have a neck (snake.length > 1)
    if (newSnake.length > 1) {
      const neck = newSnake[0];

      const outOfX =
        (head.x === 0 && neck.x === GRID_SIZE - 1) ||
        (head.x === GRID_SIZE - 1 && neck.x === 0);
      const outOfY =
        (head.y === 0 && neck.y === GRID_SIZE - 1) ||
        (head.y === GRID_SIZE - 1 && neck.y === 0);

      if (outOfX || outOfY) {
        endGame();
        return;
      }
    }

    // Continue with the rest of the game logic
    newSnake.unshift(head);

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
      setScore((prevScore) => prevScore + 1);
      generateNewFood();
      if (speed > 0) setSpeed(speed - 20);
    } else {
      newSnake.pop();
    }

    // Check for collision with self
    const collidedWithSelf = newSnake
      .slice(1)
      .some((segment) => segment.x === head.x && segment.y === head.y);

    if (collidedWithSelf) {
      endGame();
      return;
    }

    setSnake(newSnake);
  }, [snake, direction, food]);

  const generateNewFood = () => {
    const newFood: Position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  };

  const endGame = () => {
    setGameOver(true);
    gameRunning.current = false;
  };

  useEffect(() => {
    // Setup keyboard event listener
    window.addEventListener("keydown", handleKeyPress);

    // Game loop
    const gameInterval = setInterval(gameController, speed);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      clearInterval(gameInterval);
    };
  }, [handleKeyPress, gameController, speed]);

  const startGame = () => {
    setSnake([{ x: 25, y: 25 }]);
    setDirection("RIGHT");
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameOver(false);
    gameRunning.current = true;
  };

  return (
    <main>
      {gameOver && (
        <Dialog
          type="end"
          text={`Your score is ${score}`}
          startGameHandler={() => startGame()}
        />
      )}
      <div className={!gameOver ? "game-field" : "game-field game-over"}>
        {fieldArray.map((_, row) => (
          <div className="field-row" key={row}>
            {fieldArray.map((_, col) => (
              <Pixel
                snakePosition={snake}
                foodPosition={food}
                currentColumn={col}
                currentRow={row}
                key={col}
              />
            ))}
          </div>
        ))}
      </div>
      {/* <div>Score: {score}</div> */}
      <InfoText text={`Score: ${score}`} />
    </main>
  );
};

export default Game;
