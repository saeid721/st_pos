import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDeleteApplicationFeaturesMutation } from "../../../../store/api/app/ApplicationFeatures/applicationFeaturesApiSlice";
import { useDeleteHomeSectionMutation } from "../../../../store/api/app/HomeSection/homeSectionApiSlice";
import { useDeleteHomeSectionDetailsMutation } from "../../../../store/api/app/HomeSection/homeSectionDetailsApiSlice";
import { useDeleteRolesMutation } from "../../../../store/api/app/Roles/rolesApiSlice";
import { useDeleteSubscriptionsMutation } from "../../../../store/api/app/Subscriptions/subscriptionsApiSlice";
import { useDeleteSubscribersMutation } from "../../../../store/api/app/Subscriber/subscriberApiSlice";
import { useDeleteSuperAdminsMutation } from "../../../../store/api/app/SuperAdmin/superAdminApiSlice";
import { useDeleteSocialsMutation } from "../../../../store/api/app/Socials/socialsApiSlice";
import { useDeleteFooterMutation } from "../../../../store/api/app/footer/footerApiSlice";
import { useDeleteFeaturesMutation } from "../../../../store/api/app/Features/featuresApiSlice";
import { useDeletePlansMutation } from "../../../../store/api/app/Plans/plansApiSlice";
import { useDeleteStoresMutation } from "../../../../store/api/app/store/storeApiSlice";
import { useDeleteCategoriesMutation } from "../../../../store/api/app/Category/categoryApiSlice";
import { useDeleteRolesStoreMutation } from "../../../../store/api/app/Roles/rolesStoreApiSlice";
import { useDeleteStoreUsersMutation } from "../../../../store/api/app/StoreUser/StoreUserApiSlice";
import { useDeleteBrandsMutation } from "../../../../store/api/app/Brand/brandApiSlice";
import { useDeleteSubCategoriesMutation } from "../../../../store/api/app/SubCategory/subCategoryApiSlice";
import { useDeleteUnitsMutation } from "../../../../store/api/app/Unit/unitApiSlice";
import { useDeleteTaxsMutation } from "../../../../store/api/app/Tax/taxApiSlice";
import { useDeleteProductsMutation } from "../../../../store/api/app/Products/productsApiSlice";
import { useDeleteAccountsMutation } from "../../../../store/api/app/Account/accountApiSlice";
import { useDeleteDepartmentsMutation } from "../../../../store/api/app/Department/departmentApiSlice";
import { useDeleteEmployeesMutation } from "../../../../store/api/app/Employees/employeesApiSlice";
import { useDeleteBranchesMutation } from "../../../../store/api/app/Branch/branchApiSlice";
import { useDeleteSalaryIncrementsMutation } from "../../../../store/api/app/Increment/incrementApiSlice";
import { useDeleteClientsMutation } from "../../../../store/api/app/Client/clientApiSlice";
import { useDeleteStockProductsMutation } from "../../../../store/api/app/StockProduct/stockProductApiSlice";
import { useDeletePurchasesMutation } from "../../../../store/api/app/Purchases/purchasesApiSlice";
import { useDeleteQuotationsMutation } from "../../../../store/api/app/QuotationList/quotationListApiSlice";
import { useDeleteExpenseCategoryMutation } from "../../../../store/api/app/ExpenseCategory/expenseCategoriesApiSlice";
import { useDeleteExpenseSubCategoryMutation } from "../../../../store/api/app/ExpenseSubCategory/expenseSubCategoriesApiSlice";
import { useDeleteLoanAuthoritiesMutation } from "../../../../store/api/app/LoanAuthoritiesApi/loanAuthoritiesApiSlice";
import { useDeleteLoansMutation } from "../../../../store/api/app/LoansApi/loansApiSlice";
import { useDeleteLoanPaymentsMutation } from "../../../../store/api/app/paymentsApi/paymentsApiSlice";
import { useDeleteAssetTypesMutation } from "../../../../store/api/app/AssetTypesApi/featuresApiSlice";
import { useDeleteAssetsMutation } from "../../../../store/api/app/AssetsApi/assetsApiSlice";
import { useDeletePayrollsMutation } from "../../../../store/api/app/PayrollApi/payrollApiSlice";
import { useDeleteCurrenciesMutation } from "../../../../store/api/app/Currency/currenciesApiSlice";
import { useDeleteBalanceAdjustmentsMutation } from "../../../../store/api/app/BalanceAdjustments/BalanceAdjustmentsApiSlice";
import { useDeleteBalanceTransfersMutation } from "../../../../store/api/app/BalanceTransfer/BalanceTransferApiSlice";
import { useDeleteInvoicePaymentsMutation } from "../../../../store/api/app/Invoice/invoiceApiSlice";
import { useDeleteNonInvoicePaymentsMutation } from "../../../../store/api/app/NonInvoice/nonInvoiceApiSlice";
import { useDeletePurchasePaymentsMutation } from "../../../../store/api/app/PurchasePayment/PurchasePaymentApiSlice";
import { useDeleteNonPurchasePaymentsMutation } from "../../../../store/api/app/NonPurchasePayment/nonPurchasePaymentApiSlice";
import { useDeleteInvoicesMutation } from "../../../../store/api/app/InvoiceList/invoiceListApiSlice";
import { useDeleteInventoryAdjustmentMutation } from "../../../../store/api/app/InventoryAdjustment/inventoryAdjustmentApiSlice";

