import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onClick = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex flex-row pt-5 px-5 justify-end gap-8">
      <p>
        <Link to="/">Services</Link>
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
  );
};

export default Navbar;
