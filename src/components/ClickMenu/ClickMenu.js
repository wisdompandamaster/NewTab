import "./ClickMenu.css";
import {
  DownloadOutlined,
  SwapOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetFunctionArea } from "../FunctionAera/SetFunctionAera/SetFunctionArea";
import SetApp from "../Apps/SetApp/SetApp";
import { SnippetsInMenu } from "../Snippets/Snippets";

function ClickMenu() {
  const currentbg = useSelector(state => state.currentbg);
  const bgType = useSelector(state => state.bgtype);
  const clear = useSelector(state => state.clear);

  const dispatch = useDispatch();

  const downloadWallPaper = e => {
    // e.stopPropagation();
    //创造 a 标签来下载
    // 方法一：利用a标签下载，但是当跨域时，会跳转而不是下载
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = currentbg;
    a.target = "_blank";
    a.download = "bg.jpg";
    document.body.appendChild(a);
    a.click(); // 自动触发点击a标签的click事件
    document.body.removeChild(a);
    // 方法二：获取文件二进制数据然后创建a标签下载
    // fetch(currentbg).then(res => {
    //   res.blob().then(blob => {
    //     const blobUrl = window.URL.createObjectURL(blob);
    //     // 这里的文件名根据实际情况从响应头或者url里获取
    //     // const filename = 'user.txt';
    //     const a = document.createElement("a");
    //     a.href = blobUrl;
    //     a.download = "a.jpg";
    //     a.click();
    //     window.URL.revokeObjectURL(blobUrl);
    //   });
    // });
    // 方法三:利用canvas编辑base64下载
    // let imgsrc = currentbg;
    // let image = new Image();
    // image.crossOrigin = "anonymous";
    // image.src = imgsrc;
    // // 解决跨域canvas污染问题
    // image.onload = () => {
    //   let canvas = document.createElement("canvas");
    //   canvas.width = image.width;
    //   canvas.height = image.height;
    //   let context = canvas.getContext("2d");
    //   context.drawImage(image, 0, 0, image.width, image.height);
    //   let url = canvas.toDataURL("image/png"); // 得到图片的base64编码数据
    //   let a = document.createElement("a");
    //   a.download = "download";
    //   a.href = url;
    //   a.click();
    // };
  };

  function onChangeClear() {
    let value = clear ? 0 : 1;
    dispatch({
      type: "CHANGE_CLEAR",
      clear: value,
    });
  }

  return (
    <div className='menu-wrapper'>
      <div className='menu'>
        <ul className='menu-content'>
          <li className='menu-item'>
            <div>
              <i className='menu-uil' onClick={downloadWallPaper}>
                <DownloadOutlined />
                <span>下载壁纸</span>
              </i>
            </div>
          </li>
          <li className='menu-item'>
            <SetApp />
          </li>
          <li className='menu-item'>
            <SetFunctionArea />
          </li>
          <li className='menu-item'>
            <SnippetsInMenu />
          </li>
          <li className='menu-item'>
            <div>
              <i className='menu-uil' onClick={onChangeClear}>
                <CodeOutlined />
                <span>简洁模式</span>
              </i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default memo(ClickMenu);
