import { Box } from "@mui/material";

import { Outlet } from "react-router";

import Loading from "./Loading";
import NavBar from "./navbar/NavBar";

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
        <Loading />
      </Box>
    </>
  );
};

export default Layout;
