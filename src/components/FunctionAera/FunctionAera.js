import './FunctionAera.css'
import '../../font/iconfont.css'
import News from '../News/News'
import Todo from '../Todo/Todo'
import Pictures from '../Pictures'
import Notes from "../Notes";
import Weather from '../Weather/Weather'
import CalComponent from '../Calendar/CalComponent'
import Apps from '../Apps/Apps'

import { useSelector } from 'react-redux'


//测试上传
export default function FunctionAera(){   //中间的功能组件，放在里面

    const clear = useSelector(state=>state.clear)
    let display = clear? 'none':'block'
    
    return (
        <div style={{display:display}} className='functionAera'>
            <News></News>
            <Todo/>
            <Pictures/>
            <Notes/>
           <Weather/>
           <CalComponent/> 
           <Apps/>
        </div>
    )
}