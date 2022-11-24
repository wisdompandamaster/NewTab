import "./SetFunctionArea.css";
import { memo, useState } from "react";
import { Button, message } from "antd";
import { PlusOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import FuncModal from "../../FuncModal/FuncModal";
import News from "../../News/News";
import Todo from "../../Todo/Todo";
import Pictures from "../../Pictures";
import Notes from "../../Notes";
import Weather from "../../Weather/Weather";
import CalComponent from "../../Calendar/CalComponent";
import Competition from "../../Competition/Competition";
import CountDown from "../../CountDown/CountDown";
import ServerMonitor from "../../ServerMonitor/ServerMonitor";
import ToolKit from "../../ToolKit/ToolKit";
import Demos from "../../Demos/Demos";
// import Snippets from '../../Snippets/Snippets'
// import YearToday from '../../FuncModule/YearToday/YearToday';
import TomatoClock from "../../TomatoClock/TomatoClock";
import { useEffect } from "react";
import WoodenFish from "../../WoodenFish/WoodenFish";
import FormHabit from "../../FormHabit/FormHabit";

//FIXME:style have some problem

const funcs = [
  { id: 0, node: <News />, cover: 2 },
  { id: 1, node: <Todo />, cover: 2 },
  { id: 2, node: <Pictures />, cover: 2 },
  { id: 3, node: <Notes />, cover: 1 },
  { id: 4, node: <Weather />, cover: 2 },
  { id: 5, node: <CalComponent />, cover: 2 },
  { id: 6, node: <CountDown />, cover: 2 },
  { id: 7, node: <Competition />, cover: 2 },
  { id: 8, node: <ServerMonitor />, cover: 2 },
  { id: 9, node: <ToolKit />, cover: 2 },
  { id: 10, node: <Demos />, cover: 2 },
  //  {id:11, node:<Memo/>},
  //  {id:11, node:<YearToday/>},
  { id: 11, node: <TomatoClock />, cover: 2 },
  { id: 12, node: <WoodenFish />, cover: 1 },
  { id: 13, node: <FormHabit />, cover: 1 },
];

const SetFunctionArea = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  let timePos = useSelector(state => state.timePos);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  let funcNum = timePos ? 24 : 16;

  const addFunc = id => {
    let newList = JSON.parse(localStorage.getItem("functionList"));
    let cover = newList.reduce((pre, cur) => {
      return pre + funcs[cur].cover;
    }, 0);
    // && cover < funcNum 限制组件个数
    if (newList.indexOf(id) === -1) {
      newList.push(id);
      localStorage.setItem("functionList", JSON.stringify(newList));
      dispatch({
        type: "CHANGE_FUNCS",
        functionList: newList,
      });
    } else {
      message.info("功能组件已存在 或 已超过最大放置组件数");
    }
  };

  return (
    <div>
      <i className='menu-uil' onClick={showModal}>
        <AppstoreAddOutlined />
        <span>添加功能</span>
      </i>
      <FuncModal
        width='42vw'
        title={
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              color: "white",
            }}
          >
            <span style={{ fontSize: "25px" }}>添加 Card</span>
          </div>
        }
        closable={false}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 50%)",
            height: "50vh",
            rowGap: "3%",
            margin: "1% 0 1% 0",
            overflowY: "scroll",
          }}
        >
          {funcs.map((item, index) => {
            return (
              //FIXME:天气应用无法显示
              <div
                key={index}
                style={{ justifySelf: "center", position: "relative" }}
              >
                <div className='addfunc'>
                  <Button
                    shape='circle'
                    icon={<PlusOutlined />}
                    size='large'
                    onMouseDown={e => addFunc(item.id)}
                  />
                </div>
                {item.node}
              </div>
            );
          })}
        </div>
      </FuncModal>
    </div>
  );
});

export { SetFunctionArea, funcs };
