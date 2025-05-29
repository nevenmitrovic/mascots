import { createBrowserRouter } from "react-router";

import Animators from "pages/Animators";
import Calendar from "pages/Calendar";
import Locations from "pages/Locations";
import NotFound from "pages/NotFound";
import SignIn from "pages/SignIn";
import Mascots from "pages/Mascots";
import Finance from "pages/Finance";

import Layout from "./Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Calendar />,
      },
      {
        path: "/animators",
        element: <Animators />,
      },
      {
        path: "/locations",
        element: <Locations />,
      },
      {
        path: "/mascotas",
        element: <Mascots />,
      },
      {
        path: "/finance",
        element: <Finance />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
    errorElement: <NotFound />,
  },
]);
