import './CountDown.css';
import { Modal } from 'antd';
import { useState } from 'react';

//一个想法，把顶部的时间变成倒计时，可选
export default function CountDown(){

    const countdownList = [{'name':'考研','ddl':'2022-12-24 00:00'},{'name':'答辩','ddl':'2022-5-24 00:00'}]

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
  
    
    const now = new Date()
    //const nowDate = now.getHours().toLocaleString();
    // const deadline = new Date('2022-12-24 00:00')
    // const timeRemainning = deadline - now;
    // let day, hour, minute, second;
    
    // second = Math.floor(timeRemainning / 1000 % 60)     //用余数来把毫秒转化为可表示的时间
    // minute = Math.floor(timeRemainning / 1000 / 60 % 60)
    // hour = Math.floor(timeRemainning / 1000 / 60 / 60 % 24)
    // day = Math.floor(timeRemainning / 1000 / 60 / 60 / 24) + 1

    return (
        <>
        <div className='CountDown' onClick={showModal}>
            <div className='left'><div></div><p>倒计时</p></div>
            <div className='countdown_content'>
            {
                countdownList.map((item)=>{
                    const timeRemainning = new Date(item.ddl) - now;
                    const day = Math.floor(timeRemainning / 1000 / 60 / 60 / 24) + 1
                    return (
                        <div>
                        <div>距离{item.name}还剩</div>
                        <div>{day}<span>days</span></div>
                        </div>
                    )

                })
            }
           </div>
           </div>
        <Modal title={<div style={{fontSize:'30px',letterSpacing:'10px',marginLeft:'54px'}}>倒计时设置</div>} visible={isModalVisible}  width={'600px'}  footer={null}  onCancel={handleCancel}>
         
        </Modal>   
        </>
    )

}