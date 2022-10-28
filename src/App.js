//import logo from './logo.svg';
import './App.css';
import ClockSearch from './components/ClockSearch/ClockSearch';
import TopNav from './components/TopNav/TopNav';
import defaultSetting from './config'
// import FunctionAera from './components/FunctionAera/FunctionAera';
import {MottoFooter} from './components/MottoFooter/MottoFooter';
// import Menulist from './components/Menulist/Menulist'
import ClickMenu from './components/ClickMenu/ClickMenu'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState, useRef, memo } from 'react';
import cookie from 'react-cookies';
import SwiperAera from './components/SwiperAera/SwiperAera';
import { DragOutlined, SyncOutlined } from '@ant-design/icons';
import { Snippets } from './components/Snippets/Snippets'
import Draggable from 'react-draggable';
// import { conversionMomentValue } from '@ant-design/pro-utils';


//FIXME:bug, 这里 blur filter bg等改变时，由于改变的是最上层的组件，所以会把子组件全渲染一遍，会多出很多请求  2022.8.10

function App() {
   //页面加载前需要请求的数据
  const dispatch = useDispatch()

   //两个随机壁纸api
  let random1 =  'url(https://api.btstu.cn/sjbz/api.php?lx=fengjing&format=images)'
  let random2 =  'url(https://api.ixiaowai.cn/gqapi/gqapi.php)'
  const [randomBackground,setRandomBackground] = useState(random1)

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

   //便签内容
   const snippets = useSelector(state=>state.snippets) 
 
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
    y = y > winHeight - 166 ? winHeight - 166:y
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
  //自己选的壁纸
  let myBackground = 'url('+ defaultSetting.imgSite + currentbg +')'
  //bing每日壁纸接口,别人写的
  let bingBackground = 'url(https://api.oneneko.com/v1/bing_today)'
  //随机壁纸接口
  // let randomBackground = 'url(https://api.ixiaowai.cn/gqapi/gqapi.php)'
  let background = [myBackground,bingBackground,randomBackground]

  // TODO:图片预加载和缓存
  const ChangeBg = memo(()=>{
     
      const [loading,setLoading] = useState(false);

      const changeRandomBackground = ()=>{
          setLoading(true);
          console.log('loading')
          //先缓存图片
          //先用new Image() 把图片缓存，再用
          // 有一个问题，后端每次请求会有防抖，同一时间内多次请求，会返回相同的图片，这也是缓存的作用
          //所以两次请求之间的间隔很重要，要在防抖时间内，保证请求的是同一张图片，保证缓存有效
          //又要保证时间足够图片请求和加载到内存
          //还有一种是不定等待时间，等图片加载好
          let img = new Image()
          img.src = (randomBackground == random1 ? random2:random1).substring(4).replace(')','')
          img.onload = ()=>{
            setRandomBackground('url('+img.src+')')
          }
      }

      return (
        <div style={{position:'fixed',bottom:'3%',right:'2%',zIndex:3,fontSize:'35px',width:'50px',height:'50px',background:'#0007',color:'#fff8',textAlign:'center',lineHeight:'50px',borderRadius:'10px',cursor:'pointer'}}>
        <SyncOutlined spin={loading} onClick={changeRandomBackground}/>
      </div>
      )
  })

  return (
    <div className="App" onContextMenu={e=>showMenu(e)}>
      <div className='background' style={{filter:blurNum,transform:scale,backgroundImage:background[2],backgroundSize:'cover',backgroundRepeat:'no-repeat'}}></div>
      <div className='mask' style={{opacity:coverNum}}></div>
      {/* <Menulist/> */}
      {/* <div onContextMenu={e=>e.stopPropagation()}> */}
       <TopNav></TopNav>
       <ClockSearch></ClockSearch>
       {/* 右键菜单 */}
       <div style={{display:position.display,position:'absolute',left:position.left,top:position.top}} ref={menu}>
       <ClickMenu />
       </div>
       {/* 滑动区域 */}
       <SwiperAera></SwiperAera>
       {/* 脚注 */}
       <MottoFooter></MottoFooter>
      {/* </div> */}
      {/* 便利贴 */}
      {
        snippets.map((item,index)=>{
            return (
               <Draggable
               disabled={disabled}
               bounds={'parent'}
               onStart={(event, uiData) => onStart(event, uiData)}
               key={item.id}
               handle="strong"
               >
               <div className='snippets-container'>
                <strong style={{position:'absolute',top:'8px',right:'10px',zIndex:'4',fontSize:'20px',cursor:'pointer'}}><DragOutlined /></strong>
                <Snippets id={item.id}/>
               </div>
               </Draggable>
            )
      })
      }
      {/* 随机壁纸切换 */}
      <ChangeBg/>
    </div>
    
     
  );
}

export default App;
