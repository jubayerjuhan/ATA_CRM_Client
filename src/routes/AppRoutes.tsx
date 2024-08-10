import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import {
  Dashboard,
  ForgotPassword,
  Home,
  Login,
  ResetPassword,
  Users,
} from "@/pages";

import {
  BaseURL,
  HomepageURL,
  LoginURL,
  ForgotPasswordURL,
  ResetPasswordURL,
  DashboardURL,
  UsersManagementURL,
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
        <Route Component={Dashboard} path={DashboardURL} />
        <Route Component={Users} path={UsersManagementURL} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
