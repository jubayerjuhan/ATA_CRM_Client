// Sidebar.js
import React, { useState } from "react";
import { FaHome, FaBars } from "react-icons/fa";
import "./Sidebar.scss";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarLinks = [
    {
      title: "Homepage",
      icon: <FaHome />,
    },
    {
      title: "About",
      icon: <FaBars />,
    },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* <div className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </div> */}
      <div className="sidebar-links-list">
        {sidebarLinks.map((link, index) => (
          <div className="menu-item" key={index}>
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
