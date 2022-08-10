import { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import './FuncCard.css'

/**
 * 
 * 组件可选参数：
 * title         （Stirng）
 * iconStyle      (CSS Style)
 * kinds          ([])
 * changeType()   
 * className
 *  
 */

//加入filter:blur
const FuncCard = (props)=>{

    const cardstyle = useSelector(state=>state.cardstyle)
    const {title, iconStyle, kinds} = props
    
    const [type, setType] = useState(0)

    const if_title = title ? '':' no-title'  //判断是否有标题来确定内容的布局方式

    const classlist = props.className ? (' ' + props.className):'' //原来的类名

    const cardstyles=['',' filter']

    return (
        <div className={'funcCard' + if_title + classlist + cardstyles[cardstyle]}>
        {title ?      //标题
            <div className='cardTitle'><div style={iconStyle}></div>{title}</div> : null
        }
        {
         kinds ?      //右边种类标签
            <div className='cardKinds'>
                {
                    kinds.map((item, index)=>{
                        return (
                            <span key={index} onMouseOver={()=>{setType(index);props.changeType(index)}} style={{backgroundColor:(type===index? '#00000022':'#ffffff00')}}>{item}</span>
                        )
                    })
                }
                
            </div> : null
        }
            {props.children}
        </div>
    )
}

export default memo(FuncCard);