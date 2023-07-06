import FuncModal from "../../FuncModal/FuncModal";
import { memo, useState } from "react";
import "./AppFolder.css";

function AppFolder(props) {
  // modal组件控制函数
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { contents, name } = props;
  console.log(contents);

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

  const onDragEnd = e => {
    e.stopPropagation();
    e.preventDefault();
    let region =
      e.target.parentNode.parentNode.parentNode.parentNode.getBoundingClientRect();
    if (
      e.clientY >= region.top &&
      e.clientY <= region.bottom &&
      e.clientX >= region.left &&
      e.clientX <= region.right
    ) {
      console.log("in");
    } else {
      console.log("out");
    }
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
        bodyStyle={{
          border: "5px solid white",
          background: "#fff0",
        }}
        undraggable={true}
        width={"25vw"}
        height={"25vw"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className='app-folder-modal'>
          {contents.map((item, index) => (
            <a
              rel='noreferrer'
              key={item.name}
              href={item.href}
              target={"_blank"}
              onDragEnd={onDragEnd}
              // onDrop={e => {
              //   e.stopPropagation();
              //   console.log(e);
              // }}
            >
              <img
                key={item.id}
                style={{ width: "4.5vw" }}
                alt={item.name}
                src={item.imgPath}
              />
            </a>
          ))}
        </div>
        <div className='folder-name'>{name}</div>
      </FuncModal>
    </>
  );
}

export default memo(AppFolder);
