import React from "react";

import {
  BsCalculatorFill,
  BsFillGearFill,
  BsTools,
  BsUpcScan, // Added for Barcode
} from "react-icons/bs";
import {
  FaUsers,
  FaBloggerB,
  FaTelegramPlane,
  FaFileInvoice,
  FaTag,
  FaShoppingBasket, // Added for Purchases
  FaPiggyBank, // Added for Loan Management
  FaBuilding, // Added for Authorities
  FaPeopleCarry, // Added for Suppliers
  FaUserCog, // Added for Employees main
  FaWarehouse, // Added for Inventory
  FaCouch, // Added for Asset Management
  FaFileInvoiceDollar, // Added for Balance Sheet
} from "react-icons/fa";
import {
  BiTransfer,
  BiLockOpen,
  BiLogInCircle,
  BiCategoryAlt,
  BiPurchaseTag,
} from "react-icons/bi";
import {
  MdAccountBalanceWallet,
  MdOutlineBusinessCenter,
  MdOutlineSettingsApplications,
  MdPointOfSale, // Added for POS
  MdHistory, // Added for Transaction History
  MdOutlineInventory, // Added for View Inventory
} from "react-icons/md";
import { GiSettingsKnobs } from "react-icons/gi";
import {
  AiOutlineBars,
  AiOutlineSetting,
  AiOutlineHome,
} from "react-icons/ai";
import { DiGitBranch } from "react-icons/di";
import { HiOutlineDocumentReport } from "react-icons/hi";

import useHasPermission from "../utils/useHasPermission";
import hasStorePermission from "../utils/hasStorePermission";
import {
  FiBarChart2,
  FiBook,
  FiBox,
  FiClipboard,
  FiCreditCard,
  FiFileText,
  FiGlobe,
  FiGrid,
  FiList,
  FiPieChart,
  FiSettings,
  FiShoppingBag,
  FiTrendingUp,
  FiUsers,
  FiRotateCcw, // Added for Return List
  FiSliders, // Added for Adjustments
  FiDatabase, // Added for Departments
  FiRepeat, // Added for Transactions
} from "react-icons/fi";
import { CiReceipt, CiSettings } from "react-icons/ci";

