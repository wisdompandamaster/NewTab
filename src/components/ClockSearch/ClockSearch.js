import './ClockSearch.css'
import '../../font/iconfont.css'
import fetchJsonp from 'fetch-jsonp'
import { TranslationOutlined, SearchOutlined } from '@ant-design/icons'
import { useState, useEffect, memo } from 'react'
import {useSelector, useDispatch} from 'react-redux'
// import { CodepenOutlined } from '@ant-design/icons'

let t = null;
function debounce(fn, time){    //防抖函数
  return function(){
    if(t){
      clearTimeout(t);
    }
    t = setTimeout(()=>{
      fn.apply(this,arguments)
    },time);
  }
}


function Search(){  //搜索框

    const clear = useSelector(state=>state.clear)
    const cardstyle = useSelector(state=>state.cardstyle)
    const cardstyles = ['',' filter'] 

    let top = clear? '14vh':'0vh'
    const [select, setSelect] = useState(1)
    const [preselect, setPreSelect] = useState(0)
    const [query, setQuery] = useState('')
    const [presearch, setPreSearch] = useState([])
    const icons = ['icon-google','icon-baidu','icon-biying','icon-bilibili-copy-copy','icon-zhihu','icon-github']
    const urls = [
        'https://www.google.com/search?q=',
        'https://www.baidu.com/s?tn=44004473_38_oem_dg&ie=utf-8&wd=',
        'https://cn.bing.com/search?q=',
        'https://search.bilibili.com/all?keyword=',
        'https://www.zhihu.com/search?type=content&q=',
        'https://github.com/search?q='
    ]
    const preUrl = ['https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=7548,32606,1463,31254,32046,32672,32116,7564,32692,26350&wd=']
     
    const change = (n,e)=>{ 
        setSelect(n)
    }
     
    const search = (url, text)=>{
        setPreSearch([])
        const w = window.open('_black')
        w.location.href = url + text
        setQuery('')
    }

    const handleChange = (e)=>{
        setPreSelect(0)
        setQuery(e.target.value);
        const getPreSearchList = ()=>{ 

        fetchJsonp(preUrl[0] + e.target.value,{jsonpCallback:'cb'})
         .then((res)=>res.json())
         .then((json)=>{json.g ? setPreSearch(json.g):setPreSearch([])})
        }
        // fetch(preUrl[1]+e.target.value).then((res)=>{res.json()})
        debounce(getPreSearchList, 300)();
    }

    const translate = (text)=>{
        setPreSearch([])
        const w = window.open('_black')
        w.location.href = 'https://translate.google.cn/?sl=auto&tl=en&text='+ text + '&op=translate' 
        setQuery('')
    }

    const inputKeyDown = (e) =>{
        e.key !== 'ArrowUp' || e.preventDefault();   //防止按上键时光标跑到左边
        switch(e.key){
            case 'Enter':
                if(preselect === 1){
                    translate(query)
                }
                else{
                    search(urls[select],query);
                }
                break;
            case 'ArrowUp':
                setPreSelect(preselect - 1);
                break;
            case 'ArrowDown':
                setPreSelect(preselect + 1);
                break;
            default:
                break;
        }
        if(preselect <= 1 && e.key === 'ArrowUp'){
            setPreSelect(presearch.length + 1)
        }
        else if(preselect >= presearch.length + 1 && e.key === 'ArrowDown'){
            setPreSelect(1)
        }
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
            <input 
            onKeyDown={(e)=>{inputKeyDown(e)}} 
            type='text' onChange={handleChange} value={query} placeholder='输入并查找'/> 
            {/* 右边 */}
            {/* 搜索联想词 */}
            <div className='presearch-list'>
                {
                    query ? <div className={1 === preselect ? 'pre-hover':''} onMouseDown={()=>translate(query)} style={{paddingLeft:'1.5%'}}><TranslationOutlined /><div className={1 === preselect ? 'pre-div-hover':''} style={{display:'inline-block'}}>{ query }</div></div> : ''
                }
                {
                    presearch.map((item,index)=>{
                        if(index + 2 === preselect && query !== item.q){
                            setQuery(item.q)
                        }
                        // let selected = 1;
                        return (
                            <div key={index} className={index + 2 === preselect ? 'pre-hover':''} onMouseDown={()=>{search(urls[select],item.q)}}> <SearchOutlined />
                            <div className={index + 2 === preselect ? 'pre-div-hover':''} style={{display:'inline-block'}}>{item ? item.q:''}</div>
                            </div>
                        )
                    })
                }
            </div>

            <span onClick={()=>{search(urls[select],query)}} className="icon-sousuo iconfont"></span>

        </div>  
        
    )
}

const ClockSearch = ()=>{     //时间显示 + 搜索框

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

export default memo(ClockSearch);