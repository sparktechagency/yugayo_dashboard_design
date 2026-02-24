import { FaUsers } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { MdDashboard, MdOutlineSettings } from "react-icons/md";

import logoIcon from "../../../assets/logo.png";
import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine, RiHotelLine } from "react-icons/ri";

const Sidebar = () => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const settings = [
    {
      name: "Privacy Policy",
      link: "/settings/privacy-policy",
    },

    {
      name: "Terms & condition",
      link: "/settings/terms-and-condition",
    },

    { name: "Profile", link: "/settings/profile" },
  ];

  const logout = {
    name: "Logout",
    link: "/login",
    icon: <MdDashboard />,
  };

  const menuItems = [
    {
      name: "Users",
      link: "/users-management",
      icon: <FaUsers />,
    },
    {
      name: "Category",
      link: "/category-management",
      icon: <RiHotelLine />,
    },
  ];
  const isSettingsActive = location.pathname.includes("/settings");

  return (
    <div className=" w-[300px] h-[96vh] overflow-y-scroll px-3  border-gray-600 border-2 overflow-hidden">
      <div>
        <img
          src={logoIcon}
          alt="logo-icon"
          className="object-cover object-center"
        />
      </div>

      <ul className="mt-10 flex flex-col justify-between ">
        <div>
          {/* User Management */}

          {/* Remaining menu items */}
          {menuItems.map((item, index) => (
            <NavLink
              to={item?.link}
              key={`remaining-${index}`}
              className={({ isActive }) =>
                `flex items-center py-3 rounded-xl my-1 pl-6  cursor-pointer hover:text-white ${
                  isActive ? "sidebar text-white" : "hover-sidebar"
                }`
              }
            >
              <span className="mr-4 text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}

          {/* Settings */}
          <li className="my-1">
            <div
              className={`flex items-center justify-between py-3 rounded-xl pl-6 cursor-pointer ${
                isSettingsActive ? "sidebar !text-white" : " hover-sidebar"
              }`}
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <div className="flex items-center">
                <span className="mr-4 text-xl">
                  <MdOutlineSettings />
                </span>
                <span>Settings</span>
              </div>
              <span className="mr-4">
                {isSettingsOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
              </span>
            </div>

            {isSettingsOpen && (
              <div className="ml-4">
                {settings.map((subItem, idx) => (
                  <NavLink
                    key={idx}
                    to={subItem.link}
                    className={({ isActive }) =>
                      `flex items-center py-2 px-6 my-1 rounded-xl  hover:text-white 
                      ${isActive ? "sidebar text-white" : "hover-sidebar"}`
                    }
                  >
                    <span className="ml-6">{subItem.name}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </li>
        </div>

        <NavLink
          to={logout?.link}
          className={({ isActive }) =>
            `flex items-center py-3 rounded-xl mt-20 my-1 pl-6  cursor-pointer hover:text-white ${
              isActive ? "sidebar text-white" : "hover-sidebar"
            }`
          }
        >
          <span className="mr-4 text-xl">{logout.icon}</span>
          <span>{logout.name}</span>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
