import './ClickMenu.css'
import { DownloadOutlined, AppstoreAddOutlined, LinkOutlined } from '@ant-design/icons'
import { memo } from 'react'
 

function ClickMenu(){
    return (
        <div className='menu-wrapper'>
         <div className='menu'>
            <ul className='menu-content'>
                <li className='menu-item'>
                    <i className='menu-uil'>
                     <DownloadOutlined />
                     <span>下载壁纸</span>
                    </i>
                </li>
                <li className='menu-item'>
                    <i className='menu-uil'>
                    <LinkOutlined />
                     <span>添加图标</span>
                    </i>
                </li>
                <li className='menu-item'>
                    <i className='menu-uil'>
                    <AppstoreAddOutlined />
                     <span>添加功能</span>
                    </i>
                </li>
            </ul>
            </div>
        </div>
    )
}

export default memo(ClickMenu)