import { useState } from 'react'
import './FuncCard.css'

/**
 * 
 * 组件可选参数：
 * title         （Stirng）
 * iconStyle      (CSS Style)
 * kinds          ([])
 * changeType()   
 *  
 */

export default function FuncCard(props){

    const {title, iconStyle, kinds} = props
    
    const [type, setType] = useState(0)

    const if_title = title ? '':' no-title'  //判断是否有标题来确定内容的布局方式

    return (
        <div className={'funcCard' + if_title}>
        {title ?      //标题
            <div className='cardTitle'><div style={iconStyle}></div>{title}</div> : null
        }
        {
         kinds ?      //右边种类标签
            <div className='cardKinds'>
                {
                    kinds.map((item, index)=>{
                        return (
                            <span key={index} onMouseOver={()=>{setType(index);props.changeType(index)}} style={{backgroundColor:(type===index? '#00000022':'#ffffff')}}>{item}</span>
                        )
                    })
                }
                
            </div> : null
        }
            {props.children}
        </div>
    )
}