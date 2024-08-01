// components/PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "./AuthProvider";

const PrivateRoutes = ({ element: Element, ...rest }) => {
  const { auth } = useContext(MyContext);

  return <Route {...rest} element={auth ? Element : <Navigate to="/" />} />;
};

export default PrivateRoutes;
