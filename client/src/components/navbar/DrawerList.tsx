import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/material";

import { NavLink, useLocation } from "react-router";

import { NavData } from "./NavData";

interface DrawerListProps {
  handleDrawerToggle: () => void;
}

function DrawerList({ handleDrawerToggle }: DrawerListProps) {
  const location = useLocation();
  return (
    <Box>
      <List sx={{ backgroundColor: "var(--color-primary)",p:0 }}>
        {NavData.map((item) => {
          const { label, Icon, path } = item;
          const isActive = location.pathname === path;
          return (
            <ListItem
              key={label}
              disablePadding
              sx={{
                backgroundColor: isActive
                  ? "var(--color-secondary)"
                  : "inherit",
              }}
            >
              <NavLink to={path}>
                <ListItemButton onClick={handleDrawerToggle}>
                  <ListItemIcon sx={{ color: "var(--color-text-light)" }}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={{ color: "var(--color-text-light)" }}
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default DrawerList;
