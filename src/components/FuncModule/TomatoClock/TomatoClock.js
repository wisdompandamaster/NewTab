import './TomatoClock.css'
import FuncCard from '../../FuncCard/FuncCard'
import FuncModal from '../../FuncModal/FuncModal'
import { memo, useEffect, useState, useRef } from 'react'
import tomato from '../../../asset/Tomato.png'

function TomatoClock(){

    const [isModalVisible, setIsModalVisible] = useState(false);
    const circle = useRef();
    const showModal = () => {
        setIsModalVisible(true);
    };
    let steps = 10;
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    //TODO:学习 canvas requestAnimation useRef 等 hook
    const drawcicle = (steps)=>{
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
        // var steps = 20;
        ctx.clearRect(0, 0, mycanvas.width, mycanvas.height)
        //画圆
        ctx.strokeStyle = "#dddddd"
        ctx.lineWidth = 10;
        ctx.save();
        ctx.beginPath();
        //半径可以根据lineWidth改
        ctx.arc(canvasX, canvasY, 45, 0, Math.PI * 2 , false);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        //画进度环
        ctx.strokeStyle = "#47cab0"
        ctx.lineWidth = 10;
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 45, -Math.PI / 2, -Math.PI /2 + steps * progress, false);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        //绘制字体并指定位置
        ctx.fillStyle = "#000000"; //可改
        ctx.font = "bold 18px Arial"; //可改
        ctx.save();
        //没有考虑文字个数
        ctx.fillText(steps.toFixed(0) + '%', canvasX - 20, canvasY + 10);
    }

    const animate = ()=>{
        window.requestAnimationFrame(function(){
            if(steps < 90) animate();
        })
        steps += 0.5;
        drawcicle(steps);
    }
    useEffect(()=>{
        animate()   
    },[])
  

    return (
        <FuncCard
         title = "番茄时钟"
        >
         <span style={{position:'absolute',top:'5%', right:'5%',display:'flex',alignItems:'center'}}>
         <img width={30} src={tomato}/>
         <span style={{fontSize:'1.2rem',fontWeight:'600',marginLeft:'5px'}}>10</span>
         </span>
         <div style={{height:'100%'}} onClick={showModal}>
            {/* <div className='tomato-work'>
                <div className='tomato-circle'>
                    <div className='tomato-word'>
                        <span>100%</span>
                    </div>
                </div>

            </div> */}
            <div className='circle' style={{height:'75%',border:'0px solid red',display:'flex'}}>
                <canvas ref={circle} width={110} height={110} id='rest-circle' style={{border:'0px solid red'}}> 
                Your browser does not support the canvas element.
                </canvas>
                <div style={{fontSize:'20px',fontWeight:'600',flex:'1',textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
                    <div>任务名</div>
                    <div>倒计时</div>
                    <div>任务番茄数  操作按钮</div>
                </div>
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