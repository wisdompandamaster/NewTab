import './Demos.css';
import { memo, useState } from 'react';
import FuncCard from '../FuncCard/FuncCard';
import FuncModal from '../FuncModal/FuncModal';
import Lottie from 'react-lottie'
import motorbike from '../../asset/motorbike.json';
// import astronaut from '../../asset/astronaut.json';
// import solarsystem from '../../asset/solarsystem.json'

const Demos = ()=>{

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

  //lottie动画设定
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: motorbike,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

    return (
        <FuncCard>
           <div onClick={showModal} style={{display:'flex',justifyContent:'space-evenly',fontSize:"110px",height:"100%",width:"100%",fontWeight:"700",color:"#00000022"}}><div>前</div><div>进</div></div>
          <div style={{height:'100%',width:'100%',background:'#3490dc0',position:'absolute',zIndex:'1'}} onClick={showModal}>
           <Lottie options={defaultOptions}
              height={'120%'}
              width={'100%'}/>
          </div>
          <FuncModal 
            bodyStyle={{padding:'11px'}}
            title={<div style={{fontSize:'25px',fontWeight:'500',letterSpacing:'8px',marginLeft:'24px'}}>前端练习</div>}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={'57vw'}
            >
            <div style={{display:'grid',gridTemplateColumns:'repeat(3, calc(100%/3))', rowGap:'2%',margin:'1% 0 1% 0',height:'20vw',overflowY:'scroll'}}>
               {
                 demoList.map((item,index)=>{
                   return (
                    <a key={index} href={item.src} target='_blank' style={{justifySelf:'center',position:'relative'}}>
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

export default memo(Demos);