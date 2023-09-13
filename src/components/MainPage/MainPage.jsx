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
  const [ allTasks, setAllTasks ] = useState([]);
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
    if (isShowCalendar) handleShowTime();
  }

  const handleShowCalendar = () => {
    setIsShowCalendar(!isShowCalendar);

    if (isShowTime) handleShowTime();
  }

  // очистить время
  const handleClearTime = () => {
    setTime({ date: null, time: null })
  }

  const handleSetTime = (data) => {
    setTime({ ...time, time: data.substring(-1, 5) });

    setIsShowTime(false);
  }

  // установка времени
  const handleSetDay = (data) => {
    const day = data.toString().length > 1 ? data : `0${data}`;

    setTime({ ...time, date: `${day}.${month.num}.${year.toString().substring(2, 4)}` });

    setIsShowCalendar(false);
  }

  // очистить значения после добавления задачи
  const handleClearInput = () => {
    setValues({'task': ''});
    handleClearTime();

    if (isShowCalendar) handleShowCalendar();
    if (isShowTime) handleShowTime();
  }

  // удаление задачи
  const handleRemoveTask = (data) => {

    setAllTasks(allTasks.filter(item =>
      item.index !== data.index
    ));
  }

  // добавление новой задачи
  const handleAddTask = (e) => {
    e.preventDefault();

    const index = (allTasks.length + values.task + time.date + time.time)
    setAllTasks([ ...allTasks, {'index': index, 'title': values.task, 'date': time} ]);

    handleClearInput();
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
            value={values.task}
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
                  onClick={() => handleClearTime()}
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
              disabled={(time.date && values.task.length) ? false : true}
              type="submit"
              >
              Add
            </button>
          </div>
        </form>

        <ul className={s.list}>
          {allTasks.map((task) =>
            <Task
              key={`${task?.index}-${task.title}-${task.date.date}-${task.date.time}`}
              data={task}
              handleRemoveTask={handleRemoveTask}
            />
          )}
        </ul>
      </Container>
    </>
  )
}

export default MainPage
