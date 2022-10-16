//import logo from './logo.svg';
import './App.css';
import ClockSearch from './components/ClockSearch/ClockSearch';
import TopNav from './components/TopNav/TopNav';
import defaultSetting from './config'
import FunctionAera from './components/FunctionAera/FunctionAera';
import MottoFooter from './components/MottoFooter/MottoFooter';
import Menulist from './components/Menulist/Menulist'
import ClickMenu from './components/ClickMenu/ClickMenu'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState, useRef } from 'react';
import cookie from 'react-cookies';
import SwiperAera from './components/SwiperAera/SwiperAera';
import { ConsoleSqlOutlined } from '@ant-design/icons';


//FIXME:bug, 这里 blur filter bg等改变时，由于改变的是最上层的组件，所以会把子组件全渲染一遍，会多出很多请求  2022.8.10

function App() {
   //页面加载前需要请求的数据
  const dispatch = useDispatch()

  useEffect(()=>{             //获取setting数据
    let url2 = defaultSetting.site + '/functions/getmysettings/'
    async function getSettings(){   
      fetch(url2,{
          credentials:'include'
      }).then((response)=>response.json())
      .then((data)=>{
        let res = JSON.parse(data.res);
        dispatch({
          type: 'CHANGE_COVER',
          cover: Number(res["cover"])
        });
        localStorage.setItem('cover', Number(res["cover"]));
        dispatch({
          type: 'CHANGE_BLUR',
          blur:  Number(res["blur"])
        });
        localStorage.setItem('blur', Number(res["blur"]));
        dispatch({
          type: 'CHANGE_BG',
          currentbg: res["current_bg"]
        });
        localStorage.setItem('currentbg', res["current_bg"])
      }).catch((e)=>console.log("error"));
    }
    if(cookie.load('status')==='200'){
       getSettings()
    }
    //组件卸载时启动
    return () => {
      
    }
  },[])



  const blur = useSelector(state=>state.blur)
  const cover = useSelector(state=>state.cover)
  const currentbg = useSelector(state=>state.currentbg)
  const deleteApp = useSelector(state=>state.deleteApp)
  const deleteFunc = useSelector(state=>state.deleteFunc)

  const [position,setPosition] = useState({left:'0px',top:'0px',display:'none'})

  const menu = useRef()
  
  //右键菜单出现的位置
  const showMenu = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    const winWidth = window.innerWidth
    const winHeight = window.innerHeight
    // console.log(e);
    let x = e.clientX;
    let y = e.clientY; 
    // console.log(x)
    x = x > winWidth - 120 ? winWidth - 120:x
    y = y > winHeight - 102 ? winHeight - 102:y
    // console.log(x)
    setPosition({left:String(x) + 'px',top:String(y)+'px',display:'inline-block'})
    // console.log(menu)
  }
  
  //取消App Func删除状态, 取消右键菜单状态
  window.onclick = (e)=>{
    if(position.display !== 'none')
    setPosition({...position,display:'none'});
    if(deleteApp)
    dispatch({
      type: 'CHANGE_DELETEAPP',
      deleteApp:false,
    });
    if(deleteFunc)
    dispatch({
      type: 'CHANGE_DELETEFUNC',
      deleteFunc:false,
    });
  }

   
  let blurNum = 'blur(' + blur/4 + 'px)'
  let scale ='scale(' + (1 + blur * 0.0008) + ')'
  let coverNum = cover * 0.01
  let background = 'url('+ defaultSetting.imgSite + currentbg +')'
  return (
    <div className="App" onContextMenu={e=>showMenu(e)}>
      <div className='background' style={{filter:blurNum,transform:scale,backgroundImage:background,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}></div>
      <div className='mask' style={{opacity:coverNum}}></div>
      {/* <Menulist/> */}
      {/* <div onContextMenu={e=>e.stopPropagation()}> */}
       <TopNav></TopNav>
       <ClockSearch></ClockSearch>
       <div style={{display:position.display,position:'absolute',left:position.left,top:position.top}} ref={menu}>
       <ClickMenu />
       </div>
       <SwiperAera></SwiperAera>
       <MottoFooter></MottoFooter>
      {/* </div> */}
    </div>
    
     
  );
}

export default App;
