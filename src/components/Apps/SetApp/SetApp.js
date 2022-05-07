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
import update from "immutability-helper";
import {useSelector,useDispatch} from 'react-redux';
import React, { useState, useCallback, useEffect} from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { Card } from '../card';

//专门用来设置Apps
export default function SetApp(){

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

  const [apps, setApps] = useLocalStorage("apps", []);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const myApps = useSelector((state) => state.myApps);
  const [cards, setCards] = useState(apps);

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




  const onFinish = ({ url, name }) => {
    const url_info = new URL(url); 
    // const icon = "http://favicon.cccyun.cc/" + host;
    const icon = url_info.protocol+ '//'+ url_info.host + '/favicon.ico'
    const apps = [
      ...myApps,
      {
        id: myApps.length + 1,
        href: url,
        imgPath: icon,
        name,
      },
    ];

    dispatch({
      type: "CHANGE_APPS",
      myApps: apps,
    });
    localStorage.setItem('apps', apps)
    message.success("创建成功!");
    form.resetFields();
  };

  const onFinishFailed = () => {
    message.error("创建失败!");
  };

  const handleClick = (b) => {
    dispatch({
      type: "CHANGE_DELETEAPP",
      deleteApp: b,
    });
  };
 

  useEffect(() => {
    if (!myApps.length) {
      setApps(defaultIcons);
      setCards(defaultIcons);
      dispatch({
        type: "CHANGE_APPS",
        myApps: defaultIcons,
      });
    }
  }, []);

  useEffect(() => {
    setCards(myApps);
    setApps(myApps);
  }, [myApps]);

  useEffect(() => {
    setApps(cards);
  }, [cards]);

  const deleteApp = (name) => {
    let updatecards = cards.filter((item) => item.name != name);
    setCards(updatecards);
    dispatch({
      type: "CHANGE_APPS",
      myApps: updatecards,
    });
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      setCards((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    },
    [cards]
  );

  const renderCard = useCallback(
    (card, index) => {
      return (
        <div className='edit_cards'>
        <Card 
          key={card.id}
          id={card.id}
          index={index}
          info={card}
          moveCard={moveCard}
          deleteApp={deleteApp}
        />
        </div>
      );
    },
    [moveCard]
  );

  return (
    <div>
      <span style={{marginRight:'60px'}}>编辑APPS</span>
      <Button
        type="dash"
        onClick={showModal}
      >
       设置APP
      </Button>
      <Modal title="快捷方式设置" width={'800px'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className='set_apps'>
          <div className='set_apps_left'>
          {/* {myApps.map((item,index)=>{
            return (
            <div className='edit_cards'><img src={item.imgPath}/></div>
            )
          })
          } */}
           {cards.map((card, i) => renderCard(card, i))}</div>
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
              max: 4,
            },
          ]}
        >
          <Input placeholder="名称" allowClear />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24, offset:1}}>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
      <Button
        type="danger"
        onClick={() => handleClick(true)}
        style={{ margin: "0 3em" }}
      >
        移除
      </Button>
      <Button
        type="dash"
        onClick={() => handleClick(false)}
        // style={{ marginLeft: "2em" }}
      >
        取消
      </Button>
        </Form.Item>
          </Form>
          </div>
          </div>
      </Modal>  
    </div>
  );

}