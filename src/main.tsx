import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import AuthRoot from "./pages/Auth/AuthRoot";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import ReadProducts from "./pages/ReadProducts/ReadProducts";
import DetailsProduct from "./pages/DetailsProduct/DetailsProduct";
import AddProduct from "./pages/AddProduct";
import EditeProduct from "./pages/EditeProduct";
const routes = createHashRouter([
  {
    path: "/",
    element: <AuthRoot />,
    children: [
      {
        path: "",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <ReadProducts />,
      },
      {
        path: "detailsProduct/:id",
        element: <DetailsProduct />,
      },
      {
        path: "add",
        element: <AddProduct />,
      },
      {
        path: "edite/:id",
        element: <EditeProduct />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
);
