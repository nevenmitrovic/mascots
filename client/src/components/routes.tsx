import { createBrowserRouter } from "react-router";
import Calendar from "../pages/Calendar";
import Layout from "./Layout";
import NotFound from "../pages/NotFound";
import Locations from "../pages/Locations";

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
      },
      {
        path: "/locations",
        element:<Locations/>
      },
      {
        path: "/mascotas",
      },
      {
        path: "/finance",
      },
    ],
  },
]);
