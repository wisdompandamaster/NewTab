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
import { Form, Input, Button, message, Modal, Switch } from 'antd';
import Draggable from 'react-draggable';
import { PlusOutlined } from '@ant-design/icons';
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

   

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const myApps = useSelector((state) => state.myApps);
  //const [cards, setCards] = useState(apps);
  const [items, setItems] = useState(myApps);
  const [iconlist, setIconList] = useState([]);
  

  const [iscustom,setIsCustom] = useState(false);
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

  const onChange = (checked) => {
    setIsCustom(checked);
  };

  const addApp = (app) => {
    const apps = [
      ...myApps,
      {
        id: Date.now(),       //时间戳作为唯一ID,最好是时间戳+随机数
        href: app.url,
        imgPath: app.src,
        name:app.name,
      },
    ];
    dispatch({
      type: "CHANGE_APPS",
      myApps: apps,
    });
    localStorage.setItem('apps', JSON.stringify(apps));
    setItems(apps);
    message.success("创建成功!");
     
  }
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
    //图标逻辑如下，如果api里能搜到，就用第三个，因为前两个太丑，如果没有第三个，就用第二个，如果都没有，就用文字图片api,根据名字生成图标
              // console.log(typeof(data.icons[2].src));       //api结果里的第三个作为图标
              let colorlist = ['16a085', '27ae60', '2c3e50', 'f39c12', 'e74c3c', '9b59b6', 'FB6964', '342224', "472E32", "BDBB99", "77B1A9", "73A857"];
              //不是种子随机数
              let color = Math.floor(Math.random() * colorlist.length);
              let icon = 'https://ui-avatars.com/api/?name='+name+'&background='+colorlist[color]+'&color=ffffff&rounded=false'
              //文字头像api
              const apps = [
                ...myApps,
                {
                  id: Date.now(),       //时间戳作为唯一ID,最好是时间戳+随机数
                  href: url,
                  imgPath: icon,
                  name,
                },
              ];
              dispatch({
                type: "CHANGE_APPS",
                myApps: apps,
              });
              localStorage.setItem('apps', JSON.stringify(apps));
              setItems(apps);
              message.success("创建成功!");
              form.resetFields();
            
  };

  const onFinishFailed = () => {
    message.error("创建失败!");
  };

  const onValuesChange = (changedValue, allValue) => {
      if(!iscustom){
        let url = "https://infinity-api.infinitynewtab.com/get-icons?lang=zh-CN&page=0&type=search&keyword=" + changedValue.name

        fetch(url).then((response)=>response.json())
            .then((data)=>{  
              // console.log(typeof(data.icons[2].src));       //api结果里的第三个作为图标
              // let iconlist = 'https://ui-avatars.com/api/?name='+ changedValue.name+'&background=0081ff&color=ffffff&rounded=false'
              //文字头像api
              console.log(data)
              setIconList(data.icons)
              // message.success("获取成功!");
              // form.resetFields();
            }          
            ).catch((e)=>console.log("error"));
      }
  }

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
      <Modal width="45vw"
      title={<div style={{display:'inline-flex',alignItems:'center'}}>
              添加APP(modal实验)
             <span style={{fontSize:'15px',marginLeft:'20px'}}><Switch checked={iscustom} onChange={onChange} />自定义</span>
             </div>}
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
         {/*TODO:at least to add tabs  */}
        <div className='set_apps'>
      <Form
        form={form}
        style={{width:'100%'}}
        layout="inline"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        autoComplete="off"
      >
         <Form.Item
          name="name"
          style={{width:'30%'}}
          rules={[
            {
              required: false,
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
        <Form.Item
          name="url"
          style={{width:'50%'}}
          hidden={!iscustom}
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
        <Form.Item style={{width:'5%'}}>
          <Button hidden={!iscustom} type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>
        </div>
        <div className='icon_list' style={{display:iscustom?'none':'grid'}}>
        {
        iconlist.map((item,index)=>{
            if(!item.isInfinity)
            return (
              <div className='icon_list_item' key={index}>
              <img style={{width:'50px',borderRadius:'50%',display:'inline-block'}} src={item.src}/>
              <span>{item.name}</span>
              <Button ghost={true} onClick={()=>addApp(item)} shape="circle"><PlusOutlined /></Button>
              <div>{item.description}</div>
              </div>
            )
        })
       }
       </div>
      </Modal>  
    </div>
  );

}