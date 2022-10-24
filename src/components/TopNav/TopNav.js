import './TopNav.css'
import '../../font/iconfont.css' 
import SetBackground from '../SetBackground/SetBackground';
import SetApp from '../Apps/SetApp/SetApp'
import SetFooter from '../MottoFooter/SetFooter/SetFooter';
import { SetFuncCardStyle } from '../FuncCard/SetFuncCard/SetFuncCard';
import Account from '../Account/Account'
import React, { useState, memo } from 'react';
import { Avatar, Drawer, Collapse, Modal, Form, Input, Button, message } from 'antd';
import { UserOutlined,GithubOutlined } from '@ant-design/icons';
import {useSelector } from 'react-redux';
import defaultSetting from '../../config';
import SetFunctionArea from '../FunctionAera/SetFunctionAera/SetFunctionArea';


// function CheckMode(){   //深浅色模式切换
//    return (
//     <label className='checkmode'><input type='checkbox' name='btn'/></label>
//    )
// }

function CheckMode() {
  //深浅色模式切换
  return (
    <label className="checkmode">
      <input type="checkbox" name="btn" />
    </label>
  );
}

function User() {
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
    <Modal closable={false} footer={null} title={<><div className='dot'></div><div className='loginTitle'>登录</div></>} visible={isModalVisible} width={'330px'}   onCancel={handleCancel}>
        {/* <div className='userlog'><UserOutlined /></div>
        <p>游客模式</p> */}
        <Account/>
    </Modal>
    </>
  );
}

function ContactUs() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    
    fetch(defaultSetting.site + "/account/comments/", {
      method: "POST",
      body: JSON.stringify(values.user),
    })
      .then((response) => response.json())
      .then((data) => {
        message.success("感谢您宝贵的意见，稍后给您回邮件");
      })
      .catch((e) => console.log("error"));

    form.resetFields();
  };

  const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "不是有效的邮箱地址!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  return (
    <div>
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          rules={[
            {
              type: "email",
              required: true,
              message: "请输入您的邮箱",
            },
          ]}
          style={{ marginTop: "10px" }}
          name={["user", "email"]}
          label=""
        >
          <Input placeholder="您的邮箱" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "请留下您的建议",
            },
          ]}
          name={["user", "comment"]}
          label=""
        >
          <Input.TextArea placeholder="您宝贵的意见" />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function About() {
  return (
    <div className="about">
      {/* <div className="about-title">菜有什么不队</div> */}
      <div className="about-member">
        <div>唐 琦</div>
        <div>时昕昱</div>
        <div>曹 晨</div>
        <div>李世珍</div>
        <div>胡义越</div>
        <div>史子奇</div>
      </div>
      <div className="codeAd">
        <a
          target={"_blank"}
          rel={"noreferrer"}
          href="https://github.com/wisdompandamaster/NewTab"
        >
          <GithubOutlined />
        </a>
        <div>持续更新中 ~ </div>
      </div>
    </div>
  );
}

//设置功能
function SetFunction() {
  
  return (
    <div className='set_function'>
      {/* <SetApp/> */}
      <SetFooter/>
      <SetFuncCardStyle/>
      {/* <SetFunctionArea/> */}
    </div>
  );
}

function Setting() {
  //设置功能侧边框

  const [visible, setVisible] = useState(false);
  const { Panel } = Collapse;

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="setting">
      <span onMouseDown={showDrawer} className="icon-shezhi iconfont"></span>
      <Drawer
        drawerStyle={{ backgroundColor: "rgb(245,245,245)" }}
        maskStyle={{ backgroundColor: "rgb(0,0,0,.1)" }}
        title={
          <div
            style={{
              fontSize: "20px",
              letterSpacing: "3px",
              fontWeight: "600",
              marginLeft: "10px",
            }}
          >
            设置
          </div>
        }
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Collapse
          className="setting-collapse"
          bordered={false}
          defaultActiveKey={["1"]}
          expandIconPosition={"right"}
        >
          <Panel
            header={<div className="panel-title">壁纸</div>}
            key="1"
            className="setting-panel"
          >
            <SetBackground></SetBackground>
          </Panel>
          <Panel
            header={<div className="panel-title">页面样式设置</div>}
            key="2"
            className="setting-panel"
          >
            <SetFunction/> 
          </Panel>
          <Panel
            header={<div className="panel-title">关于我们</div>}
            key="3"
            className="setting-panel"
          >
            <About></About>
          </Panel>
          <Panel
            header={<div className="panel-title">联系我们</div>}
            key="4"
            className="setting-panel"
          >
            <ContactUs></ContactUs>
          </Panel>
          <Panel
            header={<div className="panel-title">在线聊天室</div>}
            key="5"
            className="setting-panel"
          >
          </Panel>
        </Collapse>
      </Drawer>
    </div>
  );
}

const TopNav = ()=>{
  //顶部导航

  const clear = useSelector((state) => state.clear);
  let opacity = clear ? 0 : 1;
  return (
    <div>
      <CheckMode></CheckMode>
      <User></User>
      <Setting></Setting>
    </div>
  );
}


export default memo(TopNav);  //memo 防止子组件重复渲染