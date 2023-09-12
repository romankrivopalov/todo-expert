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

  useEffect(() => {
    setMonth(dates.getMonth());
    setYear(dates.getYear());
    setToday(dates.getNumDay());
    setCalendar(dates.getAllDaysOfMonth());
    console.log(today)
  }, []);

  const handleShowCalendar = () => {
    setIsShowCalendar(!isShowCalendar);
  }

  const handleSetDay = () => {

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
                type="button" />
              <div className={cn(s.date, isShowCalendar ? s.date_show : '')}>
                <span className={s.month}>{month} {year}</span>
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
                      onClick={handleSetDay}
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
                      onClick={handleSetDay}
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
                      onClick={handleSetDay}
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
                      onClick={handleSetDay}
                      >
                        {day}
                      </li>
                    )}
                  </ul>
                  <ul className={s.row}>
                    {calendar[4] && calendar[4].map(day =>
                      <li
                      key={day}
                      className={cn(s.day, (day < today && day > 7) ? s.day_color_gray : '')}
                      onClick={handleSetDay}
                      >
                        {day}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
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
