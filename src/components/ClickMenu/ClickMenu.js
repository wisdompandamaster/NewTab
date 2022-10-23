import './ClickMenu.css'
import { DownloadOutlined, SwapOutlined, CodeOutlined } from '@ant-design/icons'
import { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import defaultSetting from '../../config'
import SetFunctionArea from '../FunctionAera/SetFunctionAera/SetFunctionArea';
import SetApp from '../Apps/SetApp/SetApp'
import { SnippetsInMenu } from '../Snippets/Snippets'
 

function ClickMenu(){

    const currentbg = useSelector(state=>state.currentbg)

    const downloadWallPaper = (e)=>{
        // e.stopPropagation();
        //创造 a 标签来下载
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = defaultSetting.imgSite + currentbg;
        document.body.appendChild(a);
        a.click();  // 自动触发点击a标签的click事件
        document.body.removeChild(a);
    }


    return (
        <div className='menu-wrapper'>
         <div className='menu'>
            <ul className='menu-content'>
                <li className='menu-item'> 
                    <i className='menu-uil' onClick={downloadWallPaper}>
                     <DownloadOutlined />
                     <span>下载壁纸</span>
                    </i>
                </li>
                <li className='menu-item'>
                   <SetApp/>
                </li>
                <li className='menu-item'>
                    <SetFunctionArea  />
                </li>
                <li className='menu-item'>
                    <SnippetsInMenu />
                </li>
                <li className='menu-item'> 
                    <i className='menu-uil'>
                     <CodeOutlined />
                     <span>命令模式</span>
                    </i>
                </li>
            </ul>
            </div>
        </div>
    )
}

export default memo(ClickMenu)