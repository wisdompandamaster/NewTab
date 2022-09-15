import './ClockSearch.css'
import '../../font/iconfont.css'
import fetchJsonp from 'fetch-jsonp'
import { TranslationOutlined, SearchOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { useState, useEffect, memo } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import FuncModal from '../FuncModal/FuncModal'
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

//显示时间的组件
function DateTime(props){

    const {timezone, city} = props
    const weekdays = ['一','二','三','四','五','六','天']
    const [now, setNow] = useState(new Date(Number(new Date())-timezone*60*60*1000))

    useEffect(()=>{                      //每次渲染都会调用该函数
        const t = setInterval(()=>{
            setNow(new Date(Number(new Date())-timezone*60*60*1000))
        }) 
        return () => {                  //每次都执行此函数，清除定时器
            clearTimeout(t)
        }
    })

    let h = String(now.getHours()).padStart(2,'0'), m = String(now.getMinutes()).padStart(2,'0')

    return (
        <div style={{margin:'0 1rem'}}>
        <div style={{fontSize:'1.5rem',fontWeight:'600',fontFamily:'YaHei'}}>{city}</div>
        <div>
            <div className='h'>{h}</div>
            :
            <div className='m'>{m}</div>
        </div>
        <div className='clock-day'>{now.getFullYear() + " 年 " + (now.getMonth() + 1) + " 月 " + now.getDate() + " 日 "}<span style={{marginLeft:'2%'}}>{"星期" + weekdays[now.getDay()]}</span>
        </div>
        </div>
    )

}

//时钟的功能
function Clock(){ // 时钟

    const dispatch = useDispatch()

     // modal组件控制函数
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
     // openNotification();
      setIsModalVisible(true);
    };
    const handleOk = () => {
      setIsModalVisible(false);
    };
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    
    function onChangeClear(){
        let value = clear? 0:1
        dispatch({
            type: 'CHANGE_CLEAR',
            clear: value
        })
    }

    const onSetClock = (e)=>{
        e.stopPropagation();
        showModal();
    }

    const clear = useSelector(state=>state.clear)
    let top = clear? '8vh':'0vh'
    const timefont = useSelector(state=>state.timefont)
    const digitalfont = timefont === 2 ? ' digitalfont':''  


    return (
        <>
        <div style={{top:top}} onClick={()=>onChangeClear()} className={'clock' + digitalfont}>
        <span className='clock-setting' onClick={(e)=>onSetClock(e)}><UnorderedListOutlined />
        </span>
        <div style={{display:'flex'}}>
          <DateTime timezone={0} city={'北京'}/>
          <DateTime timezone={7} city={'伦敦'}/>
          <DateTime timezone={12} city={'纽约'}/>
        </div>
        </div>
        <FuncModal
            bodyStyle={{padding:'11px'}}
            title={<div style={{fontSize:'25px',fontWeight:'500',letterSpacing:'8px',marginLeft:'24px'}}>时钟设置</div>}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={'30vw'}
        >
            Hello
        </FuncModal>
        </>
    )

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

    return (
        <div className='clockSearch'>
        <Clock></Clock>
        <Search></Search>
        </div>
    )
}

export default memo(ClockSearch);