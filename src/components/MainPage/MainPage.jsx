import { useEffect, useState } from 'react';
import Container from '../Container/Container.jsx';
import Header from '../Header/Header.jsx';
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

  useEffect(() => {

  }, [time])

  const handleShowTime = () => {
    setIsShowTime(!isShowTime);

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

  const handleAddTask = () => {

  }

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setValues((oldValues) =>({ ...oldValues, [name]: value }));
  }

  return (
    <>
      <Header onSignout={onSignout} />

      <Container>
        <form className={s.form}>
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
              <div className={cn(s.date, isShowCalendar ? s.date_show : '')} datatype='calendar'>
                <span className={s.month}>{ month && month.name } {year}</span>
                <div className={s.calendar}>
                  <ul className={s.row}>
                    <li className={s.week}>mo</li>
                    <li className={s.week}>tu</li>
                    <li className={s.week}>we</li>
                    <li className={s.week}>th</li>
                    <li className={s.week}>fr</li>
                    <li className={s.week}>sa</li>
                    <li className={s.week}>su</li>
                  </ul>
                  <ul className={s.row}>
                    {calendar[0] && calendar[0].map(day =>
                      <li
                      key={day}
                      className={cn(s.day, (day < today || day > 7) ? s.day_color_gray : '')}
                      onClick={() => {if (!(day < today || day > 7)) handleSetDay(day)}}
                      >
                        {day}
                      </li>
                    )}
                  </ul>
                  <ul className={s.row}>
                    {calendar[1] && calendar[1].map(day =>
                      <li
                      key={day}
                      className={cn(s.day, day < today ? s.day_color_gray : '')}
                      onClick={() => {if (!(day < today)) handleSetDay(day)}}
                      >
                        {day}
                      </li>
                    )}
                  </ul>
                  <ul className={s.row}>
                    {calendar[2] && calendar[2].map(day =>
                      <li
                      key={day}
                      className={cn(s.day, day < today ? s.day_color_gray : '')}
                      onClick={() => {if (!(day < today)) handleSetDay(day)}}
                      >
                        {day}
                      </li>
                    )}
                  </ul>
                  <ul className={s.row}>
                    {calendar[3] && calendar[3].map(day =>
                      <li
                      key={day}
                      className={cn(s.day, day < today ? s.day_color_gray : '')}
                      onClick={() => {if (!(day < today)) handleSetDay(day)}}
                      >
                        {day}
                      </li>
                    )}
                  </ul>
                  <ul className={s.row}>
                    {calendar[4] && calendar[4].map(day =>
                      <li
                      key={day}
                      className={cn(s.day, (day < today && day < 7) ? s.day_color_gray : '')}
                      onClick={() => {if (!(day < today && day < 7)) handleSetDay(day)}}
                      >
                        {day}
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <ul className={cn(s.time, isShowTime ? s.time_show : '')}>
                <li className={s.hours} onClick={() => handleSetTime('03:00')}>03:00 AM</li>
                <li className={s.hours} onClick={() => handleSetTime('06:00')}>06:00 AM</li>
                <li className={s.hours} onClick={() => handleSetTime('09:00')}>09:00 AM</li>
                <li className={s.hours} onClick={() => handleSetTime('12:00')}>12:00 AM</li>
                <li className={s.hours} onClick={() => handleSetTime('03:00')}>03:00 PM</li>
                <li className={s.hours} onClick={() => handleSetTime('06:00')}>06:00 PM</li>
                <li className={s.hours} onClick={() => handleSetTime('09:00')}>09:00 PM</li>
                <li className={s.hours} onClick={() => handleSetTime('12:00')}>12:00 PM</li>
              </ul>
            </div>
            <button className={cn(s.btn, s.btn_type_submit)}>
              Add
            </button>
          </div>
        </form>
      </Container>
    </>
  )
}

export default MainPage
