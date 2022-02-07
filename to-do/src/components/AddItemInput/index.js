import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

function AddItemInput({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit({
        id: Math.floor(Math.random() * 10000),
        isCompleted: false,
        text: input,
        date: new Date().toLocaleDateString(),
      });
      setInput("");
    }
  };

  return (
    <div id="add-item-input">
      <FontAwesomeIcon icon={faPlus} />
      <input
        type="text"
        placeholder="✍️ Add item..."
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default AddItemInput;
