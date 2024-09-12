import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import {
  Dashboard,
  ForgotPassword,
  Home,
  Leads,
  Login,
  NewLeads,
  ResetPassword,
  SuccessPage,
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
  NewLeadsURL,
  LeadDetailURL,
  LeadSuccessURL,
  MyCustomersURL,
} from "./routeConstant";
import PrivateRoute from "@/app_components/PrivateRoute/PrivateRoute";
import FormManager from "@/pages/FormManager/FormManager";
import { ClientFormPage } from "@/pages/ClientFormPage/ClientFormPage";
import LeadDetailPage from "@/pages/LeadDetailPage/LeadDetailPage";
import { MyCustomers } from "@/pages/MyCustomers/MyCustomers";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route Component={Home} path={HomepageURL} />
        <Route Component={Login} path={LoginURL} />
        <Route Component={ForgotPassword} path={ForgotPasswordURL} />
        <Route Component={ResetPassword} path={ResetPasswordURL} />

        {/* Private routes */}
        <Route path={BaseURL} element={<PrivateRoute component={Home} />} />
        <Route path={HomepageURL} element={<PrivateRoute component={Home} />} />
        <Route
          path={LeadSuccessURL}
          element={<PrivateRoute component={SuccessPage} />}
        />
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
          element={<PrivateRoute component={ClientFormPage} />}
        />
        <Route
          path={LeadsManagementURL}
          element={<PrivateRoute component={Leads} />}
        />
        <Route
          path={LeadDetailURL}
          element={<PrivateRoute component={LeadDetailPage} />}
        />
        <Route
          path={NewLeadsURL}
          element={<PrivateRoute component={NewLeads} />}
        />
        <Route
          path={MyCustomersURL}
          element={<PrivateRoute component={MyCustomers} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
