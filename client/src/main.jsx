import React from "react";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Main from "./components/Main.jsx";
import SignIn from "./components/SignIn.jsx";
import Register from "./components/Register.jsx";
import Dummy from "./components/Dummy.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Main /> },
      { path: "signin", element: <SignIn /> },
      { path: "register", element: <Register /> },
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "dummy", element: <Dummy /> },
          // { path: "workout/create", element: <Create /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
