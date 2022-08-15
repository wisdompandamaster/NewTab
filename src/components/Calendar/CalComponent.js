import { useState,memo } from 'react';
import Calendar from 'react-calendar';
import './CalComponent.css';
import {useSelector, useDispatch} from 'react-redux';
import useLocalStorage from "../../hooks/useLocalStorage";
import FuncCard from '../FuncCard/FuncCard';
import FuncModal from '../FuncModal/FuncModal';
import GitHubCalendar from 'react-github-calendar';
import ActivityCalendar from 'react-activity-calendar';
import { Solar, Lunar, HolidayUtil, SolarWeek, SolarUtil } from 'lunar-javascript';

export const accessWeekday = {
    "0": "星期日",
    "1": "星期一",
    "2": "星期二",
    "3": "星期三",
    "4": "星期四",
    "5": "星期五",
    "6": "星期六"
}

// const {Solar, Lunar, HolidayUtil} = require('lunar-javascript')

function CalComponent() {

  const [date, setDate] = useState(new Date());
  const TodoDates = useSelector(state=>state.TodoDates)
  const dispatch = useDispatch()

   //获取日期
  let year = date.getFullYear() 
  let month = (date.getMonth() + 1)  
  let day = date.getDate() 
  let l = Lunar.fromDate(date); //获取每日其它信息
  let s = Solar.fromDate(date);
  let lh = l.getFestivals().concat(l.getOtherFestivals());
  let sh = s.getFestivals().concat(s.getOtherFestivals());
  let i = lh.concat(sh); //阳历和阴历的各种信息
  let sw = SolarWeek.fromDate(date,1).getIndexInYear(); //本年第几周
  let sd = SolarUtil.getDaysInYear(year, month, day);  //本年第几天
  let ygz = l.getYearInGanZhi(); //年干支
  let mgz = l.getMonthInGanZhi(); //月干支
  let dgz = l.getDayInGanZhi(); //地干支
  let yx = l.getYueXiang(); //月相
  let wh = l.getWuHou(); //物候
  let jqwh = l.getHou(); //节气 + 第几候
  
  const handleTodoDatePos = (date)=>{
     let TodoDatePos = date.getFullYear() + '/'+ (date.getMonth() + 1) + '/' + date.getDate()
     dispatch({
      type: 'CHANGE_TODODATEPOS',
      TodoDatePos: TodoDatePos
     })
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
  // const [persistedTodoList] = useLocalStorage(   
  //   "todoList",
  //    []
  // );
  // 从localstorage获得待办事项数据
  // const [todos] = useState(persistedTodoList);
   
   
  return (
    <>
      <FuncCard
      title='日历'
      // className='cal'
      iconStyle={{
        background: 'linear-gradient(180deg, #FF6D90 14.58%, #FF3131 100%)',
        boxShadow: '0px 3px 6px rgba(255, 55, 55, 0.8)'
      }}
      >
            <div className='cal-left' onClick={showModal}>
                {/* <div className='cal-header'>
                    <div className='cal-icon'></div>
                    <div className='cal-title'>日历</div>
                </div> */}
                <div className='cal-date-container'>
                    <div className='cal-weekday'>{accessWeekday[date.getDay()]}</div>
                    <div className='cal-date'>{date.getDate()}</div>
                    {/* 待办事项存在与否时两种不同的显示： */}
                    {TodoDates.indexOf(date.getFullYear() + '/'+ (date.getMonth() + 1) + '/' + date.getDate()) === -1 
                    &&(
                    <div className='cal-todo-container'>
                      <div className='cal-todo-none'>今日无待办事项</div>
                    </div>)
                    ||(
                    <div className='cal-todo-container'>
                      <div className='cal-icon2'/>
                      <div className='cal-todo-exist'>
                        待办未完成
                        {/* 获得待办事项名称： */}
                        {/* {todos[TodoDates.indexOf(date.getFullYear() + '/'+ (date.getMonth() + 1) + '/' + date.getDate())].text} */}
                      </div>
                    </div>)}
                </div>            
            </div>
            <div className='cal-right'>
                <Calendar
                    tileContent={({ activeStartDate, date, view }) => 
                    // view === 'month' && 
                    (TodoDates.includes(date.getFullYear() + '/'+ (date.getMonth() + 1) + '/' + date.getDate())) ? <div className='todo'></div> : null}
                    locale="en-GB"
                    tileClassName="cal-item"
                    onChange={setDate} value={date} 
                    onClickDay={(date, event) => handleTodoDatePos(date)}
                />
            </div>
      </FuncCard>
      <FuncModal 
        bodyStyle={{padding:'11px'}}
        title={<div style={{fontSize:'25px',fontWeight:'500',letterSpacing:'8px',marginLeft:'24px'}}>日历</div>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={'50vw'}
      >
        <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <Calendar
             className="cal-detail"
             tileClassName="cal-detail-item"
             tileContent={({ activeStartDate, date, view }) => {
              if(view == 'month'){
              let year = date.getFullYear().toString()
              let month = (date.getMonth() + 1).toString() 
              let day = date.getDate().toString()
              let d = HolidayUtil.getHoliday(year, month, day);  //获取法定节假日
              let s = Solar.fromDate(date);
              let l = Lunar.fromDate(date);  
              let l_holidays = l.getFestivals()  //获取阴历节日
              let s_holidays = s.getFestivals()  //获取阳历节日
              let i_holidays = l_holidays.concat(s_holidays);
              let lunar = <div style={{color:'black'}}>{l.getDayInChinese()}</div>  //获取农历
              let jq = l.getJieQi()
              let n = i_holidays.length === 0 ? "" : i_holidays[0].replace('万圣节前夜','万圣夜') //切换农历和节日，替换(万圣节前夜 为 万圣夜 如果有的话)
              // let h = d ? (d.getTarget() == date ? <div style={{color:'#f74e4e'}}>{d.getName()}</div>:""):''

              return (
                <div style={{fontSize:'15px',fontWeight:'700',color:'#f74e4e',width:'98%', 
                overflow: 'hidden'}}>
                  {/* 节气 > 节日 > 阴历 */}
                  {jq||n||lunar}   
                  {
                    d ? (d.isWork() ? <div className="is-work work">班</div>:(<div className="is-work">休</div>)) : ""
                  }
                  
                </div>
              )
                } 
             }}
             onChange={setDate} value={date}
        />
        <div style={{width:'39%',flex:'1', marginBottom: '2%',borderRadius:'10px',background:"#f0f0f088"}}>
          <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
            <div className='date-order'>
              本年第 <span> {sw} </span> 周，第 <span> {sd} </span> 天
            </div>
            <hr/>
            <div className='date-info'>
              <span>节日</span>
              {i.map((item,index)=>{
                return (
                  <span key={index}>{item}</span>
                )
              })}
            </div>
            <div className='date-info'>
              <span>干支</span>
              <span>{ygz + '(年)'}</span><span>{mgz + '(月)'}</span><span>{dgz + '(日)'}</span>
            </div>
            <div className='date-info'>
              <span>月相</span>
              <span>{yx+'月'}</span>
            </div>
            <div className='date-info'>
              <span>节气 物候</span>
              <span>{jqwh}</span><span>{wh}</span>
            </div>
          </div>
        </div>
        </div>
        <hr/>
        <div style={{fontSize:'20px',fontWeight:'700',color:'#0005',margin:'1% 0 2% 0'}}>GitHub 贡献墙</div>
        <GitHubCalendar username="wisdompandamaster" />
           {/* <GitHubCalendar username="peng-zhihui" /> */}
        </div>
      </FuncModal>
    </>
  );
}

export default memo(CalComponent);