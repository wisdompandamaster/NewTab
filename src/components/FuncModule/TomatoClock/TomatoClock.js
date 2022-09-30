import './TomatoClock.css'
import FuncCard from '../../FuncCard/FuncCard'
import FuncModal from '../../FuncModal/FuncModal'
import { memo, useEffect, useState, useRef } from 'react'
import { Tag, Progress } from 'antd'
import { PlayCircleOutlined, PauseCircleOutlined, RedoOutlined, CheckCircleTwoTone, CheckCircleOutlined, SyncOutlined, DeleteFilled } from '@ant-design/icons'
import tomato from '../../../asset/Tomato.png'
import audio1 from '../../../asset/work.mp3'

//canvas 绘画版本的进度

function TomatoClock(){

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [item, setItem] = useState({name:'任务名', round:1, time:10})
    const [count, setCount] = useState(item.time)
    const [isWork, setIsWork] = useState(true)
    const [currentRound, setCurrentRound] = useState(0)
    const [roundDone, setRoundDone] = useState(false)
    const circle = useRef();
    const timer = useRef();

    useEffect(()=>{
        animate();
        setCount(item.time)
    },[item])

    

    useEffect(()=>{
        animate();
    },[count])

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
        ctx.strokeStyle = roundDone ? "#ff000077":"#47cab0"
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
        // ctx.fillText(steps.toFixed(0) + '%', canvasX - 20, canvasY + 10);
        ctx.fillText(String(Math.floor((count / 60 % 60))).padStart(2,'0') + ' : ' + String((count % 60)).padStart(2,'0'), canvasX - 28, canvasY + 10);

    }
    //FIXME:还有大bug，使用requestAnimationFrame一拖动就会疯狂报错，还有画的太频繁了
    const animate = ()=>{
        let steps = Math.floor(((item.time - count)/item.time)*100)
        // let frame = window.requestAnimationFrame(function(){
        //     if(steps < 20 && steps >= 0){
        //         animate();
        //     }else{
        //         cancelAnimationFrame(frame);
        //     }
        // })
        // // steps += 0.5;
        // console.log(steps);
        drawcicle(steps);
    }
    //倒计时
    // animate();
    const onStartCount = (e)=>{

        e.stopPropagation();
        // let workaudio = new Audio(' work.mp3')
        // workaudio.load();
        // workaudio.play();
        clearInterval(timer.current)
        timer.current = setInterval(function(){
            //异步更新时，需要在setState()中传入函数来调用前一个state值
            //这里因为是异步，没办法实时读取同一次里setstate的更新
            setCount(count => {
                if(count <= 1){
                    clearInterval(timer.current);

                    if(currentRound == item.round && !isWork){
                        setRoundDone(true);
                    }
                    //这里增加目前轮数
                    if(isWork && currentRound < item.round){
                        setCurrentRound(currentRound=>currentRound + 1)
                    }
                    
                    //这里进行休息和学习状态的切换
                    
                    //在一个番茄钟结束时就不自动更新倒计时
                    if(!(currentRound == item.round && !isWork)){
                       setIsWork(!isWork);
                       setItem({...item,time:isWork ? 5:10})
                    }
                    
                }
                return count - 1
                }
            );

        }, 1000);
    }

    const onStopCount = (e)=>{
        e.stopPropagation();
        clearInterval(timer.current)
    }

    const onReDoCount = (e)=>{
        e.stopPropagation();
        clearInterval(timer.current);
        setCount(item.time);

        //测试用
        // setIsWork(!isWork);
        // setRoundDone(!roundDone);
        // setCurrentRound(currentRound=>(currentRound) % 3 + 1)
    }
    
    return (
        <FuncCard
         title = "番茄时钟"
        >
         <span style={{position:'absolute',top:'5%', right:'5%',display:'flex',alignItems:'center'}}>
         <img width={30} src={tomato}/>
         <span style={{fontSize:'1.2rem',fontWeight:'600',marginLeft:'5px'}}>10</span>
         </span>
         <div style={{height:'100%', padding:'0 5%'}} onClick={showModal}>
            <div className='circle' style={{height:'75%',border:'0px solid red',display:'flex'}}>
                <canvas ref={circle} width={110} height={110} id='rest-circle' style={{borderRight:'0px solid #ff000055'}}> 
                Your browser does not support the canvas element.
                </canvas>
                {/* <Progress
                    type="circle"
                    strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                    }}
                    percent={Math.floor(((item.time - count)/item.time)*100)}
                /> */}
                <div style={{fontSize:'20px',fontWeight:'600',flex:'1',padding:'1% 0',textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
                    <div style={{textDecoration:roundDone ? 'line-through':'none',color:roundDone ? "#00000066":""}}>
                        {item.name}
                    </div>
                    {/* <div>
                        {String(Math.floor((count / 60 % 60))).padStart(2,'0') + ' : ' + String((count % 60)).padStart(2,'0')}
                    </div> */}
                    <div>
                    <Tag style={{marginRight:'10px'}} color="#ff000055" >{currentRound} / {item.round}</Tag>
                    <Tag color="green" style={{display:isWork ? "none":"inline-block", marginRight:'0'}}>休息</Tag>
                    <Tag 
                    // icon={<SyncOutlined spin />} 
                     color="red"style={{display:isWork ? "inline-block":"none", marginRight:'0'}}>学习</Tag>
                    </div>
                    
                    <div style={{display:roundDone ? 'none':'flex', alignItems:'center',justifyContent:'space-around', width:'60%', margin:'0 auto',cursor:'pointer',userSelect:'none'}}>
                    <span className='tomato_icon' onClick={onStartCount}> 
                       <PlayCircleOutlined /> 
                    </span>
                    <span className='tomato_icon' onClick={onStopCount}> 
                       <PauseCircleOutlined /> 
                    </span>
                    <span className='tomato_icon' onClick={onReDoCount}> 
                       <RedoOutlined />
                    </span>
                    </div>
                    <div style={{display:roundDone ? 'inline-block':'none'}}>
                    {/* <Tag icon={<CheckCircleTwoTone twoToneColor="#52c41a"/>} style={{margin:'0',width:'100px'}} color="success">已完成</Tag>
                    <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize:'28px',
                      display:roundDone ? "inline-block":"none"}}/>
                    <CheckCircleOutlined style={{fontSize:'28px',
                      display:roundDone ? "inline-block":"none", color:'#52c41a'}}/> */}
                      <span className='tomato_icon' onClick={onReDoCount}> 
                       <DeleteFilled />
                    </span>
                    </div>
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