import "./Competition.css";
import { memo, useEffect, useState } from "react";
import FuncCard from "../FuncCard/FuncCard";

//无比赛页面
const no_game = (
  <div
    style={{
      fontSize: "30px",
      height: "120px",
      width: "100%",
      textAlign: "center",
      lineHeight: "110px",
      fontWeight: "700",
      color: "#00000033",
      letterSpacing: "8px",
    }}
  >
    今日无赛程
  </div>
);

function NBA(props) {
  //修复了一个bug，但是还没弄清原因，初步判断是state的更新问题
  //还差一个滚动贴合
  const [games, setGames] = useState([]);
  const [itemIndex, setItemIndex] = useState(0);

  //直接来自远程NBA网站的图片
  const remote_logo_img = "https://res.nba.cn/media/img/teams/logos/";

  let flag = []; //用来判断是否有比赛在进行中

  const handleWheelCapture = e => {
    if (games.length > 1) {
      e.stopPropagation();
    }
    if (e.deltaY > 0 && itemIndex < games.length - 1) {
      setItemIndex(itemIndex + 1);
    }
    if (e.deltaY < 0 && itemIndex >= 1) {
      setItemIndex(itemIndex - 1);
    }
  };

  useEffect(() => {
    let url = "https://api.nba.cn/sib/v2/game/schedule";
    async function getGameList() {
      fetch(url)
        .then(response => response.json())
        .then(
          data => {
            setGames(data.data.groups[0].games);
            flag = data.data.groups[0].games.map((item, index) => item.status);
          } //.next.games 表示下一天
        )
        .catch(e => console.log("error"));
    }
    getGameList();

    const t = setInterval(() => {
      // let flag = games.map((item,index)=>item.boxscore.status)          //获取比赛状态数组，如果有比赛正在进行才请求  这个地方获取不行
      // console.log(games)
      if (flag.includes(2)) {
        console.log("比赛进行中");
        getGameList();
      }
    }, 10000); //10s更新一次

    return () => {
      clearTimeout(t);
    };
  }, []);

  const have_game = games.map((item, index) => {
    let awayTeam = item.awayTeamName;
    let homeTeam = item.homeTeamName;
    // let time = new Date(item.dateTimeUtc);
    // time = new Date(time.setHours(time.getHours() + 13));
    // time = time.getHours() + " : " + time.toLocaleTimeString().slice(3, 5);
    let time = item.startTime.slice(0, 2) + " : " + item.startTime.slice(3, 5);
    let score = item.awayTeamScore + " - " + item.homeTeamScore;
    let score_time = item.status !== 1 ? score : time;
    // 根据不同比赛状态显示不同文字
    let status =
      item.status == 2
        ? item.periodText + " " + item.gameClock
        : item.statusText;
    // 详细信息跳转链接
    let link =
      item.status == 1
        ? "https://china.nba.cn/preview/" + item.gameId + "/game-list"
        : "https://china.nba.cn/game/" + item.gameId + "/box-score";
    if (index === itemIndex)
      return (
        <div key={index} className='nba slidein'>
          <span className='nba_team'>
            <img
              alt='logo'
              src={remote_logo_img + item.awayTeamAbbr + "_logo.svg"}
            />
            {awayTeam}
          </span>
          <span className='score_time'>
            <a href={link} rel='noreferrer' target='_blank'>
              {score_time}
              <div
                style={{
                  fontFamily: "SimHei, Serif",
                  color: "#401F71",
                  fontWeight: "800",
                  fontSize: "1.1rem",
                  marginTop: "0.6rem",
                }}
              >
                {status}
              </div>
            </a>
          </span>
          <span className='nba_team'>
            <img
              alt='logo'
              src={remote_logo_img + item.homeTeamAbbr + "_logo.svg"}
            />
            {homeTeam}
          </span>
        </div>
      );
  });

  // const no_game = <div style={{fontSize:"30px", height:"120px",width:"100%",textAlign:"center",lineHeight:"110px",fontWeight:"700",color:"#00000033",letterSpacing:"8px"}}>今日无赛程</div>

  return (
    <div onWheelCapture={handleWheelCapture}>
      {games.length === 0 ? no_game : have_game}
    </div>
  );
}

const Competition = () => {
  const [type, setType] = useState(0); //比赛类型
  const [game, setGame] = useState([]);

  const handleChangeType = value => {
    setType(value);
  };

  return (
    <>
      <FuncCard
        title='比赛信息'
        iconStyle={{
          background: "linear-gradient(180deg, #6d53b4 14.58%, #2a1086 100%)",
          boxShadow: "0px 3px 6px rgba(7, 87, 119, 0.8)",
        }}
        kinds={["NBA", "LOL", "围棋"]}
        // className='competition'
        changeType={handleChangeType}
      >
        {/* <div className="com_left"><div></div><p>比赛信息</p></div> */}
        {/* <div className="com_right">
                <span onMouseOver={()=>setType(0)} style={{backgroundColor:(type===0? '#00000022':'#ffffff')}}>NBA</span>
                <span onMouseOver={()=>setType(1)} style={{backgroundColor:(type===1? '#00000022':'#ffffff')}}>LOL</span>
                <span onMouseOver={()=>setType(2)} style={{backgroundColor:(type===2? '#00000022':'#ffffff')}}>围棋</span>
            </div> */}
        {/* 
                NBA官网: https://china.nba.cn/
                腾讯视频: https://v.qq.com/channel/nba
            */}
        <div className='com_board'>
          {/* 这里是FuncCard 尝试封装type的一个尝试 */}
          <a
            style={{ display: type === 0 ? "block" : "none" }}
            href='#'
            rel='noreferrer'
            target='_blank'
          >
            <NBA />
          </a>
          <a
            style={{ display: type === 1 ? "block" : "none" }}
            href='https://lpl.qq.com/'
            rel='noreferrer'
            target='_blank'
          >
            {no_game}
          </a>
          <a
            style={{ display: type === 2 ? "block" : "none" }}
            href='#'
            rel='noreferrer'
            target='_blank'
          >
            {no_game}
          </a>
          {/* <div></div>
                <div></div> */}
        </div>
      </FuncCard>
    </>
  );
};

export default memo(Competition);
