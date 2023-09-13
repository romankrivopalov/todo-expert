import { useState } from 'react';
import s from './Task.module.scss';
import cn from 'classnames';

const Task = ({ data, handleRemoveTask, handleEditTask, handleClearInput }) => {
  const [ isCompliteTask, setIsCompliteTask ] = useState(false);
  const [ isActiveEditBtn, setIsActiveEditBtn ] = useState(true);
  const [ isDisabledInput, setIsDisabledInput ] = useState(true);

  // переключение состояния инпута
  const handleToggleDisabledInput = (value) => {
    setIsDisabledInput(value ? value : !isDisabledInput);
  }

  // переключение состояния кнопки редактирования
  const handleTogleStateEditBtn = () => {
    setIsActiveEditBtn(isDisabledInput ? false : true);

    if (isDisabledInput) {
      handleEditTask(data)
    } else {handleClearInput()}

    handleToggleDisabledInput();
  }

  // переключение чекбокса
  const handleToggleChecbox = () => {
    setIsCompliteTask(!isCompliteTask);
    handleToggleDisabledInput(true);
    setIsActiveEditBtn(true);
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
              className={cn(s.btn, s.btn_type_copy)}
            />
            <button
              disabled={isCompliteTask}
              className={cn(s.btn, s.btn_type_edit, (!isActiveEditBtn ? s.btn_active : ''))}
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
