import { useState } from 'react';
import Calendar from 'react-calendar';
import './CalComponent.css';
import {useSelector, useDispatch} from 'react-redux';
import useLocalStorage from "../../hooks/useLocalStorage";
import FuncCard from '../FuncCard/FuncCard';

export const accessWeekday = {
    "0": "星期日",
    "1": "星期一",
    "2": "星期二",
    "3": "星期三",
    "4": "星期四",
    "5": "星期五",
    "6": "星期六"
}

function CalComponent() {

  const [date, setDate] = useState(new Date());
  const TodoDates = useSelector(state=>state.TodoDates)
  const dispatch = useDispatch()

  const handleTodoDatePos = (date)=>{
     let TodoDatePos = date.getFullYear() + '/'+ (date.getMonth() + 1) + '/' + date.getDate()
     dispatch({
      type: 'CHANGE_TODODATEPOS',
      TodoDatePos: TodoDatePos
     })
  }

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
            <div className='cal-left'>
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
                    tileContent={({ activeStartDate, date, view }) => view === 'month' && (TodoDates.includes(date.getFullYear() + '/'+ (date.getMonth() + 1) + '/' + date.getDate())) ? <div className='todo'></div> : null}
                    locale="en-GB"
                    onChange={setDate} value={date} 
                    onClickDay={(date, event) => handleTodoDatePos(date)}
                />
            </div>
      </FuncCard>
    </>
  );
}

export default CalComponent;