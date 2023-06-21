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
    const bgurl = [
      "/img/" + currentbg,
      "https://api.oneneko.com/v1/bing_today",
      "https://api.btstu.cn/sjbz/api.php?lx=fengjing&format=images",
    ];
    // e.stopPropagation();
    //创造 a 标签来下载
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = "/img/" + currentbg;
    a.download = "bg.jpg";
    document.body.appendChild(a);
    a.click(); // 自动触发点击a标签的click事件
    document.body.removeChild(a);
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
