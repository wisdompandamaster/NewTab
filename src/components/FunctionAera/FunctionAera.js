import './FunctionAera.css'
import '../../font/iconfont.css'
import News from '../News/News'
import Todo from '../Todo/Todo'
import Pictures from '../Pictures'
import Notes from "../Notes";
import Weather from '../Weather/Weather'
import CalComponent from '../Calendar/CalComponent'
import Apps from '../Apps/Apps'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import {arrayMoveImmutable} from 'array-move'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const SortableItem = SortableElement(({value}) => <div className='sortableItem'>{value}</div>);
const SortableList = SortableContainer(({items}) => {
        return (
          <div className='sortable'>
            {items.map((value, index) => (
              <SortableItem key={`item-${value}`} index={index} value={value} />
            ))}
          </div>
        );
    });

//测试上传
export default function FunctionAera(){   //中间的功能组件，放在里面
 
    //先重新排列这些组件，统一组件大小，再拖拽排序 4.21待解决
    const clear = useSelector(state=>state.clear)
    let display = clear? 'none':'block'

    const [items, setItems] = useState([<News/>,<Todo/>,<Notes/>,<Weather/>,<CalComponent/>,<Pictures/>,<Apps/>]);
    const onSortEnd = ({oldIndex, newIndex}) => {
        setItems( 
             arrayMoveImmutable(items, oldIndex, newIndex),
          );
      };
    
    return (
        // <div style={{display:display}} className='functionAera'>
        //     <News></News>
        //     <Todo/>
        //     <Pictures/>
        //     <Notes/>
        //    <Weather/>
        //    <CalComponent/> 
        //    <Apps/>
        // </div>
        <div style={{display:display}} className='functionAera'>
        <SortableList axis='xy' items={items} onSortEnd={onSortEnd} />
        </div>
    )
}