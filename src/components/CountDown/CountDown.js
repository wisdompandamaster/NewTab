import './CountDown.css'

//一个想法，把顶部的时间变成倒计时，可选
export default function CountDown(){

    const now = new Date()
    //const nowDate = now.getHours().toLocaleString();
    const deadline = new Date('2022-12-24 00:00')
    const timeRemainning = deadline - now;
    let day, hour, minute, second;
    
    second = Math.floor(timeRemainning / 1000 % 60)     //用余数来把毫秒转化为可表示的时间
    minute = Math.floor(timeRemainning / 1000 / 60 % 60)
    hour = Math.floor(timeRemainning / 1000 / 60 / 60 % 24)
    day = Math.floor(timeRemainning / 1000 / 60 / 60 / 24) + 1

    return (
        <>
        <div className='CountDown'>
            <div className='left'><div></div><p>倒计时</p></div>
            <div className='countdown_content'>
                <div>距离考研还剩</div>
                <div>{day}<span>days</span></div>
            </div>
        </div>
        </>
    )

}