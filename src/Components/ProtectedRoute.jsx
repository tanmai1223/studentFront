import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function ProtectedRoute({ children, requiredRole }) {
  const { role, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  // If no token or role mismatch, redirect to login
  const token = localStorage.getItem('token');
  if (!token || role !== requiredRole) return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;
