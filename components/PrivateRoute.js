import React from "react";
import { Redirect, Route } from 'react-router-native';

export default function PrivateRoute ({ isAuthenticated, ...rest }) {
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} />;
}