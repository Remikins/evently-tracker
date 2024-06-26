// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component, user, isAdminRoute, ...rest }) {
  if (!user) {
    return <Navigate to="/" />;
  }

  if (isAdminRoute && user.email !== 'admin@example.com') {
    return <Navigate to="/events" />;
  }

  return <Component {...rest} user={user} />;
}

export default PrivateRoute;
