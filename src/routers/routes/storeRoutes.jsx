import ApplicationSettingsEdit from "../../Components/Pages/ApplicationSettings/ApplicationSettingsEdit";
import Dashboard from "../../Components/Pages/Dashboard/Dashboard";

import ProfilePage from "../../Components/Pages/ProfilePage/ProfilePage";

import Subscriber from "../../Components/Pages/Subscriber/Subscriber";
import Subscriptions from "../../Components/Pages/Subscriptions/Subscriptions";
import SubscriptionsAdd from "../../Components/Pages/Subscriptions/SubscriptionsAdd";
import SubscriptionsEdit from "../../Components/Pages/Subscriptions/SubscriptionsEdit";
import SubscriptionsView from "../../Components/Pages/Subscriptions/SubscriptionsView";

import Layout from "../../Layout/Layout";
import Socials from "../../Components/Pages/Social/Socials";
import SocialsAdd from "../../Components/Pages/Social/SocialsAdd";
import SocialsView from "../../Components/Pages/Social/SocialsView";
import SocialsEdit from "../../Components/Pages/Social/SocialsEdit";
import FooterType from "../../Components/Pages/FooterType/FooterType";
import FooterTypeWisedFooter from "../../Components/Pages/FooterType/FooterTypeWisedFooter";
import AddFooter from "../../Components/Pages/FooterType/AddFooter";
import FooterUpdate from "../../Components/Pages/FooterType/FooterUpdate";
import ChangePassword from "../../Components/Pages/ChangePassword/ChangePassword";

