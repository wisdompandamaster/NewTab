import './YearToday.css'
import FuncCard from '../../FuncCard/FuncCard'
import { useEffect, useState } from 'react'


export default function YearToday(){

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

    const handleWheelCapture = (e) => {
        // e.preventDefault();
          e.stopPropagation();
          console.log(e)
          if(e.deltaY > 0 && itemIndex < yearToday.length - 1){
             setItemIndex(itemIndex + 1);
          }
          if(e.deltaY < 0 && itemIndex >= 1){
            setItemIndex(itemIndex - 1);
         }
    } 

    return (

        <FuncCard
           title='那年今日'
        >
            <div className='year-today-container' onWheelCapture={handleWheelCapture}>
                {
                    //TODO: 添加滑动动画
                    // yearToday && yearToday.map((item, index)=>{
        
                    //     //返回的字符串转为 dom节点
                    //     return (
                        yearToday[itemIndex] && (
                        <div className='year-today-item'>
                        <div style={{color:'#0006',fontStyle:'italic',fontWeight:500}}>A.D.{yearToday[itemIndex].year}</div>
                        <div dangerouslySetInnerHTML={{__html: yearToday[itemIndex].title}}>
                        </div>
                        </div>)
                    //     )
                    // })
                }
            </div>
        </FuncCard>
    )
}