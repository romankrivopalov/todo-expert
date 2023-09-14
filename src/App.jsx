import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import MainPage from './components/MainPage/MainPage.jsx';
import fakeAuth from './utils/fakeAuth.js';

function App() {
  const navigate = useNavigate();
  const userJwtInLocalStorage = localStorage.getItem('jwt');
  const [ loggedIn, setLoggedIn ] = useState(false);

  useEffect(() => {
    if (userJwtInLocalStorage) {
      fakeAuth.checkValidityUser(userJwtInLocalStorage)
        .then(data => {
          if (data.token) {
            setLoggedIn(true);

            navigate("/");
          }
        })
        .catch(err => console.log(err));
    }
  }, [])

  const handleSignout = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/signin');
  }

  return (
    <Routes>
      <Route path='*' element={<Navigate to='/' replace={true} />} />

      <Route
        path='/'
        element={<ProtectedRoute
          element={MainPage}
          onSignout={handleSignout}
          loggedIn={loggedIn}
        />}
      />

      <Route
        path='/signin'
        element={ userJwtInLocalStorage
          ?
            <Login
              navigate={navigate}
              setCurrentUser={setLoggedIn}
            />
          :
            <Navigate to='/' />
        }
      />



      <Route
        path='/signup'
        element={ userJwtInLocalStorage
          ?
            <Register
              navigate={navigate}
              setCurrentUser={setLoggedIn}
            />
          :
            <Navigate to='/' />
        }
      />

    </Routes>
  );
}

export default App;
