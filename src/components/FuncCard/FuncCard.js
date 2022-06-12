
import './FuncCard.css'

export default function FuncCard(props){

    const {title, iconColor} = props

    return (
        <div className='funcCard'>
            <div className='cardTitle'><div color={iconColor}></div>{title}</div>
            {props.children}
        </div>
    )
}