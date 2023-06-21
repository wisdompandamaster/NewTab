import "./SetBackground.css";
import { useSelector, useDispatch } from "react-redux";
import { Upload, message, Slider, Modal, Tabs, Radio } from "antd";
import React, { useState, useEffect, memo } from "react";
import { InboxOutlined, CheckOutlined } from "@ant-design/icons";
import defaultSetting from "../../config";
import cookie from "react-cookies";
import FuncModal from "../FuncModal/FuncModal";
import axios from "axios";

let t = null;
function debounce(fn) {
  //防抖函数
  return function () {
    if (t) {
      clearTimeout(t);
    }
    t = setTimeout(() => {
      fn.apply(this, arguments);
    }, 1000);
  };
}

//上传存储设置(函数非组件)
function saveSettings(type, value) {
  async function save() {
    // console.log('save运行')
    fetch("/api/functions/savemysettings/", {
      method: "post",
      body: JSON.stringify({ type: type, value: value }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(response => response.json());
    // .then(data => {
    //   console.log(data.msg);
    // })
    // .catch(e => console.log("error"));
  }
  if (cookie.load("status") === "200") {
    debounce(save)();
  }
}

function UploadImg() {
  const { Dragger } = Upload;
  const dispatch = useDispatch();

  const props = {
    name: "file",
    multiple: true,
    withCredentials: true,
    action: "/api/img/uploadmybg/",
    onChange(info) {
      const { status, response } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        //每上传完一次文件会返回一次服务端返回值
        message.success(`${info.file.name} file uploaded successfully.`);
        dispatch({
          type: "CHANGE_MYBG",
          mybglist: response.objectList,
        });
        localStorage.setItem("mybglist", JSON.stringify(response.objectList));
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div>
      <Dragger
        {...props}
        disabled={cookie.load("status") === "200" ? false : true}
      >
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>
          点击或拖拽图片文件（jpg,jpeg,png）上传
        </p>
        <p className='ant-upload-hint'>
          上传后图片显示在<span style={{ color: "black" }}> 我的壁纸 </span>中
        </p>
      </Dragger>
    </div>
  );
}

function ShowBackground(props) {
  const { data } = props;
  let imgList = data;

  const dispatch = useDispatch();
  const currentbg = useSelector(state => state.currentbg);

  function onChangeBg(e, value) {
    dispatch({
      type: "CHANGE_BG",
      currentbg: value,
    });
    localStorage.setItem("currentbg", value);
    saveSettings("current_bg", value); //上传修改的背景数据
  }

  return (
    <div className='showBackground'>
      {imgList.map((item, index) => {
        //这里通过改行内样式，其实可以通过替换类
        // console.log(item)
        let url = "url(" + "/pic/" + item + ")";
        let boxShadow =
          currentbg === item
            ? "5px 5px rgba(145, 241, 145,0.8),-5px 5px rgba(145, 241, 145,0.8),5px -5px rgba(145, 241, 145,0.8),-5px -5px rgba(145, 241, 145,0.8)"
            : "";
        let spanStyle =
          currentbg === item
            ? { opacity: 1, backgroundColor: "rgba(145, 241, 145,0.8)" }
            : {};
        return (
          <div
            style={{
              backgroundImage: url,
              backgroundSize: "cover",
              boxShadow: boxShadow,
            }}
            className='showBackgroundItem'
            key={index}
          >
            {" "}
            <div onClick={e => onChangeBg(e, item)} style={spanStyle}>
              <CheckOutlined />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const SetBackground = () => {
  const { TabPane } = Tabs;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const bgType = useSelector(state => state.bgtype);

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const cover = state.cover;
  const blur = state.blur;
  const currentbg = state.currentbg;
  const onlineimglist = state.onlineimglist;
  const mybglist = state.mybglist;

  useEffect(() => {
    async function getList() {
      fetch("/api/img/getmybglist/", {
        credentials: "include",
      })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem("mybglist", JSON.stringify(data.objectList));
          dispatch({
            type: "CHANGE_MYBG",
            mybglist: data.objectList,
          });
        })
        .catch(e => console.log("error"));
    }
    getList();
  }, []);

  let background = "url(" + currentbg + ")";

  function onChangeCover(value) {
    dispatch({
      type: "CHANGE_COVER",
      cover: value,
    });
    localStorage.setItem("cover", value);
    saveSettings("cover", value);
  }

  function onChangeBlur(value) {
    dispatch({
      type: "CHANGE_BLUR",
      blur: value,
    });
    localStorage.setItem("blur", value);
    saveSettings("blur", value);
  }

  function onAfterChange(value) {
    //console.log('onAfterChange: ', value);
  }

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const changeBgType = e => {
    dispatch({
      type: "CHANGE_BGTYPE",
      bgtype: e.target.value,
    });
    localStorage.setItem("bgtype", e.target.value);
    // 代理实验
    // if (e.target.value == 2) {
    //   // fetch(defaultSetting.bingBg).then(data => console.log(data.url));
    //   fetch("https://api.yimian.xyz/img?type=wallpaper", {
    //     redirect: "manual",
    //   }).then(data => console.log(data));
    // }
    // if (e.target.value == 3) {
    //   fetch("/bg/img?type=wallpaper", { redirect: "manual" }).then(data =>
    //     console.log(data)
    //   );
    // }
  };

  return (
    <>
      <div className='setBackground'>
        <div
          className='backgroundImg'
          style={{
            backgroundImage: background,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div onClick={showModal}>更改背景</div>
        </div>
        <div
          style={{ margin: "10px 5px", display: "flex", alignItems: "center" }}
        >
          <Slider
            className='backgroundCover'
            defaultValue={cover}
            onChange={onChangeCover}
            onAfterChange={onAfterChange}
          />
          <span>遮罩浓度</span>
        </div>
        <div
          style={{ margin: "10px 5px", display: "flex", alignItems: "center" }}
        >
          <Slider
            className='backgroundBlur'
            defaultValue={blur}
            onChange={onChangeBlur}
            onAfterChange={onAfterChange}
          />
          <span>模糊程度</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            background: "#0001",
            padding: "3% 0",
            borderRadius: "20px",
          }}
        >
          <Radio.Group
            onChange={changeBgType}
            value={bgType}
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Radio value={1}>自选 </Radio>
            <Radio value={2}>必应 </Radio>
            <Radio value={3}>随机 </Radio>
          </Radio.Group>
        </div>
      </div>
      <FuncModal
        title={
          <div
            style={{
              fontSize: "30px",
              fontWeight: 700,
              letterSpacing: "10px",
              marginLeft: "34px",
            }}
          >
            壁纸
          </div>
        }
        width={"940px"}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Tabs type='card' style={{ height: "550px" }} tabPosition='left'>
          {" "}
          {/*二级页面左边的标签页*/}
          <TabPane tab={<span className='backTab'>在线壁纸</span>} key='1'>
            <ShowBackground data={onlineimglist}></ShowBackground>
          </TabPane>
          <TabPane tab={<span className='backTab'>我的壁纸</span>} key='2'>
            <ShowBackground data={mybglist}></ShowBackground>
          </TabPane>
          <TabPane tab={<span className='backTab'>上传壁纸</span>} key='3'>
            <UploadImg></UploadImg>
          </TabPane>
        </Tabs>
      </FuncModal>
    </>
  );
};

export default memo(SetBackground);
