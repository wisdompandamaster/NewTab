import './TomatoClock.css'
import FuncCard from '../../FuncCard/FuncCard'
import FuncModal from '../../FuncModal/FuncModal'
import { memo, useEffect, useState, useRef } from 'react'
import { Tag, Progress, InputNumber, Input, Form, Button } from 'antd'
import { PlayCircleOutlined, PauseCircleOutlined, RedoOutlined, CheckCircleTwoTone, CheckCircleOutlined, SyncOutlined, DeleteFilled, TranslationOutlined, CheckOutlined } from '@ant-design/icons'
import tomato from '../../../asset/Tomato.png'
import audio1 from '../../../asset/work.mp3'
import FormItem from 'antd/lib/form/FormItem'

//直接使用progress组件

function TomatoClock(){

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [studyTime, setStudyTime] = useState(25)
    const [restTime, setRestTime] = useState(5)
    const [time, setTime] = useState(studyTime)
    const [item, setItem] = useState({name:'一个番茄', round:1})
    const [count, setCount] = useState(time*60)    //倒计时
    const [isWork, setIsWork] = useState(true)       //是否是工作时间
    const [currentRound, setCurrentRound] = useState(0)  //目前第几个番茄钟
    const [roundDone, setRoundDone] = useState(false)    //一轮专注和休息是否结束


    //获取dom画canvas
    // const circle = useRef();

    //方便清除定时器
    const timer = useRef();

    useEffect(()=>{
        // animate();
        setCount(time*60)
    },[item])

    useEffect(()=>{
        setCount(studyTime*60)
        setTime(studyTime)
    },[studyTime,restTime])

    useEffect(()=>{
        setCount(time*60)
    },[time])


    const showModal = () => {
        setIsModalVisible(true);
    };
     
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //TODO:学习 canvas requestAnimation useRef 等 hook
    // const drawcicle = (steps)=>{
    //      //获取元素创建画布
    //     //无法使用document.getElementById()
    //     var mycanvas = circle.current;
    //     var ctx = mycanvas.getContext('2d')
    //     //绘制的准备工作
    //     //找到画布的中心点
    //     var canvasX = mycanvas.width / 2;
    //     var canvasY = mycanvas.height / 2;
    //     //一圈360度分成100份
    //     var progress = Math.PI * 2 / 100;
    //     //指定初始步长
    //     // var steps = 20;
    //     ctx.clearRect(0, 0, mycanvas.width, mycanvas.height)
    //     //画圆
    //     ctx.strokeStyle = "#dddddd"
    //     ctx.lineWidth = 10;
    //     ctx.save();
    //     ctx.beginPath();
    //     //半径可以根据lineWidth改
    //     ctx.arc(canvasX, canvasY, 45, 0, Math.PI * 2 , false);
    //     ctx.stroke();
    //     ctx.closePath();
    //     ctx.restore();
    //     //画进度环
    //     ctx.strokeStyle = roundDone ? "#ff000077":"#47cab0"
    //     ctx.lineWidth = 10;
    //     ctx.save();
    //     ctx.beginPath();
    //     ctx.arc(canvasX, canvasY, 45, -Math.PI / 2, -Math.PI /2 + steps * progress, false);
    //     ctx.stroke();
    //     ctx.closePath();
    //     ctx.restore();
    //     //绘制字体并指定位置
    //     ctx.fillStyle = "#000000"; //可改
    //     ctx.font = "bold 18px Arial"; //可改
    //     ctx.save();
    //     //没有考虑文字个数
    //     // ctx.fillText(steps.toFixed(0) + '%', canvasX - 20, canvasY + 10);
    //     ctx.fillText(String(Math.floor((count / 60 % 60))).padStart(2,'0') + ' : ' + String((count % 60)).padStart(2,'0'), canvasX - 28, canvasY + 10);

    // }

    //FIXME: 使用requestAnimationFrame有大bug，一拖动就会疯狂报错，还有画的太频繁了，造成卡顿
    // const animate = ()=>{
    //     let steps = Math.floor(((studyTime - count)/studyTime)*100)
    //     // let frame = window.requestAnimationFrame(function(){
    //     //     if(steps < 20 && steps >= 0){
    //     //         animate();
    //     //     }else{
    //     //         cancelAnimationFrame(frame);
    //     //     }
    //     // })
    //     // // steps += 0.5;
    //     // console.log(steps);
    //     drawcicle(steps);
    // }

    //番茄倒计时开始
    
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
                    //    setItem({...item,time:isWork ? 5:10})
                       setTime(isWork? restTime:studyTime)
                    }
                }
                return count - 1
                }
            );

        }, 1000);
    }

    //番茄倒计时暂停
    const onStopCount = (e)=>{
        e.stopPropagation();
        clearInterval(timer.current)
    }

    //番茄倒计时重置(只是当时一轮倒计时)
    const onReDoCount = (e)=>{
        e.stopPropagation();
        clearInterval(timer.current);
        setCount(time*60);

        //测试用
        // setIsWork(!isWork);
        // setRoundDone(!roundDone);
        // setCurrentRound(currentRound=>(currentRound) % 3 + 1)
    }
    
    //删除某个番茄钟任务
    const onDeleteCount = (e)=>{
        e.stopPropagation();
    } 

    //数字框change
    // const onNumberChange = (value)=>{
    //     console.log(e)
    // }
    
    const SetTomatoClock = (props)=>{

        const {setTomatoItem} = props

        const createItem = (values)=>{
            // console.log(values);
            setTomatoItem(values);
        }

        return (
            <div style={{fontSize:'1.2rem',fontWeight:'600',display:'flex',justifyContent:'center'}}>
            <Form 
              style={{border:'0px solid red',padding:'20px 20px 0 20px',background:'#fff5',borderRadius:'10px',flex:'1',marginRight:'10px'}} 
              onFinish={createItem}
            >
            <FormItem label={<div style={{fontSize:'1.2rem'}}>任务名</div>} name="name" 
            rules={[
                {
                  required: true,
                },
              ]}
            >
                <Input bordered={false} placeholder="输入任务名" style={{width:'100%',borderBottom:'0px solid blue',fontSize:'1rem',background:'#0002'}}/>
            </FormItem>
            <FormItem label={<div style={{fontSize:'1.2rem'}}>番茄钟数</div>} name="round" initialValue={3}>
                <InputNumber bordered={false} style={{background:'#0002'}}/>
            </FormItem>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    创建任务
                </Button>
            </Form.Item>
            </Form>
            <div style={{display:'flex',flexDirection:'column',padding:'0 20px',borderRadius:'10px',background:'#fff5',justifyContent:'center'}}> 
              <div style={{marginBottom:'20%'}}>
               {'专注时间 '} 
              <InputNumber style={{background:'#0002',marginLeft:'10px'}} bordered={false} defaultValue={studyTime} onChange={(value)=>{setStudyTime(value);setIsWork(true);setCurrentRound(0)}} />
              </div>
              <div>
               {'休息时间 '}
              <InputNumber style={{background:'#0002',marginLeft:'10px'}} bordered={false} defaultValue={restTime} onChange={(value)=>{setRestTime(value);setIsWork(true);setCurrentRound(0)}} />
              </div>
            </div>
            </div>
           
        )
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
                
                {/* <canvas ref={circle} width={110} height={110} id='rest-circle' style={{borderRight:'0px solid #ff000055'}}> 
                Your browser does not support the canvas element.
                </canvas> */}
                <Progress
                    width={110}
                    strokeWidth={8}
                    style={{border:'0px solid red',transform:'translateX(15%)',marginTop:'2.5%'}}
                    type="circle"
                    //渐变颜色
                    // strokeColor={{
                    //         '0%': '#108ee9',
                    //         '100%': '#87d068',
                    // }}
                    percent={Math.floor(((time*60 - count)/(time*60))*100)}
                    format={(percent)=>{
                        if(percent < 100){
                            return <span style={{fontWeight:'600'}}>{String(Math.floor((count / 60 % 60))).padStart(2,'0') + ' : ' + String((count % 60)).padStart(2,'0')}</span>
                        }else{
                            return <span style={{fontSize:'36px'}}><CheckOutlined /></span>
                        }
                    }}

                />
                <div style={{fontSize:'20px',fontWeight:'600',flex:'1',padding:'1% 0',textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'space-around',border:'0px solid red'}}>
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
                    <span className='tomato_icon' onClick={onDeleteCount}> 
                       <DeleteFilled />
                    </span>
                    </div>
                </div>
            </div>
         </div>
        <FuncModal
          title={<div style={{fontSize:'30px',letterSpacing:'10px'}}>设置番茄钟</div>} visible={isModalVisible}  width={'600px'} onCancel={handleCancel}
        >
            <SetTomatoClock setTomatoItem={setItem}/>
        </FuncModal>
         
        </FuncCard>
    )
} 


export default memo(TomatoClock);