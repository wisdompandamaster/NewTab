//import logo from './logo.svg';
import "./App.css";
import { Clock, TopClock } from "./components/Clock/Clock";
import Search from "./components/Search/Search";
import TopNav from "./components/TopNav/TopNav";
import defaultSetting from "./config";
// import FunctionAera from './components/FunctionAera/FunctionAera';
import { MottoFooter } from "./components/MottoFooter/MottoFooter";
// import Menulist from './components/Menulist/Menulist'
import ClickMenu from "./components/ClickMenu/ClickMenu";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import cookie from "react-cookies";
import SwiperAera from "./components/SwiperAera/SwiperAera";
import { DragOutlined, SyncOutlined } from "@ant-design/icons";
import { Snippets } from "./components/Snippets/Snippets";
import Draggable from "react-draggable";
// import { conversionMomentValue } from '@ant-design/pro-utils';

/** 页面结构：
 *
 * 背景图片
 * 遮罩层
 * --2vh
 * TopNav 最上层
 * ------ 6vh
 * Clock 时间
 * Search 搜索框
 * Swiper 滑动区域
 *------- 90vh
 * FooterMotto 脚注
 * Snippets 便利贴
 * ChangeBg 背景切换按钮
 * ClickMenu 右键菜单
 */

function App() {
  //页面加载前需要请求的数据
  const dispatch = useDispatch();

  //提前加载背景图片缓存
  const imgList = useSelector(state => state.onlineimglist);
  const mybglist = useSelector(state => state.mybglist);
  // const timePos = useSelector(state => state.timePos);

  // let random1 = "url(" + defaultSetting.randomBg1 + ")";
  // let random2 = "url(" + defaultSetting.randomBg2 + ")";

  // const [randomBackground, setRandomBackground] = useState(random1);
  const bgType = useSelector(state => state.bgtype);

  useEffect(() => {
    //获取setting数据
    async function getSettings() {
      fetch("/api/functions/getmysettings/", {
        credentials: "include",
      })
        .then(response => response.json())
        .then(data => {
          let res = JSON.parse(data.res);
          dispatch({
            type: "CHANGE_COVER",
            cover: Number(res["cover"]),
          });
          localStorage.setItem("cover", Number(res["cover"]));
          dispatch({
            type: "CHANGE_BLUR",
            blur: Number(res["blur"]),
          });
          localStorage.setItem("blur", Number(res["blur"]));
          dispatch({
            type: "CHANGE_BG",
            currentbg: res["current_bg"],
          });
          localStorage.setItem("currentbg", res["current_bg"]);
        });
      // .catch(e => console.log("error"));
    }
    if (cookie.load("status") === "200") {
      getSettings();
    }
    //提前加载
    imgList.concat(mybglist).map(item => {
      let img = new Image();
      let url = "/pic/" + item;
      img.src = url;
    });
    //组件卸载时启动
    return () => {};
  }, []);

  //便签内容
  const snippets = useSelector(state => state.snippets);

  // 拖拽便签组件
  const [disabled, setDisabled] = useState(false);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);
  const onStart = (_event, uiData) => {
    //可拖拽区域长宽
    const { clientWidth, clientHeight } = window.document.documentElement;
    //拖拽组件长宽
    const targetRect = draggleRef.current?.getBoundingClientRect();

    if (!targetRect) {
      return;
    }

    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const blur = useSelector(state => state.blur);
  const cover = useSelector(state => state.cover);
  const currentbg = useSelector(state => state.currentbg);
  const deleteApp = useSelector(state => state.deleteApp);
  const deleteFunc = useSelector(state => state.deleteFunc);

  const [position, setPosition] = useState({
    left: "0px",
    top: "0px",
    display: "none",
  });

  const menu = useRef();

  //右键菜单出现的位置
  const showMenu = e => {
    e.preventDefault();
    e.stopPropagation();
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    // console.log(e);
    let x = e.clientX;
    let y = e.clientY;
    // console.log(x)
    x = x > winWidth - 120 ? winWidth - 120 : x;
    y = y > winHeight - 166 ? winHeight - 166 : y;
    // console.log(x)
    setPosition({
      left: String(x) + "px",
      top: String(y) + "px",
      display: "inline-block",
    });
    // console.log(menu)
  };

  //取消App Func删除状态, 取消右键菜单状态
  window.onclick = e => {
    if (position.display !== "none")
      setPosition({ ...position, display: "none" });
    if (deleteApp)
      dispatch({
        type: "CHANGE_DELETEAPP",
        deleteApp: false,
      });
    if (deleteFunc)
      dispatch({
        type: "CHANGE_DELETEFUNC",
        deleteFunc: false,
      });
  };

  let blurNum = "blur(" + blur / 4 + "px)";
  let scale = "scale(" + (1 + blur * 0.0008) + ")";
  let coverNum = cover * 0.01;
  //自己选的壁纸
  // let myBackground = "url(" + "/pic/" + currentbg + ")";
  // let bingBackground = "url(" + defaultSetting.bingBg + ")";
  // let background = [myBackground, bingBackground, randomBackground];
  let background = "url(" + currentbg + ")";

  //子组件：随机壁纸切换
  function ChangeBg(props) {
    const { display } = props;
    const [loading, setLoading] = useState(false);

    const changeRandomBackground = () => {
      setLoading(true);
      // console.log('loading')
      //先缓存图片
      //先用new Image() 把图片缓存，再用
      // 有一个问题，后端每次请求会有防抖，同一时间内多次请求，会返回相同的图片，这也是缓存的作用
      //所以两次请求之间的间隔很重要，要在防抖时间内，保证请求的是同一张图片，保证缓存有效
      //又要保证时间足够图片请求和加载到内存
      //还有一种是不定等待时间，等图片加载好

      //有可以绕过跨域的代理api 可以自己部署源码

      // img.src = randomBackground == random1 ? random2 : random1;
      fetch("/api/img/getrandombg/")
        .then(res => res.json())
        .then(data => {
          let img = new Image();
          img.src = data.url;
          img.onload = () => {
            dispatch({
              type: "CHANGE_BG",
              currentbg: data.url,
            });
            localStorage.setItem("currentbg", data.url);
            saveSettings("current_bg", data.url); //上传修改的背景数据
          };
        });

      // fetch('https://circumvent-cors.herokuapp.com/'+img.src).then(response=>console.log(response.body))
    };

    return (
      <div
        style={{
          position: "fixed",
          bottom: "3%",
          right: "2%",
          zIndex: 3,
          fontSize: "35px",
          width: "50px",
          height: "50px",
          background: "#0007",
          color: "#fff8",
          textAlign: "center",
          lineHeight: "50px",
          borderRadius: "10px",
          cursor: "pointer",
          display: display,
        }}
      >
        <SyncOutlined spin={loading} onClick={changeRandomBackground} />
      </div>
    );
  }

  return (
    <div className='App' onContextMenu={e => showMenu(e)}>
      {/* 背景图片层 */}
      <div
        className='background'
        style={{
          filter: blurNum,
          transform: scale,
          backgroundImage: background,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      {/* 遮罩层 */}
      <div className='mask' style={{ opacity: coverNum }}></div>
      {/* 导航栏 */}
      <TopNav></TopNav>
      <div
        style={{
          position: "absolute",
          top: "2vh",
          right: "5vw",
          display: "inline-block",
        }}
      >
        <TopClock />
      </div>
      {/* 时间 */}
      <Clock></Clock>
      {/* 搜索 */}
      <Search></Search>
      {/* <ClockSearch></ClockSearch> */}
      {/* 滑动区域 */}

      <SwiperAera></SwiperAera>

      {/* 脚注 */}
      <MottoFooter></MottoFooter>
      {/* 便利贴 */}
      {snippets.map((item, index) => {
        return (
          <Draggable
            disabled={disabled}
            bounds={"parent"}
            onStart={(event, uiData) => onStart(event, uiData)}
            key={item.id}
            handle='strong'
          >
            <div className='snippets-container'>
              <strong
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "10px",
                  zIndex: "4",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                <DragOutlined />
              </strong>
              <Snippets id={item.id} />
            </div>
          </Draggable>
        );
      })}
      {/* 随机壁纸切换按钮 */}
      <ChangeBg display={bgType === 3 ? "block" : "none"} />
      {/* 右键菜单 */}
      <div
        style={{
          display: position.display,
          position: "absolute",
          left: position.left,
          top: position.top,
        }}
        ref={menu}
      >
        <ClickMenu />
      </div>
    </div>
  );
}

export default App;
