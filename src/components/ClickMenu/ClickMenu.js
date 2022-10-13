import './ClickMenu.css'
import { DownloadOutlined } from '@ant-design/icons'
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
                     <DownloadOutlined />
                     <span>World</span>
                    </i>
                </li>
                <li className='menu-item'>
                    <i className='menu-uil'>
                     <DownloadOutlined />
                     <span>javascript</span>
                    </i>
                </li>
            </ul>
            </div>
        </div>
    )
}

export default memo(ClickMenu)