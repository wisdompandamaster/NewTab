import React, { useState } from "react";
import EditItemInput from "../EditItemInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faCheck,
  faEdit,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";

function TodoItems({ todos, completeTodo, removeTodo, updateTodo }) {
  const defaultEditValue = { id: null, value: "" };
  const [edit, setEdit] = useState(defaultEditValue);

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit(defaultEditValue);
  };

  const cancelEdit = (e) => {
    if (e.keyCode === 27) {
      setEdit(defaultEditValue);
    }
  };

  return todos.map((todo, index) => {
    return (
      <div
        className={todo.isCompleted ? "item complete" : "item"}
        key={index}
        onKeyDown={cancelEdit}
      >
        <div className="item-icon" onClick={() => completeTodo(todo.id)}>
          {todo.isCompleted ? (
            <FontAwesomeIcon icon={faCheck} className="completed" />
          ) : (
            <FontAwesomeIcon icon={faCircleNotch} className="uncompleted" />
          )}
        </div>
        <div
          key={todo.id}
          className="item-text"
          onDoubleClick={() => setEdit({ id: todo.id, value: todo.text })}
        >
          {todo.id === edit.id && !todo.isCompleted ? (
            <EditItemInput
              date={todo.date}
              edit={edit}
              onSubmit={submitUpdate}
            />
          ) : (
            <>
              <p className="text">{todo.text}</p>
              <p className="date">{todo.date}</p>
            </>
          )}
        </div>
        <div className="edit-icon">
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => setEdit({ id: todo.id, value: todo.text })}
          />
        </div>
        <div className="delete-icon">
          <FontAwesomeIcon
            icon={faTimesCircle}
            onClick={() => removeTodo(todo.id)}
          />
        </div>
      </div>
    );
  });
}

export default TodoItems;
