import './Snippets.css'
import { memo,useState } from 'react'
import { SnippetsOutlined } from '@ant-design/icons'

const Snippets = ()=>{

      return (
         <div>
            <i className='menu-uil'>
              <SnippetsOutlined />
              <span>便利贴</span>
            </i>
         </div>
      )
}

export default memo(Snippets);