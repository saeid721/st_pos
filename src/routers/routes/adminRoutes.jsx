import { useRouteError } from "react-router-dom";
import ApplicationFeatures from "../../Components/Pages/ApplicationFeature/ApplicationFeatures";
import ApplicationFeaturesAdd from "../../Components/Pages/ApplicationFeature/ApplicationFeaturesAdd";
import ApplicationFeaturesEdit from "../../Components/Pages/ApplicationFeature/ApplicationFeaturesEdit";
import ApplicationFeaturesView from "../../Components/Pages/ApplicationFeature/ApplicationFeaturesView";
import ApplicationSettingsEdit from "../../Components/Pages/ApplicationSettings/ApplicationSettingsEdit";
import Dashboard from "../../Components/Pages/Dashboard/Dashboard";

import Login from "../../Components/Pages/Login/Login";
import ProfilePage from "../../Components/Pages/ProfilePage/ProfilePage";
import Roles from "../../Components/Pages/Role/Roles";
import RolesAdd from "../../Components/Pages/Role/RolesAdd";
import RolesEdit from "../../Components/Pages/Role/RolesEdit";
import RolesView from "../../Components/Pages/Role/RolesView";
import RoleManagement from "../../Components/Pages/RoleManagement/RoleManagement";
import Subscriber from "../../Components/Pages/Subscriber/Subscriber";
import SuperAdmin from "../../Components/Pages/SuperAdmin/SuperAdmin";
import SuperAdminAdd from "../../Components/Pages/SuperAdmin/SuperAdminAdd";
import SuperAdminEdit from "../../Components/Pages/SuperAdmin/SuperAdminEdit";
import SuperAdminView from "../../Components/Pages/SuperAdmin/SuperAdminView";
import Layout from "../../Layout/Layout";
import ChangePassword from "../../Components/Pages/ChangePassword/ChangePassword";
import Features from "../../Components/Pages/Features/Features";
import FeaturesAdd from "../../Components/Pages/Features/FeaturesAdd";
import FeaturesView from "../../Components/Pages/Features/FeaturesView";
import FeaturesEdit from "../../Components/Pages/Features/FeaturesEdit";
import Plans from "../../Components/Pages/Plans/Plans";
import PlansAdd from "../../Components/Pages/Plans/PlansAdd";
import PlansView from "../../Components/Pages/Plans/PlansView";
import PlansEdit from "../../Components/Pages/Plans/PlansEdit";
import Store from "../../Components/Pages/Store/Store";
import StoreAdd from "../../Components/Pages/Store/StoreAdd";
import StoreView from "../../Components/Pages/Store/Storeview";
import StoreEdit from "../../Components/Pages/Store/StoreEdit";
import generateRoutes from "./helpers/generateRoutes";
import createRoute from "./helpers/createRoute";
import SubscriptionRequest from "../../Components/Pages/SubscriptionRequest/SubscriptionRequest";
import UserCreatedStore from "../../Components/Pages/UserCreatedStore/UserCreatedStore";
import StoreTransaction from "../../Components/Pages/StoreTransaction/StoreTransaction";

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
