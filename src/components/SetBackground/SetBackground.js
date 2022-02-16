import './SetBackground.css'
import {useSelector, useDispatch} from 'react-redux'
import { Upload, message, Slider, Modal, Tabs } from 'antd'
import React, { useState } from 'react';
import { InboxOutlined,CheckOutlined } from '@ant-design/icons';


function UploadImg(){

  const { Dragger } = Upload;
  const dispatch = useDispatch()

  const props = {
  name: 'file',
  multiple: true,
  action: 'http://127.0.0.1:8000/img/upload/',
  onChange(info) {
    const { status, response } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done'){          //每上传完一次文件会返回一次服务端返回值
      message.success(`${info.file.name} file uploaded successfully.`);
      dispatch({
        type: 'CHANGE_MYBG',
        myimglist: response.uploadList
     }) 
      localStorage.setItem('myimglist',JSON.stringify(response.uploadList))
      
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
  };
  
    return (
    <div>
    <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">点击或拖拽图片文件（jpg,jpeg,png）上传</p>
    <p className="ant-upload-hint">
       上传后图片显示在<span style={{color:'black'}}> 我的壁纸 </span>中
    </p>
  </Dragger>
  </div>
  )
  
}

function ShowBackground(props){

    let imgList = props.data
    const dispatch = useDispatch()
    const currentbg = useSelector(state=>state.currentbg)

    function onChangeBg(e,value){
        console.log(value)
        dispatch({
            type: 'CHANGE_BG',
            currentbg: value
        }) 
        localStorage.setItem('currentbg', value)
    }
    
    return (
        <div className='showBackground'>
            {
                imgList.map((item,index)=>{           //这里通过改行内样式，其实可以通过替换类
                 let url = 'url(http://121.196.148.27:9000/background/'+item+')' 
                 let boxShadow = currentbg===item? '5px 5px rgba(145, 241, 145,0.8),-5px 5px rgba(145, 241, 145,0.8),5px -5px rgba(145, 241, 145,0.8),-5px -5px rgba(145, 241, 145,0.8)':''
                 let spanStyle = currentbg===item? {opacity:1,backgroundColor:'rgba(145, 241, 145,0.8)'}:{}
                 return  <div style={{background:url,backgroundSize:'cover',boxShadow:boxShadow}} className='showBackgroundItem' key={index}> <div onClick={(e)=>onChangeBg(e,item)} style={spanStyle}><CheckOutlined /></div></div> 
                })
            }
            
        </div>
    )
}

export default function SetBackground(){

    const { TabPane } = Tabs;
    const [isModalVisible, setIsModalVisible] = useState(false);
 
    const dispatch = useDispatch()
    const state = useSelector(state=>state)
    const cover = state.cover 
    const blur =  state.blur
    const currentbg =  state.currentbg
    const onlineimglist =  state.onlineimglist
    const myimglist =  state.myimglist
      

    let background = 'url(http://121.196.148.27:9000/background/'+currentbg+')'
 
     function onChangeCover(value) {  
      dispatch({
         type: 'CHANGE_COVER',
         cover: value
     })
     localStorage.setItem('cover',value)
     }
     function onChangeBlur(value) {
       dispatch({
         type: 'CHANGE_BLUR',
         blur: value
     })
     localStorage.setItem('blur',value)
     }
     function onAfterChange(value) {
       console.log('onAfterChange: ', value);
     }
 
   const showModal = () => {
     setIsModalVisible(true);
   };
   const handleCancel = () => {
     setIsModalVisible(false);
   };
 
 
     return (
       <>
        <div className='setBackground'>
          <div className='backgroundImg' style={{backgroundImage:background,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}><div onClick={showModal}>更改背景</div></div>
          <div style={{margin:'10px 5px',display:'flex',alignItems:'center'}}><Slider className='backgroundCover' defaultValue={cover} onChange={onChangeCover} onAfterChange={onAfterChange} /><span>遮罩浓度</span></div>
          <div style={{margin:'10px 5px',display:'flex',alignItems:'center'}}><Slider className='backgroundBlur' defaultValue={blur} onChange={onChangeBlur} onAfterChange={onAfterChange} /><span>模糊程度</span></div> 
        </div>
        <Modal title={<div style={{fontSize:'30px',letterSpacing:'10px',marginLeft:'34px'}}>壁纸</div>} width={'910px'}  footer={null} visible={isModalVisible}   onCancel={handleCancel}>
            <Tabs type='card' style={{height:'550px',}} tabPosition='left'>   {/*二级页面左边的标签页*/}
                <TabPane tab={<span>在线壁纸</span>} key='1'>
                    <ShowBackground data={onlineimglist}></ShowBackground>
                </TabPane>
                <TabPane tab={<span>我的壁纸</span>} key='2'>
                    <ShowBackground data={myimglist}></ShowBackground>
                </TabPane>
                <TabPane tab={<span>上传壁纸</span>} key='3'>
                    <UploadImg></UploadImg>
                </TabPane>  
            </Tabs>
        </Modal>
      </>
     )
}

