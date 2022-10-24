import React from "react";
import { Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {  Select } from 'antd';
import useLocalStorage from "../../../hooks/useLocalStorage";
 

export default function SetFooter(){
   
    const footer_api_list = [{value:'诗词',id:'i',disabled:true},{value:'动画',id:'a'},{value:'漫画',id:'b'},{value:'游戏',id:'c'},{value:'文学',id:'d'},{value:'原创',id:'e'},{value:'来自网络',id:'f'},{value:'其它',id:'g'},{value:'影视',id:'h'},{value:'网易云',id:'j'},{value:'哲学',id:'k'},{value:'抖机灵',id:'l'}]
    
    
    const footerexist = useSelector(state=>state.footerexist)
    const footerkinds = useSelector(state=>state.footerkinds)
    const dispatch = useDispatch()

    const [footerset, setFooterSet] = useLocalStorage('footerset') //footerset用不着

    function handleChange(value) {
      let footerkinds = footer_api_list.reduce((pre,cur,i)=>{
        if(value.includes(cur.value)){
          pre.push(cur.id)
        }
        return pre;
      },[])
      //console.log(footerkinds)
      dispatch({                      //dispatch到store,还差localstorage
        type: 'CHANGE_FOOTERKINDS',
        footerkinds: footerkinds
      })
      // console.log('setfooter')
      setFooterSet({
        footerexist:footerexist,
        footerkinds:footerkinds
      })
    }

   
    function onChange(checked) {
      dispatch({                      //dispatch到store,还差localstorage
        type: 'CHANGE_FOOTEREXIST',
        footerexist: checked
      })
      console.log('setfooter')
      setFooterSet({
        footerexist:checked,
        footerkinds:footerkinds
      })
      //console.log(`switch to ${checked}`);
    }

    let footerkindsvalue = footer_api_list.reduce((pre,cur,i)=>{
      if(footerkinds.includes(cur.id)){
        pre.push(cur.value)
      }
      return pre;
      
    },[])

    return (
      <div style={{display:'flex',alignItems:'center'}}>
      <span style={{marginRight:'10px'}}>页面底部</span>
      {/* 下次更新完设置格言这一部分 5.23 */}
      <Select
      mode="multiple"
      style={{
        width: '58%',
        //height:'25px',
        //overflowY:'scroll'
      }}
      placeholder="请选择格言类别"
      defaultValue={footerkindsvalue}
      onChange={handleChange}
      options={footer_api_list}
      disabled={!footerexist}
      maxTagCount={2}
      maxTagTextLength={1}
      listHeight='200px'
      />
      <Switch checked={footerexist} onChange={onChange} />   

      </div>
    )
}