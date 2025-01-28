// Sidebar.jsx
import React, { useState } from "react";
import { sidebarConfig } from "./sidebarConfig";
import Logo from "../Logo/Logo";
import LogoutButton from "../LogoutButton/LogoutButton";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  IconButton,
} from "@mui/material";
import {
  FaChevronDown,
  FaChevronUp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const SidebarItem = ({
  item,
  isCollapsed,
  collapsedItems,
  handleToggle,
  handleItemClick,
  selectedItem,
}) => {
  const hasSubItems = item.subItems && item.subItems.length > 0;

  return (
    <>
      <ListItem
        button
        onClick={() =>
          hasSubItems
            ? handleToggle(item.name)
            : handleItemClick(item.name, item.route)
        }
        sx={{
          paddingLeft: isCollapsed ? "16px" : "32px",
          backgroundColor:
            selectedItem === item.name ? "#34495e" : "transparent",
          "&:hover": {
            backgroundColor: "#34495e",
          },
        }}
      >
        <ListItemIcon sx={{ color: "white" }}>
          {item.icon && <item.icon />}
        </ListItemIcon>
        {!isCollapsed && <ListItemText primary={item.name} />}
        {hasSubItems && !isCollapsed && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleToggle(item.name);
            }}
            sx={{ color: "white" }}
          >
            {collapsedItems[item.name] ? <FaChevronUp /> : <FaChevronDown />}
          </IconButton>
        )}
      </ListItem>

      {hasSubItems && (
        <Collapse in={collapsedItems[item.name]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.subItems.map((subItem, index) => (
              <SidebarItem
                key={index}
                item={subItem}
                isCollapsed={isCollapsed}
                collapsedItems={collapsedItems}
                handleToggle={handleToggle}
                handleItemClick={handleItemClick}
                selectedItem={selectedItem}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const Sidebar = () => {
  const [collapsedItems, setCollapsedItems] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleToggle = (name) => {
    setCollapsedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleItemClick = (name, route) => {
    setSelectedItem(name);
    console.log(`Navigate to ${route}`);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box
      sx={{
        width: isCollapsed ? "80px" : "20%",
        backgroundColor: "#2c3e50",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", padding: "16px" }}>
        <Logo collapsed={isCollapsed} />
        <IconButton
          onClick={toggleSidebar}
          sx={{
            marginLeft: "auto",
            color: "white",
          }}
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </IconButton>
      </Box>

      <List>
        {sidebarConfig.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            isCollapsed={isCollapsed}
            collapsedItems={collapsedItems}
            handleToggle={handleToggle}
            handleItemClick={handleItemClick}
            selectedItem={selectedItem}
          />
        ))}
      </List>

      <Box sx={{ margin: "16px" }}>
        <LogoutButton collapsed={isCollapsed} />
      </Box>
    </Box>
  );
};

export default Sidebar;
