import React from "react";

import Sidebar from "../AppSidebar/AppSidebar";

import "./DashboardLayout.scss";

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="layout-content">{children}</div>
    </div>
  );
};
