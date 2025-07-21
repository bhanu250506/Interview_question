import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'
import FullPageLoader from './FullPageLoader';

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // If we don't know the user state yet, show a loader
  // This prevents a flicker from the protected route to the login page on refresh
  if (user === null && localStorage.getItem('token')) {
    return <FullPageLoader />;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;