import React from "react";
import PageRoute from "../../../Components/Shared/PageHeader/PageRoute";

const generateRoutes = (rootPath, components) => {
  return {
    path: rootPath,
    children: [
      {
        path: "",
        element: React.createElement(PageRoute, null, components.root),
      },
      {
        path: "new",
        element: React.createElement(PageRoute, null, components.new),
      },
      {
        path: ":id",
        children: [
          {
            path: "",
            element: React.createElement(PageRoute, null, components.view),
          },
          {
            path: "edit",
            element: React.createElement(PageRoute, null, components.edit),
          },
        ],
      },
    ],
  };
};

export default generateRoutes;
