import confetti from "canvas-confetti";
import { GithubOutlined } from "@ant-design/icons";
import { Drawer, Collapse, Form, Input, Button, Switch } from "antd";
import { useState } from "react";
import SetBackground from "../SetBackground/SetBackground";
import "../../font/iconfont.css";
// import SetApp from "../Apps/SetApp/SetApp";
// import { SetTimePos } from "../Clock/Clock";
import { SetFooter } from "../MottoFooter/MottoFooter";
import { SetFuncCardStyle } from "../FuncCard/SetFuncCard/SetFuncCard";
import ChatRoom from "../ChatRoom/ChatRoom";
// 实验功能一：纸屑
function Confetti() {
  const [disable, setDisable] = useState(true);
  let colors = ["#bb0000", "#ffffff"];
  var defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["star"],
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
  };
  // let end = Date.now() + 15 * 1000;

  function frame() {
    // 星星礼花
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"],
    });
    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"],
    });
    // 两边礼花
    confetti({
      particleCount: 30,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 30,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });
    // 中心随机方向礼花
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      origin: { y: 0.6 },
    });
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        onClick={() => {
          frame();
        }}
        type='primary'
        ghost
        disabled={disable}
      >
        canvas-confetti
      </Button>
      <Switch onChange={checked => setDisable(!checked)} />
    </div>
  );
}

//设置功能
function SetFunction() {
  return (
    <div className='set_function'>
      {/* <SetApp/> */}
      <SetFooter />
      <SetFuncCardStyle />
      {/* <SetTimePos /> */}
      {/* <SetFunctionArea/> */}
    </div>
  );
}

function ContactUs() {
  const [form] = Form.useForm();

  const onFinish = values => {
    fetch("/api/account/comments/", {
      method: "POST",
      body: JSON.stringify(values.user),
    })
      .then(response => response.json())
      .then(data => {
        message.success("感谢您宝贵的意见，稍后给您回邮件");
      })
      .catch(e => console.log("error"));

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
        name='nest-messages'
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
          label=''
        >
          <Input placeholder='您的邮箱' />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "请留下您的建议",
            },
          ]}
          name={["user", "comment"]}
          label=''
        >
          <Input.TextArea placeholder='您宝贵的意见' />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
          <Button type='primary' htmlType='submit'>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function About() {
  return (
    <div className='about'>
      {/* <div className="about-title">菜有什么不队</div> */}
      <div className='about-member'>
        <div>唐 琦</div>
        <div>时昕昱</div>
        <div>曹 晨</div>
        <div>李世珍</div>
        <div>胡义越</div>
        <div>史子奇</div>
      </div>
      <div className='codeAd'>
        <a
          target={"_blank"}
          rel={"noreferrer"}
          href='https://github.com/wisdompandamaster/NewTab'
        >
          <GithubOutlined />
        </a>
        <div>持续更新中 ~ </div>
      </div>
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
    <>
      <span
        onMouseDown={showDrawer}
        className='setting icon-shezhi iconfont'
      ></span>
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
        placement='right'
        onClose={onClose}
        visible={visible}
      >
        <Collapse
          className='setting-collapse'
          bordered={false}
          defaultActiveKey={["1"]}
          expandIconPosition={"right"}
        >
          <Panel
            header={<div className='panel-title'>壁纸</div>}
            key='1'
            className='setting-panel'
          >
            <SetBackground></SetBackground>
          </Panel>
          <Panel
            header={<div className='panel-title'>页面样式设置</div>}
            key='2'
            className='setting-panel'
          >
            <SetFunction />
          </Panel>
          <Panel
            header={<div className='panel-title'>关于我们</div>}
            key='3'
            className='setting-panel'
          >
            <About />
          </Panel>
          <Panel
            header={<div className='panel-title'>联系我们</div>}
            key='4'
            className='setting-panel'
          >
            <ContactUs></ContactUs>
          </Panel>
          <Panel
            header={<div className='panel-title'>在线聊天室</div>}
            key='5'
            className='setting-panel'
          >
            <ChatRoom></ChatRoom>
          </Panel>
          {/* 实验性的功能 */}
          <Panel
            header={<div className='panel-title'>实验室</div>}
            key='6'
            className='setting-panel'
          >
            <Confetti />
          </Panel>
        </Collapse>
      </Drawer>
    </>
  );
}

export default Setting;
