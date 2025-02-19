import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { SessionManager } from './AuthProvider';

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const { isAuthenticated, isInitialized } = useContext(AuthContext);
  const [sessionValid, setSessionValid] = useState<boolean | null>(null);

  useEffect(() => {
    const validateSession = async () => {
      const isValid = await SessionManager.isSessionValid();
      setSessionValid(isValid);
    };
    validateSession();
  }, []);

  if (!isInitialized || sessionValid === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
