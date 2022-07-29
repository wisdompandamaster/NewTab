import './SetFunctionArea.css'
import { Radio } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import useLocalStorage from "../../../hooks/useLocalStorage";
import FuncModal from "../../FuncModal/FuncModal";
import News from '../../News/News'
import Todo from '../../Todo/Todo'
import Pictures from '../../Pictures'
import Notes from "../../Notes";
import Weather from '../../Weather/Weather'
import CalComponent from '../../Calendar/CalComponent'
import Competition from '../../Competition/Competition'
import CountDown from '../../CountDown/CountDown'


export default function SetFunctionArea(){

    const [isModalVisible, setIsModalVisible] = useState(false);
    const funcs = [<News/>,<Todo/>,<Pictures/>,<Notes/>,<Weather/>,<CalComponent/>,<CountDown/>,<Competition/>]
    
      const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

    return (
        <div>
        <span style={{marginRight:'60px'}}>添加 Cards</span>
        <Button
        type="dash"
        onClick={showModal}
        >
         添加
        </Button>
        <FuncModal width="60vw"
         title={<div style={{display:'inline-flex',alignItems:'center',color:'white'}}>
             <span style={{fontSize:'25px'}}>添加 Card</span> 
             </div>}
        closable={false}
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}>
           <div style={{display:'grid',gridTemplateColumns:'repeat(3, calc(100%/3))',height:'50vh', rowGap:'3%',margin:'1% 0 1% 0', overflowY:'scroll'}}>
            {
                funcs.map((item,index)=>{
                    return (
                      //FIXME:天气应用无法显示
                      <div key={index} style={{justifySelf:'center',position:'relative'}}>
                        <div style={{width:'352px',height:'165px',position:'absolute', background:'#fff0',zIndex:1}}></div>
                         {item}
                      </div>
                    )
                })
            }
          </div>
        </FuncModal>
        </div>
    )
}

 