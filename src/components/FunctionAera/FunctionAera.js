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
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import {arrayMoveImmutable} from 'array-move'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import {  Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

//TODO: 1.服务器性能监控模块，2. 前端工具箱模块，3. 股票信息模块 4. 图片上传图床模块
const funcs = [{id:0, node:<News/>},
               {id:1, node:<Todo/>},
               {id:2, node:<Pictures/>},
               {id:3, node:<Notes/>},
               {id:4, node:<Weather/>},
               {id:5, node:<CalComponent/>},
               {id:6,node:<CountDown/>},
               {id:7, node:<Competition/>},
               {id:8, node:<CountDown/>}
              ]

//测试上传
export default function FunctionAera(){   //中间的功能组件，放在里面

  const funcdeleteMode = useSelector((state) => state.deleteFunc);

  //先重新排列这些组件，统一组件大小
  let functionList = localStorage.getItem('functionList')? localStorage.getItem('functionList'):"[0,1,2,3,4,5,6,7]"
  //const functionList = useSelector(state=>state.functionList)
  const [items, setItems] = useState(JSON.parse(functionList));

  const dispatch = useDispatch()

  const funcshake = funcdeleteMode ? " funcshake":""

  const handleContextMenu = (e,b)=>{
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
    // e.target.parentNode.classList.add('delete')
    // console.log('deleteAPP')
    let newList = items;
    //删除数组中指定元素
    let oldList = items;
    newList.splice(newList.indexOf(id),1);
    console.log(oldList)
    console.log(id)
    console.log(newList)
    setItems(newList);
    localStorage.setItem('functionList',JSON.stringify(newList));
    // let updatemyApps = myApps.filter((item) => item.id !== id);
    // localStorage.setItem('apps', JSON.stringify(updatemyApps))
    // setItems(updatemyApps);
    // dispatch({
    //   type: "CHANGE_APPS",
    //   myApps: updatemyApps,
    // });
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