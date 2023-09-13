import s from './Time.module.scss'
import cn from 'classnames';

const Time = ({ isShowTime, handleSetTime }) => {
  const data = [
    '01:00',
    '03:00',
    '05:00',
    '07:00',
    '09:00',
    '11:00',
    '13:00',
    '15:00',
    '17:00',
    '19:00',
    '21:00',
    '23:00'
  ]

  return (
    <ul className={cn(s.time, isShowTime ? s.time_show : '')}>
      {data.map(item =>
        <li
          key={item}
          className={s.hours}
          onClick={() => handleSetTime(item)}>
          {item}
        </li>
      )}
    </ul>
  )
}

export default Time
