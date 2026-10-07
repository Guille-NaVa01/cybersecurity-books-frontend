/* components/Navbar.jsx */
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { username, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-icon">📚</span>
        <span className="navbar-title">BookVault</span>
        <span className="navbar-badge">SECURED</span>
      </div>

      <div className="navbar-links">
        <Link
          to="/dashboard"
          className={`nav-link ${isActive('/dashboard') ? 'nav-link--active' : ''}`}
        >
          Dashboard
        </Link>
        <Link
          to="/add"
          className={`nav-link ${isActive('/add') ? 'nav-link--active' : ''}`}
        >
          + Agregar
        </Link>
      </div>

      <div className="navbar-user">
        <span className="navbar-username">
          <span className="user-dot" />
          {username}
        </span>
        <button className="btn-logout" onClick={handleLogout}>
          Salir
        </button>
      </div>
    </nav>
  );
}
