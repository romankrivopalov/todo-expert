import { useState } from 'react';
import AuthForm from '../AuthForm/AuthForm.jsx';
import s from './Login.module.scss';
import fakeAuth from '../../utils/fakeAuth.js';

const Login = ({ navigate, setCurrentUser }) => {
  const [ values, setValues ] = useState({'email': '', 'password': ''});

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setValues((oldValues) =>({ ...oldValues, [name]: value }))
  }

  function handleAuthorizationUser() {
    fakeAuth.getAuthorizationUser(values)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setCurrentUser(true);

          navigate("/");
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <section className={s.login}>
      <div className={s.content}>
        <AuthForm btnText={'Signin'} onSubmit={handleAuthorizationUser}>
          <input
            className={s.input}
            name='email'
            type="text"
            placeholder='your email'
            onChange={handleChange}
            required
          />
          <input
            className={s.input}
            name='password'
            type="password"
            placeholder='your password'
            onChange={handleChange}
            required
          />
        </AuthForm>
      </div>
    </section>
  )
}

export default Login;
