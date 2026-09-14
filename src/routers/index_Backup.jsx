import { createBrowserRouter, Navigate } from "react-router-dom";
import ApplicationFeatures from "../Components/Pages/ApplicationFeature/ApplicationFeatures";
import ApplicationFeaturesAdd from "../Components/Pages/ApplicationFeature/ApplicationFeaturesAdd";
import ApplicationFeaturesEdit from "../Components/Pages/ApplicationFeature/ApplicationFeaturesEdit";
import ApplicationFeaturesView from "../Components/Pages/ApplicationFeature/ApplicationFeaturesView";
import ApplicationSettingsEdit from "../Components/Pages/ApplicationSettings/ApplicationSettingsEdit";
import Dashboard from "../Components/Pages/Dashboard/Dashboard";
import Languages from "../Components/Pages/Language/Languages";
import LanguagesAdd from "../Components/Pages/Language/LanguagesAdd";
import LanguagesEdit from "../Components/Pages/Language/LanguagesEdit";
import LanguagesView from "../Components/Pages/Language/LanguagesView";
import Login from "../Components/Pages/Login/Login";
import ProfilePage from "../Components/Pages/ProfilePage/ProfilePage";
import Roles from "../Components/Pages/Role/Roles";
import RolesAdd from "../Components/Pages/Role/RolesAdd";
import RolesEdit from "../Components/Pages/Role/RolesEdit";
import RolesView from "../Components/Pages/Role/RolesView";
import RoleManagement from "../Components/Pages/RoleManagement/RoleManagement";
import Subscriber from "../Components/Pages/Subscriber/Subscriber";
import Subscriptions from "../Components/Pages/Subscriptions/Subscriptions";
import SubscriptionsAdd from "../Components/Pages/Subscriptions/SubscriptionsAdd";
import SubscriptionsEdit from "../Components/Pages/Subscriptions/SubscriptionsEdit";
import SubscriptionsView from "../Components/Pages/Subscriptions/SubscriptionsView";
import SuperAdmin from "../Components/Pages/SuperAdmin/SuperAdmin";
import SuperAdminAdd from "../Components/Pages/SuperAdmin/SuperAdminAdd";
import SuperAdminEdit from "../Components/Pages/SuperAdmin/SuperAdminEdit";
import SuperAdminView from "../Components/Pages/SuperAdmin/SuperAdminView";
import Layout from "../Layout/Layout";
import Socials from "../Components/Pages/Social/Socials";
import SocialsAdd from "../Components/Pages/Social/SocialsAdd";
import SocialsView from "../Components/Pages/Social/SocialsView";
import SocialsEdit from "../Components/Pages/Social/SocialsEdit";
import FooterType from "../Components/Pages/FooterType/FooterType";
import FooterTypeWisedFooter from "../Components/Pages/FooterType/FooterTypeWisedFooter";
import AddFooter from "../Components/Pages/FooterType/AddFooter";
import FooterUpdate from "../Components/Pages/FooterType/FooterUpdate";
import ChangePassword from "../Components/Pages/ChangePassword/ChangePassword";
import Features from "../Components/Pages/Features/Features";
import FeaturesAdd from "../Components/Pages/Features/FeaturesAdd";
import FeaturesView from "../Components/Pages/Features/FeaturesView";
import FeaturesEdit from "../Components/Pages/Features/FeaturesEdit";
import Plans from "../Components/Pages/Plans/Plans";
import PlansAdd from "../Components/Pages/Plans/PlansAdd";
import PlansView from "../Components/Pages/Plans/PlansView";
import PlansEdit from "../Components/Pages/Plans/PlansEdit";
import Store from "../Components/Pages/Store/Store";
import StoreAdd from "../Components/Pages/Store/StoreAdd";
import StoreView from "../Components/Pages/Store/Storeview";
import StoreEdit from "../Components/Pages/Store/StoreEdit";
import LoginStore from "../Components/Pages/Login/LoginStore";
import StoreUser from "../Components/Pages/StoreUser/StoreUser";
import StoreUserAdd from "../Components/Pages/StoreUser/StoreUserAdd";
import StoreUserView from "../Components/Pages/StoreUser/StoreUserView";
import StoreUserEdit from "../Components/Pages/StoreUser/StoreUserEdit";
import StoreRoleManagement from "../Components/Pages/RoleManagement/StoreRoleManagement";
import RolesStore from "../Components/Pages/RolesStore/RolesStore";
import RolesStoreAdd from "../Components/Pages/RolesStore/RolesStoreAdd";
import RolesStoreView from "../Components/Pages/RolesStore/RolesStoreView";
import RolesStoreEdit from "../Components/Pages/RolesStore/RolesStoreEdit";
import Category from "../Components/Pages/Category/Category";
import CategoryAdd from "../Components/Pages/Category/CategoryAdd";
import CategoryView from "../Components/Pages/Category/CategoryView";
import CategoryEdit from "../Components/Pages/Category/CategoryEdit";
import SubCategory from "../Components/Pages/SubCategory/SubCategory";
import SubCategoryAdd from "../Components/Pages/SubCategory/SubCategoryAdd";
import SubCategoryView from "../Components/Pages/SubCategory/SubCategoryView";
import SubCategoryEdit from "../Components/Pages/SubCategory/SubCategoryEdit";
import Suppliers from "../Components/Pages/Suppliers/Suppliers";
import SuppliersAdd from "../Components/Pages/Suppliers/SuppliersAdd";
import SuppliersView from "../Components/Pages/Suppliers/SuppliersView";
import SuppliersEdit from "../Components/Pages/Suppliers/SuppliersEdit";
import Error from "../404";
import Brand from "../Components/Pages/Brand/Brand";
import BrandAdd from "../Components/Pages/Brand/BrandAdd";
import BrandView from "../Components/Pages/Brand/BrandView";
import BrandEdit from "../Components/Pages/Brand/BrandEdit";
import Unit from "../Components/Pages/Unit/Unit";
import UnitAdd from "../Components/Pages/Unit/UnitAdd";
import UnitView from "../Components/Pages/Unit/UnitView";
import UnitEdit from "../Components/Pages/Unit/UnitEdit";
import Tax from "../Components/Pages/Tax/Tax";
import TaxAdd from "../Components/Pages/Tax/TaxAdd";
import TaxView from "../Components/Pages/Tax/TaxView";
import TaxEdit from "../Components/Pages/Tax/TaxEdit";
import Products from "../Components/Pages/Products/Products";
import ProductsAdd from "../Components/Pages/Products/ProductsAdd";
import ProductsView from "../Components/Pages/Products/ProductsView";
import ProductsEdit from "../Components/Pages/Products/ProductsEdit";
import Account from "../Components/Pages/Account/Account";
import AccountAdd from "../Components/Pages/Account/AccountAdd";
import AccountView from "../Components/Pages/Account/AccountView";
import AccountEdit from "../Components/Pages/Account/AccountEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/store/login" replace />,
  },
  {
    path: "admin",
    // errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Login />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
      {
        path: "dashboard",
        element: <Layout type="1" />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "role-management",
            children: [
              {
                path: "",
                element: <RoleManagement />,
              },
            ],
          },

          {
            path: "languages",
            children: [
              {
                path: "",
                element: <Languages />,
              },
              {
                path: "new",
                element: <LanguagesAdd />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "",
                    element: <LanguagesView />,
                  },
                  {
                    path: "edit",
                    element: <LanguagesEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: "store",
            children: [
              {
                path: "",
                element: <Store />,
              },
              {
                path: "new",
                element: <StoreAdd />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "",
                    element: <StoreView />,
                  },
                  {
                    path: "edit",
                    element: <StoreEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: "features",
            children: [
              {
                path: "",
                element: <Features />,
              },
              {
                path: "new",
                element: <FeaturesAdd />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "",
                    element: <FeaturesView />,
                  },
                  {
                    path: "edit",
                    element: <FeaturesEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: "plans",
            children: [
              {
                path: "",
                element: <Plans />,
              },
              {
                path: "new",
                element: <PlansAdd />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "",
                    element: <PlansView />,
                  },
                  {
                    path: "edit",
                    element: <PlansEdit />,
                  },
                ],
              },
            ],
          },

          {
            path: "applicationfeatures",
            children: [
              {
                path: "",
                element: <ApplicationFeatures />,
              },
              {
                path: "new",
                element: <ApplicationFeaturesAdd />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "",
                    element: <ApplicationFeaturesView />,
                  },
                  {
                    path: "edit",
                    element: <ApplicationFeaturesEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: "applicationSettings",
            children: [
              {
                path: "",
                element: <ApplicationSettingsEdit />,
              },
            ],
          },
          {
            path: "change-password",
            children: [
              {
                path: "",
                element: <ChangePassword />,
              },
            ],
          },
          {
            path: "",
            children: [
              {
                path: "roles",
                children: [
                  {
                    path: "",
                    element: <Roles />,
                  },
                  {
                    path: "new",
                    element: <RolesAdd />,
                  },
                  {
                    path: ":id",
                    children: [
                      {
                        path: "",
                        element: <RolesView />,
                      },
                      {
                        path: "edit",
                        element: <RolesEdit />,
                      },
                    ],
                  },
                ],
              },
              {
                path: "admins",
                children: [
                  {
                    path: "",
                    element: <SuperAdmin />,
                  },
                  {
                    path: "new",
                    element: <SuperAdmin />,
                  },
                  {
                    path: ":id",
                    children: [
                      {
                        path: "",
                        element: <SuperAdminView />,
                      },
                      {
                        path: "edit",
                        element: <SuperAdminEdit />,
                      },
                    ],
                  },
                ],
              },
              {
                path: "subscriber",
                element: <Subscriber />,
              },
              {
                path: "subadmin",
                element: "Sub Admin",
              },
              {
                path: "deletedusers",
                element: "Deleted Users",
              },
            ],
          },

          {
            path: "subscription",
            children: [
              {
                path: "",
                element: <Subscriptions />,
              },
              {
                path: "new",
                element: <SubscriptionsAdd />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "",
                    element: <SubscriptionsView />,
                  },
                  {
                    path: "edit",
                    element: <SubscriptionsEdit />,
                  },
                ],
              },
            ],
          },

          {
            path: "social",
            children: [
              {
                path: "",
                element: <Socials />,
              },
              {
                path: "new",
                element: <SocialsAdd />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "",
                    element: <SocialsView />,
                  },
                  {
                    path: "edit",
                    element: <SocialsEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: "footer-type",
            children: [
              {
                path: "",
                element: <FooterType />,
              },
              {
                path: ":footer_type",
                children: [
                  {
                    path: "",
                    element: <FooterTypeWisedFooter />,
                  },
                  {
                    path: "new",
                    element: <AddFooter />,
                  },
                  {
                    path: ":id",
                    children: [
                      {
                        path: "edit",
                        element: <FooterUpdate />,
                      },
                    ],
                  },
                ],
              },
            ],
          },

          {
            path: "coupons",
            element: "Coupons",
          },
          {
            path: "paymentgateway",
            element: "Payment Gateway",
          },
          {
            path: "transactions",
            element: "Transactions",
          },

          {
            path: "",
            children: [
              {
                path: "pages",
                element: "Pages",
              },
              {
                path: "addpage",
                element: "Add Page",
              },
            ],
          },
          {
            path: "settings",
            children: [
              {
                path: "general",
                element: "General",
              },
              {
                path: "smtpemail",
                element: "SMTP Email",
              },
              {
                path: "sociallogin",
                element: "Social Login",
              },
              {
                path: "menu",
                element: "Menu",
              },
              {
                path: "maintenance",
                element: "Maintenance",
              },
            ],
          },
          {
            path: "appverify",
            element: "App Verify",
          },
        ],
      },
    ],
  },
  {
    path: "store",
    // errorElement: <Error />,
    children: [
      {
        path: "",
        element: <LoginStore />,
        children: [
          {
            path: "login",
            element: <LoginStore />,
          },
        ],
      },
      {
        path: "dashboard",
        element: <Layout type="1" />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "role-management",
            children: [
              {
                path: "",
                element: <StoreRoleManagement />,
              },
            ],
          },

          {
            path: "applicationSettings",
            children: [
              {
                path: "",
                element: <ApplicationSettingsEdit />,
              },
            ],
          },
          {
            path: "change-password",
            children: [
              {
                path: "",
                element: <ChangePassword />,
              },
            ],
          },
          {
            path: "category",
            children: [
              {
                path: "",
                element: <Category />,
              },
              {
                path: "new",
                element: <CategoryAdd />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "",
                    element: <CategoryView />,
                  },
                  {
                    path: "edit",
                    element: <CategoryEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: "sub-category",
            children: [
              {
                path: "",
                element: <SubCategory />,
              },
              {
                path: "new",
                element: <SubCategoryAdd />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "",
                    element: <SubCategoryView />,
                  },
                  {
                    path: "edit",
                    element: <SubCategoryEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: "suppliers",
            children: [
              {
                path: "",
                element: <Suppliers />,
              },
              {
                path: "new",
                element: <SuppliersAdd />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "",
                    element: <SuppliersView />,
                  },
                  {
                    path: "edit",
                    element: <SuppliersEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: "brand",
            children: [
              {
                path: "",
                element: <Brand />,
              },
              {
                path: "new",
                element: <BrandAdd />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "",
                    element: <BrandView />,
                  },
                  {
                    path: "edit",
                    element: <BrandEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: "unit",
            children: [
              {
                path: "",
                element: <Unit />,
              },
              {
                path: "new",
                element: <UnitAdd />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "",
                    element: <UnitView />,
                  },
                  {
                    path: "edit",
                    element: <UnitEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: "tax",
            children: [
              {
                path: "",
                element: <Tax />,
              },
              {
                path: "new",
                element: <TaxAdd />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "",
                    element: <TaxView />,
                  },
                  {
                    path: "edit",
                    element: <TaxEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: "product",
            children: [
              {
                path: "",
                element: <Products />,
              },
              {
                path: "new",
                element: <ProductsAdd />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "",
                    element: <ProductsView />,
                  },
                  {
                    path: "edit",
                    element: <ProductsEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: "account",
            children: [
              {
                path: "",
                element: <Account />,
              },
              {
                path: "new",
                element: <AccountAdd />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "",
                    element: <AccountView />,
                  },
                  {
                    path: "edit",
                    element: <AccountEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: "",
            children: [
              {
                path: "store-roles",
                children: [
                  {
                    path: "",
                    element: <RolesStore />,
                  },
                  {
                    path: "new",
                    element: <RolesStoreAdd />,
                  },
                  {
                    path: ":id",
                    children: [
                      {
                        path: "",
                        element: <RolesStoreView />,
                      },
                      {
                        path: "edit",
                        element: <RolesStoreEdit />,
                      },
                    ],
                  },
                ],
              },
              {
                path: "store-users",
                children: [
                  {
                    path: "",
                    element: <StoreUser />,
                  },
                  {
                    path: "new",
                    element: <StoreUserAdd />,
                  },
                  {
                    path: ":id",
                    children: [
                      {
                        path: "",
                        element: <StoreUserView />,
                      },
                      {
                        path: "edit",
                        element: <StoreUserEdit />,
                      },
                    ],
                  },
                ],
              },
              {
                path: "subscriber",
                element: <Subscriber />,
              },
              {
                path: "subadmin",
                element: "Sub Admin",
              },
              {
                path: "deletedusers",
                element: "Deleted Users",
              },
            ],
          },

          {
            path: "subscription",
            children: [
              {
                path: "",
                element: <Subscriptions />,
              },
              {
                path: "new",
                element: <SubscriptionsAdd />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "",
                    element: <SubscriptionsView />,
                  },
                  {
                    path: "edit",
                    element: <SubscriptionsEdit />,
                  },
                ],
              },
            ],
          },

          {
            path: "social",
            children: [
              {
                path: "",
                element: <Socials />,
              },
              {
                path: "new",
                element: <SocialsAdd />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "",
                    element: <SocialsView />,
                  },
                  {
                    path: "edit",
                    element: <SocialsEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: "footer-type",
            children: [
              {
                path: "",
                element: <FooterType />,
              },
              {
                path: ":footer_type",
                children: [
                  {
                    path: "",
                    element: <FooterTypeWisedFooter />,
                  },
                  {
                    path: "new",
                    element: <AddFooter />,
                  },
                  {
                    path: ":id",
                    children: [
                      {
                        path: "edit",
                        element: <FooterUpdate />,
                      },
                    ],
                  },
                ],
              },
            ],
          },

          {
            path: "coupons",
            element: "Coupons",
          },
          {
            path: "paymentgateway",
            element: "Payment Gateway",
          },
          {
            path: "transactions",
            element: "Transactions",
          },

          {
            path: "",
            children: [
              {
                path: "pages",
                element: "Pages",
              },
              {
                path: "addpage",
                element: "Add Page",
              },
            ],
          },
          {
            path: "settings",
            children: [
              {
                path: "general",
                element: "General",
              },
              {
                path: "smtpemail",
                element: "SMTP Email",
              },
              {
                path: "sociallogin",
                element: "Social Login",
              },
              {
                path: "menu",
                element: "Menu",
              },
              {
                path: "maintenance",
                element: "Maintenance",
              },
            ],
          },
          {
            path: "appverify",
            element: "App Verify",
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
