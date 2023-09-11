import { useState } from 'react';
import s from './Welcome.module.scss'
import cn from 'classnames';

const Welcome = () => {

  const [ activeTab, setActiveTab ] = useState(null);

  const handleSetActive = (category) => {
    setActiveTab(category)
  }

  return (
    <section className={s.welcome}>
      <div className={s.content}>
        <h2 className={s.title}>ToDo Expert</h2>

        <div className={s.wrapper}>
          <button
            className={cn(s.btn, (!activeTab || activeTab === 'login') && s.btn_active)}
            onClick={() => handleSetActive('login')}>
            login
          </button>
          <button
            className={cn(s.btn, activeTab === 'signup' && s.btn_active)}
            onClick={() => handleSetActive('signup')}>
            signup
          </button>
        </div>

        <form className={s.form}>
          { activeTab === 'signup' &&
            <input
              className={s.input}
              type="text"
              placeholder='your name'
              required
            />
          }
          <input
            className={s.input}
            type="text"
            placeholder='your email'
            required
          />
          <input
            className={s.input}
            type="password"
            placeholder='your password'
            required
          />

          <div className={s.info}>
            <p>This is&nbsp;a&nbsp;fake form. During authorization and registration, your data is&nbsp;not sent anywhere.</p>

            <p>To test the service, register or enter this email and password: example@example.com 12345678</p>
          </div>

          <button className={cn(s.btn, s.btn_type_submit)}>continue</button>
        </form>
      </div>
    </section>
  )
}

export default Welcome;
