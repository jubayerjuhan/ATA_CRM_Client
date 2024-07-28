import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "../pages/Home";

import { HomepageURL, LoginURL } from "./routeConstant";

import Login from "../pages/Login/Login";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route Component={Home} path={HomepageURL} />
        <Route Component={Login} path={LoginURL} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
