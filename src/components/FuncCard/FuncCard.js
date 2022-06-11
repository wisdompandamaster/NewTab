
import './FuncCard.css'

export default function FuncCard(props){

    const {title} = props

    return (
        <div className='funcCard'>
            <div>{title}</div>
            {props.children}
        </div>
    )
}