import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Services from './pages/Services';
import Organizations from './pages/Organizations';
import Login from './pages/Login';
import ProtectedRoute from './auth/ProtectedRoute';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/services"
          element={<ProtectedRoute element={<Services />} />}
        />
        <Route
          path="/organizations"
          element={<ProtectedRoute element={<Organizations />} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
