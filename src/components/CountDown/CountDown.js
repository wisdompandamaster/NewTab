import './CountDown.css'

//一个想法，把顶部的时间变成倒计时，可选
export default function CountDown(){
    return (
        <>
        <div className='CountDown'>
            <div className='left'><div></div><p>倒计时</p></div>
            <div className='countdown_content'>
                <div>距离考研还剩</div>
                <div>123<span>days</span></div>
            </div>
        </div>
        </>
    )

}