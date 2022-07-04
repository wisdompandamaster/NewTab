import './ClockSearch.css'
import '../../font/iconfont.css'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'


function Search(){  //搜索框

    const clear = useSelector(state=>state.clear)
    const cardstyle = useSelector(state=>state.cardstyle)
    const cardstyles = ['',' filter'] 

    let top = clear? '14vh':'0vh'
    const [select, setSelect] = useState(1)
    const [query, setQuery] = useState('')
    let icons = ['icon-google','icon-baidu','icon-biying','icon-bilibili-copy-copy','icon-zhihu','icon-github']
    let urls = [
        'https://www.google.com/search?q=',
        'https://www.baidu.com/s?tn=44004473_38_oem_dg&ie=utf-8&wd=',
        'https://cn.bing.com/search?q=',
        'https://search.bilibili.com/all?keyword=',
        'https://www.zhihu.com/search?type=content&q=',
        'https://github.com/search?q='
    ]
    const change = (n,e)=>{
        console.log(n)
        setSelect(n)
    }
     
    const search = (url, text)=>{
        const w = window.open('_black')
        w.location.href = url + text
        setQuery('')
    }
    return (
        <div style={{top:top}} className={'search' + cardstyles[cardstyle]}>
            {/* 左边 */}
            <button placeholder='hello' className={'engine' + cardstyles[cardstyle]}><span style={{color:'grey'}} className={'iconfont'+' '+(icons[select])}></span>
            {/* <span className="icon-downArrow iconfont"></span> */}
            </button> 
           
            <ul className={'engineList' + cardstyles[cardstyle]}> 
                <li onMouseDown={(e)=> change(0,e)}><span className="icon-google iconfont"></span> 谷 歌</li>  {/*onClick 在失焦之后，不起作用，用onMouseDown*/}
                <li onMouseDown={(e)=> change(1,e)}><span className="icon-baidu iconfont"></span> 百 度 </li>
                <li onMouseDown={(e)=> change(2,e)}><span className="icon-biying iconfont"></span> 必 应 </li>
                <li onMouseDown={(e)=> change(3,e)}><span className="icon-bilibili-copy-copy iconfont"></span> Bilibili </li>
                <li onMouseDown={(e)=> change(4,e)}><span className="icon-zhihu iconfont"></span> 知 乎 </li>
                <li onMouseDown={(e)=> change(5,e)}><span className="icon-github iconfont"></span> Github </li>
            </ul>
            {/* 中间 */}
            <input onKeyDown={(e)=>{if(e.key==='Enter') search(urls[select],query)}} type='text' onChange={(e)=>setQuery(e.target.value)} value={query} placeholder='输入并查找'/> 
            {/* 右边 */}
            <span onClick={()=>{search(urls[select],query)}} className="icon-sousuo iconfont"></span>
        </div>  
        
    )
}

export default function ClockSearch(){     //时间显示 + 搜索框

    const [now, setNow] = useState(new Date())

    const dispatch = useDispatch()
    
    function onChangeClear(){
        let value = clear? 0:1
        dispatch({
            type: 'CHANGE_CLEAR',
            clear: value
        })
    }

    useEffect(()=>{                      //每次渲染都会调用该函数
        const t = setInterval(()=>{
            setNow(new Date())
        }) 
        return () => {                  //每次都执行此函数，清除定时器
            clearTimeout(t)
        }
    })

    let h = now.getHours(), m = now.getMinutes() >= 10 ? now.getMinutes():"0"+now.getMinutes()

    const clear = useSelector(state=>state.clear)
    let top = clear? '8vh':'0vh'

    const timefont = useSelector(state=>state.timefont)

    const digitalfont = timefont === 2 ? ' digitalfont':''  

    return (
        <div className='clockSearch'>
        <div style={{top:top}} onClick={()=>onChangeClear()} className={'clock' + digitalfont}>
            <div className='h'>{h}</div>
            :
            <div className='m'>{m}</div>
        </div>
        <Search></Search>
        </div>
    )
}