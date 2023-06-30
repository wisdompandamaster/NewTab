import "./ChatRoom.css";
import FuncModal from "../FuncModal/FuncModal";
import { useState } from "react";
import { Button } from "antd";
import { memo } from "react";

function ChatRoom() {
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

  return (
    <>
      <Button type='primary' ghost onClick={showModal}>
        聊天系统开建...
      </Button>
      <FuncModal
        bodyStyle={{ padding: "11px" }}
        width={"45%"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      ></FuncModal>
    </>
  );
}

export default memo(ChatRoom);
