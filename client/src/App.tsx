import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router";
import { router } from "./components/routes";
import { queryClient } from "./reactQuery/queryClient";
import Loading from "./components/Loading";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
      <Loading />
    </QueryClientProvider>
  );
}

export default App;
