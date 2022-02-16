import './TopNav.css'
import '../../font/iconfont.css' 
import SetBackground from '../SetBackground/SetBackground';
import React, { useState } from 'react';
import { Avatar, Drawer, Collapse, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {useSelector} from 'react-redux'


function CheckMode(){   //深浅色模式切换
   return (
    <label className='checkmode'><input type='checkbox' name='btn'/></label>
   )
}

function User(){

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  

  const handleCancel = () => {
    setIsModalVisible(false);
  };

   return (
     <>
    <Avatar onClick={showModal} className='avatar' icon={<UserOutlined />} src="https://joeschmoe.io/api/v1/random" />
    <Modal closable={false} footer={null} title={<div className='loginTitle'>登录</div>} visible={isModalVisible} width={'330px'}   onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Modal>
    </>
   )
}

function Setting(){    //设置功能侧边框

  const [visible, setVisible] = useState(false);
  const { Panel } = Collapse
  const text = (
      <p style={{ paddingLeft: 24 }}>
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
        as a welcome guest in many households across the world.
      </p>
  )
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
 
  return (
    <div className='setting'>
      <span onMouseDown={showDrawer} className="icon-shezhi iconfont"></span>
      <Drawer maskStyle={{backgroundColor:'rgb(0,0,0,.1)'}} title={<div style={{fontSize:'20px',letterSpacing:'3px',fontWeight:'600',marginLeft:'10px'}}>设置</div>} placement="right" onClose={onClose} visible={visible}>
        <Collapse  className='setting-collapse' bordered={false} defaultActiveKey={['1']} expandIconPosition={'right'}>
          <Panel header={<div className='panel-title'>壁纸</div>} key="1" className='setting-panel'>
            <SetBackground></SetBackground>
          </Panel>
          <Panel header={<div className='panel-title'>壁纸</div>} key="2" className='setting-panel'>
          {text}
          </Panel>
          <Panel header={<div className='panel-title'>联系我们</div>} key="3" className='setting-panel'>
          {text}
          </Panel>
        </Collapse>
      </Drawer>
    </div>
  );
}

export default function TopNav(){  //顶部导航

  const clear = useSelector(state=>state.clear)
  let opacity = clear? 0:1
  return (
    <div style={{opacity:opacity}}>
      <CheckMode></CheckMode>
      <User></User>
      <Setting></Setting>
    </div>
  )
}

