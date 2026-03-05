import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from './contexts/AuthContext';
import { initProgressForUser, clearLocalOnLogout } from './data/progress';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Lesson from './components/Lesson';
import Profile from './components/Profile';
import Login from './components/Login';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AppLayout() {
  const location = useLocation();
  const { user, loading } = useAuth();
  const [syncing, setSyncing] = useState(false);
  const isInLesson = location.pathname.startsWith('/lesson/');
  const isLogin = location.pathname === '/login';

  useEffect(() => {
    if (user) {
      setSyncing(true);
      initProgressForUser(user.uid).finally(() => setSyncing(false));
    } else if (!loading) {
      clearLocalOnLogout();
    }
  }, [user, loading]);

  if (loading || syncing) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontSize: '18px', color: '#777' }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      {!isInLesson && !isLogin && <Navbar />}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/lesson/:id" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/zazu">
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}
