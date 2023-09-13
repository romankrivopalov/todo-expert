import s from './Calendar.module.scss'
import cn from 'classnames';

const Calendar = ({ year, month, today, calendar, isShowCalendar, handleSetDay }) => {

  return (
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
  )
}

export default Calendar
