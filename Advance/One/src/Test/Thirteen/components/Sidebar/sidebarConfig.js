import { FaHome, FaUser, FaCog } from "react-icons/fa";

export const sidebarConfig = [
  {
    groupName: "Dashboard",
    items: [
      { name: "Home", icon: FaHome, route: "/home" },
      { name: "Profile", icon: FaUser, route: "/profile" },
    ],
  },
  {
    groupName: "Settings",
    items: [
      {
        name: "System Settings",
        icon: FaCog,
        route: "/settings",
        collapsible: true,
        subItems: [
          { name: "General", route: "/settings/general" },
          { name: "Security", route: "/settings/security" },
        ],
      },
    ],
  },
];
