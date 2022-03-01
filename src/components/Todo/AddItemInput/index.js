import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
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
      <PlusOutlined id="plus-icon" />
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
