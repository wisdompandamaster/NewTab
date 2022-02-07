import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditItemInput({ date, edit, onSubmit }) {
  const [input, setInput] = useState(edit ? edit.value : "");
  const [startDate, setStartDate] = useState(new Date(date));
  const textRef = useRef();

  useEffect(() => {
    textRef.current.focus();
    textRef.current.setSelectionRange(-1, -1);
  }, []);

  const editText = (e) => {
    setInput(e.target.value);
  };

  const changeDate = (date) => {
    setStartDate(date);
    onSubmit({
      id: edit.id,
      isCompleted: false,
      text: input,
      date: date.toLocaleDateString(),
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit({
        id: edit.id,
        isCompleted: false,
        text: input,
        date: startDate.toLocaleDateString(),
      });
      setInput("");
    }
  };

  return (
    <div className="edit-text">
      <textarea
        ref={textRef}
        defaultValue={input}
        onKeyDown={handleKeyDown}
        onChange={editText}
      />
      <DatePicker selected={startDate} onChange={changeDate} />
    </div>
  );
}

export default EditItemInput;
