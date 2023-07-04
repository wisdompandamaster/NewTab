import "./Apps.css";
import "../../font/iconfont.css";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import AppFolder from "./AppFolder/AppFolder";
// import ClickMenu from "../ClickMenu/ClickMenu";

export default function Apps() {
  const dispatch = useDispatch();
  const deleteMode = useSelector(state => state.deleteApp);
  const myApps = useSelector(state => state.myApps);
  const [items, setItems] = useState(myApps);
  // let timePos = useSelector(state => state.timePos);

  let height = "30vw";

  useEffect(() => {
    //这一行让Apps SetApps 拖拽时可以同步变换
    setItems(myApps);
  }, [myApps]);

  const deleteApp = id => {
    // e.target.parentNode.classList.add('delete')
    // console.log('deleteAPP')
    let updatemyApps = myApps.filter(item => item.id !== id);
    localStorage.setItem("apps", JSON.stringify(updatemyApps));
    setItems(updatemyApps);
    dispatch({
      type: "CHANGE_APPS",
      myApps: updatemyApps,
    });
  };

  const handleContextMenu = (e, b) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: "CHANGE_DELETEAPP",
      deleteApp: !b,
    });
  };

  const renderItem = item => {
    const shake = deleteMode ? " shake" : "";
    const app = (
      <a rel='noreferrer' key={item.name} href={item.href} target={"_blank"}>
        <img
          onContextMenu={e => handleContextMenu(e, deleteMode)}
          alt={item.name}
          src={item.imgPath}
        />
      </a>
    );
    const folder = (
      <div>
        <AppFolder contents={item.children} name={item.name} />
      </div>
    );

    return (
      <div className={"apps_sortableItem" + shake}>
        <Button
          style={{ visibility: deleteMode ? "visible" : "hidden" }}
          shape='circle'
          icon={<CloseOutlined />}
          size='small'
          onMouseDown={() => deleteApp(item.id)}
        />
        {item.type ? folder : app}
      </div>
    );
  };

  //拖拽排序插件-----------------------------------
  const SortableItem = SortableElement(({ value }) => renderItem(value));
  const SortableList = SortableContainer(({ items }) => {
    return (
      <div className='apps_sortable'>
        {items.map((value, index) => (
          <SortableItem key={index} index={index} value={value} />
        ))}
      </div>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMoveImmutable(items, oldIndex, newIndex));
    localStorage.setItem(
      "apps",
      JSON.stringify(arrayMoveImmutable(items, oldIndex, newIndex))
    ); //这里更改了，但是还不能同步
    dispatch({
      type: "CHANGE_APPS",
      myApps: arrayMoveImmutable(items, oldIndex, newIndex),
    });
  };

  // const onSortOver = (
  //   // { index, oldIndex, newIndex, collection, isKeySorting },
  //   e
  // ) => {
  //   e.helper.querySelector("div").style.transform = "scale(0.8)";
  // };
  //-------------------------------------------------

  // const renderCard = (item)=>{
  //   return (   //因为click事件会引发拖动，所以这里click没有生效，设置transition解决了
  //     <a rel="noreferrer" key={item.name} href={item.href} target={'_blank'} ><img alt={item.name} src={item.imgPath}/></a>
  //   )
  // }

  return (
    // <div className="Apps">{myApps.map((item, i) => renderItem(item))}</div>
    //通过给SortableList 设置最小拖动距离来激活点击事件（distance 单位px）
    <div className='Apps' style={{ height: height }}>
      <SortableList
        distance={1}
        axis='xy'
        items={items}
        onSortEnd={onSortEnd}
        // onSortOver={onSortOver}
      />
      {/* {apps.map((app, i) => renderCard(app, i))} */}
    </div>
  );
}
