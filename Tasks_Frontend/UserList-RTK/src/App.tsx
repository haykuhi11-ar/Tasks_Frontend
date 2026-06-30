import React from "react";
import { router } from "./app/routes";
import { RouterProvider } from "react-router-dom";

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
}