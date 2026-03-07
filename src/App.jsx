import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from './contexts/AuthContext';
import { initProgressForUser, clearLocalOnLogout } from './data/progress';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Lesson from './components/Lesson';
import Profile from './components/Profile';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import Pricing from './components/Pricing';
import Landing from './components/Landing';

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
  const isLanding = location.pathname === '/welcome';
  const isPricingPage = location.pathname === '/pricing';

  useEffect(() => {
    if (user) {
      setSyncing(true);
      initProgressForUser(user.uid, { email: user.email, displayName: user.displayName }).finally(() => setSyncing(false));
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
      {!isInLesson && !isLogin && !isLanding && !isPricingPage && user && <Navbar />}
      <Routes>
        <Route path="/welcome" element={user ? <Navigate to="/" replace /> : <Landing />} />
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/pricing" element={user ? <ProtectedRoute><Pricing /></ProtectedRoute> : <Landing />} />
        <Route path="/" element={user ? <ProtectedRoute><Home /></ProtectedRoute> : <Navigate to="/welcome" replace />} />
        <Route path="/lesson/:id" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
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
