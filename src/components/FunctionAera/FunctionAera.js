import './FunctionAera.css'
import '../../font/iconfont.css'
import News from '../News/News'
import CalComponent from '../Calendar/CalComponent.js'
import Todo from '../Todo'
import Pictures from '../../Pictures'
import { useSelector } from 'react-redux'


//测试上传
export default function FunctionAera(){   //中间的功能组件，放在里面

    const clear = useSelector(state=>state.clear)
    let display = clear? 'none':'block'
    
    return (
        <div className='functionAera'>
            {/* <News></News> */}
            <Todo/>
            <CalComponent></CalComponent>
            <Pictures/>
        </div>
    )
}