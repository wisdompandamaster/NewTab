import FuncModal from "../../FuncModal/FuncModal";
import { memo, useState } from "react";
import "./AppFolder.css";

function AppFolder() {
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

  const addFolder = () => {};

  return (
    <>
      <div className='app-folder' onClick={showModal}></div>
      <FuncModal
        bodyStyle={{ padding: "11px" }}
        width={"30vw"}
        height={"30vw"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div></div>
      </FuncModal>
    </>
  );
}

export default memo(AppFolder);
