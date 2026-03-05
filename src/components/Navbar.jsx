import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getUserProgress } from '../data/progress';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const [progress, setProgress] = useState(getUserProgress());

  useEffect(() => {
    setProgress(getUserProgress());
  }, [location]);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🇫🇷</span>
          <span className="brand-text">FrenchLearn</span>
        </Link>

        <div className="navbar-stats">
          <div className="stat-item" title="Total XP">
            <span className="stat-icon">⚡</span>
            <span className="stat-value">{progress.totalXP}</span>
          </div>
          <div className="stat-item" title="Day Streak">
            <span className="stat-icon">🔥</span>
            <span className="stat-value">{progress.currentStreak}</span>
          </div>
          <div className="stat-item" title={`Level ${progress.level}`}>
            <span className="stat-icon">👑</span>
            <span className="stat-value">{progress.level}</span>
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
          <Link
            to="/profile"
            className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-label">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
