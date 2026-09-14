import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { useUpdateApplicationFeaturestatusMutation } from "../../../store/api/app/ApplicationFeatures/applicationFeaturesApiSlice";
import { useUpdateHomeSectiontatusMutation } from "../../../store/api/app/HomeSection/homeSectionApiSlice";
import { useUpdateHomeSectionDetailsStatusMutation } from "../../../store/api/app/HomeSection/homeSectionDetailsApiSlice";
import { useUpdateSubscriptionstatusMutation } from "../../../store/api/app/Subscriptions/subscriptionsApiSlice";
import { useUpdateSocialstatusMutation } from "../../../store/api/app/Socials/socialsApiSlice";
import { useUpdateFootertatusMutation } from "../../../store/api/app/footer/footerApiSlice";
import { useUpdateFeaturestatusMutation } from "../../../store/api/app/Features/featuresApiSlice";
import { useUpdatePlanstatusMutation } from "../../../store/api/app/Plans/plansApiSlice";
import { useUpdateStorestatusMutation } from "../../../store/api/app/store/storeApiSlice";
import { useUpdateCategoriestatusMutation } from "../../../store/api/app/Category/categoryApiSlice";
import { useUpdateRolesStorestatusMutation } from "../../../store/api/app/Roles/rolesStoreApiSlice";
import { useUpdateStoreUserstatusMutation } from "../../../store/api/app/StoreUser/StoreUserApiSlice";
import { useUpdateBrandstatusMutation } from "../../../store/api/app/Brand/brandApiSlice";
import { useUpdateSubCategoriestatusMutation } from "../../../store/api/app/SubCategory/subCategoryApiSlice";
import { useUpdateUnitstatusMutation } from "../../../store/api/app/Unit/unitApiSlice";
import { useUpdateTaxstatusMutation } from "../../../store/api/app/Tax/taxApiSlice";
import { useUpdateProductsMutation, useUpdateProductstatusMutation } from "../../../store/api/app/Products/productsApiSlice";
import { useUpdateAccountstatusMutation } from "../../../store/api/app/Account/accountApiSlice";
import { useUpdateDepartmentstatusMutation } from "../../../store/api/app/Department/departmentApiSlice";
import { useUpdateEmployeestatusMutation } from "../../../store/api/app/Employees/employeesApiSlice";
import { useUpdateBranchestatusMutation } from "../../../store/api/app/Branch/branchApiSlice";
import { useUpdateSalaryIncrementstatusMutation } from "../../../store/api/app/Increment/incrementApiSlice";
import { useUpdateClientstatusMutation } from "../../../store/api/app/Client/clientApiSlice";
import { useUpdateStockProductstatusMutation } from "../../../store/api/app/StockProduct/stockProductApiSlice";
import { useUpdatePurchasestatusMutation } from "../../../store/api/app/Purchases/purchasesApiSlice";
import { useUpdateQuotationstatusMutation } from "../../../store/api/app/QuotationList/quotationListApiSlice";
import { useUpdateExpenseCategoryStatusMutation } from "../../../store/api/app/ExpenseCategory/expenseCategoriesApiSlice";
import { useUpdateExpenseSubCategoryStatusMutation } from "../../../store/api/app/ExpenseSubCategory/expenseSubCategoriesApiSlice";
import { useUpdateLoanAuthoritiestatusMutation } from "../../../store/api/app/LoanAuthoritiesApi/loanAuthoritiesApiSlice";
import { useUpdateLoanstatusMutation } from "../../../store/api/app/LoansApi/loansApiSlice";
import { useUpdateLoanPaymentstatusMutation } from "../../../store/api/app/paymentsApi/paymentsApiSlice";
import { useUpdateAssetTypestatusMutation } from "../../../store/api/app/AssetTypesApi/featuresApiSlice";
import { useUpdateAssetstatusMutation } from "../../../store/api/app/AssetsApi/assetsApiSlice";
import { useUpdatePayrollstatusMutation } from "../../../store/api/app/PayrollApi/payrollApiSlice";
import { useUpdateCurrenciesMutation } from "../../../store/api/app/Currency/currenciesApiSlice";
import { useUpdateBalanceAdjustmentstatusMutation } from "../../../store/api/app/BalanceAdjustments/BalanceAdjustmentsApiSlice";
import { useUpdateBalanceTransferstatusMutation } from "../../../store/api/app/BalanceTransfer/BalanceTransferApiSlice";
import { useUpdateInvoicePaymentstatusMutation } from "../../../store/api/app/Invoice/invoiceApiSlice";
import { useUpdateNonInvoicePaymentstatusMutation } from "../../../store/api/app/NonInvoice/nonInvoiceApiSlice";
import { useUpdatePurchasePaymentstatusMutation } from "../../../store/api/app/PurchasePayment/PurchasePaymentApiSlice";
import { useUpdateNonPurchasePaymentstatusMutation } from "../../../store/api/app/NonPurchasePayment/nonPurchasePaymentApiSlice";

