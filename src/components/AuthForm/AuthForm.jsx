import { Link, useLocation } from 'react-router-dom';
import s from './AuthForm.module.scss';
import cn from 'classnames';

const AuthForm = ({children, btnText, onSubmit}) => {
  const { pathname } = useLocation();

  const handleSubmitForm = (e) => {
    e.preventDefault();

    onSubmit();
  }

  return (
    <form className={s.form} onSubmit={handleSubmitForm}>
      <h2 className={s.title}>ToDo Expert</h2>

      <div className={s.wrapper}>
        <Link to="/signin" className={cn(s.link, (pathname === "/signin" ? s.link_active : ''))}>
          signin
        </Link>
        <Link to="/signup" className={cn(s.link, (pathname === "/signup" ? s.link_active : ''))}>
          signup
        </Link>
      </div>

      {children}

      <div className={s.info}>
        <p>This is&nbsp;a&nbsp;fake form. During authorization and registration, your data is&nbsp;not sent anywhere.</p>

        <p>To test the service, register or enter this email and password: example@example.com 12345678</p>
      </div>

      <button className={cn(s.btn, s.btn_type_submit)}>{btnText}</button>
    </form>
  )
}

export default AuthForm
