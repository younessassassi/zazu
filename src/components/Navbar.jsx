import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserProgress } from '../data/progress';
import lessons from '../data/lessons';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const { user, isAdmin } = useAuth();
  const [progress, setProgress] = useState(getUserProgress());

  useEffect(() => {
    setProgress(getUserProgress());
  }, [location]);

  const completedCount = Object.keys(progress.completedLessons).length;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">�</span>
          <span className="brand-text">Zazu</span>
        </Link>

        <div className="navbar-stats">
          <div className="stat-pill" title="Points">
            <span className="pill-icon">💎</span>
            <span className="pill-value">{progress.totalXP}</span>
          </div>
          <div className="stat-pill" title="Day Streak">
            <span className="pill-icon">🔥</span>
            <span className="pill-value">{progress.currentStreak}</span>
          </div>
          <div className="stat-pill" title="Lessons Completed">
            <span className="pill-icon">📖</span>
            <span className="pill-value">{completedCount}/{lessons.length}</span>
          </div>
        </div>

        <div className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-label">Learn</span>
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
            >
              <span className="nav-icon">🛡️</span>
              <span className="nav-label">Admin</span>
            </Link>
          )}
          <Link
            to="/profile"
            className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
          >
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" className="nav-avatar" referrerPolicy="no-referrer" />
            ) : (
              <span className="nav-avatar-letter">
                {(user?.displayName || user?.email || '?')[0].toUpperCase()}
              </span>
            )}
            <span className="nav-label">{user?.displayName?.split(' ')[0] || 'Profile'}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
