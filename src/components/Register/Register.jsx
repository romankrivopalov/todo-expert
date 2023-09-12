import { useState } from 'react';
import AuthForm from '../AuthForm/AuthForm.jsx';
import s from './Register.module.scss';
import fakeAuth from '../../utils/fakeAuth.js';

const Register = ({ navigate, setCurrentUser }) => {
  const [ values, setValues ] = useState({'name': '', 'email': '', 'password': ''});

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setValues((oldValues) =>({ ...oldValues, [name]: value }))
  }


  function handleRegistrationUser() {
    fakeAuth.getRegistrationUser(values)
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
    <section className={s.register}>
      <div className={s.content}>
        <AuthForm btnText={'Signup'} onSubmit={handleRegistrationUser}>
          <input
            className={s.input}
            name='name'
            type="text"
            placeholder='your name'
            onChange={handleChange}
            required
          />
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

export default Register
