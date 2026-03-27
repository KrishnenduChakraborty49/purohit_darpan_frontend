import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AIAssistant from './components/AIAssistant';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PujaListPage from './pages/PujaListPage';
import PujaLearningPage from './pages/PujaLearningPage';
import PanchangPage from './pages/PanchangPage';
import NotificationSettings from './pages/NotificationSettings';
import { useNotifications } from './hooks/useNotifications';

/** Layout wrapper for protected pages (adds Navbar + AI panel) */
function AppLayout() {
  useNotifications(); // foreground FCM listener
  return (
    <>
      <Navbar />
      <Outlet />
      <AIAssistant />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1c1008',
            color: '#fde68a',
            border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: '12px',
          },
          success: { iconTheme: { primary: '#f39c12', secondary: '#fff' } },
          error: { iconTheme: { primary: '#e74c3c', secondary: '#fff' } },
        }}
      />

      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected + Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pujas" element={<PujaListPage />} />
            <Route path="/puja/:pujaId" element={<PujaLearningPage />} />
            <Route path="/panchang" element={<PanchangPage />} />
            <Route path="/settings/notifications" element={<NotificationSettings />} />
          </Route>
        </Route>

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
