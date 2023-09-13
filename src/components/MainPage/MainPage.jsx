import { useEffect, useState } from 'react';
import Container from '../Container/Container.jsx';
import Header from '../Header/Header.jsx';
import Calendar from '../Calendar/Calendar.jsx';
import Time from '../Time/Time.jsx';
import Task from '../Task/Task.jsx';
import Sort from '../Sort/Sort.jsx';
import s from './MainPage.module.scss';
import cn from 'classnames';
import dates from '../../utils/gateDate.js';

const MainPage = ({ onSignout }) => {
  // состояние всех задач
  const [ allTasks, setAllTasks ] = useState(JSON.parse(localStorage.getItem('data')) || []);
  // состояние значения интупа
  const [ values, setValues ] = useState({'task': ''});
  // состояние значения года
  const [ year, setYear ] = useState(null);
  // состояние значения месяца
  const [ month, setMonth ] = useState(null);
  // состояние значения текущей даты
  const [ today, setToday ] = useState(1);
  // состояние значения календаря
  const [ calendar, setCalendar ] = useState([]);
  // состояние значения открытого календаря
  const [ isShowCalendar, setIsShowCalendar ] = useState(false);
  // состояние значения открытого окна выбора времени
  const [ isShowTime, setIsShowTime ] = useState(false);
  // состояние значения выбранного времени
  const [ time, setTime ] = useState({ date: null, time: null });
  // состояние значения элемента для редактирования
  const [ taskForEdit, setTaskForEdit ] = useState(null);

  // получение данных о датах при монтировании компонента
  useEffect(() => {
    setMonth(dates.getMonth());
    setYear(dates.getYear());
    setToday(dates.getNumDay());
    setCalendar(dates.getAllDaysOfMonth());
  }, []);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(allTasks))
  }, [ allTasks ])

  const handleSortTask = () => {

  }

  // показать окно с календарем
  const handleShowTime = () => {
    setIsShowTime(!isShowTime);

    // закрытие окна при повторном нажатии
    if (isShowCalendar) handleShowTime();
  }

  // показать календарь
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

  // очистить значения формы
  const handleClearInput = () => {
    setTaskForEdit(null);
    setValues({'task': ''});
    handleClearTime();

    if (isShowCalendar) handleShowCalendar();
    if (isShowTime) handleShowTime();
  }

  // копирование задачи
  const handleCopyTask = (data) => {
    setValues({'task': data.title});
    setTime({ date: data.date.date, time: data.date.time ? data.date.time : null });
  }

  // редактирование задачи
  const handleEditTask = (data) => {
    setTaskForEdit(data);

    setValues({'task': data.title});
    setTime({ date: data.date.date, time: data.date.time ? data.date.time : null });
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

    // если есть элемент для редактирования
    if (taskForEdit) {
      setAllTasks(
        allTasks.map(task => task.index === taskForEdit.index
          ? {'index': taskForEdit.index, 'title': values.task, 'date': time}
          : task
        )
      )

      handleClearInput();
    } else {
      // генерация уникального индекса
      const index = (allTasks.length + values.task + time.date + time.time)
      setAllTasks([ ...allTasks, {'index': index, 'title': values.task, 'date': time} ]);

      handleClearInput();
    }
  }

  // получение значение из инпута
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
              {!taskForEdit ? "Add" : "Save"}
            </button>
          </div>
        </form>

        {allTasks.length > 1 && <Sort handleSortTask={handleSortTask} />}

        <ul className={s.list}>
          {allTasks.map((task) =>
            <Task
              key={`${task?.index}-${task.title}-${task.date.date}-${task.date.time}`}
              data={task}
              handleRemoveTask={handleRemoveTask}
              handleCopyTask={handleCopyTask}
              handleEditTask={handleEditTask}
              handleClearInput={handleClearInput}
            />
          )}
        </ul>
      </Container>
    </>
  )
}

export default MainPage
