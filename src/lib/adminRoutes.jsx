import React from "react";
import {
  BsSpeedometer2,
  BsCreditCard2FrontFill,
  BsFillGearFill,
  BsTools,
  BsFillEnvelopeOpenFill,
  BsFillCartCheckFill,
} from "react-icons/bs";
import { FaStore, FaUsers, FaBloggerB, FaTelegramPlane, FaViacoin, FaUsersCog } from "react-icons/fa";
import { BiTransfer, BiLockOpen, BiLogInCircle, BiCoinStack } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import {
  MdOutlineFeaturedPlayList,
  MdSubscriptions,
  MdPayments,
  MdManageAccounts,
  MdInventory,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { GiSettingsKnobs, GiReturnArrow } from "react-icons/gi";
import { TbLanguage, TbFileInvoice } from "react-icons/tb";
import { AiTwotoneSetting, AiOutlineBars, AiOutlineIdcard, AiFillCreditCard } from "react-icons/ai";
import useHasPermission from "../utils/useHasPermission";
//Function to avaoid Repeating Code
function createMenuItem(icon, title, path, access) {
  return {
    icon,
    title,
    path,
    access,
  };
}

const getSidebarAdminRoutes = () => {
  const hasPermission = useHasPermission;
  const routes = [
    createMenuItem(<BsSpeedometer2 />, "Dashboard", "/", true),

    createMenuItem(<TbLanguage />, "Role Management", "/role-management", true),
    createMenuItem(<FaStore />, "Store", "/store", hasPermission("READ_STORE")),
    createMenuItem(<MdOutlineFeaturedPlayList />, "Features", "/features", hasPermission("READ_FEATURE")),
    createMenuItem(<BiTransfer />, "Plans", "/plans", hasPermission("READ_PLAN")),
    createMenuItem(<BiTransfer />, "Subscription Request", "/subscription-request", hasPermission("READ_STORE")),
    createMenuItem(<BiTransfer />, "Pending Store", "/user-created-store", hasPermission("READ_STORE")),
    createMenuItem(<BiTransfer />, "Store Transaction", "/store-transaction", hasPermission("READ_STORE")),
    {
      icon: <IoIosPeople />,
      title: "Admins",
      path: "",
      content: true,
      access: hasPermission("READ_ROLE_PERMISSION"),
      subCategory: [
        createMenuItem(<IoIosPeople />, "Roles", "/roles", hasPermission("READ_ROLE_PERMISSION")),
        createMenuItem(<IoIosPeople />, "Admins", "/admins", hasPermission("READ_ADMIN")),
        createMenuItem(<MdSubscriptions />, "Subscriber", "/subscriber", hasPermission("READ_USER")),
      ],
    },

    //Not Implemented
    {
      icon: <GiSettingsKnobs />,
      title: "Home",
      path: "",
      content: true,
      access: hasPermission(["READ_HOME_SECTION", "READ_SLIDER"]),
      subCategory: [
        createMenuItem(<GiSettingsKnobs />, "Home Section", "/homesection", hasPermission("READ_HOME_SECTION")),
        createMenuItem(<GiSettingsKnobs />, "Slider", "/slider", hasPermission("READ_SLIDER")),
      ],
    },

    createMenuItem(<BiCoinStack />, "Pricing", "/pricing", hasPermission("READ_LANGUAGE")),
    createMenuItem(<FaUsers />, "Tenants", "/tenants", hasPermission("READ_INDUSTRY")),
    createMenuItem(<AiOutlineIdcard />, "Subscriptions", "/subscriptions", hasPermission("READ_GENRE")),
    createMenuItem(<MdPayments />, "Payments", "/payments", hasPermission("READ_QUALITY")),
    createMenuItem(<BsFillEnvelopeOpenFill />, "Subscribers", "/subscribers", hasPermission("READ_CAST")),
    createMenuItem(<MdProductionQuantityLimits />, "Products", "/products", hasPermission("READ_DIRECTOR")),
    createMenuItem(<FaUsers />, "Clients", "/clients", hasPermission("READ_TAG")),
    createMenuItem(<FaUsers />, "Suppliers", "/suppliers", hasPermission("READ_MOVIE")),
    createMenuItem(<FaUsersCog />, "Employees", "/employees", hasPermission("READ_SERIES")),
    createMenuItem(<AiFillCreditCard />, "Accounts", "/accounts", hasPermission("READ_SERIES")),
    createMenuItem(<AiFillCreditCard />, "Balance Transfer", "/balance-transfer", hasPermission("READ_SERIES")),
    createMenuItem(<AiFillCreditCard />, "Expenses", "/expenses", hasPermission("READ_SERIES")),
    createMenuItem(<BsFillCartCheckFill />, "Purchases", "/purchases", hasPermission("READ_SERIES")),
    createMenuItem(<GiReturnArrow />, "Purchase Returns", "/purchase-returns", hasPermission("READ_SERIES")),
    createMenuItem(<TbFileInvoice />, "Invoices", "/invoices", hasPermission("READ_SERIES")),
    createMenuItem(<GiReturnArrow />, "Invoice Returns", "/invoice-returns", hasPermission("READ_SERIES")),
    createMenuItem(<MdPayments />, "Invoice Payments", "/invoice-payments", hasPermission("READ_SERIES")),
    createMenuItem(<MdPayments />, "Purchase Payments", "/purchase-payments", hasPermission("READ_SERIES")),
    createMenuItem(<MdInventory />, "Inventory", "/inventory", hasPermission("READ_SERIES")),
    createMenuItem(<MdManageAccounts />, "Accounts", "/accounts", hasPermission("READ_SERIES")),

    createMenuItem(<FaBloggerB />, "Blog", "/blogs", hasPermission("READ_BLOG")),
    createMenuItem(<MdOutlineFeaturedPlayList />, "Feature", "/applicationfeatures", hasPermission("READ_APPLICATION_FEATURE")),
    createMenuItem(
      <AiTwotoneSetting />,
      "Application Settings",
      "/applicationSettings",
      hasPermission("READ_APPLICATION_SETTING")
    ),
    {
      icon: <GiSettingsKnobs />,
      title: "Footer",
      path: "",
      content: true,
      access: hasPermission(["READ_FOOTER", "READ_SOCIAL"]),
      subCategory: [
        createMenuItem(<GiSettingsKnobs />, "Social", "/social", hasPermission("READ_SOCIAL")),
        createMenuItem(<GiSettingsKnobs />, "Footer Type", "/footer-type", hasPermission("READ_FOOTER")),
      ],
    },
    createMenuItem(<FaViacoin />, "Personalities", "/favoritepersonalities", hasPermission("READ_PERSONALITY")),
    createMenuItem(<BiTransfer />, "Subscription", "/subscription", hasPermission("READ_SUBSCRIPTION")),
  ];
  // Filter the routes based on access
  const filteredRoutes = routes
    .filter((route) => route.access)
    .map((route) => {
      if (route.subCategory) {
        return {
          ...route,
          subCategory: route.subCategory.filter((subRoute) => subRoute.access),
        };
      }
      return route;
    });
  return filteredRoutes;
};

export default getSidebarAdminRoutes;
