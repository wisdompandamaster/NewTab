import React from "react";
import { Switch } from 'antd';
import {useSelector, useDispatch} from 'react-redux';
 

export default function SetFooter(){


    // const options = [];
    // for (let i = 0; i < 100000; i++) {
    //   const value = `${i.toString(36)}${i}`;
    //   options.push({
    //     value,
    //     disabled: i === 10,
    //   });
    // }
    
    // function handleChange(value) {
    //   console.log(`selected ${value}`);
    // }
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
      <Switch defaultChecked onChange={onChange} />   

      </div>
    )
}