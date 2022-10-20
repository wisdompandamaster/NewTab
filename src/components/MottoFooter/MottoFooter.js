import { memo, useEffect, useState } from 'react'
import './MottoFooter.css'
import { message, Radio, Popover } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import FuncModal from '../FuncModal/FuncModal'
import useLocalStorage from "../../hooks/useLocalStorage";

//这里总结一下localStorage用法

//那年今日脚注版本
const YearToday = ()=>{

    const [yearToday, setYearToday] = useState([])
    const [itemIndex, setItemIndex] = useState(0)

    let month = ((new Date()).getMonth() + 1).toString().padStart(2,'0')
    let day = 'S' + month + ((new Date()).getDate()).toString().padStart(2,'0')

    //那年今日 api
    let url = 'https://cdn.jsdelivr.net/gh/Zfour/Butterfly-card-history@latest/baiduhistory/json/'+ month + '.json'

    useEffect(()=>{
        fetch(url).then((res)=>res.json())
        .then((json)=>{setYearToday(json[day])})
    },[])

    useEffect(()=>{

       const t = setInterval(()=>{
            // getMotto()
            setItemIndex(itemIndex => Math.floor((itemIndex + 1) % yearToday.length))
            // console.log('定时切换')
       },60000)              //60s自动更换一次

       return ()=>{
           clearTimeout(t)
       }

    },[yearToday])


    const handleWheelCapture = (e) => {
        // e.preventDefault();
          e.stopPropagation();

          //循环滚动
          if(e.deltaY > 0 && itemIndex < yearToday.length - 1){
             setItemIndex(itemIndex + 1);
          }
          if(e.deltaY < 0 && itemIndex >= 1){
            setItemIndex(itemIndex - 1);
          }
          if(e.deltaY > 0 && itemIndex == yearToday.length - 1){
            setItemIndex(0);
          }
          if(e.deltaY < 0 && itemIndex == 0){
            setItemIndex(yearToday.length - 1);
          }
    } 

    return (
            <div  onWheelCapture={handleWheelCapture}>
                {
                    yearToday && yearToday.map((item, index)=>{
                    if(index == itemIndex){
                        return (
                            <div className='slidein'>
                            <div style={{color:'#fffa',fontStyle:'italic',fontWeight:500}}>A.D.{item.year}</div>
                            <div>
                            {"「  "}
                            <div style={{display:'inline-block'}} dangerouslySetInnerHTML={{__html: item.title}}/>
                            {"  」"}
                            </div>
                            </div>
                        )
                    }
                    })
                }
            </div>
    )
}


const MottoFooter = ()=>{  //格言脚注

    //const [footerset, setFooterSet] = useLocalStorage('footerset',{})
    const [motto, setMotto] = useState({})        //之后添加左键复制，右键刷新,或者添加菜单
    // 脚注类型 0 一言 1 那年今日
    const [footerType, setFooterType] = useState(0)
    const footerexist = useSelector(state=>state.footerexist)
    const footerkinds = useSelector(state=>state.footerkinds)

    let kinds = footerkinds.reduce((pre,cur,i)=>{         //还没加到localstorage
        return pre + 'c=' + cur + '&'
    },'')
    let url = 'https://v1.hitokoto.cn/?'+kinds+'type=json'   
    
    async function getMotto(){           
        fetch(url).then((response)=>response.json())
        .then((data)=>{localStorage.setItem('motto',JSON.stringify(data));setMotto(data)}
        ).catch((e)=>console.log("motto error"));
    }

    useEffect(()=>{
        getMotto()
        const t = setInterval(()=>{
             getMotto()
             console.log('motto')
        },60000)              //60s更新一次

        return ()=>{
            clearTimeout(t)
        }
        
    },[footerkinds])

    //let motto = JSON.parse(localStorage.getItem('motto'))

    // console.log(motto2.hitokoto)
    const clipMotto = () => {
        navigator.clipboard
        .writeText(motto.hitokoto)
        .then(()=>{message.success('已成功复制到剪贴板')})
    }

     const onChange = (e) =>{
        setFooterType(e.target.value)
    }

    const handleWheelCapture = (e)=>{
        e.stopPropagation();
        getMotto();
    }

    const content = (
        <Radio.Group onChange={onChange} value={footerType} style={{display:'flex',justifyContent:'space-between',flexDirection:'column'}}>
        <Radio value={0}>一言</Radio>
        <Radio value={1}>那年今日</Radio>
        </Radio.Group>
    )

    return (
        <div style={{visibility: footerexist ? 'visible':'hidden'}} className="footer">
        <span style={{position:'absolute',right:'3%',color:'aqua'}}>
            <Popover placement="right" content={content} trigger="hover" color='#fff5'  overlayInnerStyle={{borderRadius:'10px',padding:'0'}}>
                <UnorderedListOutlined/>
            </Popover>
        </span>
        <div style={{display: footerType ? "none":"inline-block"}} onClick={clipMotto} onWheelCapture={handleWheelCapture}>
           <span style={{color:'#fffa',fontStyle:'italic',fontWeight:500}}>--{motto.from}--</span>
           <span style={{color:'#fffa',fontStyle:'italic',fontWeight:500}}>{motto.from_who}</span>
           <div>{'< '}&nbsp;<em>{motto.hitokoto}</em>{'>'}</div>    
        </div>
        <div style={{display: footerType ? "inline-block":"none"}}>
            <YearToday/>
        </div>
       </div>
    )
}


export default memo(MottoFooter); //防止父组件背景改变时引发的重复渲染