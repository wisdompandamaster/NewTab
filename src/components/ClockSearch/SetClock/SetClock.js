import './SetClock.css';
import { Radio } from 'antd';
import { useState } from 'react';

export default function SetClock(){

    const [value, setValue] = useState(1);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <div>
            <span>时间样式</span>
            <span>
            <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
            </Radio.Group>
            </span>
        </div>
    )
}