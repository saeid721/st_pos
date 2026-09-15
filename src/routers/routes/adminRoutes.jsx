import React from "react";
import { useRouteError } from "react-router-dom";
const ApplicationFeatures = React.lazy(() => import("../../Components/Pages/ApplicationFeature/ApplicationFeatures"));
const ApplicationFeaturesAdd = React.lazy(() => import("../../Components/Pages/ApplicationFeature/ApplicationFeaturesAdd"));
const ApplicationFeaturesEdit = React.lazy(() => import("../../Components/Pages/ApplicationFeature/ApplicationFeaturesEdit"));
const ApplicationFeaturesView = React.lazy(() => import("../../Components/Pages/ApplicationFeature/ApplicationFeaturesView"));
const ApplicationSettingsEdit = React.lazy(() => import("../../Components/Pages/ApplicationSettings/ApplicationSettingsEdit"));
const Dashboard = React.lazy(() => import("../../Components/Pages/Dashboard/Dashboard"));

const Login = React.lazy(() => import("../../Components/Pages/Login/Login"));
const ProfilePage = React.lazy(() => import("../../Components/Pages/ProfilePage/ProfilePage"));
const Roles = React.lazy(() => import("../../Components/Pages/Role/Roles"));
const RolesAdd = React.lazy(() => import("../../Components/Pages/Role/RolesAdd"));
const RolesEdit = React.lazy(() => import("../../Components/Pages/Role/RolesEdit"));
const RolesView = React.lazy(() => import("../../Components/Pages/Role/RolesView"));
const RoleManagement = React.lazy(() => import("../../Components/Pages/RoleManagement/RoleManagement"));
const Subscriber = React.lazy(() => import("../../Components/Pages/Subscriber/Subscriber"));
const SuperAdmin = React.lazy(() => import("../../Components/Pages/SuperAdmin/SuperAdmin"));
const SuperAdminAdd = React.lazy(() => import("../../Components/Pages/SuperAdmin/SuperAdminAdd"));
const SuperAdminEdit = React.lazy(() => import("../../Components/Pages/SuperAdmin/SuperAdminEdit"));
const SuperAdminView = React.lazy(() => import("../../Components/Pages/SuperAdmin/SuperAdminView"));
import Layout from "../../Layout/Layout";
const ChangePassword = React.lazy(() => import("../../Components/Pages/ChangePassword/ChangePassword"));
const Features = React.lazy(() => import("../../Components/Pages/Features/Features"));
const FeaturesAdd = React.lazy(() => import("../../Components/Pages/Features/FeaturesAdd"));
const FeaturesView = React.lazy(() => import("../../Components/Pages/Features/FeaturesView"));
const FeaturesEdit = React.lazy(() => import("../../Components/Pages/Features/FeaturesEdit"));
const Plans = React.lazy(() => import("../../Components/Pages/Plans/Plans"));
const PlansAdd = React.lazy(() => import("../../Components/Pages/Plans/PlansAdd"));
const PlansView = React.lazy(() => import("../../Components/Pages/Plans/PlansView"));
const PlansEdit = React.lazy(() => import("../../Components/Pages/Plans/PlansEdit"));
const Store = React.lazy(() => import("../../Components/Pages/Store/Store"));
const StoreAdd = React.lazy(() => import("../../Components/Pages/Store/StoreAdd"));
const StoreView = React.lazy(() => import("../../Components/Pages/Store/Storeview"));
const StoreEdit = React.lazy(() => import("../../Components/Pages/Store/StoreEdit"));
import generateRoutes from "./helpers/generateRoutes";
import createRoute from "./helpers/createRoute";
const SubscriptionRequest = React.lazy(() => import("../../Components/Pages/SubscriptionRequest/SubscriptionRequest"));
const UserCreatedStore = React.lazy(() => import("../../Components/Pages/UserCreatedStore/UserCreatedStore"));
const StoreTransaction = React.lazy(() => import("../../Components/Pages/StoreTransaction/StoreTransaction"));

const allRoutes = {
  store: generateRoutes("store", {
    root: <Store />,
    new: <StoreAdd />,
    view: <StoreView />,
    edit: <StoreEdit />,
  }),
  features: generateRoutes("features", {
    root: <Features />,
    new: <FeaturesAdd />,
    view: <FeaturesView />,
    edit: <FeaturesEdit />,
  }),
  plans: generateRoutes("plans", {
    root: <Plans />,
    new: <PlansAdd />,
    view: <PlansView />,
    edit: <PlansEdit />,
  }),
  roles: generateRoutes("roles", {
    root: <Roles />,
    new: <RolesAdd />,
    view: <RolesView />,
    edit: <RolesEdit />,
  }),
  admins: generateRoutes("admins", {
    root: <SuperAdmin />,
    new: <SuperAdminAdd />,
    view: <SuperAdminView />,
    edit: <SuperAdminEdit />,
  }),
  applicationfeatures: generateRoutes("applicationfeatures", {
    root: <ApplicationFeatures />,
    new: <ApplicationFeaturesAdd />,
    view: <ApplicationFeaturesView />,
    edit: <ApplicationFeaturesEdit />,
  }),
};

function RouteErrorBoundary() {
  const error = useRouteError();

  console.error("ROUTE ERROR:", error);

  return (
    <div className="p-6 text-red-600">
      <h2>Route crashed</h2>
      <pre>{error?.message || error?.statusText || "Something went wrong"}</pre>
    </div>
  );
}


const adminRoutes = {
  path: "admin",
  // errorElement: <Error />,
  children: [
    {
      path: "",
      element: <Login />,
      children: [createRoute("login", <Login />)],
    },
    {
      path: "dashboard",
      element: <Layout type="1" />,
        errorElement: <RouteErrorBoundary />,
      children: [
        createRoute("", <Dashboard />),
        createRoute("subscription-request", <SubscriptionRequest />),
        createRoute("user-created-store", <UserCreatedStore />),
        createRoute("store-transaction", <StoreTransaction />),
        createRoute("profile", <ProfilePage />),
        createRoute("role-management", <RoleManagement />),
        createRoute("applicationSettings", <ApplicationSettingsEdit />),
        createRoute("change-password", <ChangePassword />),

        allRoutes.store,
        allRoutes.features,
        allRoutes.plans,
        allRoutes.applicationfeatures,
        {
          path: "",
          children: [
            allRoutes.roles,
            allRoutes.admins,
            createRoute("subscriber", <Subscriber />),
            createRoute("subadmin", "Sub Admin"),
            createRoute("deletedusers", "Deleted Users"),
          ],
        },
      ],
    },
  ],
};

export default adminRoutes;
