import './YearToday.css'
import FuncCard from '../../FuncCard/FuncCard'
import { useEffect, useState } from 'react'

export default function YearToday(){

    const [yearToday, setYearToday] = useState([])

    let month = ((new Date()).getMonth() + 1).toString().padStart(2,'0')
    let day = 'S' + month + ((new Date()).getDay()).toString().padStart(2,'0')

    //那年今日 api
    let url = 'https://cdn.jsdelivr.net/gh/Zfour/Butterfly-card-history@latest/baiduhistory/json/'+ month + '.json'

    useEffect(()=>{
        fetch(url).then((res)=>res.json())
        .then((json)=>{setYearToday(json[day])})
    },[])


    return (

        <FuncCard>
            <div>
                {
                    yearToday.map((item, index)=>{
                        console.log(item);
                        //返回的字符串转为 dom节点
                        return (<div dangerouslySetInnerHTML={{__html: item.title}}></div>)
                    })
                }
            </div>
        </FuncCard>
    )
}