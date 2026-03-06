import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { searchUsersByEmail, setUserAdminStatus } from '../data/progress';
import './AdminPanel.css';

export default function AdminPanel() {
  const { user, isAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isAdmin) {
    return (
      <div className="admin-panel">
        <div className="admin-denied">
          <h2>Access Denied</h2>
          <p>You do not have admin privileges.</p>
        </div>
      </div>
    );
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSearching(true);
    setError('');
    setSuccess('');
    setResults([]);
    try {
      const users = await searchUsersByEmail(email.trim());
      if (users.length === 0) {
        setError('No user found with that email.');
      } else {
        setResults(users);
      }
    } catch {
      setError('Failed to search users. Check Firestore permissions.');
    }
    setSearching(false);
  };

  const handleToggleAdmin = async (targetUid, currentStatus) => {
    if (targetUid === user.uid) {
      setError("You can't change your own admin status.");
      return;
    }
    setError('');
    setSuccess('');
    try {
      await setUserAdminStatus(targetUid, !currentStatus);
      setResults((prev) =>
        prev.map((u) =>
          u.uid === targetUid ? { ...u, isAdmin: !currentStatus } : u
        )
      );
      setSuccess(`Admin status ${!currentStatus ? 'granted' : 'revoked'} successfully.`);
    } catch {
      setError('Failed to update admin status.');
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>🛡️ Admin Panel</h1>
        <p>Search for users by email and manage admin privileges.</p>
      </div>

      <form className="admin-search-form" onSubmit={handleSearch}>
        <input
          type="email"
          className="admin-search-input"
          placeholder="Enter user email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="admin-search-btn" disabled={searching}>
          {searching ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="admin-msg admin-error">{error}</div>}
      {success && <div className="admin-msg admin-success">{success}</div>}

      {results.length > 0 && (
        <div className="admin-results">
          {results.map((u) => (
            <div key={u.uid} className="admin-user-card">
              <div className="admin-user-info">
                <span className="admin-user-name">
                  {u.displayName || 'No Name'}
                </span>
                <span className="admin-user-email">{u.email}</span>
                <span className="admin-user-stats">
                  Level {u.level || 1} · {Object.keys(u.completedLessons || {}).length} lessons · {u.totalXP || 0} XP
                </span>
              </div>
              <div className="admin-user-actions">
                <span className={`admin-badge ${u.isAdmin ? 'admin' : 'user'}`}>
                  {u.isAdmin ? 'Admin' : 'User'}
                </span>
                <button
                  className={`admin-toggle-btn ${u.isAdmin ? 'revoke' : 'grant'}`}
                  onClick={() => handleToggleAdmin(u.uid, u.isAdmin)}
                  disabled={u.uid === user.uid}
                >
                  {u.isAdmin ? 'Revoke Admin' : 'Make Admin'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
