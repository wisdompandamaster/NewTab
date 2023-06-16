import "./TopNav.css";
import "../../font/iconfont.css";

import Account from "../Account/Account";
import React, { useState, memo } from "react";
import { Avatar, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
// import { useSelector } from "react-redux";
import Setting from "../Setting/Setting";
// import SetFunctionArea from "../FunctionAera/SetFunctionAera/SetFunctionArea";

// function CheckMode(){   //深浅色模式切换
//    return (
//     <label className='checkmode'><input type='checkbox' name='btn'/></label>
//    )
// }

// function CheckMode() {
//   //深浅色模式切换
//   return (
//     <label className='checkmode'>
//       <input type='checkbox' name='btn' />
//     </label>
//   );
// }

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
      <Avatar
        onClick={showModal}
        className='avatar'
        icon={<UserOutlined />}
        src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'
        // 随机头像另一个api: https://api.multiavatar.com/Starcrasher.png
      />
      <Modal
        closable={false}
        footer={null}
        title={
          <>
            <div className='dot'></div>
            <div className='loginTitle'>登录</div>
          </>
        }
        visible={isModalVisible}
        width={"330px"}
        height={"50vh"}
        onCancel={handleCancel}
      >
        {/* <div className='userlog'><UserOutlined /></div>
        <p>游客模式</p> */}
        <Account />
      </Modal>
    </>
  );
}

const TopNav = () => {
  //顶部导航

  // const clear = useSelector(state => state.clear);
  // let opacity = clear ? 0 : 1;
  return (
    <div>
      {/* <CheckMode></CheckMode> */}
      <User></User>
      <Setting></Setting>
    </div>
  );
};

export default memo(TopNav); //memo 防止子组件重复渲染
