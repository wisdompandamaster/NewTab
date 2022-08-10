import { memo, useEffect, useState } from 'react'
import './MottoFooter.css'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import useLocalStorage from "../../hooks/useLocalStorage";

//这里总结一下localStorage用法


const MottoFooter = ()=>{  //格言脚注

    //const [footerset, setFooterSet] = useLocalStorage('footerset',{})
    const [motto, setMotto] = useState({})        //之后添加左键复制，右键刷新,或者添加菜单
    const footerexist = useSelector(state=>state.footerexist)
    const footerkinds = useSelector(state=>state.footerkinds)

    useEffect(()=>{
        let kinds = footerkinds.reduce((pre,cur,i)=>{         //还没加到localstorage
            return pre + 'c=' + cur + '&'
        },'')
        let url = 'https://v1.hitokoto.cn/?'+kinds+'type=json'   
        
        async function getMotto(){           
            fetch(url).then((response)=>response.json())
            .then((data)=>{localStorage.setItem('motto',JSON.stringify(data));setMotto(data)}
            ).catch((e)=>console.log("motto error"));
        }
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

    return (
        <div onClick={clipMotto} style={{visibility: footerexist ? 'visible':'hidden'}}  className='motto'>
            <div>{'< '}&nbsp;<em>{motto.hitokoto}</em>{'>'}</div><span>--{motto.from}--</span><span>{motto.from_who}</span>
        </div>
    )
}

export default memo(MottoFooter); //防止父组件背景改变时引发的重复渲染