import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router";
import Loading from "./components/Loading";
import { router } from "./components/routes";
import { queryClient } from "./reactQuery/queryClient";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={router} />;
        <ReactQueryDevtools initialIsOpen={false} />
        <Loading />
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
