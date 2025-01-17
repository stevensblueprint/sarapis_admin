import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const { isAuthenticated, isInitialized } = useContext(AuthContext);
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
