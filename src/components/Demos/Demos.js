import './Demos.css';
import { useState } from 'react';
import FuncCard from '../FuncCard/FuncCard';
import FuncModal from '../FuncModal/FuncModal';

export default function Demos(){

    const demoList = [
    {name:'parallax', imgPath:'https://minio.wisdompanda.com/newtabimg/demoimg/mydemo_parallax.png', src:'https://wisdompanda.com/demo/parallax/'},
    {name:'弹幕墙', imgPath:'https://minio.wisdompanda.com/newtabimg/demoimg/bulletscreen.png', src:'https://wisdompanda.com/demo/bulletscreen/'},
    {name:'parallax', imgPath:'https://minio.wisdompanda.com/newtabimg/demoimg/mydemo_parallax.png', src:'https://wisdompanda.com/demo/parallax/'},
    {name:'parallax', imgPath:'https://minio.wisdompanda.com/newtabimg/demoimg/mydemo_parallax.png', src:'https://wisdompanda.com/demo/parallax/'}]

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
  // const [persistedTodoList] = us

    return (
        <FuncCard>
           <div onClick={showModal} style={{fontSize:"30px", height:"120px",width:"100%",textAlign:"center",lineHeight:"110px",fontWeight:"700",color:"#00000033",letterSpacing:"8px"}}>一些前端Demo</div>
          <FuncModal 
            bodyStyle={{padding:'11px'}}
            title={<div style={{fontSize:'25px',fontWeight:'500',letterSpacing:'8px',marginLeft:'24px'}}>前端Demo</div>}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={'57vw'}
            >
            <div style={{display:'grid',gridTemplateColumns:'repeat(3, calc(100%/3))', rowGap:'2%',margin:'1% 0 1% 0',height:'20vw',overflowY:'scroll'}}>
               {
                 demoList.map((item)=>{
                   return (
                    <a href={item.src} target='_blank' style={{justifySelf:'center',position:'relative'}}>
                     <div className='demo'><div>{item.name}</div></div>
                     <img src={item.imgPath} style={{width:'340px',height:'180px',borderRadius:'20px'}}>
                     </img>
                    </a>
                   )
                 })
               }
            </div>
        </FuncModal>
        </FuncCard>
    )
}