import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Services from './pages/Services';
import Organizations from './pages/Organizations';
import Login from './pages/Login';
import { AuthContext } from './auth/AuthContext';

const App: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Services /> : <Navigate to="/login" />}
        />
        <Route
          path="/services"
          element={isAuthenticated ? <Services /> : <Navigate to="/login" />}
        />
        <Route
          path="/organizations"
          element={
            isAuthenticated ? <Organizations /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
