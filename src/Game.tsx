import React, { useState, useEffect, useCallback, useRef } from "react";
import Pixel from "./components/Pixel";
import Dialog from "./components/Dialog";
import InfoText from "./components/InfoText";
import { useMobile } from "./hooks/useMobile";

const GRID_SIZE = 50;
const GRID_SIZE_MOBILE = 30;
const INITIAL_SPEED = 200;

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

interface Position {
  x: number;
  y: number;
}

interface SwipeCoords {
  startX: number;
  startY: number;
}

const Game: React.FC = () => {
  const isMobile = useMobile();

  const initSnakePosition = isMobile ? [{ x: 15, y: 15 }] : [{ x: 25, y: 25 }];
  const GRID = isMobile ? GRID_SIZE_MOBILE : GRID_SIZE;

  const [userName, setUserName] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [snake, setSnake] = useState<Position[]>(initSnakePosition);
  const [food, setFood] = useState<Position>({ x: 10, y: 10 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [swipeCoords, setSwipeCoords] = useState<SwipeCoords | null>(null);
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED);
  const gameRunning = useRef(false);

  const fieldArray = Array.from({ length: GRID });

  const generateNewFood = useCallback(() => {
    const newFood: Position = {
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID),
    };
    setFood(newFood);
  }, [GRID]);

  const startGame = () => {
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setSnake(initSnakePosition);
    setDirection("RIGHT");
    generateNewFood();
    setGameOver(false);
    gameRunning.current = true;
  };

  const endGame = () => {
    setGameOver(true);
    gameRunning.current = false;
  };

  // MOBILE movements by swipe on screen
  const handleTouchStart = useCallback((e: TouchEvent) => {
    const { clientX, clientY } = e.touches[0];
    setSwipeCoords({ startX: clientX, startY: clientY });
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!swipeCoords) return;

      const { clientX, clientY } = e.touches[0];
      const deltaX = clientX - swipeCoords.startX;
      const deltaY = clientY - swipeCoords.startY;

      // Determine the dominant direction of the swipe
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          setDirection("RIGHT");
        } else {
          setDirection("LEFT");
        }
      } else {
        if (deltaY > 0) {
          setDirection("DOWN");
        } else {
          setDirection("UP");
        }
      }

      // Reset swipe coordinates to avoid continuous updates during one swipe
      setSwipeCoords(null);
    },
    [swipeCoords]
  );

  // DESKTOP movements by keyboard's button
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
        head.y = (head.y - 1 + GRID) % GRID;
        break;
      case "DOWN":
        head.y = (head.y + 1) % GRID;
        break;
      case "LEFT":
        head.x = (head.x - 1 + GRID) % GRID;
        break;
      case "RIGHT":
        head.x = (head.x + 1) % GRID;
        break;
      default:
        break;
    }

    // Check for collision with field boundaries if snake have a neck (snake.length > 1)
    if (newSnake.length > 1) {
      const neck = newSnake[0];

      const outOfX =
        (head.x === 0 && neck.x === GRID - 1) ||
        (head.x === GRID - 1 && neck.x === 0);
      const outOfY =
        (head.y === 0 && neck.y === GRID - 1) ||
        (head.y === GRID - 1 && neck.y === 0);

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
  }, [snake, direction, food, speed, GRID, generateNewFood]);

  useEffect(() => {
    // Setup keyboard event listener
    if (isMobile) {
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchmove", handleTouchMove);
    } else {
      window.addEventListener("keydown", handleKeyPress);
    }

    // Game loop
    const gameInterval = setInterval(gameController, speed);

    // Cleanup
    return () => {
      if (isMobile) {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
      } else {
        window.removeEventListener("keydown", handleKeyPress);
      }

      clearInterval(gameInterval);
    };
  }, [
    handleTouchStart,
    handleTouchMove,
    handleKeyPress,
    gameController,
    speed,
    isMobile,
  ]);

  const makeClassName = () => {
    if (gameRunning.current && !gameOver) return "game-field start";
    if (!gameRunning.current && gameOver) return "game-field game-over";

    return "game-field";
  };

  if (gameRunning.current && !userName) {
    const savedName = sessionStorage.getItem("userName");
    Boolean(savedName) ? setUserName(savedName) : setUserName(null);
  }

  return (
    <main>
      {userName && <InfoText text={`${userName}`} />}
      {/* INIT GAME */}
      {!gameRunning.current && !gameOver && (
        <Dialog
          type="start"
          text={`Your score is ${score}`}
          startGameHandler={() => startGame()}
        />
      )}

      {/* GAME OVER */}
      {!gameRunning.current && gameOver && (
        <Dialog
          type="end"
          text={`Your score is ${score}`}
          startGameHandler={() => startGame()}
        />
      )}

      {/* RUNNING GAME */}
      <div className={makeClassName()}>
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
      <InfoText text={`Score: ${score}`} />
    </main>
  );
};

export default Game;
