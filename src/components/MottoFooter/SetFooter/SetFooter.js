import React from "react";
import { Button } from 'antd';

export default function SetFooter(){
    return (
      <div>
      <span style={{marginRight:'60px'}}>编辑格言</span>
      <Button 
        type="dash"
      >
       设置内容
      </Button>
      </div>
    )
}