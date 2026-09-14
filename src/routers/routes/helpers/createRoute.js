import React from "react";
import PageRoute from "../../../Components/Shared/PageHeader/PageRoute";

const createRoute = (path, component) => {
  return {
    path: path,
    element: React.createElement(PageRoute, null, component),
  };
};
export default createRoute;
