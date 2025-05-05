import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import BackButton from './BackButton';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onClick = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex flex-row pt-5 px-5 justify-between items-center">
      <BackButton />
      <div className="flex gap-8">
        <p>
          <Link to="/services">Services</Link>
        </p>
        <p>
          <Link to="/organizations">Organizations</Link>
        </p>
        <p>
          {isAuthenticated ? (
            <a onClick={onClick}>Logout</a>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
