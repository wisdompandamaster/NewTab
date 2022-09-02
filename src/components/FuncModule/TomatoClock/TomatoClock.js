import './TomatoClock.css'
import FuncCard from '../../FuncCard/FuncCard'
import FuncModal from '../../FuncModal/FuncModal'
import { memo, useState } from 'react'

function TomatoClock(){

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
  

    return (
        <FuncCard
         title = "番茄时钟"
        >
         <div style={{height:'100%'}} onClick={showModal}>
            <div className='tomato-work'>
                <div className='tomato-circle'>
                    <div className='tomato-word'>
                        <span>100%</span>
                    </div>
                </div>

            </div>
            <div className='rest'>
                <canvas id='rest-circle' width={100} height={100}>
                Your browser does not support the canvas element.
                </canvas>
            </div>
         </div>
        <FuncModal
          title={<div style={{fontSize:'30px',letterSpacing:'10px'}}>设置番茄钟</div>} visible={isModalVisible}  width={'600px'} onCancel={handleCancel}
        >
            
        </FuncModal>
         
        </FuncCard>
    )
} 


export default memo(TomatoClock);