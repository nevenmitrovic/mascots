import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import DrawerList from "./DrawerList";

interface SideDrawerProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  container?: () => HTMLElement | null;
}

function SideDrawer({
  mobileOpen,
  handleDrawerToggle,
  container,
}: SideDrawerProps) {
  return (
    <Box
      component="nav"
      sx={{
        width: { md: `var(--drawer-width)` },
        flexShrink: { sm: 0 },
        backgroundColor: "var(--color-primary)",
      }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: `var(--drawer-width)`,
            backgroundColor: "var(--color-primary)",
            height: "100dvh",
          },
        }}
        slotProps={{
          root: {
            keepMounted: true,
          },
        }}
      >
        <Toolbar />
        <DrawerList handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "var(--drawer-width)",
            height: "100dvh",
            backgroundColor: "var(--color-primary)",
          },
        }}
        open
      >
        <Toolbar />
        <DrawerList handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
    </Box>
  );
}

export default SideDrawer;
