import React, { useState } from "react";
import EditItemInput from "../EditItemInput";
import {
  createFromIconfontCN,
  EditOutlined,
  DeleteFilled,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import "./index.css";

function TodoItems({ todos, completeTodo, removeTodo, updateTodo }) {
  const defaultEditValue = { id: null, value: "" };
  const [edit, setEdit] = useState(defaultEditValue);

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit(defaultEditValue);
  };

  const cancelEdit = e => {
    if (e.keyCode === 27) {
      setEdit(defaultEditValue);
    }
  };

  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_3180970_ek9le05bzhc.js",
  });

  return todos.length ? (
    todos.map((todo, index) => {
      return (
        <div
          className={todo.isCompleted ? "item complete" : "item"}
          key={index}
          onKeyDown={cancelEdit}
        >
          <div className='todo-icon' onClick={e => completeTodo(e, todo.id)}>
            {todo.isCompleted ? (
              <CheckCircleTwoTone
                twoToneColor='#52c41a'
                className='completed'
              />
            ) : (
              <IconFont type='icon-bx-circle' className='uncompleted' />
            )}
          </div>
          <div
            key={todo.id}
            className='todo-text'
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
                <p className='text'>{todo.text}</p>
                <p className='date'>{todo.date}</p>
              </>
            )}
          </div>
          <div className='edit-icon'>
            <EditOutlined
              onClick={() => setEdit({ id: todo.id, value: todo.text })}
            />
          </div>
          <div className='delete-icon'>
            <DeleteFilled onClick={() => removeTodo(todo.id)} />
          </div>
        </div>
      );
    })
  ) : (
    <div
      style={{
        fontSize: "30px",
        height: "120px",
        width: "100%",
        textAlign: "center",
        lineHeight: "110px",
        fontWeight: "700",
        color: "#00000033",
        letterSpacing: "8px",
        marginTop: "35%",
      }}
    >
      暂无内容
    </div>
  );
}

export default TodoItems;
