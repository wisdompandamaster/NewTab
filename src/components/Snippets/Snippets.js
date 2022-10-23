import './Snippets.css'
import { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SnippetsOutlined } from '@ant-design/icons'

const Snippets = memo((props)=>{

   const { id } = props
   const dispatch = useDispatch();
   const snippets = useSelector(state=>state.snippets)


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

   return (
      <div onDoubleClick={deleteSnippet}>
      <textarea className="snippets" placeholder={ '此处添加文字, 双击可删除...'}>
      </textarea>
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