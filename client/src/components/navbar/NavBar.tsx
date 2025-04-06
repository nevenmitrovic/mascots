import * as React from "react";
import Box from "@mui/material/Box";
import AppHeader from "./AppHeader";
import SideDrawer from "./SideDrawer";
import { useToggle } from "../../hooks/useToggle";

interface ResponsiveDrawerProps {
  window?: () => Window;
}

export default function NavBar(props: ResponsiveDrawerProps) {
  const { window } = props;
  const [mobileOpen, toggleMobileOpen] = useToggle(false);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppHeader
          handleDrawerToggle={toggleMobileOpen}

        />
        <SideDrawer
          mobileOpen={mobileOpen}
          handleDrawerToggle={toggleMobileOpen}

          container={container}
        />
      </Box>
    </>
  );
}
