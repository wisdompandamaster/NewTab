import React, { useState } from "react";
import { CheckCircleTwoTone, createFromIconfontCN } from "@ant-design/icons";
import { Modal, Button, notification } from "antd";
import useLocalStorage from "../hooks/useLocalStorage";
import TodoModal from "./TodoModal";

export function getMeta(todos) {
  const completed = todos.filter((todo) => todo.isCompleted);
  const uncompleted = todos.filter((todo) => !todo.isCompleted);
  return {
    completed: completed,
    uncompleted: uncompleted,
  };
}

function Todo() {
  //localstorage
  const [persistedTodoList, setPersistedTodoList] = useLocalStorage(
    "todoList",
    []
  );
  const [todos, setTodos] = useState(persistedTodoList);

  // 打勾
  const completeTodo = (id) => {
    let updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(updateTodos);
    setPersistedTodoList(updateTodos);
  };

  // 组件默认显示今日待办事项
  const todosToday = todos.filter(
    (todo) => todo.date === new Date().toLocaleDateString()
  );
  const metaToday = getMeta(todosToday);

  // modal组件控制函数
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    openNotification();
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 提示框函数
  const key = "updatable";
  const openNotification = () => {
    notification.open({
      key,
      message: "Tips",
      description:
        "`双击事件/点击修改按钮`可以修改事件内容:`q` 键取消修改, `回车`确认修改。",
    });
    setTimeout(() => {
      notification.open({
        key,
        message: "Tips",
        description: "`点击删除按钮`可以删除事件.",
      });
    }, 2000);
  };

  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_3180970_kmsy1a7e7d8.js",
  });

  return (
    <>
      <div id="todo-app">
        <div id="todo-container">
          <div id="side-container">
            <header id="todo-header">
              <div id="app-icon"></div>
              <h1 id="app-title">待办事项</h1>
            </header>
            <div id="todo-count">
              <div className="count">
                <h1 id="count-completed">{metaToday.completed.length}</h1>
                <p id="p-completed">已做</p>
              </div>
              <div className="count">
                <h1>{metaToday.uncompleted.length}</h1>
                <p>待做</p>
              </div>
            </div>
          </div>
          <div id="items-container">
            <Button type="link" id="modal-button" onClick={showModal}>
              More...
            </Button>
            {metaToday.uncompleted.map((todo, i) => (
              <div key={todo.id}>
                <div className="todo-item" key={todo.id}>
                  <IconFont
                    type="icon-bx-circle"
                    className="item-icon"
                    onClick={() => completeTodo(todo.id)}
                  />
                  <div className="item-text">{todo.text}</div>
                </div>
                {i === metaToday.uncompleted.length - 1 ? "" : <hr />}
              </div>
            ))}
            {metaToday.uncompleted.length && metaToday.completed.length ? (
              <hr />
            ) : (
              ""
            )}
            {metaToday.completed.map((todo, i) => (
              <div key={todo.id}>
                <div className="todo-item" key={todo.id}>
                  <CheckCircleTwoTone
                    twoToneColor="#52c41a"
                    className="item-icon"
                    onClick={() => completeTodo(todo.id)}
                  />
                  <div className="item-text">{todo.text}</div>
                </div>
                {i === metaToday.completed.length - 1 ? "" : <hr />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        title="待办事项"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TodoModal
          todos={todos}
          setTodos={setTodos}
          completeTodo={completeTodo}
        />
      </Modal>
    </>
  );
}

export default Todo;
