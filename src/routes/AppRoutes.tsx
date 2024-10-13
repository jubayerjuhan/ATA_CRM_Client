import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import {
  AcknowledgementPage,
  AllCustomers,
  ClientFormPage,
  ConvertedCustomers,
  Dashboard,
  ForgotPassword,
  Home,
  LeadDetailPage,
  Leads,
  Login,
  MyCustomers,
  MyFollowUps,
  NewLeads,
  PaymentMethodSelectPage,
  RefundFormPage,
  ResetPassword,
  SuccessPage,
  TestPage,
  Users,
  WhatsAppLeadPage,
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
  ConvertedCustomersURL,
  AllCustomersURL,
  TestRouteURL,
  PaymentMethodSelectURL,
  AcknowledgementPageURL,
  RefundPageURL,
  RefundListURL,
  MyLeadsURL,
  SaleLostURL,
  MyFollowUpsURL,
  WhatsappLeadURL,
} from "./routeConstant";
import PrivateRoute from "@/app_components/PrivateRoute/PrivateRoute";
import FormManager from "@/pages/FormManager/FormManager";
import { CancelledCustomers } from "@/pages/CancelledCustomersPage/CancelledCustomerPage";
import RefundList from "@/pages/RefundList/RefundList";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route Component={RefundFormPage} path={RefundPageURL} />
        <Route Component={Login} path={LoginURL} />
        <Route Component={ForgotPassword} path={ForgotPasswordURL} />
        <Route Component={ResetPassword} path={ResetPasswordURL} />
        <Route Component={AcknowledgementPage} path={AcknowledgementPageURL} />
        <Route
          Component={PaymentMethodSelectPage}
          path={PaymentMethodSelectURL}
        />

        {/* Private routes */}
        <Route
          path={BaseURL}
          element={<PrivateRoute component={Dashboard} />}
        />
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
          path={AllCustomersURL}
          element={<PrivateRoute component={AllCustomers} />}
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
          path={MyLeadsURL}
          element={<PrivateRoute component={MyCustomers} />}
        />
        <Route
          path={ConvertedCustomersURL}
          element={<PrivateRoute component={ConvertedCustomers} />}
        />
        <Route
          path={SaleLostURL}
          element={<PrivateRoute component={CancelledCustomers} />}
        />
        <Route
          path={TestRouteURL}
          element={<PrivateRoute component={TestPage} />}
        />
        <Route
          path={RefundPageURL}
          element={<PrivateRoute component={RefundFormPage} />}
        />
        <Route
          path={RefundListURL}
          element={<PrivateRoute component={RefundList} />}
        />
        <Route
          path={MyFollowUpsURL}
          element={<PrivateRoute component={MyFollowUps} />}
        />
        <Route
          path={WhatsappLeadURL}
          element={<PrivateRoute component={WhatsAppLeadPage} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
