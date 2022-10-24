import './Snippets.css'
import { memo, useState } from 'react'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SnippetsOutlined } from '@ant-design/icons'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
// 富文本表情包扩展
// import 'braft-extensions/dist/emoticon.css'
// import Emoticon, { defaultEmoticons } from 'braft-extensions/dist/emoticon'
// import 'braft-extensions/dist/code-highlighter.css'
// import CodeHighlighter from 'braft-extensions/dist/code-highlighter'

// BraftEditor.use(CodeHighlighter({
//    includeEditors: ['editor-with-code-highlighter'],
//    // theme: 'light' // 支持dark和light两种主题，默认为dark
//  }))
// BraftEditor.use(CodeHighlighter({
//    includeEditors: ['editor-with-code-highlighter'],
//  }))

const Snippets = memo((props)=>{

   const { id } = props
   const dispatch = useDispatch();
   const snippets = useSelector(state=>state.snippets)
   // const [editorState,setEditorState] = useState(BraftEditor.createEditorState(null))

   const deleteSnippet = ()=>{
      let new_snippets = snippets.reduce((pre,cur)=>{
         if(cur.id !== id){
            pre.push(cur)
         }
         return pre;
      },[])
      dispatch({
         type: 'CHANGE_SNIPPETS',
         snippets:new_snippets,
       });
   }

   //富文本编辑器
   // const handleChange = (editorState) => {
   //    console.log(editorState)
   //    setEditorState({ editorState })
   // }
   //自定义富文本控件
   //富选框参数
//   const controls = ['undo', 'redo', 'separator',
//   'font-size', 'line-height', 'letter-spacing', 'separator',
//   'text-color', 'blod', 'italic', 'underline', 'strike-through', 'separator',
//   'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
//   'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
//   'link', 'separator', 'hr', 'separator',
//   'clear', 'separator',
// ]
 
   const controls = [
      'bold','text-color','font-size','separator','list-ul','emoji','separator','clear'
   ]

   return (
      <div onDoubleClick={deleteSnippet} style={{background:'#fffe',borderRadius:'10px',height:'320px',width:'365px'}}>
      {/* <textarea className="snippets" placeholder={ '此处添加文字, 双击可删除...'}>
      </textarea> */}
      {/* <PreviewDemo/> */}
      <BraftEditor style={{height:'100%',width:'100%'}}
      //   id="editor-with-code-highlighter"
        controls={controls} 
      //   value={editorState} 
      //   onChange={handleChange}
        placeholder={'单击可编辑，双击关闭...'}
        contentStyle={{height:270,widthboxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)'}}
      //   id="demo-editor-with-emoticon"
      />
      </div>
   )
})

const SnippetsInMenu = memo(()=>{

      const dispatch = useDispatch();
      const snippets = useSelector(state=>state.snippets)

      const addSnippet = ()=>{
         //TODO:ID改成唯一性的uuid
         let new_id = (Math.random() * 1000000).toFixed(0)
         let new_snippets = snippets.concat({id:new_id,content:''})
         dispatch({
            type: 'CHANGE_SNIPPETS',
            snippets:new_snippets,
          });

      }

      return (
         <div onClick={addSnippet}>
            <i className='menu-uil'>
              <SnippetsOutlined />
              <span>便利贴</span>
            </i>
         </div>
      )
})

export {  SnippetsInMenu, Snippets };