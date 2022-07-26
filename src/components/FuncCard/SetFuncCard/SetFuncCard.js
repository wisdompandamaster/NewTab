import './SetFuncCard.css'
import { Radio } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import useLocalStorage from "../../../hooks/useLocalStorage";
import FuncModal from "../../FuncModal/FuncModal";


export default function SetFuncCard(){

    const [isModalVisible, setIsModalVisible] = useState(false);
    
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
        <FuncModal width="45vw"
         title={<div style={{display:'inline-flex',alignItems:'center',color:'white'}}>
             <span style={{fontSize:'25px'}}>添加 Card</span> 
             </div>}
        closable={false}
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}>
        </FuncModal>
        </div>
    )
}

export function SetFuncCardStyle(){
    const [cardStyle, setCardStyle] = useLocalStorage('cardstyle')
    const cardstyle = useSelector(state=>state.cardstyle)
    const dispatch = useDispatch();

    const onChange = (e) => {
        //console.log('radio checked', e.target.value);
        // setValue(e.target.value);
        dispatch({                       
          type: 'CHANGE_CARDSTYLE',
          cardstyle:e.target.value,
       })
        setCardStyle(e.target.value)
    };

    return (
        <div>
            <span>卡片样式</span>
            <span>
            <Radio.Group onChange={onChange} value={cardstyle}>
            <Radio value={0}>普通</Radio>
            <Radio value={1}>磨砂</Radio>
            </Radio.Group>
            </span>
        </div>
    )
}