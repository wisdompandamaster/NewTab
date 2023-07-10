import FuncModal from "../../FuncModal/FuncModal";
import { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AppFolder.css";

function AppFolder(props) {
  // modal组件控制函数
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ediable, setEdiable] = useState(false);
  const { contents, name, folderId } = props;
  const myApps = useSelector(state => state.myApps);

  const dispatch = useDispatch();

  useEffect(() => {
    // () => {
    //   let node = document.querySelector("div.app-folder");
    //   node.style.transform = "scale(0)";
    // };
  }, []);

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

  const onDragEnd = (e, item) => {
    e.stopPropagation();
    e.preventDefault();

    let foldernode = e.target.parentNode.parentNode.parentNode.parentNode;
    let region = foldernode.getBoundingClientRect();
    if (
      e.clientY >= region.top &&
      e.clientY <= region.bottom &&
      e.clientX >= region.left &&
      e.clientX <= region.right
    ) {
      console.log("in");
    } else {
      let folderIndex = myApps.findIndex(i => i.id === folderId);
      // 去除文件夹内图标
      myApps[folderIndex].children.splice(
        myApps[folderIndex].children.findIndex(i => i.id === item.id),
        1
      );

      // dispatch时就移除文件夹，没有动画
      if (myApps[folderIndex].children.length === 0) {
        // let node = document.querySelector("div.app-folder");
        // node.style.transform = "scale(0)";
        myApps.splice(folderIndex, 1);
      }
      // console.log(myApps);
      const apps = [...myApps, item];
      dispatch({
        type: "CHANGE_APPS",
        myApps: apps,
      });
      localStorage.setItem("apps", JSON.stringify(apps));
    }
  };

  const OnDrag = (e, item) => {
    e.stopPropagation();
    e.preventDefault();
    let region =
      e.target.parentNode.parentNode.parentNode.parentNode.getBoundingClientRect();
    if (
      !(
        e.clientY >= region.top &&
        e.clientY <= region.bottom &&
        e.clientX >= region.left &&
        e.clientX <= region.right
      )
    ) {
      setIsModalVisible(false);
    }
  };

  const editFolderName = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    setEdiable(true);
  };

  const onKeyDown = e => {
    // console.log(e);
    if (e.key == "Enter") {
      setEdiable(false);
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
              onDragEnd={e => onDragEnd(e, item)}
              onDrag={e => OnDrag(e, item)}
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
        <input
          placeholder={name}
          className='folder-name-input'
          style={{ display: ediable ? "inline-block" : "none" }}
          onKeyDown={onKeyDown}
        />
        <div
          className='folder-name'
          style={{ display: ediable ? "none" : "inline-block" }}
          onDoubleClick={e => editFolderName(e, name)}
        >
          {name}
        </div>
      </FuncModal>
    </>
  );
}

export default memo(AppFolder);
