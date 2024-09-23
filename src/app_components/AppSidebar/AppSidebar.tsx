import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { FaWpforms } from "react-icons/fa6";
import { FaUsersViewfinder } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiUserList } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { MdMyLocation, MdFiberNew } from "react-icons/md";

import { SidebarLinksType } from "./index";

// local imports
import logo from "../../assets/air_ticket_agency.png";
import "./Sidebar.scss";
import {
  ConvertedCustomersURL,
  DashboardURL,
  FormPageURL,
  LeadsManagementURL,
  MyCustomersURL,
  NewLeadsURL,
  UsersManagementURL,
} from "@/routes/routeConstant";
import { useSelector } from "react-redux";
import { AppState } from "@/types";
import Cookies from "js-cookie";

const Sidebar = () => {
  const navigate = useNavigate();
  const { profile } = useSelector((state: AppState) => state.auth);

  const [isOpen] = useState(true);

  const agentSidebarLinks: SidebarLinksType[] = [
    {
      title: "Dashboard",
      icon: <LuLayoutDashboard />,
      pathname: DashboardURL,
    },

    {
      title: "New Leads",
      icon: <MdFiberNew />,
      pathname: NewLeadsURL,
    },
    {
      title: "My Customers",
      icon: <MdMyLocation />,
      pathname: MyCustomersURL,
    },
    {
      title: "Lead Sub Form",
      icon: <FaWpforms />,
      pathname: FormPageURL,
    },
  ];

  const adminSidebarLink: SidebarLinksType[] = [
    {
      title: "Dashboard",
      icon: <LuLayoutDashboard />,
      pathname: DashboardURL,
    },
    {
      title: "Users",
      icon: <PiUserList />,
      pathname: UsersManagementURL,
    },
    {
      title: "All Customers",
      icon: <FaUsersViewfinder />,
      pathname: LeadsManagementURL,
    },
    {
      title: "New Leads",
      icon: <MdFiberNew />,
      pathname: NewLeadsURL,
    },
    {
      title: "My Customers",
      icon: <MdMyLocation />,
      pathname: MyCustomersURL,
    },
    {
      title: "Converted Customers",
      icon: <MdMyLocation />,
      pathname: ConvertedCustomersURL,
    },
    // {
    //   title: "Form Fields",
    //   icon: <MdFormatAlignLeft />,
    //   pathname: FormFieldManagementURL,
    // },
    {
      title: "Lead Sub Form",
      icon: <FaWpforms />,
      pathname: FormPageURL,
    },
  ];

  const sidebarLinks: SidebarLinksType[] =
    profile?.role === "admin" ? adminSidebarLink : agentSidebarLinks;
  const handleSidebarLinkClick = (link: SidebarLinksType) => {
    navigate(link.pathname);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-logo-container">
        <img src={logo} alt="Company Logo" className="sidebar-logo" />
      </div>
      <div className="sidebar-links-list">
        {sidebarLinks.map((link, index) => (
          <div
            className="menu-item px-10"
            key={index}
            onClick={() => handleSidebarLinkClick(link)}
          >
            {link.icon}
            {isOpen && <p className="menu-link__title">{link.title}</p>}
          </div>
        ))}

        <div
          className="menu-item px-10"
          onClick={() => {
            window.localStorage.clear();
            Cookies.remove("auth_token");
            navigate("/login");
          }}
        >
          <CiLogout />
          {isOpen && (
            <p className="menu-link__title text-red-500">{"Logout"}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
