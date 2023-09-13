import { useState } from 'react';
import s from './Task.module.scss';
import cn from 'classnames';

const Task = ({
  data,
  handleRemoveTask,
  handleCopyTask,
  handleEditTask,
  handleClearInput
}) => {
  const [ isCompliteTask, setIsCompliteTask ] = useState(false);
  const [ isActiveCopyBtn, setIsActiveCopyBtn ] = useState(true);
  const [ isActiveEditBtn, setIsActiveEditBtn ] = useState(true);

  // переключение состояния кнопки копирования
  const handleTogleStateCopyBtn = () => {
    setIsActiveCopyBtn(isActiveCopyBtn ? false : true);

    if (isActiveCopyBtn) {
      handleCopyTask(data)
    } else { handleClearInput() }
  }

  // переключение состояния кнопки редактирования
  const handleTogleStateEditBtn = () => {
    setIsActiveEditBtn(isActiveEditBtn ? false : true);

    if (isActiveEditBtn) {
      handleEditTask(data)
    } else { handleClearInput() }
  }

  // переключение чекбокса
  const handleToggleChecbox = () => {
    // переключение состояния выполненной задачи
    setIsCompliteTask(!isCompliteTask);

    setIsActiveEditBtn(true);
    setIsActiveCopyBtn(true);
    handleClearInput()
  }

  return (
    <li className={s.task}>
      <input
        id={`item-checkbox-${data.title}-${data.date.date}-${data.date.time}`}
        type="checkbox"
        checked={isCompliteTask}
        onChange={() => handleToggleChecbox()}
        className={s.checkbox}
      />
      <label
        htmlFor={`item-checkbox-${data.title}-${data.date.date}-${data.date.time}`}
        className={s.checkbox__label}
      />
      <div className={s.content}>
        <input
          className={s.input}
          value={data.title}
          type="text"
          disabled
        />
        <div className={s.wrapper}>
          <span className={s.date}>
            {data.date.date}{data.date.time && `: ${data.date.time}`}
          </span>
          <div className={s.btns}>
            <button
              disabled={isCompliteTask}
              className={cn(s.btn, s.btn_type_copy, (!isActiveCopyBtn ? s.btn_active_copy : ''))}
              onClick={() => handleTogleStateCopyBtn()}
            />
            <button
              disabled={isCompliteTask}
              className={cn(s.btn, s.btn_type_edit, (!isActiveEditBtn ? s.btn_active_edit : ''))}
              onClick={() => handleTogleStateEditBtn()}
            />
            <button
              disabled={isCompliteTask}
              className={cn(s.btn, s.btn_type_delete)}
              onClick={() => handleRemoveTask(data)}
            />
          </div>
        </div>
      </div>
    </li>
  )
}

export default Task
