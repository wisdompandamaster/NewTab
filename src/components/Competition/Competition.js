import './Competition.css'
import defaultSetting from '../../config';
import { useEffect, useState } from 'react'


function NBA(){

    const [games,setGames] = useState([])
    useEffect(()=>{
        let url = "https://china.nba.cn/stats2/scores/miniscoreboard.json?countryCode=CN&locale=zh_CN&tz=%2B8"
        async function getGameList(){   
            fetch(url).then((response)=>response.json())
            .then((data)=>{ setGames(data.payload.today.games)}
            ).catch((e)=>console.log("error"));
        }
        getGameList() 
    },[])

    return (
        <div>
        {
            games.map((item,index)=>{
              let awayTeam = item.awayTeam.profile.name
              let homeTeam = item.homeTeam.profile.name
              return (
                <div key={index} className="nba">
                <span className="nba_team"><img src={defaultSetting.imgSite + "nbalogo/" + awayTeam + '.png'}/>{awayTeam}</span>
                <span className="score_time">{item.boxscore.awayScore} : {item.boxscore.homeScore}
                <div>{item.boxscore.statusDesc}</div>
                <div>{item.seriesText}</div>
                </span>
                <span className="nba_team"><img src={defaultSetting.imgSite + "nbalogo/" + homeTeam + '.png'}/>{homeTeam}</span>
                </div>
              )
            })
            
        }
        </div>
    )
}

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
            <div className="com_board">
                <a href='https://china.nba.cn/' target='_blank'><NBA/></a>
                {/* <div></div>
                <div></div> */}
            </div>
        </div>
        </>
    )
}