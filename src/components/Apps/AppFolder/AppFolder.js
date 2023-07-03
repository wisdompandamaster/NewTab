import FuncModal from "../../FuncModal/FuncModal";
import { memo, useState } from "react";
import "./AppFolder.css";

function AppFolder(props) {
  // modal组件控制函数
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { contents } = props;
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

  // document.addEventListener("dragenter", function (event) {
  //   event.preventDefault();
  //   // console.log("enter");
  //   if (event.target.className == "app-folder") {
  //     event.target.style.boxShadow = "0 0 0 4px #007ACC";
  //   }
  // });

  // const dragEnterIn = () => {
  //   console.log("drag enter");
  //   // if (e.target.className === "apps_sortableItem") {
  //   //   e.target.style.transform = "scale(1.2)";
  //   // }
  // };

  return (
    <>
      <div
        className='app-folder'
        onClick={showModal}
        // onDrag={dragEnterIn}
      >
        <div className='app-contents'>
          {contents.map((item, index) => (
            <img key={index} alt={item.name} src={item.imgPath} />
          ))}
        </div>
      </div>
      <FuncModal
        bodyStyle={{ padding: "11px" }}
        width={"30vw"}
        height={"30vw"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {contents.map((item, index) => (
          <img
            key={index}
            style={{ width: "4.5vw" }}
            alt={item.name}
            src={item.imgPath}
          />
        ))}
      </FuncModal>
    </>
  );
}

export default memo(AppFolder);
