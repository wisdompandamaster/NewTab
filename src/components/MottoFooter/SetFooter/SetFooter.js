import React from "react";
import { Button, Select, Typography, Divider } from 'antd';
 

export default function SetFooter(){

    const options = [];
    for (let i = 0; i < 100000; i++) {
      const value = `${i.toString(36)}${i}`;
      options.push({
        value,
        disabled: i === 10,
      });
    }
    
    function handleChange(value) {
      console.log(`selected ${value}`);
    }


    return (
      <div>
      <span style={{marginRight:'60px'}}>编辑格言</span>
      {/* <Button 
        type="dash"
      >
       设置内容
      </Button> */}
      <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Please select"
      defaultValue={['a10', 'c12']}
      onChange={handleChange}
      options={options}
    />
      </div>
    )
}