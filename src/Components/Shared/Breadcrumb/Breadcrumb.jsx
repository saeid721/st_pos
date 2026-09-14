import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiChevronRight } from "react-icons/fi";

// Map of known route segments => human-friendly titles.
// Fallback humanizes the segment if it's not found here.
const ROUTE_TITLES = {
  // Common / shared
  dashboard: "Dashboard",
  profile: "Profile",
  setup: "Setup",
  "role-management": "Role Management",
  "change-password": "Change Password",

  // Store
  branches: "Branches",
  category: "Category",
  "sub-category": "Subcategory",
  suppliers: "Suppliers",
  brand: "Brand",
  unit: "Unit",
  tax: "Tax",
  product: "Products",
  "stock-product": "Stock Products",
  account: "Account",
  purchases: "Purchases",
  departments: "Departments",
  employees: "Employees",
  "salary-increments": "Increments",
  clients: "Clients",
  "quotation-list": "Quotations",
  "invoices-list": "Invoices",
  "expense-category": "Expense Categories",
  "expense-sub-category": "Expense Subcategories",
  expenses: "Expenses",
  POS: "POS",
  "loan-authority": "Loan Authorities",
  loans: "Loans",
  "loan-payments": "Loan Payments",
  "asset-types": "Asset Types",
  assets: "Assets",
  payroll: "Payroll",
  currency: "Currencies",
  "balance-adjustments": "Balance Adjustments",
  "balance-transfers": "Balance Transfers",
  "returns-list": "Purchase Returns",
  "invoice-returns": "Invoice Returns",
  invoice: "Invoice Payments",
  "non-invoice": "Non-Invoice Payments",
  purchase: "Purchase Payments",
  "non-purchase": "Non-Purchase Payments",
  "view-inventory": "Inventory",
  "inventory-adjustment": "Inventory Adjustment",
  "balance-sheet": "Balance Sheet",
  "summary-report": "Summary Report",
  "profit-loss-report": "Profit & Loss Report",
  "expense-report": "Expense Report",
  "inventory-report": "Inventory Report",
  "account-transactions": "Transactions",
  payment: "Payment",
  "payment-result": "Payment Result",
  "transaction-history": "Transaction History",
  "store-subcription": "Subscription",
  "system-settings": "System Settings",
  "store-settings": "Store Settings",
  "store-roles": "Roles",
  "store-users": "Users",
  subscriber: "Subscriber",
  subscription: "Subscription",
  social: "Social",
  "footer-type": "Footer Types",
  blogs: "Blogs",
  applicationfeatures: "Features",
  applicationSettings: "Application Settings",
  settings: "Settings",

  // Admin
  stores: "Stores",
  features: "Features",
  plans: "Plans",
  "subscription-request": "Subscription Requests",
  "user-created-store": "Pending Stores",
  "store-transaction": "Store Transactions",
  roles: "Roles",
  admins: "Admins",

  // Action suffixes
  new: "New",
  add: "Add",
  edit: "Edit",
  view: "View",
};

const humanize = (segment) => {
  const words = segment.replace(/[-_]+/g, " ").split(" ");
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};

export const getBreadcrumbs = (pathname) => {
  const segments = pathname.split("/").filter(Boolean); // e.g. ["store","dashboard","category","new"]

  if (segments.length === 0) return [];

  const panel = segments[0]; // "store" | "admin"
  const dashIdx = segments.indexOf("dashboard");
  const basePath = `/${panel}/dashboard`;
  const rest = dashIdx >= 0 ? segments.slice(dashIdx + 1) : segments.slice(1);

  const crumbs = [{ label: "Dashboard", path: basePath }];
  if (rest[0] === "expense-sub-category") {
    crumbs.push({ label: "Expenses", path: `${basePath}/expenses` });
    crumbs.push({ label: "Sub Categories", path: `${basePath}/expense-sub-category` });

    if (rest[1] === "new") crumbs.push({ label: "Add", path: pathname, isLast: true });
    if (rest[1] && rest[1] !== "new") {
      crumbs.push({
        label: rest[2] === "edit" ? "Edit" : "View",
        path: pathname,
        isLast: true,
      });
    }

    if (!crumbs.at(-1).isLast) crumbs.at(-1).isLast = true;
    return crumbs;
  }

  if (rest.length > 0) {
    const routePath = `${basePath}/${rest[0]}`;
    crumbs.push({ label: ROUTE_TITLES[rest[0]] || humanize(rest[0]), path: routePath });

    if (rest[1] === "new") {
      crumbs.push({ label: "New", path: pathname, isLast: true });
    } else if (rest[1]) {
      crumbs.push({
        label: rest[2] === "edit" ? "Edit" : "View",
        path: pathname,
        isLast: true,
      });
    } else {
      crumbs.at(-1).isLast = true;
    }
  } else {
    crumbs[0].isLast = true;
  }
  return crumbs;
};

export const getPageTitle = (pathname) => {
  const segments = pathname.split("/").filter(Boolean);
  const dashIdx = segments.indexOf("dashboard");
  const rest = dashIdx >= 0 ? segments.slice(dashIdx + 1) : segments.slice(1);
  const routeTitle = ROUTE_TITLES[rest[0]] || humanize(rest[0] || "Dashboard");

  if (rest[0] === "expense-sub-category") {
    if (rest[1] === "new") return "Add Expense Sub Category";
    if (rest[1]) return rest[2] === "edit" ? "Edit Expense Sub Category" : "Expense Sub Category";
    return "Expense Sub Categories";
  }

  if (rest[1] === "new") return `Add ${routeTitle}`;
  if (rest[1]) return rest[2] === "edit" ? `Edit ${routeTitle}` : routeTitle;
  return routeTitle;
};

const Breadcrumb = ({ breadcrumbs }) => {
  const { pathname } = useLocation();
  const crumbs = breadcrumbs || getBreadcrumbs(pathname);

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {crumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            {index > 0 && <FiChevronRight className="shrink-0 text-gray-300" />}
            <li className="flex items-center">
              {crumb.isLast && index > 0 ? (
                <span className="font-semibold text-gray-800">{crumb.label}</span>
              ) : (
                <Link
                  to={crumb.path}
                  className={`inline-flex items-center gap-1 text-gray-500 transition-colors hover:text-indigo-600 ${
                    index === 0 ? "font-medium" : ""
                  }`}
                >
                  {index === 0 && <FiHome className="text-base" />}
                  {crumb.label}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
