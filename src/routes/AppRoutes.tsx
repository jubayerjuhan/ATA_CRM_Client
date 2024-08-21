import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import {
  Dashboard,
  ForgotPassword,
  FormPage,
  Home,
  Leads,
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
  FormFieldManagementURL,
  FormPageURL,
  LeadsManagementURL,
} from "./routeConstant";
import PrivateRoute from "@/app_components/PrivateRoute/PrivateRoute";
import FormManager from "@/pages/FormManager/FormManager";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route Component={Home} path={BaseURL} />
        <Route Component={Home} path={HomepageURL} />
        <Route Component={Login} path={LoginURL} />
        <Route Component={ForgotPassword} path={ForgotPasswordURL} />
        <Route Component={ResetPassword} path={ResetPasswordURL} />

        {/* Private routes */}
        <Route
          path={DashboardURL}
          element={<PrivateRoute component={Dashboard} />}
        />
        <Route
          path={UsersManagementURL}
          element={<PrivateRoute component={Users} />}
        />
        <Route
          path={FormFieldManagementURL}
          element={<PrivateRoute component={FormManager} />}
        />
        <Route
          path={FormPageURL}
          element={<PrivateRoute component={FormPage} />}
        />
        <Route
          path={LeadsManagementURL}
          element={<PrivateRoute component={Leads} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
