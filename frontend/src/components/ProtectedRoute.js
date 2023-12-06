import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function ProtectedRoute({ element: Component, ...props }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Component {...props} /> : <Navigate to="/index" />;
}
