import React from "react";

interface IDialogNameForm {
  inputName: string | null;
  onInputChange: (input: string) => void;
  savedName: string | null;
}

export const DialogNameForm: React.FC<IDialogNameForm> = ({
  inputName,
  onInputChange,
  savedName,
}) => {
  return (
    <form className="name-form">
      {savedName ? (
        <span
          className="dialog-text start"
          style={{ width: "100%", textAlign: "center" }}
        >
          It's nice to see you again
        </span>
      ) : (
        <>
          <label className="dialog-text start">What is your name?</label>
          <input
            type="text"
            value={inputName || ""}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Enter name"
          />
        </>
      )}
    </form>
  );
};
