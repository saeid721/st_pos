import React from "react";
import PageRoute from "../../../Components/Shared/PageHeader/PageRoute";

const RouteLoadingFallback = () => (
  <div className="flex min-h-[160px] items-center justify-center p-6" aria-live="polite">
    <span className="text-sm text-slate-500 dark:text-slate-400">Loading...</span>
  </div>
);

const createRoute = (path, component) => ({
  path,
  element: (
    <React.Suspense fallback={<RouteLoadingFallback />}>
      <PageRoute>{component}</PageRoute>
    </React.Suspense>
  ),
});

export default createRoute;
