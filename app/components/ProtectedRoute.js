import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Redirect } from 'expo-router';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // If not authenticated, redirect to login
        return <Redirect href="/login" />;
    }

    // If authenticated, render the child components
    return children;
};

export default ProtectedRoute;
