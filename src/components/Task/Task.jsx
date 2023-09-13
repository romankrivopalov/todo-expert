import { useState } from 'react';
import s from './Task.module.scss';
import cn from 'classnames';

const Task = ({ value }) => {
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
      <input type="checkbox" checked={isCompliteTask} className={s.checkbox} />
      <label className={s.checkbox__label} onClick={handleToggleChecbox}></label>
      <div className={s.content}>
        <input className={s.input} disabled={isDisabledInput} value={value} type="text" />
        <div className={s.wrapper}>
          <span className={s.date}>
            14.08.23 : 15:00
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
            />
          </div>
        </div>
      </div>
    </li>
  )
}

export default Task
