
import './FuncCard.css'

export default function FuncCard(props){

    const {title, iconStyle} = props
    
    const if_title = title ? '':' no-title'  //判断是否有标题来确定内容的布局方式

    return (
        <div className={'funcCard' + if_title}>
        {title ? 
            <div className='cardTitle'><div style={iconStyle}></div>{title}</div> : null
        }
            {props.children}
        </div>
    )
}