import React from "react";

import Sidebar from "../AppSidebar/AppSidebar";

import "./DashboardLayout.scss";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  noPadding,
}) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div
        className="layout-content"
        style={{ padding: noPadding ? 0 : undefined }}
      >
        {children}
      </div>
    </div>
  );
};