import LoginStore from "../../Components/Pages/Login/LoginStore";
import StoreUser from "../../Components/Pages/StoreUser/StoreUser";
import StoreUserAdd from "../../Components/Pages/StoreUser/StoreUserAdd";
import StoreUserView from "../../Components/Pages/StoreUser/StoreUserView";
import StoreUserEdit from "../../Components/Pages/StoreUser/StoreUserEdit";
import StoreRoleManagement from "../../Components/Pages/RoleManagement/StoreRoleManagement";
import RolesStore from "../../Components/Pages/RolesStore/RolesStore";
import RolesStoreAdd from "../../Components/Pages/RolesStore/RolesStoreAdd";
import RolesStoreView from "../../Components/Pages/RolesStore/RolesStoreView";
import RolesStoreEdit from "../../Components/Pages/RolesStore/RolesStoreEdit";
import Category from "../../Components/Pages/Category/Category";
import CategoryAdd from "../../Components/Pages/Category/CategoryAdd";
import CategoryView from "../../Components/Pages/Category/CategoryView";
import CategoryEdit from "../../Components/Pages/Category/CategoryEdit";
import SubCategory from "../../Components/Pages/SubCategory/SubCategory";
import SubCategoryAdd from "../../Components/Pages/SubCategory/SubCategoryAdd";
import SubCategoryView from "../../Components/Pages/SubCategory/SubCategoryView";
import SubCategoryEdit from "../../Components/Pages/SubCategory/SubCategoryEdit";
import Suppliers from "../../Components/Pages/Suppliers/Suppliers";
import SuppliersAdd from "../../Components/Pages/Suppliers/SuppliersAdd";
import SuppliersView from "../../Components/Pages/Suppliers/SuppliersView";
import SuppliersEdit from "../../Components/Pages/Suppliers/SuppliersEdit";
import Error from "../../404";
import Brand from "../../Components/Pages/Brand/Brand";
import BrandAdd from "../../Components/Pages/Brand/BrandAdd";
import BrandView from "../../Components/Pages/Brand/BrandView";
import BrandEdit from "../../Components/Pages/Brand/BrandEdit";
import Unit from "../../Components/Pages/Unit/Unit";
import UnitAdd from "../../Components/Pages/Unit/UnitAdd";
import UnitView from "../../Components/Pages/Unit/UnitView";
import UnitEdit from "../../Components/Pages/Unit/UnitEdit";
import Tax from "../../Components/Pages/Tax/Tax";
import TaxAdd from "../../Components/Pages/Tax/TaxAdd";
import TaxView from "../../Components/Pages/Tax/TaxView";
import TaxEdit from "../../Components/Pages/Tax/TaxEdit";
import Products from "../../Components/Pages/Products/Products";
import ProductsAdd from "../../Components/Pages/Products/ProductsAdd";
import ProductsView from "../../Components/Pages/Products/ProductsView";
import ProductsEdit from "../../Components/Pages/Products/ProductsEdit";
import Account from "../../Components/Pages/Account/Account";
import AccountAdd from "../../Components/Pages/Account/AccountAdd";
import AccountView from "../../Components/Pages/Account/AccountView";
import AccountEdit from "../../Components/Pages/Account/AccountEdit";
import generateRoutes from "./helpers/generateRoutes";
import createRoute from "./helpers/createRoute";
import Purchases from "../../Components/Pages/Purchases/Purchases";
import PurchasesAdd from "../../Components/Pages/Purchases/PurchasesAdd";
import PurchasesView from "../../Components/Pages/Purchases/PurchasesView";
import PurchasesEdit from "../../Components/Pages/Purchases/PurchasesEdit";
import Department from "../../Components/Pages/Department/Department";
import DepartmentAdd from "../../Components/Pages/Department/DepartmentAdd";
import DepartmentView from "../../Components/Pages/Department/DepartmentView";
import DepartmentEdit from "../../Components/Pages/Department/DepartmentEdit";
import Employees from "../../Components/Pages/Employees/Employees";
import EmployeesAdd from "../../Components/Pages/Employees/EmployeesAdd";
import EmployeesView from "../../Components/Pages/Employees/EmployeesView";
import EmployeesEdit from "../../Components/Pages/Employees/EmployeesEdit";
import Branch from "../../Components/Pages/Branch/Branch";
import BranchAdd from "../../Components/Pages/Branch/BranchAdd";
import BranchView from "../../Components/Pages/Branch/BranchView";
import BranchEdit from "../../Components/Pages/Branch/BranchEdit";
import Increment from "../../Components/Pages/Increment/Increment";
import IncrementAdd from "../../Components/Pages/Increment/IncrementAdd";
import IncrementView from "../../Components/Pages/Increment/IncrementView";
import IncrementEdit from "../../Components/Pages/Increment/IncrementEdit";
import Client from "../../Components/Pages/Client/Client";
import ClientAdd from "../../Components/Pages/Client/ClientAdd";
import ClientView from "../../Components/Pages/Client/ClientView";
import ClientEdit from "../../Components/Pages/Client/ClientEdit";
import QuotationList from "../../Components/Pages/QuotationList/QuotationList";
import QuotationListAdd from "../../Components/Pages/QuotationList/QuotationListAdd";
import QuotationListView from "../../Components/Pages/QuotationList/QuotationListView";
import QuotationListEdit from "../../Components/Pages/QuotationList/QuotationListEdit";
import StoreProductList from "../../Components/Pages/StockProductList/StockProductList";
import StoreProductListAdd from "../../Components/Pages/StockProductList/StockProductListAdd";
import StoreProductListView from "../../Components/Pages/StockProductList/StockProductListView";
import StoreProductListEdit from "../../Components/Pages/StockProductList/StockProductListEdit";
import InvoiceList from "../../Components/Pages/InvoiceList/InvoiceList";
import InvoiceListAdd from "../../Components/Pages/InvoiceList/InvoiceListAdd";
import InvoiceListView from "../../Components/Pages/InvoiceList/InvoiceListView";
import InvoiceListEdit from "../../Components/Pages/InvoiceList/InvoiceListEdit";
import ExpenseCategory from "../../Components/Pages/ExpenseCategory/ExpenseCategory";
import ExpenseCategoryAdd from "../../Components/Pages/ExpenseCategory/ExpenseCategoryAdd";
import ExpenseCategoryView from "../../Components/Pages/ExpenseCategory/ExpenseCategoryView";
import ExpenseCategoryEdit from "../../Components/Pages/ExpenseCategory/ExpenseCategoryEdit";
import ExpenseSubCategory from "../../Components/Pages/ExpenseSubCategory/ExpenseSubCategory";
import ExpenseSubCategoryAdd from "../../Components/Pages/ExpenseSubCategory/ExpenseSubCategoryAdd";
import ExpenseSubCategoryView from "../../Components/Pages/ExpenseSubCategory/ExpenseSubCategoryView";
import ExpenseSubCategoryEdit from "../../Components/Pages/ExpenseSubCategory/ExpenseSubCategoryEdit";
import Expense from "../../Components/Pages/Expense/Expense";
import ExpenseAdd from "../../Components/Pages/Expense/ExpenseAdd";
import ExpenseView from "../../Components/Pages/Expense/ExpenseView";
import ExpenseEdit from "../../Components/Pages/Expense/ExpenseEdit";
import POS from "../../Components/Pages/POS/Pos";
import LoanAuthority from "../../Components/Pages/LoanAuthority/LoanAuthority";
import LoanAuthorityAdd from "../../Components/Pages/LoanAuthority/LoanAuthorityAdd";
import LoanAuthorityView from "../../Components/Pages/LoanAuthority/LoanAuthorityView";
import LoanAuthorityEdit from "../../Components/Pages/LoanAuthority/LoanAuthorityEdit";
import Loan from "../../Components/Pages/Loan/Loan";
import LoanAdd from "../../Components/Pages/Loan/LoanAdd";
import LoanView from "../../Components/Pages/Loan/LoanView";
import LoanEdit from "../../Components/Pages/Loan/LoanEdit";
import LoanPayment from "../../Components/Pages/LoanPayment/LoanPayment";
import LoanPaymentAdd from "../../Components/Pages/LoanPayment/LoanPaymentAdd";
import LoanPaymentView from "../../Components/Pages/LoanPayment/LoanPaymentView";
import LoanPaymentAddEdit from "../../Components/Pages/LoanPayment/LoanPaymentEdit";
import AssetTypes from "../../Components/Pages/AssetTypes/AssetTypes";
import AssetTypesAdd from "../../Components/Pages/AssetTypes/AssetTypesAdd";
import AssetTypesView from "../../Components/Pages/AssetTypes/AssetTypesView";
import AssetTypesEdit from "../../Components/Pages/AssetTypes/AssetTypesEdit";
import Assets from "../../Components/Pages/Assets/Assets";
import AssetsAdd from "../../Components/Pages/Assets/AssetsAdd";
import Assetsview from "../../Components/Pages/Assets/AssetsView";
import AssetsEdit from "../../Components/Pages/Assets/AssetsEdit";
import Payroll from "../../Components/Pages/Payroll/Payroll";
import PayrollAdd from "../../Components/Pages/Payroll/PayrollAdd";
import PayrollView from "../../Components/Pages/Payroll/PayrollView";
import PayrollEdit from "../../Components/Pages/Payroll/PayrollEdit";
import StoreAllBranches from "../../Components/Pages/StoreAllBranches/StoreAllBranches";
import BalanceSheet from "../../Components/Pages/BalanceSheet/BalanceSheet";
import SummaryReport from "../../Components/Pages/SummaryReport/SummaryReport";
import ProfitLossReport from "../../Components/Pages/ProfitLossReport/ProfitLossReport";
import ExpenseReport from "../../Components/Pages/ExpenseReport/ExpenseReport";
import InventoryReport from "../../Components/Pages/InventoryReport/InventoryReport";
import Currency from "../../Components/Pages/Currency/Currency";
import CurrencyAdd from "../../Components/Pages/Currency/CurrencyAdd";
import CurrencyView from "../../Components/Pages/Currency/CurrencyView";
import CurrencyEdit from "../../Components/Pages/Currency/CurrencyEdit";
import BalanceAdjustments from "../../Components/Pages/BalanceAdjustments/BalanceAdjustments";
import BalanceAdjustmentsAdd from "../../Components/Pages/BalanceAdjustments/BalanceAdjustmentsAdd";
import BalanceAdjustmentsView from "../../Components/Pages/BalanceAdjustments/BalanceAdjustmentsView";
import BalanceAdjustmentsEdit from "../../Components/Pages/BalanceAdjustments/BalanceAdjustmentsEdit";
import BalanceTransfer from "../../Components/Pages/BalanceTransfer/BalanceTransfer";
import BalanceTransferAdd from "../../Components/Pages/BalanceTransfer/BalanceTransferAdd";
import BalanceTransferView from "../../Components/Pages/BalanceTransfer/BalanceTransferView";
import BalanceTransferEdit from "../../Components/Pages/BalanceTransfer/BalanceTransferEdit";
import PurchaseReturn from "../../Components/Pages/PurchaseReturn/PurchaseReturn";
import PurchaseReturnAdd from "../../Components/Pages/PurchaseReturn/PurchaseReturnAdd";
import PurchaseReturnView from "../../Components/Pages/PurchaseReturn/PurchaseReturnView";
import PurchaseReturnEdit from "../../Components/Pages/PurchaseReturn/PurchaseReturnEdit";
import InvoiceReturn from "../../Components/Pages/InvoiceReturn/InvoiceReturn";
import InvoiceReturnAdd from "../../Components/Pages/InvoiceReturn/InvoiceReturnAdd";
import InvoiceReturnView from "../../Components/Pages/InvoiceReturn/InvoiceReturnView";
import InvoiceReturnEdit from "../../Components/Pages/InvoiceReturn/InvoiceReturnEdit";
import AccountTransaction from "../../Components/Pages/AccountTransaction/AccountTransaction";
import InvoicePayment from "../../Components/Pages/InvoicePayment/InvoicePayment";
import InvoicePaymentAdd from "../../Components/Pages/InvoicePayment/InvoicePaymentAdd";
import InvoicePaymentView from "../../Components/Pages/InvoicePayment/InvoicePaymentView";
import InvoicePaymentEdit from "../../Components/Pages/InvoicePayment/InvoicePaymentEdit";
import NonInvoicePayment from "../../Components/Pages/NonInvoicePayment/NonInvoicePayment";
import NonInvoicePaymentAdd from "../../Components/Pages/NonInvoicePayment/NonInvoicePaymentAdd";
import NonInvoicePaymentView from "../../Components/Pages/NonInvoicePayment/NonInvoicePaymentView";
import NonInvoicePaymentEdit from "../../Components/Pages/NonInvoicePayment/NonInvoicePaymentEdit";
import PurchasePayment from "../../Components/Pages/PurchasePayment/PurchasePayment";
import PurchasePaymentAdd from "../../Components/Pages/PurchasePayment/PurchasePaymentAdd";
import PurchasePaymentView from "../../Components/Pages/PurchasePayment/PurchasePaymentView";
import PurchasePaymentEdit from "../../Components/Pages/PurchasePayment/PurchasePaymentEdit";
import NonPurchasePayment from "../../Components/Pages/NonPurchasePayment/NonPurchasePayment";
import NonPurchasePaymentAdd from "../../Components/Pages/NonPurchasePayment/NonPurchasePaymentAdd";
import NonPurchasePaymentView from "../../Components/Pages/NonPurchasePayment/NonPurchasePaymentView";
import NonPurchasePaymentEdit from "../../Components/Pages/NonPurchasePayment/NonPurchasePaymentEdit";
import Inventory from "../../Components/Pages/Inventory/Inventory";
import InventoryView from "../../Components/Pages/Inventory/InventoryView";
import PlanPayment from "../../Components/Pages/PlanPayment/PlanPayment";
import InventoryAdjustment from "../../Components/Pages/InventoryAdjustment/InventoryAdjustment";
import InventoryAdjustmentAdd from "../../Components/Pages/InventoryAdjustment/InventoryAdjustmentAdd";
import InventoryAdjustmentView from "../../Components/Pages/InventoryAdjustment/InventoryAdjustmentView";
import InventoryAdjustmentEdit from "../../Components/Pages/InventoryAdjustment/InventoryAdjustmentEdit";
import PaymentResult from "../../Components/Pages/PaymentResult/PaymentResult";
import TransactionHistory from "../../Components/Pages/TransactionHistory/TransactionHistory";
import StoreSubscription from "../../Components/Pages/StoreSubscription/StoreSubscription";
import SystemSettings from "../../Components/Pages/SystemSettings/SystemSettings";
import StoreSettings from "../../Components/Pages/StoreSettings/StoreSettings";
import SetupPage from "../../Components/Pages/setup/SetupPage";
const allRoutes = {
  branch: generateRoutes("branches", {
    root: <Branch />,
    new: <BranchAdd />,
    view: <BranchView />,
    edit: <BranchEdit />,
  }),
  category: generateRoutes("category", {
    root: <Category />,
    new: <CategoryAdd />,
    view: <CategoryView />,
    edit: <CategoryEdit />,
  }),
  subCategory: generateRoutes("sub-category", {
    root: <SubCategory />,
    new: <SubCategoryAdd />,
    view: <SubCategoryView />,
    edit: <SubCategoryEdit />,
  }),
  suppliers: generateRoutes("suppliers", {
    root: <Suppliers />,
    new: <SuppliersAdd />,
    view: <SuppliersView />,
    edit: <SuppliersEdit />,
  }),
  brand: generateRoutes("brand", {
    root: <Brand />,
    new: <BrandAdd />,
    view: <BrandView />,
    edit: <BrandEdit />,
  }),
  unit: generateRoutes("unit", {
    root: <Unit />,
    new: <UnitAdd />,
    view: <UnitView />,
    edit: <UnitEdit />,
  }),
  tax: generateRoutes("tax", {
    root: <Tax />,
    new: <TaxAdd />,
    view: <TaxView />,
    edit: <TaxEdit />,
  }),
  product: generateRoutes("product", {
    root: <Products />,
    new: <ProductsAdd />,
    view: <ProductsView />,
    edit: <ProductsEdit />,
  }),
  stockProduct: generateRoutes("stock-product", {
    root: <StoreProductList />,
    new: <StoreProductListAdd />,
    view: <StoreProductListView />,
    edit: <StoreProductListEdit />,
  }),
  account: generateRoutes("account", {
    root: <Account />,
    new: <AccountAdd />,
    view: <AccountView />,
    edit: <AccountEdit />,
  }),
  purchases: generateRoutes("purchases", {
    root: <Purchases />,
    new: <PurchasesAdd />,
    view: <PurchasesView />,
    edit: <PurchasesEdit />,
  }),
  departments: generateRoutes("departments", {
    root: <Department />,
    new: <DepartmentAdd />,
    view: <DepartmentView />,
    edit: <DepartmentEdit />,
  }),
  employees: generateRoutes("employees", {
    root: <Employees />,
    new: <EmployeesAdd />,
    view: <EmployeesView />,
    edit: <EmployeesEdit />,
  }),
  salaryIncrements: generateRoutes("salary-increments", {
    root: <Increment />,
    new: <IncrementAdd />,
    view: <IncrementView />,
    edit: <IncrementEdit />,
  }),
  storeRoles: generateRoutes("store-roles", {
    root: <RolesStore />,
    new: <RolesStoreAdd />,
    view: <RolesStoreView />,
    edit: <RolesStoreEdit />,
  }),
  storeUsers: generateRoutes("store-users", {
    root: <StoreUser />,
    new: <StoreUserAdd />,
    view: <StoreUserView />,
    edit: <StoreUserEdit />,
  }),
  subscription: generateRoutes("subscription", {
    root: <Subscriptions />,
    new: <SubscriptionsAdd />,
    view: <SubscriptionsView />,
    edit: <SubscriptionsEdit />,
  }),
  social: generateRoutes("social", {
    root: <Socials />,
    new: <SocialsAdd />,
    view: <SocialsView />,
    edit: <SocialsEdit />,
  }),
  clients: generateRoutes("clients", {
    root: <Client />,
    new: <ClientAdd />,
    view: <ClientView />,
    edit: <ClientEdit />,
  }),
  quotationLists: generateRoutes("quotation-list", {
    root: <QuotationList />,
    new: <QuotationListAdd />,
    view: <QuotationListView />,
    edit: <QuotationListEdit />,
  }),
  invoiceLists: generateRoutes("invoices-list", {
    root: <InvoiceList />,
    new: <InvoiceListAdd />,
    view: <InvoiceListView />,
    edit: <InvoiceListEdit />,
  }),
  expenseCategory: generateRoutes("expense-category", {
    root: <ExpenseCategory />,
    new: <ExpenseCategoryAdd />,
    view: <ExpenseCategoryView />,
    edit: <ExpenseCategoryEdit />,
  }),
  expenseSubCategory: generateRoutes("expense-sub-category", {
    root: <ExpenseSubCategory />,
    new: <ExpenseSubCategoryAdd />,
    view: <ExpenseSubCategoryView />,
    edit: <ExpenseSubCategoryEdit />,
  }),
  expense: generateRoutes("expenses", {
    root: <Expense />,
    new: <ExpenseAdd />,
    view: <ExpenseView />,
    edit: <ExpenseEdit />,
  }),
  loanAuthority: generateRoutes("loan-authority", {
    root: <LoanAuthority />,
    new: <LoanAuthorityAdd />,
    view: <LoanAuthorityView />,
    edit: <LoanAuthorityEdit />,
  }),
  loan: generateRoutes("loans", {
    root: <Loan />,
    new: <LoanAdd />,
    view: <LoanView />,
    edit: <LoanEdit />,
  }),
  payment: generateRoutes("loan-payments", {
    root: <LoanPayment />,
    new: <LoanPaymentAdd />,
    view: <LoanPaymentView />,
    edit: <LoanPaymentAddEdit />,
  }),
  assetType: generateRoutes("asset-types", {
    root: <AssetTypes />,
    new: <AssetTypesAdd />,
    view: <AssetTypesView />,
    edit: <AssetTypesEdit />,
  }),
  assets: generateRoutes("assets", {
    root: <Assets />,
    new: <AssetsAdd />,
    view: <Assetsview />,
    edit: <AssetsEdit />,
  }),
  payroll: generateRoutes("payroll", {
    root: <Payroll />,
    new: <PayrollAdd />,
    view: <PayrollView />,
    edit: <PayrollEdit />,
  }),
  currency: generateRoutes("currency", {
    root: <Currency />,
    new: <CurrencyAdd />,
    view: <CurrencyView />,
    edit: <CurrencyEdit />,
  }),
  balanceAdjustments: generateRoutes("balance-adjustments", {
    root: <BalanceAdjustments />,
    new: <BalanceAdjustmentsAdd />,
    view: <BalanceAdjustmentsView />,
    edit: <BalanceAdjustmentsEdit />,
  }),
  balanceTransfers: generateRoutes("balance-transfers", {
    root: <BalanceTransfer />,
    new: <BalanceTransferAdd />,
    view: <BalanceTransferView />,
    edit: <BalanceTransferEdit />,
  }),
  purchaseReturns: generateRoutes("returns-list", {
    root: <PurchaseReturn />,
    new: <PurchaseReturnAdd />,
    view: <PurchaseReturnView />,
    edit: <PurchaseReturnEdit />,
  }),
  invoiceReturns: generateRoutes("invoice-returns", {
    root: <InvoiceReturn />,
    new: <InvoiceReturnAdd />,
    view: <InvoiceReturnView />,
    edit: <InvoiceReturnEdit />,
  }),
  invoice: generateRoutes("invoice", {
    root: <InvoicePayment />,
    new: <InvoicePaymentAdd />,
    view: <InvoicePaymentView />,
    edit: <InvoicePaymentEdit />,
  }),
  nonInvoice: generateRoutes("non-invoice", {
    root: <NonInvoicePayment />,
    new: <NonInvoicePaymentAdd />,
    view: <NonInvoicePaymentView />,
    edit: <NonInvoicePaymentEdit />,
  }),
  purchasePayment: generateRoutes("purchase", {
    root: <PurchasePayment />,
    new: <PurchasePaymentAdd />,
    view: <PurchasePaymentView />,
    edit: <PurchasePaymentEdit />,
  }),
  nonPurchasePayment: generateRoutes("non-purchase", {
    root: <NonPurchasePayment />,
    new: <NonPurchasePaymentAdd />,
    view: <NonPurchasePaymentView />,
    edit: <NonPurchasePaymentEdit />,
  }),
  inventory: generateRoutes("view-inventory", {
    root: <Inventory />,
    view: <InventoryView />,
  }),
  inventoryAdjustment: generateRoutes("inventory-adjustment", {
    root: <InventoryAdjustment />,
    new: <InventoryAdjustmentAdd />,
    view: <InventoryAdjustmentView />,
    edit: <InventoryAdjustmentEdit />,
  }),
};
const storeRoutes = {
  path: "store",
  // errorElement: <Error />,
  children: [
    createRoute("login", <LoginStore />),
    createRoute("branches", <StoreAllBranches />),
    {
      path: "dashboard",
      element: <Layout type="1" />,
      children: [
        createRoute("", <Dashboard />),
        createRoute("profile", <ProfilePage />),
        createRoute("setup", <SetupPage />),
        createRoute("role-management", <StoreRoleManagement />),
        createRoute("applicationSettings", <ApplicationSettingsEdit />),
        createRoute("change-password", <ChangePassword />),

        allRoutes.category,
        allRoutes.subCategory,
        allRoutes.suppliers,
        allRoutes.brand,
        allRoutes.unit,
        allRoutes.tax,
        allRoutes.product,
        createRoute("barcode", <Products />),
        createRoute("barcode/new", <ProductsAdd />),
        allRoutes.account,
        allRoutes.purchases,
        allRoutes.departments,
        allRoutes.employees,
        allRoutes.branch,
        allRoutes.salaryIncrements,
        allRoutes.clients,
        allRoutes.quotationLists,
        allRoutes.stockProduct,
        allRoutes.invoiceLists,
        allRoutes.expenseCategory,
        allRoutes.expenseSubCategory,
        allRoutes.expense,
        createRoute("POS", <POS />),
        allRoutes.loanAuthority,
        allRoutes.loan,
        allRoutes.payment,
        allRoutes.assetType,
        allRoutes.assets,
        allRoutes.payroll,
        allRoutes.currency,
        allRoutes.balanceAdjustments,
        allRoutes.balanceTransfers,
        allRoutes.purchaseReturns,
        allRoutes.invoiceReturns,
        allRoutes.invoice,
        allRoutes.nonInvoice,
        allRoutes.purchasePayment,
        allRoutes.nonPurchasePayment,
        allRoutes.inventory,
        allRoutes.inventoryAdjustment,
        createRoute("balance-sheet", <BalanceSheet />),
        createRoute("summary-report", <SummaryReport />),
        createRoute("profit-loss-report", <ProfitLossReport />),
        createRoute("expense-report", <ExpenseReport />),
        createRoute("inventory-report", <InventoryReport />),
        createRoute("account-transactions", <AccountTransaction />),
        createRoute("payment", <PlanPayment />),
        createRoute("payment-result", <PaymentResult />),
        createRoute("transaction-history", <TransactionHistory />),
        createRoute("store-subcription", <StoreSubscription />),
        createRoute("system-settings", <SystemSettings />),
        createRoute("store-settings", <StoreSettings />),

        {
          path: "",
          children: [
            allRoutes.storeRoles,
            allRoutes.storeUsers,
            createRoute("subscriber", <Subscriber />),
            createRoute("subadmin", "Sub Admin"),
            createRoute("deletedusers", "Deleted Users"),
          ],
        },
        allRoutes.subscription,
        allRoutes.social,

        {
          path: "footer-type",
          children: [
            createRoute("", <FooterType />),
            {
              path: ":footer_type",
              children: [
                createRoute("", <FooterTypeWisedFooter />),
                createRoute("new", <AddFooter />),
                {
                  path: ":id",
                  children: [createRoute("edit", <FooterUpdate />)],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default storeRoutes;
