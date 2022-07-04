import './SetClock.css';
import { Radio } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from "../../../hooks/useLocalStorage";

export default function SetClock(){

    const dispatch = useDispatch()
    // const [value, setValue] = useState(1);
    const [timeFont, setTimeFont] = useLocalStorage('timefont')  
    const TimeFont = useSelector(state=>state.timefont)

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        // setValue(e.target.value);
        dispatch({                       
          type: 'CHANGE_TIMEFONT',
          timefont:e.target.value,
       })
        setTimeFont(e.target.value)
    };

    return (
        <div>
            <span>时间样式</span>
            <span>
            <Radio.Group onChange={onChange} value={TimeFont}>
            <Radio value={1}>普通</Radio>
            <Radio value={2}>数码</Radio>
            </Radio.Group>
            </span>
        </div>
    )
}