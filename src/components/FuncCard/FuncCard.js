import { Card } from 'antd'

import './FuncCard.css'

export default function FuncCard(props){
    return (
        <div className='funcCard'>
            {props.children}
        </div>
    )
}