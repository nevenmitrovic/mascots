import { createBrowserRouter } from "react-router";
import Calendar from "../pages/Calendar";
import Layout from "./Layout";
import NotFound from "../pages/NotFound";
import Locations from "../pages/Locations";
import Animators from "../pages/Animators";

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
        element: <Animators/>
      },
      {
        path: "/locations",
        element: <Locations />,
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
