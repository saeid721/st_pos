import React from "react";
import PageRoute from "../../../Components/Shared/PageHeader/PageRoute";

const RouteLoadingFallback = () => (
  <div className="flex min-h-[160px] items-center justify-center p-6" aria-live="polite">
    <span className="text-sm text-slate-500 dark:text-slate-400">Loading...</span>
  </div>
);

const wrap = (component) => (
  <React.Suspense fallback={<RouteLoadingFallback />}>
    <PageRoute>{component}</PageRoute>
  </React.Suspense>
);

const generateRoutes = (rootPath, components) => {
  return {
    path: rootPath,
    children: [
      { path: "", element: wrap(components.root) },
      { path: "new", element: wrap(components.new) },
      {
        path: ":id",
        children: [
          { path: "", element: wrap(components.view) },
          { path: "edit", element: wrap(components.edit) },
        ],
      },
    ],
  };
};

export default generateRoutes;
