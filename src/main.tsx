import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home/home.page";
import SignIn from "./pages/sign-in.page";
import SignUp from "./pages/sign-up.page";
import MainLayout from "./layout/MainLayout";
import JobPage from "./pages/Job/Job.page";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "home", element: <Home /> },
          {
            path: "job/",
            children: [
              {
                path: ":id",
                element: <JobPage />,
              },
            ],
          },
        ],
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
