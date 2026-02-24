import { useState } from "react";
import { MdNotificationsNone } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Popover } from "antd";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Profile report!",
      read: false,
      createdAt: "Fri, 12:30pm",
    },
    {
      id: 2,
      message: "Profile report!",
      read: false,
      createdAt: "Sat, 12:30pm",
    },
  ]);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const handleAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
    setVisible(false);
  };

  const NotificationContent = () => (
    <div className="w-80 max-h-96 overflow-y-auto bg-white rounded-md  border p-4">
      <div className="border-b pb-2 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <button
          onClick={handleAllAsRead}
          className=" text-sm underline underline-offset-2 "
        >
          Mark all as read
        </button>
      </div>
      <div className="mt-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`mb-5 p-3 border-b ${
                notification.read ? "" : "bg-gray-200"
              }`}
            >
              <p className="text-sm text-gray-800">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {notification.createdAt}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No new notifications</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex justify-between items-center   py-3 my-2 px-3   rounded-md border-gray-600 border-2">
      <div></div>
      {/* <p className="text-2xl font-bold text-blue-600 ">Dashboard</p> */}
      <div className="flex items-center gap-4">
        <Popover
          content={NotificationContent}
          trigger="click"
          placement="bottomRight"
          visible={visible}
          onVisibleChange={handleVisibleChange}
        >
          <button className="relative text-2xl p-2 rounded-full border">
            <MdNotificationsNone />
            {notifications.some((notif) => !notif.read) && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs h-4 w-4 font-bold px-1 rounded-full">
                !
              </span>
            )}
          </button>
        </Popover>
        <Link
          to="/settings/profile"
          className="flex items-center gap-2 border  p-2 rounded-md"
        >
          <FaUserCircle className="text-3xl  " />
          <div className="text-left">
            <p className="text-sm font-semibold ">John Doe</p>
            <p className="text-xs text-gray-500">john.doe@example.com</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
