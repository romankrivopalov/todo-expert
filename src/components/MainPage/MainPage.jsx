import Container from '../Container/Container.jsx';
import Header from '../Header/Header.jsx';
import s from './MainPage.module.scss';
import cn from 'classnames';

const MainPage = ({ onSignout }) => (
  <>
    <Header onSignout={onSignout} />

    <Container>
      <form className={s.form}>
        <input
          className={s.input}
          type='text'
          placeholder='add task'
        />
        <div className={s.wrapper}>
          <button className={s.btn}>today</button>
          <button className={s.btn}>tomorrow</button>
          <button className={cn(s.btn, s.btn_type_date)}></button>
          <button className={cn(s.btn, s.btn_type_time)}></button>
        </div>
      </form>
    </Container>
  </>
)

export default MainPage