const getSidebarStoreRoutes = () => {
  const hasPermission = useHasPermission;
  const routes = [
    {
      icon: <AiOutlineHome />,
      title: "Dashboard",
      path: "/",
      access: true,
    },

    // {
    //   icon: <FiSettings />,
    //   title: "Role Management",
    //   path: "/role-management",
    //   access: true,
    // },
    // {
    //   icon: <AiOutlineBranches />,
    //   title: "Branch",
    //   path: "/branches",
    //   // access: true,
    //   access: hasStorePermission("READ_BRANCH"),
    // },
      {
      icon: <FiShoppingBag />, // Matches sales bag icon
      title: "Sales",
      path: "",
      content: true,
      access: hasStorePermission("READ_QUOTATION"),
      subCategory: [
        {
          icon: <FiList />, // Updated icon
          title: "Quotations List", // Renamed to match image
          path: "/quotation-list",
          access: hasStorePermission("READ_QUOTATION"),
        },
        {
          icon: <FiFileText />, // Updated icon
          title: "Invoices List",
          path: "/invoices-list",
          access: hasStorePermission("READ_INVOICE"),
        },
        {
          icon: <MdPointOfSale />, // Updated POS icon
          title: "POS",
          path: "/POS",
          access: true,
        },
        {
          icon: <FiRotateCcw />, // Updated to circular return arrow
          title: "Returns List",
          path: "/invoice-returns",
          access: hasStorePermission("READ_INVOICE"),
        },
      ],
    },

    {
      icon: <FaShoppingBasket />, // Updated to Basket icon
      title: "Purchases",
      path: "",
      content: true,
      access: hasStorePermission("READ_PURCHASE"),
      subCategory: [
        {
          icon: <FaFileInvoice />, // Updated icon
          title: "Purchases List",
          path: "/purchases",
          access: hasStorePermission("READ_PURCHASE"),
        },
        {
          icon: <FiRotateCcw />, // Updated to circular return arrow
          title: "Returns List",
          path: "/returns-list",
          access: hasStorePermission("READ_PURCHASE_RETURN"),
        },
      ],
    },

      {
      icon: <BsCalculatorFill />, // Main Expense icon replaced to match image
      title: "Expense",
      path: "",
      content: true,
      // access: true,
      access: hasStorePermission("READ_EXPENSE"),
      subCategory: [
        {
          icon: <FaTag />, // Categories icon replaced with solid tag to match image
          title: "Categories",
          path: "/expense-category",
          access: hasStorePermission("READ_EXPENSE_CATEGORY"),
          // access: true,
        },
        {
          icon: <DiGitBranch />, // Sub Categories icon replaced with branch to match image
          title: "Sub Categories",
          path: "/expense-sub-category",
          access: hasStorePermission("READ_EXPENSE_SUB_CATEGORY"),
          // access: true,
        },
        {
          icon: <AiOutlineBars />, // Expenses List icon replaced with bullet list to match image
          title: "Expenses List",
          path: "/expenses",
          access: hasStorePermission("READ_EXPENSE"),
          // access: true,
        },
      ],
    },

        {
      icon: <FiBox />, // Updated Products boxes icon
      title: "Products",
      path: "",
      content: true,
      access: hasStorePermission("READ_PRODUCT"),
      subCategory: [
        {
          icon: <FaTag />, // Updated Category icon
          title: "Categories",
          path: "/category",
          access: hasStorePermission("READ_CATEGORY"),
        },
        {
          icon: <DiGitBranch />, // Updated Sub Categories branch icon
          title: "Sub Categories",
          path: "/sub-category",
          access: hasStorePermission("READ_SUB_CATEGORY"),
        },
        {
          icon: <FiList />, // Updated Product List icon
          title: "Products List", // Renamed to match image
          path: "/product",
          access: hasStorePermission("READ_PRODUCT"),
        },
        {
          icon: <BsUpcScan />, // Added Barcode entry
          title: "Barcode",
          path: "/barcode",
          access: hasStorePermission("READ_PRODUCT"),
        },
      ],
    },

    {
      icon: <FaWarehouse />, // Updated Inventory warehouse icon
      title: "Inventory",
      path: "",
      content: true,
      access: hasStorePermission("READ_PRODUCT"),
      subCategory: [
        {
          icon: <MdOutlineInventory />, // Updated View Inventory shelf icon
          title: "View Inventory",
          path: "/view-inventory",
          access: hasStorePermission("READ_PRODUCT"),
        },
        {
          icon: <FiSliders />, // Updated Inventory Adjustment sliders icon
          title: "Inventory Adjustment",
          path: "/inventory-adjustment",
          access: hasStorePermission("READ_PRODUCT"),
        },
      ],
    },

    
    {
      icon: <FiBook />, // Updated Cash Book icon
      title: "Cash Book",
      path: "",
      content: true,
      access: hasStorePermission("READ_ACCOUNT"),
      subCategory: [
        {
          icon: <FiGrid />, // Updated Accounts grid icon
          title: "Accounts", // Renamed to match image
          path: "/account",
          access: hasStorePermission("READ_ACCOUNT"),
        },
        {
          icon: <FiSliders />, // Updated Adjustments icon
          title: "Balance Adjustments",
          path: "/balance-adjustments",
          access: hasStorePermission("READ_BALANCE_ADJUSTMENT"),
        },
        {
          icon: <BiTransfer />, // Updated Transfers icon
          title: "Balance Transfers",
          path: "/balance-transfers",
          access: hasStorePermission("READ_BALANCE_TRANSFER"),
        },
        {
          icon: <MdHistory />, // Updated History icon
          title: "Transaction History",
          path: "/account-transactions",
          access: hasStorePermission("READ_ACCOUNT_TRANSACTION"),
        },
      ],
    },

    {
      icon: <CiReceipt />, // Updated Payments main icon
      title: "Payments",
      path: "",
      content: true,
      access: hasStorePermission("READ_INVOICE_PAYMENT"),
      subCategory: [
        {
          icon: <CiReceipt />,
          title: "Invoice",
          path: "/invoice",
          access: hasStorePermission("READ_INVOICE_PAYMENT"),
        },
        {
          icon: <FiCreditCard />,
          title: "Non Invoice",
          path: "/non-invoice",
          access: hasStorePermission("READ_NON_INVOICE_PAYMENT"),
        },
        {
          icon: <BiPurchaseTag />,
          title: "Purchase",
          path: "/purchase",
          access: hasStorePermission("READ_PURCHASE_PAYMENT"),
        },
        {
          icon: <FiCreditCard />,
          title: "Non Purchase",
          path: "/non-purchase",
          access: hasStorePermission("READ_NON_PURCHASE_PAYMENT"),
        },
      ],
    },


    {
      icon: <FaPiggyBank />, // Updated Loan Management icon
      title: "Loan Management",
      path: "",
      content: true,
      access: hasStorePermission("READ_LOAN"),
      subCategory: [
        {
          icon: <FaBuilding />, // Updated Authorities icon
          title: "Authorities",
          path: "/loan-authority",
          access: hasStorePermission("READ_LOAN_AUTHORITY"),
        },
        {
          icon: <FiList />, // Updated Loans icon
          title: "Loans",
          path: "/loans",
          access: hasStorePermission("READ_LOAN"),
        },
        {
          icon: <CiReceipt />, // Updated Payments receipt icon
          title: "Payments", // Cleaned title up to match image
          path: "/loan-payments",
          access: hasStorePermission("READ_LOAN_PAYMENT"),
        },
      ],
    },

    {
      icon: <FaCouch />, // Updated Asset Management icon
      title: "Asset Management",
      path: "",
      content: true,
      access: hasStorePermission("READ_ASSET_TYPES"),
      subCategory: [
        {
          icon: <FaTag />, // Updated Types icon
          title: "Types",
          path: "/asset-types",
          access: hasStorePermission("READ_ASSET_TYPES"),
        },
        {
          icon: <FiList />, // Updated Assets icon
          title: "Assets",
          path: "/assets",
          access: hasStorePermission("READ_ASSET"),
        },
      ],
    },

    {
      icon: <FiClipboard />, // Updated Payroll clipboard icon
      title: "Payroll",
      path: "/payroll",
      access: hasStorePermission("READ_PAYROLL"),
    },
    {
      icon: <FiUsers />, // Updated Clients people icon
      title: "Clients",
      path: "/clients",
      access: hasStorePermission("READ_CLIENT"),
    },
    {
      icon: <FaPeopleCarry />, // Updated Suppliers handling box icon
      title: "Suppliers",
      path: "/suppliers",
      access: hasStorePermission("READ_SUPPLIER"),
    },

    {
      icon: <FaUserCog />, // Updated Employees gear/people icon
      title: "Employees",
      path: "",
      content: true,
      access: hasStorePermission("READ_EMPLOYEE"),
      subCategory: [
        {
          icon: <FiDatabase />, // Updated Departments server icon
          title: "Departments",
          path: "/departments",
          access: hasStorePermission("READ_DEPARTMENT"),
        },
        {
          icon: <FiList />, // Updated Employees list icon
          title: "Employees List", // Renamed to match image
          path: "/employees",
          access: hasStorePermission("READ_EMPLOYEE"),
        },
        {
          icon: <FiList />, // Updated Increments list icon
          title: "Increments", // Renamed to match image
          path: "/salary-increments",
          access: hasStorePermission("READ_SALARY_INCREMENTS"),
        },
      ],
    },

    // {
    //   icon: <FiBook />,
    //   title: "Brand",
    //   path: "/brand",
    //   // access: true,
    //   access: hasStorePermission('READ_BRAND'),
    // },
    // {
    //   icon: <FiGrid />,
    //   title: "Unit",
    //   path: "/unit",
    //   // access: true,
    //   access: hasStorePermission('READ_UNIT'),
    // },
    // {
    //   icon: <HiOutlineDocumentReport />,
    //   title: "Tax",
    //   path: "/tax",
    //   // access: true,
    //   access: hasStorePermission('READ_TAX'),
    // },

    {
      icon: <FiRepeat />,
      title: "Transactions",
      path: "/transaction-history",
      access: true,
    },
    {
      icon: <BiTransfer />,
      title: "Subscription",
      path: "/store-subcription",
      access: true,
    },

    // {
    //   icon: <MdCurrencyExchange />,
    //   title: "Currency",
    //   path: "/currency",
    //   access: true,
    // },

    // {
    //   icon: <IoIosPeople />,
    //   title: "Category",
    //   path: "",
    //   content: true,
    //   // access: hasPermission('READ_USER'),
    //   access: true,
    //   subCategory: [
    //     {
    //       icon: <IoIosPeople />,
    //       title: "Category",
    //       path: "/category",
    //       // access: hasPermission('READ_ROLE'),
    //       access: true,
    //     },
    //     {
    //       icon: <IoIosPeople />,
    //       title: "Subcategory",
    //       path: "/sub-category",
    //       // access: hasPermission('READ_USER'),
    //       access: true,
    //     },
    //   ],
    // },
    {
      icon: <FaFileInvoiceDollar />, // Updated Balance Sheet document $ icon
      title: "Balance Sheet",
      path: "/balance-sheet",
      access: true,
    },
    {
      icon: <HiOutlineDocumentReport />, // Updated Summary Report icon
      title: "Summary Report",
      path: "/summary-report",
      access: true,
    },
    {
      icon: <FiTrendingUp />,
      title: "Profit Loss Report",
      path: "/profit-loss-report",
      access: true,
    },
    {
      icon: <FiPieChart />, // Updated Expense Report pie chart icon
      title: "Expense Report",
      path: "/expense-report",
      access: true,
    },
    {
      icon: <FiBarChart2 />, // Added Item Report bar chart from image
      title: "Item Report",
      path: "/item-report",
      access: true,
    },
    {
      icon: <FiPieChart />, // Updated Inventory Report pie chart icon
      title: "Inventory Report",
      path: "/inventory-report",
      access: true,
    },
    {
      icon: <FiUsers />,
      title: "Users",
      path: "",
      content: true,
      // access: hasPermission('READ_USER'),
      access: true,
      subCategory: [
        {
          icon: <FiSettings />,
          title: "Roles",
          path: "/store-roles",
          // access: hasPermission('READ_ROLE'),
          access: true,
        },
        {
          icon: <FiUsers />,
          title: "Users",
          path: "/store-users",
          // access: hasPermission('READ_USER'),
          access: true,
        },
      ],
    },
    // {
    //   icon: <FiUsers />,
    //   title: "System Settings",
    //   path: "/system-settings",
    //   access: true,
    // },
    {
      icon: <FiSettings />,
      title: "Setup",
      path: "/setup",
      access: true,
    },
    {
      icon: <FaBloggerB />,
      title: "Blog",
      path: "/blogs",
      access: hasPermission("READ_BLOG"),
    },
    {
      icon: <MdOutlineSettingsApplications />,
      title: "Feature",
      path: "/applicationfeatures",
      access: hasPermission("READ_APPLICATION_FEATURE"),
    },
    {
      icon: <AiOutlineSetting />,
      title: "Application Settings",
      path: "/applicationSettings",
      access: hasPermission("READ_APPLICATION_SETTING"),
    },
    {
      icon: <CiSettings />,
      title: "Footer",
      path: "",
      content: true,
      access: hasPermission(["READ_FOOTER", "READ_SOCIAL"]),
      subCategory: [
        {
          icon: <FiGlobe />,
          title: "Social",
          path: "/social",
          access: hasPermission("READ_SOCIAL"),
        },
        {
          icon: <GiSettingsKnobs />,
          title: "Footer Type",
          path: "/footer-type",
          access: hasPermission("READ_FOOTER"),
        },
      ],
    },

    {
      icon: <BsFillGearFill />,
      title: "Settings",
      path: "/settings",
      content: true,
      subCategory: [
        { icon: <BsFillGearFill />, title: "General", path: "/general" },
        { icon: <FaTelegramPlane />, title: "SMTP Email", path: "/smtpemail" },
        {
          icon: <BiLogInCircle />,
          title: "Social Login",
          path: "/sociallogin",
        },
        {
          icon: <AiOutlineBars />,
          title: "Menu",
          path: "/menu",
        },
        {
          icon: <BsTools />,
          title: "Maintenance",
          path: "/maintenance",
        },
      ],
    },
    {
      icon: <BiLockOpen />,
      title: "App Verify",
      path: "/appverify",
    },
  ];

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

export default getSidebarStoreRoutes;