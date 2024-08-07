import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Home, Login, ForgotPassword, ResetPassword } from "../pages/index";

import {
  BaseURL,
  HomepageURL,
  LoginURL,
  ForgotPasswordURL,
  ResetPasswordURL,
} from "./routeConstant";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route Component={Home} path={BaseURL} />
        <Route Component={Home} path={HomepageURL} />
        <Route Component={Login} path={LoginURL} />
        <Route Component={ForgotPassword} path={ForgotPasswordURL} />
        <Route Component={ResetPassword} path={ResetPasswordURL} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
