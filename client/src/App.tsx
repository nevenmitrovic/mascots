import { RouterProvider } from "react-router";
import { router } from "./components/routes";
import LocationContextProvider from "./store/LocationContext";

function App() {
  return (
    <LocationContextProvider>
      <RouterProvider router={router} />
    </LocationContextProvider>
  );
}

export default App;
