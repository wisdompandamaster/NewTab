import './Snippets.css'
import { memo,useState } from 'react'
import { SnippetsOutlined } from '@ant-design/icons'

const Snippets = memo((props)=>{

   const { content } = props

   return (
      <div>
      <textarea className="snippets" style={{diplay:'none'}}>
         {content}
      </textarea>
      </div>
   )
})

const SnippetsInMenu = memo(()=>{

      return (
         <div>
            <i className='menu-uil'>
              <SnippetsOutlined />
              <span>便利贴</span>
            </i>
         </div>
      )
})

export {  SnippetsInMenu, Snippets };