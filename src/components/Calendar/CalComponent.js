import { useState } from 'react';
import Calendar from 'react-calendar';
import './CalComponent.css';
import {useSelector, useDispatch} from 'react-redux'

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

   
  return (
    <>
      <div className='cal'>
            <div className='cal-left'>
                <div className='cal-header'>
                    <div className='cal-icon'></div>
                    <div className='cal-title'>日历</div>
                </div>
                <div className='cal-date-container'>
                    <div className='cal-weekday'>{accessWeekday[date.getDay()]}</div>
                    <div className='cal-date'>{date.getDate()}</div>
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
      </div>
    </>
  );
}

export default CalComponent;