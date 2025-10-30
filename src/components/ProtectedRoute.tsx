import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // If user is not authenticated, redirect them to the login page
        return <Navigate to="/login" />;
    }

    // If authenticated, render the child component (e.g., the Profile page)
    return <Outlet />;
};

export default ProtectedRoute;
