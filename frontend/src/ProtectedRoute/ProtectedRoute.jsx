import React from 'react';
import { isAuthenticated } from '../components/authUtils';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ path, element: Element, ...rest }) => {
  console.log(`Checking authentication for route: ${path}`);
  console.log(`Is user authenticated? ${isAuthenticated()}`);

  if (isAuthenticated()) {
    return <Element {...rest} />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
