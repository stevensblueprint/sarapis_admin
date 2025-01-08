import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex flex-row pt-5 px-5 justify-end gap-8">
      <p>
        <Link to="/">Services</Link>
      </p>
      <p>
        <Link to="/organizations">Organizations</Link>
      </p>
      <p>
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Navbar;