const Status = ({ id, status }) => {
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");
  let hook = null;

  if (pathArray.includes("features")) {
    hook = useUpdateFeaturestatusMutation;
  } else if (pathArray.includes("plans")) {
    hook = useUpdatePlanstatusMutation;
  } else if (pathArray.includes("applicationfeatures")) {
    hook = useUpdateApplicationFeaturestatusMutation;
  } else if (pathArray.includes(`homesectiondetails`)) {
    hook = useUpdateHomeSectionDetailsStatusMutation;
  } else if (pathArray.includes("homesection")) {
    hook = useUpdateHomeSectiontatusMutation;
  } else if (pathArray.includes("subscription")) {
    hook = useUpdateSubscriptionstatusMutation;
  } else if (pathArray.includes("social")) {
    hook = useUpdateSocialstatusMutation;
  } else if (pathArray.includes("footer-type")) {
    hook = useUpdateFootertatusMutation;
  } else if (pathArray.includes("stock-product")) {
    hook = useUpdateStockProductstatusMutation;
  } else if (
    pathArray.includes("store") &&
    !pathArray.includes("category") &&
    !pathArray.includes("store-roles") &&
    !pathArray.includes("store-users") &&
    !pathArray.includes("brand") &&
    !pathArray.includes("sub-category") &&
    !pathArray.includes("unit") &&
    !pathArray.includes("tax") &&
    !pathArray.includes("product") &&
    !pathArray.includes("account") &&
    !pathArray.includes("departments") &&
    !pathArray.includes("employees") &&
    !pathArray.includes("branches") &&
    !pathArray.includes("salary-increments") &&
    !pathArray.includes("clients") &&
    !pathArray.includes("purchases") &&
    !pathArray.includes("quotation-list") &&
    !pathArray.includes("expense-category") &&
    !pathArray.includes("expense-sub-category") &&
    !pathArray.includes("loan-authority") &&
    !pathArray.includes("loans") &&
    !pathArray.includes("loan-payments") &&
    !pathArray.includes("asset-types") &&
    !pathArray.includes("assets") &&
    !pathArray.includes("payroll") &&
    !pathArray.includes("currency") &&
    !pathArray.includes("balance-adjustments") &&
    !pathArray.includes("balance-transfers") &&
    !pathArray.includes("invoice") &&
    !pathArray.includes("non-invoice") &&
    !pathArray.includes("purchase") &&
    !pathArray.includes("non-purchase")
  ) {
    hook = useUpdateStorestatusMutation;
  } else if (pathArray.includes("category")) {
    hook = useUpdateCategoriestatusMutation;
  } else if (pathArray.includes("sub-category")) {
    hook = useUpdateSubCategoriestatusMutation;
  } else if (pathArray.includes("store-roles")) {
    hook = useUpdateRolesStorestatusMutation;
  } else if (pathArray.includes("store-users")) {
    hook = useUpdateStoreUserstatusMutation;
  } else if (pathArray.includes("brand")) {
    hook = useUpdateBrandstatusMutation;
  } else if (pathArray.includes("unit")) {
    hook = useUpdateUnitstatusMutation;
  } else if (pathArray.includes("tax")) {
    hook = useUpdateTaxstatusMutation;
  } else if (pathArray.includes("product")) {
    hook = useUpdateProductstatusMutation;
  } else if (pathArray.includes("account")) {
    hook = useUpdateAccountstatusMutation;
  } else if (pathArray.includes("departments")) {
    hook = useUpdateDepartmentstatusMutation;
  } else if (pathArray.includes("employees")) {
    hook = useUpdateEmployeestatusMutation;
  } else if (pathArray.includes("branches")) {
    hook = useUpdateBranchestatusMutation;
  } else if (pathArray.includes("salary-increments")) {
    hook = useUpdateSalaryIncrementstatusMutation;
  }
  else if (pathArray.includes("clients")) {
    hook = useUpdateClientstatusMutation;
  }
  else if (pathArray.includes("purchases")) {
    hook = useUpdatePurchasestatusMutation
  }
  else if (pathArray.includes("quotation-list")) {
    hook = useUpdateQuotationstatusMutation
  }
  else if (pathArray.includes("expense-category")) {
    hook = useUpdateExpenseCategoryStatusMutation
  }
  else if (pathArray.includes("expense-sub-category")) {
    hook = useUpdateExpenseSubCategoryStatusMutation
  }
  else if (pathArray.includes("loan-authority")) {
    hook = useUpdateLoanAuthoritiestatusMutation
  }
  else if (pathArray.includes("loans")) {
    hook = useUpdateLoanstatusMutation
  }
  else if (pathArray.includes("loan-payments")) {
    hook = useUpdateLoanPaymentstatusMutation
  }
  else if (pathArray.includes("asset-types")) {
    hook = useUpdateAssetTypestatusMutation
  }
  else if (pathArray.includes("assets")) {
    hook = useUpdateAssetstatusMutation
  }
  else if (pathArray.includes("payroll")) {
    hook = useUpdatePayrollstatusMutation
  }
  else if (pathArray.includes("currency")) {
    hook = useUpdateCurrenciesMutation
  }
  else if (pathArray.includes("balance-adjustments")) {
    hook = useUpdateBalanceAdjustmentstatusMutation
  }
  else if (pathArray.includes("balance-transfers")) {
    hook = useUpdateBalanceTransferstatusMutation
  }
  else if (pathArray.includes("invoice")) {
    hook = useUpdateInvoicePaymentstatusMutation
  }
  else if (pathArray.includes("non-invoice") &&
    !pathArray.includes("invoice")) {
    hook = useUpdateNonInvoicePaymentstatusMutation
  }
  else if (pathArray.includes("purchase")) {
    hook = useUpdatePurchasePaymentstatusMutation
  }
  else if (pathArray.includes("non-purchase")) {
    hook = useUpdateNonPurchasePaymentstatusMutation
  }

  const [updateStatus, { isLoading, isError, error, isSuccess }] = hook
    ? hook()
    : [
      () => { },
      {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
      },
    ];

  const handleToggleStatus = async () => {
    try {
      const newStatus = status ? 0 : 1;

      await updateStatus({
        id,
        status: newStatus,
      });

      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <span className="block w-full">
      <span
        onClick={handleToggleStatus}
        className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 cursor-pointer ${status ? "text-success-500 bg-green-500" : "text-danger-500 bg-red-500"
          } 
       `}
      >
        {status ? "Active" : "Inactive"}
      </span>
    </span>
  );
};

export default Status;
