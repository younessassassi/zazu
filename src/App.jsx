import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Lesson from './components/Lesson';
import Profile from './components/Profile';

function AppLayout() {
  const location = useLocation();
  const isInLesson = location.pathname.startsWith('/lesson/');

  return (
    <>
      {!isInLesson && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/zazu">
      <AppLayout />
    </BrowserRouter>
  );
}
