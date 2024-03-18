import React from 'react'
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../components/authUtils';
import Cookies from 'js-cookie';

const ProtectedRouteUsers  = ({ element }) => {
  const adminDetails = Cookies.get('adminDetails');
  const accessToken = Cookies.get('accessToken');

  if (!isAuthenticated()) {
    return <Navigate to="/adminlogin" replace />; 
  }

  return <Route element={element} />;
};

export default ProtectedRouteUsers




