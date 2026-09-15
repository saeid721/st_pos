import React from "react";
const ApplicationSettingsEdit = React.lazy(() => import("../../Components/Pages/ApplicationSettings/ApplicationSettingsEdit"));
const Dashboard = React.lazy(() => import("../../Components/Pages/Dashboard/Dashboard"));

const ProfilePage = React.lazy(() => import("../../Components/Pages/ProfilePage/ProfilePage"));

const Subscriber = React.lazy(() => import("../../Components/Pages/Subscriber/Subscriber"));
const Subscriptions = React.lazy(() => import("../../Components/Pages/Subscriptions/Subscriptions"));
const SubscriptionsAdd = React.lazy(() => import("../../Components/Pages/Subscriptions/SubscriptionsAdd"));
const SubscriptionsEdit = React.lazy(() => import("../../Components/Pages/Subscriptions/SubscriptionsEdit"));
const SubscriptionsView = React.lazy(() => import("../../Components/Pages/Subscriptions/SubscriptionsView"));

import Layout from "../../Layout/Layout";
const Socials = React.lazy(() => import("../../Components/Pages/Social/Socials"));
const SocialsAdd = React.lazy(() => import("../../Components/Pages/Social/SocialsAdd"));
const SocialsView = React.lazy(() => import("../../Components/Pages/Social/SocialsView"));
const SocialsEdit = React.lazy(() => import("../../Components/Pages/Social/SocialsEdit"));
const FooterType = React.lazy(() => import("../../Components/Pages/FooterType/FooterType"));
const FooterTypeWisedFooter = React.lazy(() => import("../../Components/Pages/FooterType/FooterTypeWisedFooter"));
const AddFooter = React.lazy(() => import("../../Components/Pages/FooterType/AddFooter"));
const FooterUpdate = React.lazy(() => import("../../Components/Pages/FooterType/FooterUpdate"));
const ChangePassword = React.lazy(() => import("../../Components/Pages/ChangePassword/ChangePassword"));

