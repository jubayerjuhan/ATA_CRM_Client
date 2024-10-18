import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { FaWpforms } from "react-icons/fa6";
import { FaUsersViewfinder } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiUserList } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { MdMyLocation, MdFiberNew, MdEmojiPeople } from "react-icons/md";
import { CiFacebook } from "react-icons/ci";

import { SidebarLinksType } from "./index";

// local imports
import logo from "../../assets/air_ticket_agency.png";
import "./Sidebar.scss";
import {
  AllCustomersURL,
  SaleLostURL,
  ConvertedCustomersURL,
  DashboardURL,
  FormPageURL,
  LeadsManagementURL,
  MyLeadsURL,
  NewLeadsURL,
  RefundListURL,
  RefundPageURL,
  UsersManagementURL,
  WhatsappLeadURL,
  WhatsappLeadListURL,
  FacebookLeadListURL,
} from "@/routes/routeConstant";
import { TbUserCancel } from "react-icons/tb";
import { FaUserCheck } from "react-icons/fa6";

import { useSelector } from "react-redux";
import { AppState } from "@/types";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FaWhatsapp, FaWhatsappSquare } from "react-icons/fa";

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
      title: "My Leads",
      icon: <MdMyLocation />,
      pathname: MyLeadsURL,
    },
    {
      title: "Lead Sub Form",
      icon: <FaWpforms />,
      pathname: FormPageURL,
    },
    {
      title: "Whatsapp Lead +",
      icon: <FaWhatsapp />,
      pathname: WhatsappLeadURL,
    },
    {
      title: "Whatsapp Lead's",
      icon: <FaWhatsappSquare />,
      pathname: WhatsappLeadListURL,
    },
    {
      title: "Facebook Lead's",
      icon: <CiFacebook />,
      pathname: FacebookLeadListURL,
    },
    // {
    //   title: "Refund Form",
    //   icon: <HiOutlineReceiptRefund />,
    //   pathname: RefundPageURL,
    // },
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
      title: "All Leads",
      icon: <FaUsersViewfinder />,
      pathname: LeadsManagementURL,
    },
    {
      title: "All Customers",
      icon: <MdEmojiPeople />,
      pathname: AllCustomersURL,
    },
    {
      title: "New Leads",
      icon: <MdFiberNew />,
      pathname: NewLeadsURL,
    },
    {
      title: "My Leads",
      icon: <MdMyLocation />,
      pathname: MyLeadsURL,
    },
    {
      title: "Converted Customers",
      icon: <FaUserCheck />,
      pathname: ConvertedCustomersURL,
    },
    {
      title: "Sale Lost",
      icon: <TbUserCancel />,
      pathname: SaleLostURL,
    },
    {
      title: "Lead Sub Form",
      icon: <FaWpforms />,
      pathname: FormPageURL,
    },
    {
      title: "Whatsapp Lead +",
      icon: <FaWhatsapp />,
      pathname: WhatsappLeadURL,
    },
    {
      title: "Whatsapp Lead's",
      icon: <FaWhatsappSquare />,
      pathname: WhatsappLeadListURL,
    },
    {
      title: "Facebook Lead's",
      icon: <CiFacebook />,
      pathname: FacebookLeadListURL,
    },
    // {
    //   title: "Refund Form",
    //   icon: <HiOutlineReceiptRefund />,
    //   pathname: RefundPageURL,
    // },
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
      <div className="sidebar-links-list overflow-y-scroll">
        <div className="flex gap-4 px-[18px] items-center menu-item avatar">
          <Avatar className="">
            <AvatarFallback className="bg-black text-white">
              {profile?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="text-black">
            <span className="text-sm">Howdy</span> <br />
            <span className="text-lg font-bold">{profile?.name}</span>
          </p>
        </div>
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
            window.localStorage.removeItem("auth_token");
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
