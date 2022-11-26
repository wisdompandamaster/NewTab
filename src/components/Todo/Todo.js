import React, { useEffect, useState, memo } from "react";
import { CheckCircleTwoTone, createFromIconfontCN } from "@ant-design/icons";
import { notification } from "antd";
import useLocalStorage from "../../hooks/useLocalStorage";
import TodoModal from "./TodoModal";
import { useSelector, useDispatch } from "react-redux";
import cookie from "react-cookies";
import defaultSetting from "../../config/index";
import FuncCard from "../FuncCard/FuncCard";
import FuncModal from "../FuncModal/FuncModal";

export function getMeta(todos) {
  const completed = todos.filter(todo => todo.isCompleted);
  const uncompleted = todos.filter(todo => !todo.isCompleted);
  return {
    completed: completed,
    uncompleted: uncompleted,
  };
}

function Todo() {
  const dispatch = useDispatch(); //引入dispatch和useselector
  const TodoDatePos = useSelector(state => state.TodoDatePos);

  //localstorage
  const [persistedTodoList, setPersistedTodoList] = useLocalStorage(
    "todoList",
    []
  );
  const [todos, setTodos] = useState(persistedTodoList);

  const getTodoDates = (
    todos //获得笔记的日期，并且去重
  ) =>
    todos.reduce((total, item) => {
      if (!item.isCompleted) {
        total.add(item.date); //用set来存储去重日期
      }
      return total;
    }, new Set());

  useEffect(() => {
    let url = defaultSetting.site + "/functions/getmytodos/";
    async function getTodos() {
      fetch(url, {
        credentials: "include",
      })
        .then(response => response.json())
        .then(data => {
          setTodos(JSON.parse(data.res));
          setPersistedTodoList(JSON.parse(data.res));
        });
      // .catch(e => console.log(e.message));
    }
    if (cookie.load("status") === "200") {
      //获取数据

      getTodos();
    }
  }, []);

  useEffect(() => {
    let TodoDates = [...getTodoDates(todos)];
    dispatch({
      //dispatch到store
      type: "CHANGE_TODODATES",
      TodoDates: TodoDates,
    });

    let url = defaultSetting.site + "/functions/savemytodos/";
    async function saveTodos() {
      fetch(url, {
        method: "post",
        body: JSON.stringify(todos),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then(response => response.json());
      // .then(data => {})
      // .catch(e => console.log("error"));
    }

    if (cookie.load("status") === "200") {
      //保存到数据库

      saveTodos();
    }
  }, [todos]);

  // 打勾
  const completeTodo = (e, id) => {
    e.stopPropagation();
    let updateTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(updateTodos);
    setPersistedTodoList(updateTodos);
  };

  // 组件默认显示今日待办事项
  const todosToday = todos.filter(todo => todo.date === TodoDatePos);
  const metaToday = getMeta(todosToday);

  // modal组件控制函数
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    // openNotification();
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

  const handleWheelCapture = e => {
    if (metaToday.uncompleted.length + metaToday.completed.length > 5) {
      //如果事项大于五条，滚动事件就停止冒泡
      e.stopPropagation();
    }
  };

  return (
    <>
      <FuncCard
        title='待办事项'
        iconStyle={{
          background: "linear-gradient(180deg, #b1ff64 0%, #11f2af 100%)",
          boxShadow: "0px 3px 6px rgba(71, 255, 55, 0.8)",
        }}
      >
        <div id='todo-container' onClick={showModal}>
          <div id='side-container'>
            {/* <header id="todo-header">
              <div id="app-icon"></div>
              <h1 id="app-title">待办事项</h1>
            </header> */}
            <div id='todo-count'>
              <div className='count'>
                <h1 id='count-completed'>{metaToday.completed.length}</h1>
                <p id='p-completed'>已做</p>
              </div>
              <div className='count'>
                <h1>{metaToday.uncompleted.length}</h1>
                <p>待做</p>
              </div>
            </div>
          </div>
          <div id='items-container' onWheelCapture={handleWheelCapture}>
            {metaToday.uncompleted.map((todo, i) => (
              <div key={todo.id}>
                <div
                  className='todo-item'
                  onClick={e => completeTodo(e, todo.id)}
                  key={todo.id}
                >
                  <IconFont type='icon-bx-circle' className='item-icon' />
                  <div className='item-text'>{todo.text}</div>
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
                <div
                  className='todo-item'
                  onClick={e => completeTodo(e, todo.id)}
                  key={todo.id}
                >
                  <CheckCircleTwoTone
                    twoToneColor='#52c41a'
                    className='item-icon'
                  />
                  <div className='item-text item-completed'>{todo.text}</div>
                </div>
                {i === metaToday.completed.length - 1 ? "" : <hr />}
              </div>
            ))}
          </div>
        </div>
      </FuncCard>
      <FuncModal
        bodyStyle={{ padding: "11px" }}
        title={
          <div
            style={{
              fontSize: "25px",
              fontWeight: "500",
              letterSpacing: "8px",
              marginLeft: "24px",
            }}
          >
            待办事项
          </div>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        expand={true}
      >
        <TodoModal
          todos={todos}
          setTodos={setTodos}
          completeTodo={completeTodo}
        />
      </FuncModal>
    </>
  );
}

export default memo(Todo);
