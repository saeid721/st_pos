import { createBrowserRouter, Navigate } from "react-router-dom";

import adminRoutes from "./routes/adminRoutes";
import storeRoutes from "./routes/storeRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/store/login" replace />,
  },
  adminRoutes,
  storeRoutes,
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
