import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from "../../store/authStore";
/**
 * Guards routes by authentication status.
 * Optionally restricts to specific roles.
 */
export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user?.role;
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <Outlet />;
}
