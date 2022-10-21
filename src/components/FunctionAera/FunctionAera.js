import './FunctionAera.css'
import '../../font/iconfont.css'
import News from '../News/News'
import Todo from '../Todo/Todo'
import Pictures from '../Pictures'
import Notes from "../Notes";
import Weather from '../Weather/Weather'
import CalComponent from '../Calendar/CalComponent'
import Competition from '../Competition/Competition'
import CountDown from '../CountDown/CountDown'
import ServerMonitor from '../ServerMonitor/ServerMonitor'
import ToolKit from '../ToolKit/ToolKit'
import Demos from '../Demos/Demos'
// import Memo from '../Memo/Memo'
// import YearToday from '../FuncModule/YearToday/YearToday'
import TomatoClock from '../TomatoClock/TomatoClock'

import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import {arrayMoveImmutable} from 'array-move'
import { useSelector, useDispatch } from 'react-redux'
import { memo, useEffect, useState } from 'react'
import {  Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

//TODO: 1.服务器性能监控模块，2. 前端工具箱模块 3. 股票信息模块 4. 图片上传图床模块 5. 博客文章显示（改写笔记） 6. 日历添加打卡功能 7. 那年今日 8.桌面宠物或者人偶

// type 0 为装饰类  1 为功能类
const funcs = [{id:0, node:<News/>, type:'1'},
               {id:1, node:<Todo/>, type:'1'},
               {id:2, node:<Pictures/>, type:'0'},
               {id:3, node:<Notes/>, type:'1'},
               {id:4, node:<Weather/>, type:'1'},
               {id:5, node:<CalComponent/>, type:'1'},
               {id:6, node:<CountDown/>, type:'1'},
               {id:7, node:<Competition/>, type:'1'},
               {id:8, node:<ServerMonitor/>, type:'1'},
               {id:9, node:<ToolKit/>, type:'1'},
               {id:10, node:<Demos/>, type:'0'},
              //  {id:11, node:<Memo/>},
              //  {id:11, node:<YearToday/>},
               {id:11, node:<TomatoClock/>, type:'1'}
              ]

//测试上传
const FunctionAera = ()=>{   //中间的功能组件，放在里面

  const funcdeleteMode = useSelector((state) => state.deleteFunc);
  const functionList = useSelector((state)=>state.functionList);

  //先重新排列这些组件，统一组件大小
  // let functionList = localStorage.getItem('functionList')? localStorage.getItem('functionList'):"[0,1,2,3,4,5,6,7]"
  //const functionList = useSelector(state=>state.functionList)
  const [items, setItems] = useState(functionList);

  const dispatch = useDispatch()

  const funcshake = funcdeleteMode ? " funcshake":""

  useEffect(()=>{
     setItems(functionList);
  },[functionList])

  const handleContextMenu = (e,b)=>{
    e.stopPropagation();
    e.preventDefault();
    dispatch({
      type: "CHANGE_DELETEFUNC",
      deleteFunc: !b,
    });
 }

  const SortableItem = SortableElement(({value}) => <div className={'sortableItem' + funcshake}
  // 鼠标右键事件
  onContextMenu={(e)=>handleContextMenu(e, funcdeleteMode)}>
    {/* 删除模式按钮 */}
   <Button
              style={{visibility: funcdeleteMode?'visible':'hidden'}}
              shape="circle"
              icon={ <CloseOutlined /> }
              size="small"
              onMouseDown={(e) => deleteFunc(funcs[value].id)}
  />
  {funcs[value].node}
  </div>
  );


  
 const SortableList = SortableContainer(({items}) => {
        return (
          <div className='sortable'>
            {items.map((value, index) => (
              <SortableItem onClick={()=>console.log(value)} key={index} index={index} value={value} />
            ))}
          </div>
        );
    });

  const deleteFunc = (id) => {
    let newList = items;
    //删除数组中指定元素
    newList.splice(newList.indexOf(id),1);
    setItems(newList);
    localStorage.setItem('functionList',JSON.stringify(newList));
    // let updatemyApps = myApps.filter((item) => item.id !== id);
    // localStorage.setItem('apps', JSON.stringify(updatemyApps))
    // setItems(updatemyApps);
    dispatch({
      type: "CHANGE_FUNCS",
      functionList: newList,
    });
    // console.log("deleteFunc")
  };
 
    
    const onSortEnd = ({oldIndex, newIndex}) => {
        setItems( 
             arrayMoveImmutable(items, oldIndex, newIndex),
          );
          localStorage.setItem('functionList',JSON.stringify(arrayMoveImmutable(items, oldIndex, newIndex)))
      };
    
    return (
        <div className='functionAera'>
        <SortableList distance={funcdeleteMode ? 0 : 2} axis='xy' items={items} onSortEnd={onSortEnd} />
        </div>
    )
}

export default memo(FunctionAera);