const useDelete = (Hook) => {
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");
  let hook = null;
  if (Hook) {
    hook = Hook;
  } else if (pathArray.includes("features")) {
    hook = useDeleteFeaturesMutation;
  } else if (pathArray.includes("plans")) {
    hook = useDeletePlansMutation;
  } else if (pathArray.includes("roles")) {
    hook = useDeleteRolesMutation;
  } else if (pathArray.includes("applicationfeatures")) {
    hook = useDeleteApplicationFeaturesMutation;
  } else if (pathArray.includes("homesectiondetails")) {
    hook = useDeleteHomeSectionDetailsMutation;
  } else if (pathArray.includes("homesection")) {
    hook = useDeleteHomeSectionMutation;
  } else if (pathArray.includes("subscription")) {
    hook = useDeleteSubscriptionsMutation;
  } else if (pathArray.includes("subscriber")) {
    hook = useDeleteSubscribersMutation;
  } else if (pathArray.includes("users")) {
    hook = useDeleteSuperAdminsMutation;
  } else if (pathArray.includes("social")) {
    hook = useDeleteSocialsMutation;
  } else if (pathArray.includes("footer-type")) {
    hook = useDeleteFooterMutation;
  } else if (pathArray.includes("stock-product")) {
    hook = useDeleteStockProductsMutation;
  } else if (
    pathArray.includes("store") &&
    !pathArray.includes("store-roles") &&
    !pathArray.includes("store-users") &&
    !pathArray.includes("brand") &&
    !pathArray.includes("sub-category") &&
    !pathArray.includes("category") &&
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
    !pathArray.includes("invoices-list") &&
    !pathArray.includes("non-purchase") &&
    !pathArray.includes("inventory-adjustment")
  ) {
    hook = useDeleteStoresMutation;
  } else if (pathArray.includes("category")) {
    hook = useDeleteCategoriesMutation;
  } else if (pathArray.includes("sub-category")) {
    hook = useDeleteSubCategoriesMutation;
  } else if (pathArray.includes("store-roles")) {
    hook = useDeleteRolesStoreMutation;
  } else if (pathArray.includes("store-users")) {
    hook = useDeleteStoreUsersMutation;
  } else if (pathArray.includes("brand")) {
    hook = useDeleteBrandsMutation;
  } else if (pathArray.includes("unit")) {
    hook = useDeleteUnitsMutation;
  } else if (pathArray.includes("tax")) {
    hook = useDeleteTaxsMutation;
  } else if (pathArray.includes("product")) {
    hook = useDeleteProductsMutation;
  } else if (pathArray.includes("account")) {
    hook = useDeleteAccountsMutation;
  } else if (pathArray.includes("departments")) {
    hook = useDeleteDepartmentsMutation;
  } else if (pathArray.includes("employees")) {
    hook = useDeleteEmployeesMutation;
  } else if (pathArray.includes("branches")) {
    hook = useDeleteBranchesMutation;
  } else if (pathArray.includes("salary-increments")) {
    hook = useDeleteSalaryIncrementsMutation;
  }
  else if (pathArray.includes("clients")) {
    hook = useDeleteClientsMutation;
  }
  else if (pathArray.includes("purchases")) {
    hook = useDeletePurchasesMutation;
  }
  else if (pathArray.includes("quotation-list")) {
    hook = useDeleteQuotationsMutation;
  }
  else if (pathArray.includes("expense-category")) {
    hook = useDeleteExpenseCategoryMutation;
  }
  else if (pathArray.includes("expense-sub-category")) {
    hook = useDeleteExpenseSubCategoryMutation
  }
  else if (pathArray.includes("loan-authority")) {
    hook = useDeleteLoanAuthoritiesMutation
  }
  else if (pathArray.includes("loans")) {
    hook = useDeleteLoansMutation
  }
  else if (pathArray.includes("loan-payments")) {
    hook = useDeleteLoanPaymentsMutation
  }
  else if (pathArray.includes("invoices-list")) {
    hook = useDeleteInvoicesMutation
  }
  else if (pathArray.includes("asset-types")) {
    hook = useDeleteAssetTypesMutation
  }
  else if (pathArray.includes("assets")) {
    hook = useDeleteAssetsMutation
  }
  else if (pathArray.includes("payroll")) {
    hook = useDeletePayrollsMutation
  }
  else if (pathArray.includes("currency")) {
    hook = useDeleteCurrenciesMutation
  }
  else if (pathArray.includes("balance-adjustments")) {
    hook = useDeleteBalanceAdjustmentsMutation
  }
  else if (pathArray.includes("balance-transfers")) {
    hook = useDeleteBalanceTransfersMutation
  }
  else if (pathArray.includes("invoice")) {
    hook = useDeleteInvoicePaymentsMutation
  }
  else if (pathArray.includes("non-invoice") &&
    !pathArray.includes("invoice")) {
    hook = useDeleteNonInvoicePaymentsMutation
  }
  else if (pathArray.includes("purchase")) {
    hook = useDeletePurchasePaymentsMutation
  }
  else if (pathArray.includes("non-purchase")) {
    hook = useDeleteNonPurchasePaymentsMutation
  }
  else if (pathArray.includes("inventory-adjustment")) {
    hook = useDeleteInventoryAdjustmentMutation
  }

  const [deleteRecord, { isLoading, isError, error, isSuccess }] = hook
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

  const handleDelete = async (id) => {
    withReactContent(Swal)
      .fire({
        title: "Are you sure?",
        text: "You will not be able to recover this record!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          // Delete the record
          try {
            await deleteRecord(id);

            if (isError) {
              throw new Error(error?.message || "Something went wrong!");
            }

            Swal.fire("Deleted!", "Your record has been deleted.", "success");
          } catch (error) {
            Swal.fire("Failed!", "Failed to delete the record.", "error");
          }
        }
      });
  };

  return {
    handleDelete,
  };
};

export default useDelete;
