import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import MainPage from './components/MainPage/MainPage.jsx';

function App() {
  const navigate = useNavigate()
  const loggedIn = false;

  return (
    <Routes>

      <Route
        path='/'
        element={<ProtectedRoute
          element={MainPage}
          loggedIn={loggedIn}
        />}
      />

      <Route
        path='/signin'
        element={<Login navigate={navigate} />}
      />

      <Route
        path='/signup'
        element={<Register navigate={navigate} />}
      />

    </Routes>
  );
}

export default App;