const LoginStore = React.lazy(() => import("../../Components/Pages/Login/LoginStore"));
const StoreUser = React.lazy(() => import("../../Components/Pages/StoreUser/StoreUser"));
const StoreUserAdd = React.lazy(() => import("../../Components/Pages/StoreUser/StoreUserAdd"));
const StoreUserView = React.lazy(() => import("../../Components/Pages/StoreUser/StoreUserView"));
const StoreUserEdit = React.lazy(() => import("../../Components/Pages/StoreUser/StoreUserEdit"));
const StoreRoleManagement = React.lazy(() => import("../../Components/Pages/RoleManagement/StoreRoleManagement"));
const RolesStore = React.lazy(() => import("../../Components/Pages/RolesStore/RolesStore"));
const RolesStoreAdd = React.lazy(() => import("../../Components/Pages/RolesStore/RolesStoreAdd"));
const RolesStoreView = React.lazy(() => import("../../Components/Pages/RolesStore/RolesStoreView"));
const RolesStoreEdit = React.lazy(() => import("../../Components/Pages/RolesStore/RolesStoreEdit"));
const Category = React.lazy(() => import("../../Components/Pages/Category/Category"));
const CategoryAdd = React.lazy(() => import("../../Components/Pages/Category/CategoryAdd"));
const CategoryView = React.lazy(() => import("../../Components/Pages/Category/CategoryView"));
const CategoryEdit = React.lazy(() => import("../../Components/Pages/Category/CategoryEdit"));
const SubCategory = React.lazy(() => import("../../Components/Pages/SubCategory/SubCategory"));
const SubCategoryAdd = React.lazy(() => import("../../Components/Pages/SubCategory/SubCategoryAdd"));
const SubCategoryView = React.lazy(() => import("../../Components/Pages/SubCategory/SubCategoryView"));
const SubCategoryEdit = React.lazy(() => import("../../Components/Pages/SubCategory/SubCategoryEdit"));
const Suppliers = React.lazy(() => import("../../Components/Pages/Suppliers/Suppliers"));
const SuppliersAdd = React.lazy(() => import("../../Components/Pages/Suppliers/SuppliersAdd"));
const SuppliersView = React.lazy(() => import("../../Components/Pages/Suppliers/SuppliersView"));
const SuppliersEdit = React.lazy(() => import("../../Components/Pages/Suppliers/SuppliersEdit"));
import Error from "../../404";
const Brand = React.lazy(() => import("../../Components/Pages/Brand/Brand"));
const BrandAdd = React.lazy(() => import("../../Components/Pages/Brand/BrandAdd"));
const BrandView = React.lazy(() => import("../../Components/Pages/Brand/BrandView"));
const BrandEdit = React.lazy(() => import("../../Components/Pages/Brand/BrandEdit"));
const Unit = React.lazy(() => import("../../Components/Pages/Unit/Unit"));
const UnitAdd = React.lazy(() => import("../../Components/Pages/Unit/UnitAdd"));
const UnitView = React.lazy(() => import("../../Components/Pages/Unit/UnitView"));
const UnitEdit = React.lazy(() => import("../../Components/Pages/Unit/UnitEdit"));
const Tax = React.lazy(() => import("../../Components/Pages/Tax/Tax"));
const TaxAdd = React.lazy(() => import("../../Components/Pages/Tax/TaxAdd"));
const TaxView = React.lazy(() => import("../../Components/Pages/Tax/TaxView"));
const TaxEdit = React.lazy(() => import("../../Components/Pages/Tax/TaxEdit"));
const Products = React.lazy(() => import("../../Components/Pages/Products/Products"));
const ProductsAdd = React.lazy(() => import("../../Components/Pages/Products/ProductsAdd"));
const ProductsView = React.lazy(() => import("../../Components/Pages/Products/ProductsView"));
const ProductsEdit = React.lazy(() => import("../../Components/Pages/Products/ProductsEdit"));
const Account = React.lazy(() => import("../../Components/Pages/Account/Account"));
const AccountAdd = React.lazy(() => import("../../Components/Pages/Account/AccountAdd"));
const AccountView = React.lazy(() => import("../../Components/Pages/Account/AccountView"));
const AccountEdit = React.lazy(() => import("../../Components/Pages/Account/AccountEdit"));
import generateRoutes from "./helpers/generateRoutes";
import createRoute from "./helpers/createRoute";
const Purchases = React.lazy(() => import("../../Components/Pages/Purchases/Purchases"));
const PurchasesAdd = React.lazy(() => import("../../Components/Pages/Purchases/PurchasesAdd"));
const PurchasesView = React.lazy(() => import("../../Components/Pages/Purchases/PurchasesView"));
const PurchasesEdit = React.lazy(() => import("../../Components/Pages/Purchases/PurchasesEdit"));
const Department = React.lazy(() => import("../../Components/Pages/Department/Department"));
const DepartmentAdd = React.lazy(() => import("../../Components/Pages/Department/DepartmentAdd"));
const DepartmentView = React.lazy(() => import("../../Components/Pages/Department/DepartmentView"));
const DepartmentEdit = React.lazy(() => import("../../Components/Pages/Department/DepartmentEdit"));
const Employees = React.lazy(() => import("../../Components/Pages/Employees/Employees"));
const EmployeesAdd = React.lazy(() => import("../../Components/Pages/Employees/EmployeesAdd"));
const EmployeesView = React.lazy(() => import("../../Components/Pages/Employees/EmployeesView"));
const EmployeesEdit = React.lazy(() => import("../../Components/Pages/Employees/EmployeesEdit"));
const Branch = React.lazy(() => import("../../Components/Pages/Branch/Branch"));
const BranchAdd = React.lazy(() => import("../../Components/Pages/Branch/BranchAdd"));
const BranchView = React.lazy(() => import("../../Components/Pages/Branch/BranchView"));
const BranchEdit = React.lazy(() => import("../../Components/Pages/Branch/BranchEdit"));
const Increment = React.lazy(() => import("../../Components/Pages/Increment/Increment"));
const IncrementAdd = React.lazy(() => import("../../Components/Pages/Increment/IncrementAdd"));
const IncrementView = React.lazy(() => import("../../Components/Pages/Increment/IncrementView"));
const IncrementEdit = React.lazy(() => import("../../Components/Pages/Increment/IncrementEdit"));
const Client = React.lazy(() => import("../../Components/Pages/Client/Client"));
const ClientAdd = React.lazy(() => import("../../Components/Pages/Client/ClientAdd"));
const ClientView = React.lazy(() => import("../../Components/Pages/Client/ClientView"));
const ClientEdit = React.lazy(() => import("../../Components/Pages/Client/ClientEdit"));
const QuotationList = React.lazy(() => import("../../Components/Pages/QuotationList/QuotationList"));
const QuotationListAdd = React.lazy(() => import("../../Components/Pages/QuotationList/QuotationListAdd"));
const QuotationListView = React.lazy(() => import("../../Components/Pages/QuotationList/QuotationListView"));
const QuotationListEdit = React.lazy(() => import("../../Components/Pages/QuotationList/QuotationListEdit"));
const StoreProductList = React.lazy(() => import("../../Components/Pages/StockProductList/StockProductList"));
const StoreProductListAdd = React.lazy(() => import("../../Components/Pages/StockProductList/StockProductListAdd"));
const StoreProductListView = React.lazy(() => import("../../Components/Pages/StockProductList/StockProductListView"));
const StoreProductListEdit = React.lazy(() => import("../../Components/Pages/StockProductList/StockProductListEdit"));
const InvoiceList = React.lazy(() => import("../../Components/Pages/InvoiceList/InvoiceList"));
const InvoiceListAdd = React.lazy(() => import("../../Components/Pages/InvoiceList/InvoiceListAdd"));
const InvoiceListView = React.lazy(() => import("../../Components/Pages/InvoiceList/InvoiceListView"));
const InvoiceListEdit = React.lazy(() => import("../../Components/Pages/InvoiceList/InvoiceListEdit"));
const ExpenseCategory = React.lazy(() => import("../../Components/Pages/ExpenseCategory/ExpenseCategory"));
const ExpenseCategoryAdd = React.lazy(() => import("../../Components/Pages/ExpenseCategory/ExpenseCategoryAdd"));
const ExpenseCategoryView = React.lazy(() => import("../../Components/Pages/ExpenseCategory/ExpenseCategoryView"));
const ExpenseCategoryEdit = React.lazy(() => import("../../Components/Pages/ExpenseCategory/ExpenseCategoryEdit"));
const ExpenseSubCategory = React.lazy(() => import("../../Components/Pages/ExpenseSubCategory/ExpenseSubCategory"));
const ExpenseSubCategoryAdd = React.lazy(() => import("../../Components/Pages/ExpenseSubCategory/ExpenseSubCategoryAdd"));
const ExpenseSubCategoryView = React.lazy(() => import("../../Components/Pages/ExpenseSubCategory/ExpenseSubCategoryView"));
const ExpenseSubCategoryEdit = React.lazy(() => import("../../Components/Pages/ExpenseSubCategory/ExpenseSubCategoryEdit"));
const Expense = React.lazy(() => import("../../Components/Pages/Expense/Expense"));
const ExpenseAdd = React.lazy(() => import("../../Components/Pages/Expense/ExpenseAdd"));
const ExpenseView = React.lazy(() => import("../../Components/Pages/Expense/ExpenseView"));
const ExpenseEdit = React.lazy(() => import("../../Components/Pages/Expense/ExpenseEdit"));
const POS = React.lazy(() => import("../../Components/Pages/POS/Pos"));
const LoanAuthority = React.lazy(() => import("../../Components/Pages/LoanAuthority/LoanAuthority"));
const LoanAuthorityAdd = React.lazy(() => import("../../Components/Pages/LoanAuthority/LoanAuthorityAdd"));
const LoanAuthorityView = React.lazy(() => import("../../Components/Pages/LoanAuthority/LoanAuthorityView"));
const LoanAuthorityEdit = React.lazy(() => import("../../Components/Pages/LoanAuthority/LoanAuthorityEdit"));
const Loan = React.lazy(() => import("../../Components/Pages/Loan/Loan"));
const LoanAdd = React.lazy(() => import("../../Components/Pages/Loan/LoanAdd"));
const LoanView = React.lazy(() => import("../../Components/Pages/Loan/LoanView"));
const LoanEdit = React.lazy(() => import("../../Components/Pages/Loan/LoanEdit"));
const LoanPayment = React.lazy(() => import("../../Components/Pages/LoanPayment/LoanPayment"));
const LoanPaymentAdd = React.lazy(() => import("../../Components/Pages/LoanPayment/LoanPaymentAdd"));
const LoanPaymentView = React.lazy(() => import("../../Components/Pages/LoanPayment/LoanPaymentView"));
const LoanPaymentAddEdit = React.lazy(() => import("../../Components/Pages/LoanPayment/LoanPaymentEdit"));
const AssetTypes = React.lazy(() => import("../../Components/Pages/AssetTypes/AssetTypes"));
const AssetTypesAdd = React.lazy(() => import("../../Components/Pages/AssetTypes/AssetTypesAdd"));
const AssetTypesView = React.lazy(() => import("../../Components/Pages/AssetTypes/AssetTypesView"));
const AssetTypesEdit = React.lazy(() => import("../../Components/Pages/AssetTypes/AssetTypesEdit"));
const Assets = React.lazy(() => import("../../Components/Pages/Assets/Assets"));
const AssetsAdd = React.lazy(() => import("../../Components/Pages/Assets/AssetsAdd"));
const Assetsview = React.lazy(() => import("../../Components/Pages/Assets/AssetsView"));
const AssetsEdit = React.lazy(() => import("../../Components/Pages/Assets/AssetsEdit"));
const Payroll = React.lazy(() => import("../../Components/Pages/Payroll/Payroll"));
const PayrollAdd = React.lazy(() => import("../../Components/Pages/Payroll/PayrollAdd"));
const PayrollView = React.lazy(() => import("../../Components/Pages/Payroll/PayrollView"));
const PayrollEdit = React.lazy(() => import("../../Components/Pages/Payroll/PayrollEdit"));
const StoreAllBranches = React.lazy(() => import("../../Components/Pages/StoreAllBranches/StoreAllBranches"));
const BalanceSheet = React.lazy(() => import("../../Components/Pages/BalanceSheet/BalanceSheet"));
const SummaryReport = React.lazy(() => import("../../Components/Pages/SummaryReport/SummaryReport"));
const ProfitLossReport = React.lazy(() => import("../../Components/Pages/ProfitLossReport/ProfitLossReport"));
const ExpenseReport = React.lazy(() => import("../../Components/Pages/ExpenseReport/ExpenseReport"));
const InventoryReport = React.lazy(() => import("../../Components/Pages/InventoryReport/InventoryReport"));
const Currency = React.lazy(() => import("../../Components/Pages/Currency/Currency"));
const CurrencyAdd = React.lazy(() => import("../../Components/Pages/Currency/CurrencyAdd"));
const CurrencyView = React.lazy(() => import("../../Components/Pages/Currency/CurrencyView"));
const CurrencyEdit = React.lazy(() => import("../../Components/Pages/Currency/CurrencyEdit"));
const BalanceAdjustments = React.lazy(() => import("../../Components/Pages/BalanceAdjustments/BalanceAdjustments"));
const BalanceAdjustmentsAdd = React.lazy(() => import("../../Components/Pages/BalanceAdjustments/BalanceAdjustmentsAdd"));
const BalanceAdjustmentsView = React.lazy(() => import("../../Components/Pages/BalanceAdjustments/BalanceAdjustmentsView"));
const BalanceAdjustmentsEdit = React.lazy(() => import("../../Components/Pages/BalanceAdjustments/BalanceAdjustmentsEdit"));
const BalanceTransfer = React.lazy(() => import("../../Components/Pages/BalanceTransfer/BalanceTransfer"));
const BalanceTransferAdd = React.lazy(() => import("../../Components/Pages/BalanceTransfer/BalanceTransferAdd"));
const BalanceTransferView = React.lazy(() => import("../../Components/Pages/BalanceTransfer/BalanceTransferView"));
const BalanceTransferEdit = React.lazy(() => import("../../Components/Pages/BalanceTransfer/BalanceTransferEdit"));
const PurchaseReturn = React.lazy(() => import("../../Components/Pages/PurchaseReturn/PurchaseReturn"));
const PurchaseReturnAdd = React.lazy(() => import("../../Components/Pages/PurchaseReturn/PurchaseReturnAdd"));
const PurchaseReturnView = React.lazy(() => import("../../Components/Pages/PurchaseReturn/PurchaseReturnView"));
const PurchaseReturnEdit = React.lazy(() => import("../../Components/Pages/PurchaseReturn/PurchaseReturnEdit"));
const InvoiceReturn = React.lazy(() => import("../../Components/Pages/InvoiceReturn/InvoiceReturn"));
const InvoiceReturnAdd = React.lazy(() => import("../../Components/Pages/InvoiceReturn/InvoiceReturnAdd"));
const InvoiceReturnView = React.lazy(() => import("../../Components/Pages/InvoiceReturn/InvoiceReturnView"));
const InvoiceReturnEdit = React.lazy(() => import("../../Components/Pages/InvoiceReturn/InvoiceReturnEdit"));
const AccountTransaction = React.lazy(() => import("../../Components/Pages/AccountTransaction/AccountTransaction"));
const InvoicePayment = React.lazy(() => import("../../Components/Pages/InvoicePayment/InvoicePayment"));
const InvoicePaymentAdd = React.lazy(() => import("../../Components/Pages/InvoicePayment/InvoicePaymentAdd"));
const InvoicePaymentView = React.lazy(() => import("../../Components/Pages/InvoicePayment/InvoicePaymentView"));
const InvoicePaymentEdit = React.lazy(() => import("../../Components/Pages/InvoicePayment/InvoicePaymentEdit"));
const NonInvoicePayment = React.lazy(() => import("../../Components/Pages/NonInvoicePayment/NonInvoicePayment"));
const NonInvoicePaymentAdd = React.lazy(() => import("../../Components/Pages/NonInvoicePayment/NonInvoicePaymentAdd"));
const NonInvoicePaymentView = React.lazy(() => import("../../Components/Pages/NonInvoicePayment/NonInvoicePaymentView"));
const NonInvoicePaymentEdit = React.lazy(() => import("../../Components/Pages/NonInvoicePayment/NonInvoicePaymentEdit"));
const PurchasePayment = React.lazy(() => import("../../Components/Pages/PurchasePayment/PurchasePayment"));
const PurchasePaymentAdd = React.lazy(() => import("../../Components/Pages/PurchasePayment/PurchasePaymentAdd"));
const PurchasePaymentView = React.lazy(() => import("../../Components/Pages/PurchasePayment/PurchasePaymentView"));
const PurchasePaymentEdit = React.lazy(() => import("../../Components/Pages/PurchasePayment/PurchasePaymentEdit"));
const NonPurchasePayment = React.lazy(() => import("../../Components/Pages/NonPurchasePayment/NonPurchasePayment"));
const NonPurchasePaymentAdd = React.lazy(() => import("../../Components/Pages/NonPurchasePayment/NonPurchasePaymentAdd"));
const NonPurchasePaymentView = React.lazy(() => import("../../Components/Pages/NonPurchasePayment/NonPurchasePaymentView"));
const NonPurchasePaymentEdit = React.lazy(() => import("../../Components/Pages/NonPurchasePayment/NonPurchasePaymentEdit"));
const Inventory = React.lazy(() => import("../../Components/Pages/Inventory/Inventory"));
const InventoryView = React.lazy(() => import("../../Components/Pages/Inventory/InventoryView"));
const PlanPayment = React.lazy(() => import("../../Components/Pages/PlanPayment/PlanPayment"));
const InventoryAdjustment = React.lazy(() => import("../../Components/Pages/InventoryAdjustment/InventoryAdjustment"));
const InventoryAdjustmentAdd = React.lazy(() => import("../../Components/Pages/InventoryAdjustment/InventoryAdjustmentAdd"));
const InventoryAdjustmentView = React.lazy(() => import("../../Components/Pages/InventoryAdjustment/InventoryAdjustmentView"));
const InventoryAdjustmentEdit = React.lazy(() => import("../../Components/Pages/InventoryAdjustment/InventoryAdjustmentEdit"));
const PaymentResult = React.lazy(() => import("../../Components/Pages/PaymentResult/PaymentResult"));
const TransactionHistory = React.lazy(() => import("../../Components/Pages/TransactionHistory/TransactionHistory"));
const StoreSubscription = React.lazy(() => import("../../Components/Pages/StoreSubscription/StoreSubscription"));
const SystemSettings = React.lazy(() => import("../../Components/Pages/SystemSettings/SystemSettings"));
const StoreSettings = React.lazy(() => import("../../Components/Pages/StoreSettings/StoreSettings"));
const SetupPage = React.lazy(() => import("../../Components/Pages/setup/SetupPage"));
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
