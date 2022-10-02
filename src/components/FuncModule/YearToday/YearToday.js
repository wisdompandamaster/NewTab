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
                    //TODO: 添加滑动时出现切换动画
                    
                        //上面这种 itemIndex 的做法只有第一次出现有动画
                        // yearToday[itemIndex] && (
                        // <div id='slide' className={'year-today-item slidein'}>
                        // <div style={{color:'#0006',fontStyle:'italic',fontWeight:500}}>A.D.{yearToday[itemIndex].year}</div>
                        // <div dangerouslySetInnerHTML={{__html: yearToday[itemIndex].title}}>
                        // </div>
                        // </div>)

                        yearToday && yearToday.map((item, index)=>{
                        if(index == itemIndex){
                            return (
                                <div id='slide' className={'year-today-item slidein'}>
                                <div style={{color:'#0006',fontStyle:'italic',fontWeight:500}}>A.D.{item.year}</div>
                                <div dangerouslySetInnerHTML={{__html: item.title}}>
                                </div>
                                </div>
                            )
                           }
                          }
                        )
                }
            </div>
        </FuncCard>
    )
}