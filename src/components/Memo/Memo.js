import './Memo.css'
import FuncCard from '../FuncCard/FuncCard'
import FuncModal from '../FuncModal/FuncModal'
import { memo,useState } from 'react'

const Memo = ()=>{

    
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

    return (
        <FuncCard
          title="备忘录"
        >
        <div onClick={showModal}>
          Hello
        </div>

        <FuncModal
          bodyStyle={{padding:'11px'}}
          title={<div style={{fontSize:'25px',fontWeight:'500',letterSpacing:'8px',marginLeft:'24px'}}>备忘录</div>}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={'30vw'}
        >

        </FuncModal>
        </FuncCard>
    )
}

export default memo(Memo);