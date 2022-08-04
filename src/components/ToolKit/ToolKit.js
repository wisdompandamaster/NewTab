import './ToolKit.css'
import FuncCard from '../FuncCard/FuncCard'
import { useState } from 'react'

export default function ToolKit(){

  const [type,setType] = useState(0) 

  const handleChangeType=(value)=>{
      setType(value)
  }

    return (
        <FuncCard
          title="工具箱"
          kinds={["前端","学术","其它"]}
          changeType={handleChangeType}
        >
           <div style={{fontSize:"30px", height:"120px",width:"100%",textAlign:"center",lineHeight:"110px",fontWeight:"700",color:"#00000033",letterSpacing:"8px"}}>寻找图标中</div>
        </FuncCard>
    )
}