import './Competition.css'
import defaultSetting from '../../config';
import { useEffect, useState } from 'react'


function NBA(){
    
    const [games,setGames] = useState([])
    useEffect(()=>{
        let url = "https://china.nba.cn/stats2/scores/miniscoreboardlive.json?countryCode=CN&locale=zh_CN&tz=%2B8"
        async function getGameList(){   
            fetch(url).then((response)=>response.json())
            .then((data)=>{ setGames(data.payload.today.games)}         //.next.games 表示下一天
            ).catch((e)=>console.log("error"));
        }
        getGameList() 
       const t = setInterval(()=>{
            let flag = games.map((item,index)=>item.boxscore.status)          //获取比赛状态数组，如果有比赛正在进行才请求
            console.log(flag)
            if(flag.includes("2")){
                getGameList()
            }
            console.log('nbagames')
       },10000)              //10s更新一次
       return ()=>{
           clearTimeout(t)
       }
    },[])

    const have_game = games.map((item,index)=>{
        let awayTeam = item.awayTeam.profile.name
        let homeTeam = item.homeTeam.profile.name
        let time = new Date(item.profile.dateTimeEt)
        time = new Date(time.setHours(time.getHours() + 12))
        time = time.getHours() + " : " + time.toLocaleTimeString().slice(3,5)
        let score = item.boxscore.awayScore + " - " + item.boxscore.homeScore
        let score_time = item.boxscore.status !== "1" ?  score:time
        return (
          <div key={index} className="nba">
          <span className="nba_team"><img alt='logo' src={defaultSetting.imgSite + "nbalogo/" + awayTeam + '.png'}/>{awayTeam}</span>
          <span className="score_time">
              {score_time}
              <div style={{color:"red"}}>{item.boxscore.statusDesc}&nbsp;{item.boxscore.periodClock}</div>
              <div>{item.seriesText}</div>
              {/* <div>{time}</div> */}
          </span>
          <span className="nba_team"><img alt='logo' src={defaultSetting.imgSite + "nbalogo/" + homeTeam + '.png'}/>{homeTeam}</span>
          </div>
        )
      })

    const no_game = <div style={{fontSize:"30px", height:"120px",width:"100%",textAlign:"center",lineHeight:"110px",fontWeight:"700",color:"#00000033",letterSpacing:"8px"}}>今日无赛程</div>
    
    return (
        <div>
        {
            games.length === 0 ? no_game : have_game 
        }
        </div>
    )
}

export default function Competition(){
    const [type,setType] = useState(0)          //比赛类型
    return (
        <>
        <div className='competition'>
            <div className="com_left"><div></div><p>比赛信息</p></div>
            <div className="com_right">
                <span onMouseOver={()=>setType(0)} style={{backgroundColor:(type===0? '#00000022':'#ffffff')}}>NBA</span>
                <span onMouseOver={()=>setType(1)} style={{backgroundColor:(type===1? '#00000022':'#ffffff')}}>LOL</span>
                <span onMouseOver={()=>setType(2)} style={{backgroundColor:(type===2? '#00000022':'#ffffff')}}>围棋</span>
            </div>
            <div className="com_board">
                <a href='https://china.nba.cn/' rel="noreferrer" target='_blank'><NBA/></a>
                {/* <div></div>
                <div></div> */}
            </div>
        </div>
        </>
    )
}