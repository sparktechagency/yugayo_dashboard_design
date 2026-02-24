import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { MdDashboard, MdOutlineSettings, MdOutlineNotificationsNone } from "react-icons/md";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { FaUserInjured, FaUserMd } from "react-icons/fa";
import { TbPlugConnected } from "react-icons/tb";
import { IoAnalyticsOutline } from "react-icons/io5";


const Sidebar = () => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", link: "/", icon: <MdDashboard size={18} /> },
    { name: "Patients", link: "/patients", icon: <FaUserInjured size={18} /> },
    { name: "Clinicians", link: "/clinicians", icon: <FaUserMd size={18} /> },
    { name: "Connections", link: "/connections", icon: <TbPlugConnected size={18} /> },
    { name: "Analytics", link: "/analytics", icon: <IoAnalyticsOutline size={18} /> },
    { name: "Alerts", link: "/alerts", icon: <MdOutlineNotificationsNone size={18} /> },
  ];

  const settingsItems = [
    { name: "Privacy Policy", link: "/settings/privacy-policy" },
    { name: "Terms & Condition", link: "/settings/terms-and-condition" },
    { name: "Profile", link: "/settings/profile" },
  ];

  const isSettingsActive = location.pathname.includes("/settings");

  return (
    <div
      className="w-[320px] min-h-screen  flex flex-col font-poppins"
      style={{ backgroundColor: "#C8EDE9" }}
    >
      {/* Logo */}
      <div className="pt-6 pb-4 flex items-center justify-center">
        <img src="/logo.svg" alt="EzyGut" className="h-16  object-contain" />
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 mt-2">
        {menuItems.map((item, index) => (
          <NavLink
            to={item.link}
            key={index}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl my-0.5  font-medium transition-all duration-150 ${
                isActive
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-teal-500/20"
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}

        {/* Settings with dropdown */}
        <div className="my-0.5">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl  font-medium transition-all duration-150 ${
              isSettingsActive
                ? "bg-teal-600 text-white shadow-sm"
                : "text-gray-700 hover:bg-teal-500/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <MdOutlineSettings size={18} />
              <span>Settings</span>
            </div>
            {isSettingsOpen ? (
              <RiArrowUpSLine size={16} />
            ) : (
              <RiArrowDownSLine size={16} />
            )}
          </button>

          {isSettingsOpen && (
            <div className="ml-6 ">
              {settingsItems.map((sub, idx) => (
                <NavLink
                  key={idx}
                  to={sub.link}
                  className={({ isActive }) =>
                    `flex items-center px-4  py-1.5 rounded-xl my-0.5  transition-all duration-150 ${
                      isActive
                        ? "bg-teal-600 text-white"
                        : "text-gray-600 hover:bg-teal-500/20"
                    }`
                  }
                >
                  {sub.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Admin User at Bottom */}
      <div className="px-3 pb-5 mt-4">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ backgroundColor: "#5BB8B2" }}
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img
              src="https://i.pravatar.cc/32?img=12"
              alt="Admin"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentNode.innerHTML = `<span class="text-white text-xs font-bold">A</span>`;
              }}
            />
          </div>
          <div className="min-w-0">
            <p className="text-white  font-semibold leading-tight truncate">
              Admin User
            </p>
            <p className="text-teal-100 text-xs leading-tight truncate">
              System Administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;