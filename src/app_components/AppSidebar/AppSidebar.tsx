import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { FaUsersViewfinder } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiUserList } from "react-icons/pi";
import { MdFormatAlignLeft, MdFiberNew } from "react-icons/md";

import { SidebarLinksType } from "./index";

// local imports
import logo from "../../assets/air_ticket_agency.png";
import "./Sidebar.scss";
import {
  DashboardURL,
  FormFieldManagementURL,
  LeadsManagementURL,
  NewLeadsURL,
  UsersManagementURL,
} from "@/routes/routeConstant";

const Sidebar = () => {
  const navigate = useNavigate();

  const [isOpen] = useState(true);

  // toggle sidebar function
  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  const sidebarLinks: SidebarLinksType[] = [
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
      title: "All Leads",
      icon: <FaUsersViewfinder />,
      pathname: LeadsManagementURL,
    },
    {
      title: "New Leads",
      icon: <MdFiberNew />,
      pathname: NewLeadsURL,
    },
    {
      title: "Form Fields",
      icon: <MdFormatAlignLeft />,
      pathname: FormFieldManagementURL,
    },
  ];

  const handleSidebarLinkClick = (link: SidebarLinksType) => {
    navigate(link.pathname);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* <div className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </div> */}

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
      </div>
      {/* Add more menu items here */}
    </div>
  );
};

export default Sidebar;
