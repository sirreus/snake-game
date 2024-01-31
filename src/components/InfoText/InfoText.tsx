import React from "react";

import "./styles.css";

interface IInfoText {
  text: string;
}

export const InfoText: React.FC<IInfoText> = ({ text }) => {
  return <div className="info-text">{text}</div>;
};
