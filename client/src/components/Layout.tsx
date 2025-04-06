import { Outlet } from "react-router";
import NavBar from "./navbar/NavBar";
import { Box } from "@mui/material";

export const appBarHeight = 64;

const Layout = () => {
  return (
    <>
      <NavBar />
      <Box
        position={"absolute"}
        bottom={0}
        right={0}
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { xs: "100%", md: `calc(100% - var(--drawer-width))` },
          height: `calc(100dvh - ${appBarHeight}px)`,
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
