import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface AppHeaderProps {
  handleDrawerToggle: () => void;
}

function AppHeader({ handleDrawerToggle }: AppHeaderProps) {
  return (
    <AppBar
      sx={{
        width: { md: `calc(100% - var(--drawer-width))` },
        backgroundColor: "var(--color-primary)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: { xs: "space-between", md: "flex-end" },
          height: "var(--header-height)",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
