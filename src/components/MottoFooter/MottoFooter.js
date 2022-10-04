import { memo, useEffect, useState } from 'react'
import './MottoFooter.css'
import { message, Radio } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import FuncModal from '../FuncModal/FuncModal'
import useLocalStorage from "../../hooks/useLocalStorage";

//这里总结一下localStorage用法


const MottoFooter = ()=>{  //格言脚注

    //const [footerset, setFooterSet] = useLocalStorage('footerset',{})
    const [motto, setMotto] = useState({})        //之后添加左键复制，右键刷新,或者添加菜单
    const [footerType, setFooterType] = useState(0)
    const footerexist = useSelector(state=>state.footerexist)
    const footerkinds = useSelector(state=>state.footerkinds)

    useEffect(()=>{
        let kinds = footerkinds.reduce((pre,cur,i)=>{         //还没加到localstorage
            return pre + 'c=' + cur + '&'
        },'')
        let url = 'https://v1.hitokoto.cn/?'+kinds+'type=json'   
        
        async function getMotto(){           
            fetch(url).then((response)=>response.json())
            .then((data)=>{localStorage.setItem('motto',JSON.stringify(data));setMotto(data)}
            ).catch((e)=>console.log("motto error"));
        }
        getMotto()
        const t = setInterval(()=>{
             getMotto()
             console.log('motto')
        },60000)              //60s更新一次

        return ()=>{
            clearTimeout(t)
        }
        
    },[footerkinds])

    //let motto = JSON.parse(localStorage.getItem('motto'))

    const onSetFotter = (e)=>{
        e.stopPropagation();
        showModal();
    } 

    // console.log(motto2.hitokoto)
    const clipMotto = () => {
        navigator.clipboard
        .writeText(motto.hitokoto)
        .then(()=>{message.success('已成功复制到剪贴板')})
    }

     // modal组件控制函数
     const [isModalVisible, setIsModalVisible] = useState(false);
     const showModal = () => {
      // openNotification();
       setIsModalVisible(true);
     };
     const handleOk = () => {
       setIsModalVisible(false);
     };
     const handleCancel = () => {
       setIsModalVisible(false);
     };

     const onChange = (e) =>{
        setFooterType(e.target.value)
    }

    return (
        <div>
        <div onClick={clipMotto} style={{visibility: footerexist ? 'visible':'hidden'}}  className='motto'>
            <span onClick={onSetFotter} style={{position:'absolute',right:'3%',color:'aqua'}}><UnorderedListOutlined/></span>
            <div>{'< '}&nbsp;<em>{motto.hitokoto}</em>{'>'}</div><span>--{motto.from}--</span><span>{motto.from_who}</span>
        </div>
        <FuncModal
        bodyStyle={{padding:'11px'}}
        title={<div style={{fontSize:'25px',fontWeight:'500',letterSpacing:'8px',marginLeft:'24px'}}>Fotter设置</div>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={'30vw'}
    >
       {/* <SetClock/> */}
       <div style={{display:'flex',justifyContent:'space-between'}}>
        <span>底部内容</span>
        <span>
        <Radio.Group onChange={onChange} value={footerType}>
        <Radio value={0}>一言</Radio>
        <Radio value={1}>那年今日</Radio>
        </Radio.Group>
        </span>
       </div>
       </FuncModal>
       </div>
    )
}

export default memo(MottoFooter); //防止父组件背景改变时引发的重复渲染