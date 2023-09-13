import { useEffect, useState } from 'react';
import Container from '../Container/Container.jsx';
import Header from '../Header/Header.jsx';
import Calendar from '../Calendar/Calendar.jsx';
import Time from '../Time/Time.jsx';
import Task from '../Task/Task.jsx';
import s from './MainPage.module.scss';
import cn from 'classnames';
import dates from '../../utils/gateDate.js';

const MainPage = ({ onSignout }) => {
  const [ values, setValues ] = useState({'task': ''});
  const [ year, setYear ] = useState(null);
  const [ month, setMonth ] = useState(null);
  const [ today, setToday ] = useState(1);
  const [ calendar, setCalendar ] = useState([]);
  const [ isShowCalendar, setIsShowCalendar ] = useState(false);
  const [ isShowTime, setIsShowTime ] = useState(false);
  const [ time, setTime ] = useState({ date: null, time: null });

  useEffect(() => {
    setMonth(dates.getMonth());
    setYear(dates.getYear());
    setToday(dates.getNumDay());
    setCalendar(dates.getAllDaysOfMonth());
  }, []);

  // показать окно с календарем
  const handleShowTime = () => {
    setIsShowTime(!isShowTime);

    // закрытие окна при повторном нажатии
    if (isShowCalendar) {
      handleShowTime();
    }
  }

  const handleShowCalendar = () => {
    setIsShowCalendar(!isShowCalendar);

    if (isShowTime) {
      handleShowTime();
    }
  }

  const handleSetTime = (data) => {
    setTime({ ...time, time: data.substring(-1, 5) });

    setIsShowTime(false);
  }

  const handleSetDay = (data) => {
    const day = data.toString().length > 1 ? data : `0${data}`;

    setTime({ ...time, date: `${day}.${month.num}.${year.toString().substring(2, 4)}` });

    setIsShowCalendar(false);
  }

  const handleAddTask = (e) => {
    e.preventDefault();

    console.log(values)
  }

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setValues((oldValues) =>({ ...oldValues, [name]: value }));
  }

  return (
    <>
      <Header onSignout={onSignout} />

      <Container>
        <form className={s.form} onSubmit={handleAddTask}>
          <input
            className={s.input}
            name="task"
            type="text"
            onChange={handleChange}
            placeholder="add task"
          />
          <div className={s.container}>
            <div className={s.wrapper}>
              <button
                className={cn(s.btn, s.btn_type_date)}
                onClick={handleShowCalendar}
                type="button" />
              <button
                className={cn(s.btn, s.btn_type_time)}
                onClick={handleShowTime}
                type="button" />
              {(time.date || time.time) &&
                <button
                  className={s.btn}
                  type='button'
                >
                  {time.date} {time.date && time.time ? ':' : ''} {time.time}
                </button>
              }

              <Calendar
                year={year}
                month={month}
                today={today}
                calendar={calendar}
                isShowCalendar={isShowCalendar}
                handleSetDay={handleSetDay}
              />

              <Time
                isShowTime={isShowTime}
                handleSetTime={handleSetTime}
              />

            </div>
            <button
              className={cn(s.btn, s.btn_type_submit)}
              disabled={time.date ? false : true}
              type="submit"
              >
              Add
            </button>
          </div>
        </form>

        <ul className={s.list}>
          <Task value={'test task name and'} />
        </ul>
      </Container>
    </>
  )
}

export default MainPage
