import React from "react";
import { Switch } from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import { Divider, Select, Typography } from 'antd';
  
 

export default function SetFooter(){
   
    const footer_api_list = [{value:'动画',id:'a'},{value:'漫画',id:'b'},{value:'游戏',id:'c'},{value:'文学',id:'d'},{value:'原创',id:'e'},{value:'来自网咯',id:'f'},{value:'其它',id:'g'},{value:'影视',id:'h'},{value:'诗词',id:'i'},{value:'网易云',id:'j'},{value:'哲学',id:'k'},{value:'抖机灵',id:'l'}]

    const options = [];
    for (let i = 0; i < 100000; i++) {
      const value = `${i.toString(36)}${i}`;
      options.push({
         value
      });
    }
    
    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    const dispatch = useDispatch()
    function onChange(checked) {
      dispatch({                      //dispatch到store
        type: 'CHANGE_FOOTEREXIST',
        footerexist: checked
      })
      console.log(`switch to ${checked}`);
    }


    return (
      <div>
      <span style={{marginRight:'60px'}}>编辑格言</span>
      {/* 设置格言是否显示,计划通过滑动swiper来实现*/ }
      {/* 下次更新完设置格言这一部分 5.23 */}
      <Select
      mode="multiple"
      style={{
        width: '40%',
        //height:'25px',
        //overflowY:'scroll'
      }}
      placeholder="Please select"
      defaultValue={['诗词', '网易云','哲学']}
      onChange={handleChange}
      options={footer_api_list}
      />
      <Switch defaultChecked onChange={onChange} />   

      </div>
    )
}