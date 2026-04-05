import { Link } from 'react-router-dom';
import { APP_NAME } from '../../utils/constants';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="content-card navbar">
      <div>
        <p className="brand-kicker">Enterprise Expense Intelligence</p>
        <h2>{APP_NAME}</h2>
      </div>
      <div className="nav-actions">
        <Link className="btn btn-muted" to="/dashboard">
          Home
        </Link>
        <div className="user-chip">
          <strong>{user?.name}</strong>
          <small>{user?.role}</small>
        </div>
        <button className="btn btn-primary" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
