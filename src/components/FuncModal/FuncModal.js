import { Modal } from "antd";
import { ExpandOutlined, CloseOutlined } from "@ant-design/icons";
import "./FuncModal.css";
import { useState, useRef, memo } from "react";
import Draggable from "react-draggable";

const FuncModal = props => {
  const [disabled, setDisabled] = useState(false);
  const [full, setFull] = useState(false);
  const [visible, setVisible] = useState(props.visible);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);

  // 拖拽组件
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();

    if (!targetRect) {
      return;
    }

    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const handleContextMenu = e => {
    e.stopPropagation();
  };

  return (
    <div onContextMenu={e => handleContextMenu(e)}>
      <Modal
        // title={props.title}
        // width={props.width}
        // height={props.height}
        width={full ? "100vw" : props.width || "50vw"}
        // height={"500px"}
        closable={false}
        visible={props.visible}
        mask={true}
        style={{
          top: full ? "0" : "20%",
          borderRadius: full ? "0" : "10px",
          // width: full ? "100vw" : props.width || "50vw",
          // transition: ".2s ease-in",
        }}
        maskStyle={{ backdropFilter: "blur(2px)", backgroundColor: "#0004" }}
        // bodyStyle={{ background: "#00000000", height: "50vh" }}
        bodyStyle={{
          background: "#fff8",
          height: full ? "100vh" : props.height || "60vh",
          width: "100%",
          borderRadius: full ? "0" : "10px",
          ...props.bodyStyle,
          // transition: ".1s ease-in",
        }}
        onOk={props.onOk}
        footer={null}
        onCancel={props.onCancel}
        // antd Modal 弹出动画
        transitionName='ant-slide-up'
        // transitionName='ant-zoom-big-fast'
        modalRender={modal => (
          <Draggable
            disabled={props.undraggable}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div
          className='expand'
          style={{ display: props.expand ? "inline-block" : "none" }}
          onClick={() => setFull(!full)}
        >
          <ExpandOutlined />
        </div>
        {props.children}
      </Modal>
    </div>
  );
};

export default memo(FuncModal);
