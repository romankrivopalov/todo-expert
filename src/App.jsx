import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import Welcome from './components/Welcome/Welcome.jsx';
import MainPage from './components/MainPage/MainPage.jsx';

function App() {

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
        path='/welcome'
        element={<Welcome />}
      />

    </Routes>
  );
}

export default App;
