import { useEffect, useState } from 'react'
import './MottoFooter.css'
import { message } from 'antd'


export default function MottoFooter(){  //格言脚注

    const [motto, setMotto] = useState({})        //之后添加左键复制，右键刷新,或者添加菜单

    useEffect(()=>{
        let url = 'https://v1.hitokoto.cn/?c=k&c=i&c=j&type=json'   //之后可以添加可选择句子类型
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
        
    },[])

    //let motto = JSON.parse(localStorage.getItem('motto'))

    // console.log(motto2.hitokoto)
    const clipMotto = () => {
        navigator.clipboard
        .writeText(motto.hitokoto)
        .then(()=>{message.success('已成功复制到剪贴板')})

    }

    return (
        <div onClick={clipMotto} className='motto'>
            <div>{'< '}&nbsp;<em>{motto.hitokoto}</em>{'>'}</div><span>--{motto.from}--</span><span>{motto.from_who}</span>
        </div>
    )
}