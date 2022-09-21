import './TomatoClock.css'
import FuncCard from '../../FuncCard/FuncCard'
import FuncModal from '../../FuncModal/FuncModal'
import { memo, useEffect, useState, useRef } from 'react'

function TomatoClock(){

    const [isModalVisible, setIsModalVisible] = useState(false);
    const circle = useRef();
    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(()=>{
        //获取元素创建画布
        //无法使用document.getElementById()
        var mycanvas = circle.current;
        var ctx = mycanvas.getContext('2d')
        //绘制的准备工作
        //找到画布的中心点
        var canvasX = mycanvas.width / 2;
        var canvasY = mycanvas.height / 2;
        //一圈360度分成100份
        var progress = Math.PI * 2 / 100;
        //指定初始步长
        var steps = 20;
        //画圆
        ctx.strokeStyle = "#dddddd"
        ctx.lineWidth = 10;
        ctx.save();
        ctx.beginPath();
        //半径可以根据lineWidth改
        ctx.arc(canvasX, canvasY, 30, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        //画进度环
        ctx.strokeStyle = "#47cab0"
        ctx.lineWidth = 10;
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 30, -Math.PI / 2, -Math.PI /2 + steps * progress, false);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        //绘制字体并指定位置
        ctx.fillStyle = "#000000"; //可改
        ctx.font = "bold 18px Arial"; //可改
        ctx.save();
        //没有考虑文字个数
        ctx.fillText(steps.toFixed(0) + '%', canvasX - 20, canvasY + 10);
    },[])
  

    return (
        <FuncCard
         title = "番茄时钟"
        >
         <div style={{height:'100%'}} onClick={showModal}>
            {/* <div className='tomato-work'>
                <div className='tomato-circle'>
                    <div className='tomato-word'>
                        <span>100%</span>
                    </div>
                </div>

            </div> */}
            <div className='rest'>
                <canvas ref={circle} id='rest-circle' width={100} height={100} style={{border:'1px solid red'}}> 
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