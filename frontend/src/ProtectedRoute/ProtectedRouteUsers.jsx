// import React from 'react'
// import { Route, Navigate } from 'react-router-dom';

// const ProtectedRouteUsers = ({ element, userType }) => {
 
//   if (userType === 'admin') {
//     return <Route element={element} />;
//   } else if (userType === 'mentor') {
//     return <Navigate to="/mentor-home" />;
//   } else if (userType === 'user') {
//     return <Navigate to="/user-home" />;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

// export default ProtectedRouteUsers



import React from 'react'
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRouteUsers  = ({ element }) => {
  const adminDetails = Cookies.get('adminDetails');
  const accessToken = Cookies.get('accessToken');

  if (!adminDetails || !accessToken) {
    return <Navigate to="/adminlogin" />;
  }

  return <Route element={element} />;
};

export default ProtectedRouteUsers




