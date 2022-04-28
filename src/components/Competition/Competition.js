import './Competition.css'

export default function Competition(){
    return (
        <>
        <div className='competition'>
            <div className="com_left"><div></div><p>比赛信息</p></div>
            <div className="com_right">
                <span>NBA</span>
                <span>LOL</span>
                <span>围棋</span>
            </div>
            <div className="com_board"></div>
        </div>
        </>
    )
}