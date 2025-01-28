import React, { useState } from "react";
import { sidebarConfig } from "./sidebarConfig";
import Logo from "../Logo/Logo";
import LogoutButton from "../LogoutButton/LogoutButton";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa"; // React Icons for toggle button and collapsible items
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  IconButton,
} from "@mui/material";

const Sidebar = () => {
  const [collapsedItems, setCollapsedItems] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null); // Track hovered item for preview
  const [hoveredItemPosition, setHoveredItemPosition] = useState({
    top: 0,
    left: 0,
  }); // Track the position of hovered item
  const [selectedItem, setSelectedItem] = useState(null); // State for the selected item

  const handleToggle = (group, item) => {
    setCollapsedItems((prevState) => ({
      ...prevState,
      [`${group}-${item}`]: !prevState[`${group}-${item}`],
    }));
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleHover = (item, event) => {
    const rect = event.target.getBoundingClientRect(); // Get position of hovered item
    setHoveredItem(item);
    setHoveredItemPosition({ top: rect.top, left: rect.left + rect.width }); // Set the position of the preview
  };

  const handleHoverLeave = () => {
    setHoveredItem(null); // Hide preview when mouse leaves
  };

  const handleItemClick = (group, item) => {
    setSelectedItem(`${group}-${item}`); // Set the clicked item as selected
    if (!item.collapsible) {
      console.log(`Navigate to ${item.route}`);
    }
  };

  const handleSubItemClick = (group, subItem) => {
    setSelectedItem(`${group}-${subItem.name}`); // Set the subitem as selected
    console.log(`Navigate to ${subItem.route}`);
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
        overflow: "visible", // Ensure toggle button is visible outside the sidebar
        transition: "width 0.3s",
        zIndex: 1000, // Keep sidebar above other content
        position: "relative", // Allow absolute positioning for children
      }}
    >
      {/* Top Section with Logo and Toggle Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
          padding: "16px",
          position: "relative",
        }}
      >
        {/* Logo */}
        <Logo collapsed={isCollapsed} />

        {/* Toggle Button */}
        <IconButton
          onClick={toggleSidebar}
          sx={{
            color: "white",
            position: "absolute", // Position outside the sidebar
            right: "-20px", // Push outside the sidebar's right edge
            top: "50%", // Vertically center the button
            transform: "translateY(-50%)",
            backgroundColor: "#2c3e50",
            border: "1px solid white",
            zIndex: 1001, // Ensure toggle button is above sidebar
            "&:hover": {
              backgroundColor: "#34495e",
            },
          }}
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </IconButton>
      </Box>

      {/* Hover Preview (Outside Sidebar) */}
      {hoveredItem && isCollapsed && (
        <Box
          sx={{
            position: "absolute",
            top: hoveredItemPosition.top + window.scrollY, // Add scroll position if any
            left: hoveredItemPosition.left, // Position based on hovered item
            backgroundColor: "#34495e",
            color: "white",
            padding: "8px 12px",
            borderRadius: "4px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            zIndex: 1002,
            whiteSpace: "nowrap",
            opacity: 0.9,
            transition: "transform 0.3s ease, opacity 0.3s ease",
          }}
        >
          {hoveredItem.name}
        </Box>
      )}

      {/* Scrollable Section */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List>
          {sidebarConfig.map((group, index) => (
            <React.Fragment key={index}>
              {!isCollapsed && (
                <ListItemText
                  primary={group.groupName}
                  sx={{ padding: "0 16px", color: "#bdc3c7" }}
                />
              )}
              {group.items.map((item, i) => (
                <React.Fragment key={i}>
                  <ListItem
                    button
                    onClick={() =>
                      item.collapsible
                        ? handleToggle(group.groupName, item.name)
                        : handleItemClick(group.groupName, item.name)
                    }
                    onMouseEnter={(e) => handleHover(item, e)} // Track position when hovering
                    onMouseLeave={handleHoverLeave} // Hide preview when mouse leaves
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: isCollapsed ? "16px" : "32px",
                      cursor: "pointer", // Add pointer cursor to indicate that the item is clickable
                      position: "relative",
                      backgroundColor:
                        selectedItem === `${group.groupName}-${item.name}`
                          ? "#34495e" // Highlight the selected item
                          : "transparent", // No background for non-selected items
                      "&:hover": {
                        backgroundColor: "#34495e",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: "40px",
                        color: "white",
                        justifyContent: "center",
                      }}
                    >
                      <item.icon style={{ fontSize: "20px" }} />
                    </ListItemIcon>
                    {!isCollapsed && <ListItemText primary={item.name} />}
                    {/* Collapsible Item Indicator */}
                    {!isCollapsed && item.collapsible && (
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the click event from triggering on the parent ListItem
                          handleToggle(group.groupName, item.name); // Toggle the collapse state when the icon is clicked
                        }}
                        sx={{
                          color: "white",
                          marginLeft: "auto", // Align to the right
                        }}
                      >
                        {collapsedItems[`${group.groupName}-${item.name}`] ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </IconButton>
                    )}
                  </ListItem>

                  {/* Subitems (only for collapsible items) */}
                  {item.collapsible && (
                    <Collapse
                      in={
                        !isCollapsed &&
                        collapsedItems[`${group.groupName}-${item.name}`]
                      }
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.subItems.map((subItem, subIndex) => (
                          <ListItem
                            button
                            key={subIndex}
                            // sx={{
                            //   pl: isCollapsed ? "56px" : "64px",
                            // }}
                            // onClick={() =>
                            //   console.log(`Navigate to ${subItem.route}`)
                            // }
                            onClick={() =>
                              handleSubItemClick(group.groupName, subItem)
                            }
                            sx={{
                              pl: isCollapsed ? "56px" : "64px",
                              cursor: "pointer", // Add pointer cursor for subitems
                              backgroundColor:
                                selectedItem ===
                                `${group.groupName}-${subItem.name}`
                                  ? "#34495e" // Highlight the selected subitem
                                  : "transparent",
                              "&:hover": {
                                backgroundColor: "#34495e",
                              },
                            }}
                          >
                            <ListItemText
                              primary={subItem.name}
                              sx={{ fontSize: "14px" }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Bottom Logout */}
      <Box sx={{ margin: "16px" }}>
        <LogoutButton collapsed={isCollapsed} />
      </Box>
    </Box>
  );
};

export default Sidebar;
