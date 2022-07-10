import "./Apps.css";
import "../../font/iconfont.css";
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import {arrayMoveImmutable} from 'array-move'
import {useSelector,useDispatch} from 'react-redux';
import React, { useState, useEffect} from 'react';

export default function Apps() {

  const dispatch = useDispatch();
  const myApps = useSelector((state) => state.myApps);
  const [items, setItems] = useState(myApps);

  useEffect(()=>{          //这一行让Apps SetApps 拖拽时可以同步变换
    setItems(myApps)
  },[myApps])

  const renderItem = (item)=>{
    return (
      <div className="apps_sortableItem">
      {/* <Button
            shape="circle"
            icon={deleteMode ? <CloseOutlined /> : ""}
            size="small"
            onMouseDown={() => deleteApp(item.id)}
      /> */} 
      <a 
      rel="noreferrer" key={item.name} href={item.href} target={'_blank'} >
      <img  alt={item.name} src={item.imgPath}/>
      </a>
      {/* <div>{item.name}</div> */}
      </div>
    )

}

//拖拽排序插件-----------------------------------
const SortableItem = SortableElement(({value}) => renderItem(value));
const SortableList = SortableContainer(({items}) => {
        return (
          <div className='apps_sortable'>
            {items.map((value, index) => (
              <SortableItem key={index} index={index} value={value} />
            ))}
          </div>
        );
    });
    
    const onSortEnd = ({oldIndex, newIndex}) => {
        setItems( 
             arrayMoveImmutable(items, oldIndex, newIndex),
          );
          localStorage.setItem('apps',JSON.stringify(arrayMoveImmutable(items, oldIndex, newIndex)));    //这里更改了，但是还不能同步
          dispatch({
            type: "CHANGE_APPS",
            myApps: arrayMoveImmutable(items, oldIndex, newIndex),
          });
      };
//-------------------------------------------------


  // const renderCard = (item)=>{
  //   return (   //因为click事件会引发拖动，所以这里click没有生效，设置transition解决了
  //     <a rel="noreferrer" key={item.name} href={item.href} target={'_blank'} ><img alt={item.name} src={item.imgPath}/></a>
  //   )
  // }             
  
  return (
      // <div className="Apps">{myApps.map((item, i) => renderItem(item))}</div>
      //通过给SortableList 设置最小拖动距离来激活点击事件（distance 单位px）
      <div className='Apps'>
      <SortableList  distance={1} axis='xy' items={items} onSortEnd={onSortEnd} />
       {/* {apps.map((app, i) => renderCard(app, i))} */}
       </div>
  );

}
