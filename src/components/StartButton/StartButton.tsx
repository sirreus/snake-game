import React from "react";

import "./styles.css";

interface IStartButton {
  text: string;
  onClick: () => void;
}

export const StartButton: React.FC<IStartButton> = ({ text, onClick }) => {
  return (
    <button className="start-btn" onClick={() => onClick()}>
      {text}
    </button>
  );
};
