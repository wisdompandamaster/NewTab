import './SetApp.css'
import Bilibili from "../../../AppIcons/Bilibili.svg";   
import Bytedance from "../../../AppIcons/Bytedance.svg";
import Douban from "../../../AppIcons/Douban.svg";
import Github from "../../../AppIcons/Github.svg";
import Juejin from "../../../AppIcons/Juejin.svg";
import Leetcode from "../../../AppIcons/Leetcode.svg";
import Toutiao from "../../../AppIcons/Toutiao.svg";
import Weibo from "../../../AppIcons/Weibo.svg";
import Xigua from "../../../AppIcons/Xigua.svg";
import Douyin from "../../../AppIcons/Douyin.svg";
// import update from "immutability-helper";
import {useSelector,useDispatch} from 'react-redux';
import React, { useState, useEffect, useRef} from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import Draggable from 'react-draggable';
import { CloseOutlined } from '@ant-design/icons';
// import useLocalStorage from '../../../hooks/useLocalStorage';
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import {arrayMoveImmutable} from 'array-move'
// import { Card } from '../card';

//专门用来设置Apps   
export default function SetApp(){
  //这里的defaultIcon可以考虑删掉
  const defaultIcons = [
        {
          id: 1,
          href: "https://www.bilibili.com/",
          imgPath: Bilibili,
          name: "Bilibili",
        },
        {
          id: 2,
          href: "https://www.bytedance.com/zh/",
          imgPath: Bytedance,
          name: "Bytedance",
        },
        {
          id: 3,
          href: "https://www.douban.com/",
          imgPath: Douban,
          name: "豆瓣",
        },
        {
          id: 4,
          href: "https://www.douyin.com/",
          imgPath: Douyin,
          name: "抖音",
        },
        {
          id: 5,
          href: "https://github.com/",
          imgPath: Github,
          name: "Github",
        },
        {
          id: 6,
          href: "https://juejin.cn/",
          imgPath: Juejin,
          name: "掘金",
        },
        {
          id: 7,
          href: "https://leetcode-cn.com/",
          imgPath: Leetcode,
          name: "Leetcode",
        },
        {
          id: 8,
          href: "https://www.toutiao.com/",
          imgPath: Toutiao,
          name: "头条",
        },
        {
          id: 9,
          href: "https://weibo.com/",
          imgPath: Weibo,
          name: "微博",
        },
        {
          id: 10,
          href: "https://www.ixigua.com/",
          imgPath: Xigua,
          name: "西瓜视频",
        },
        {
          id: 11,
          href: "https://www.baidu.com/",
          imgPath: "https://www.baidu.com/favicon.ico",
          name: "百度",
        },
        {
          id: 12,
          href: "https://www.taptap.com/",
          imgPath: "https://www.taptap.com/favicon.ico",
          name: "TapTap",
        },
  ];

  // let appList = localStorage.getItem('appList')? localStorage.getItem('appList'):"[0,1,2,3,4,5,6]"
  //const [apps, setApps] = useLocalStorage("apps", []);
  
  //还有移除功能待实现

  
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const myApps = useSelector((state) => state.myApps);
  //const [cards, setCards] = useState(apps);
  const [items, setItems] = useState(myApps);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);

  useEffect(()=>{
    setItems(myApps)
  },[myApps])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //draggable组件
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();

    if (!targetRect) {
      return;
    }

    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };


  //添加新APP
  //https://infinity-api.infinitynewtab.com/get-icons?lang=zh-CN&page=0&type=search&keyword=
  //可以通过这个api获取图标
  const onFinish = ({ url, name }) => {
    // const url_info = new URL(url); 
    // const icon = "http://favicon.cccyun.cc/" + host;
    //const icon = url_info.protocol+ '//'+ url_info.host + '/favicon.ico'
    let icon_url = 'https://infinity-api.infinitynewtab.com/get-icons?lang=zh-CN&page=0&type=search&keyword=' + name
    //图标逻辑如下，如果api里能搜到，就用第三个，因为前两个太丑，如果没有第三个，就用第二个，如果都没有，就用文字图片api,根据名字生成图标
    fetch(icon_url).then((response)=>response.json())
            .then((data)=>{  
              // console.log(typeof(data.icons[2].src));       //api结果里的第三个作为图标
              let icon = 'https://ui-avatars.com/api/?name='+name+'&background=0081ff&color=ffffff&rounded=false'
              //文字头像api
              if(data.icons[2])
              {
                icon = data.icons[2].src;
              }
              else if(data.icons[1])
              {
                icon = data.icons[1].src;
              }
              console.log(icon)
              const apps = [
                ...myApps,
                {
                  id: Date.now(),       //时间戳作为唯一ID,最好是时间戳+随机数
                  href: url,
                  imgPath: icon,
                  name,
                },
              ];
              console.log('dispatch')
              dispatch({
                type: "CHANGE_APPS",
                myApps: apps,
              });
              localStorage.setItem('apps', JSON.stringify(apps));
              setItems(apps);
              message.success("创建成功!");
              form.resetFields();
            }          
            ).catch((e)=>console.log("error"));
  };

  const onFinishFailed = () => {
    message.error("创建失败!");
  };

  useEffect(() => {
    if (!myApps.length) {
      dispatch({
        type: "CHANGE_APPS",
        myApps: defaultIcons,
      });
      localStorage.setItem('apps',JSON.stringify(defaultIcons))
    }
  }, []);

  return (
    <div>
      <span style={{marginRight:'60px'}}>添加APPS</span>
      <Button
        type="dash"
        onClick={showModal}
      >
       添加
      </Button>
      <Modal 
      title="添加APP(modal实验)"
      closable={false}
      visible={isModalVisible} 
      onOk={handleOk} 
      onCancel={handleCancel}
      mask={false}
      bodyStyle={{background:"#00000000"}}
      // getContainer={()=>document.getElementById("setting")}
      modalRender={(modal)=>(
        <Draggable
          disabled={disabled}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
      > 
        <div className='set_apps'>
          <div className='set_apps_right'>
      <Form
        form={form}
        layout="horizial"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="url"
          rules={[
            {
              required: true,
            },
            {
              type: "url",
              warningOnly: true,
            },
          ]}
        >
          <Input placeholder="网址" allowClear />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
            },
            {
              type: "string",
              warningOnly: true,
              max: 6,
            },
          ]}
        >
          <Input placeholder="名称" allowClear />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24, offset:1}}>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
          </Form>
          </div>
          </div>
      </Modal>  
    </div>
  );

}