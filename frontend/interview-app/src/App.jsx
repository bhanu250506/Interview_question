import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import ProtectedRoute from './components/common/ProtectRoute';

// Import Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateSessionPage from './pages/CreateSessionPage';
import SessionDetailPage from './pages/SessionDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import { Box } from '@mui/material';
import QuestionCard from './components/session/QuestionCard';

function App() {
  return (
    <>
      <Header />
      <Box component="main" sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create-session" element={<CreateSessionPage />} />
            <Route path="/session/:id" element={<SessionDetailPage />} />
                <Route path="/session/:id" element={<QuestionCard/>} />

          </Route>

          {/* Catch All */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;