// sidebarConfig.js
import { FaHome, FaUser, FaCog } from "react-icons/fa";

export const sidebarConfig = [
  {
    name: "Home",
    icon: FaHome,
    route: "/home",
  },
  {
    name: "Profile",
    icon: FaUser,
    route: "/profile",
  },
  {
    name: "Settings",
    icon: FaCog,
    route: "/settings",
    collapsible: true,
    subItems: [
      {
        name: "General",
        route: "/settings/general",
        subItems: [
          {
            name: "Appearance",
            route: "/settings/general/appearance",
            subItems: [
              {
                name: "Themes",
                route: "/settings/general/appearance/themes",
                subItems: [
                  {
                    name: "Dark Mode",
                    route: "/settings/general/appearance/themes/dark-mode",
                  },
                  {
                    name: "Light Mode",
                    route: "/settings/general/appearance/themes/light-mode",
                  },
                ],
              },
              {
                name: "Font Settings",
                route: "/settings/general/appearance/font-settings",
              },
            ],
          },
          {
            name: "Security",
            route: "/settings/general/security",
            subItems: [
              {
                name: "Password Policies",
                route: "/settings/general/security/password-policies",
              },
              {
                name: "Two-Factor Authentication",
                route: "/settings/general/security/2fa",
              },
            ],
          },
        ],
      },
      {
        name: "User Management",
        route: "/settings/user-management",
        subItems: [
          {
            name: "Roles",
            route: "/settings/user-management/roles",
            subItems: [
              {
                name: "Create Role",
                route: "/settings/user-management/roles/create",
              },
              {
                name: "Edit Role",
                route: "/settings/user-management/roles/edit",
              },
            ],
          },
          {
            name: "Permissions",
            route: "/settings/user-management/permissions",
          },
        ],
      },
    ],
  },
];
