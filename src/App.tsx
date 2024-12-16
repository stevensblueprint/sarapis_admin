import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import LoginPage from './pages/LoginPage';
// import { AuthContext } from './auth/AuthContext';

const App: React.FC = () => {
  // const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          // element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          element={<Home />}
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
