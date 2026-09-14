import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import { useAssignRolePermissionsMutation, useGetRolesByIdQuery } from "../../../store/api/app/Roles/rolesApiSlice";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import ListLoading from "../../Shared/skeleton/ListLoading";
import Button from "../../Shared/ui/Button";
import {
  useAssignRolePermissionsStoreMutation,
  useGetRolesStoreByIdQuery,
} from "../../../store/api/app/Roles/rolesStoreApiSlice";

const StoreRoleManagementSettings = ({ clickedRoleId }) => {
  const [permissions, setPermissions] = useState([]);

  const { data, isLoading: singleRoleLoading } = useGetRolesStoreByIdQuery(clickedRoleId);

  const { register, unregister, control, errors, reset, handleSubmit, onSubmit, watch, isLoading, setValue } = useSubmit(
    clickedRoleId,
    clickedRoleId ? useAssignRolePermissionsStoreMutation : useAssignRolePermissionsStoreMutation,
    false
  );

  console.log("roleById", data);

  const permissionList = [
    {
      group: "STORE ROLE",
      permissions: [
        "CREATE_STORE_ROLE",
        "UPDATE_STORE_ROLE",
        "READ_STORE_ROLE",
        "DELETE_STORE_ROLE",
        "READ_STORE_ROLE_PERMISSION",
        "ASSIGN_STORE_ROLE_PERMISSION",
      ],
    },
    {
      group: "STORE USER",
      permissions: ["CREATE_STORE_USER", "UPDATE_STORE_USER", "DELETE_STORE_USER", "READ_STORE_USER"],
    },
    {
      group: "BRANCH",
      permissions: ["CREATE_BRANCH", "UPDATE_BRANCH", "DELETE_BRANCH", "READ_BRANCH"],
    },
    {
      group: "CATEGORY",
      permissions: ["CREATE_CATEGORY", "UPDATE_CATEGORY", "DELETE_CATEGORY", "READ_CATEGORY"],
    },
    {
      group: "SUB CATEGORY",
      permissions: ["CREATE_SUB_CATEGORY", "UPDATE_SUB_CATEGORY", "DELETE_SUB_CATEGORY", "READ_SUB_CATEGORY"],
    },
    {
      group: "SUPPLIERS",
      permissions: ["CREATE_SUPPLIER", "UPDATE_SUPPLIER", "DELETE_SUPPLIER", "READ_SUPPLIER"],
    },
    {
      group: "BRANDS",
      permissions: ["CREATE_BRAND", "UPDATE_BRAND", "DELETE_BRAND", "READ_BRAND"],
    },
    {
      group: "UNITS",
      permissions: ["CREATE_UNIT", "UPDATE_UNIT", "DELETE_UNIT", "READ_UNIT"],
    },
    {
      group: "TAX",
      permissions: ["CREATE_TAX", "UPDATE_TAX", "DELETE_TAX", "READ_TAX"],
    },
    {
      group: "PRODUCT",
      permissions: ["CREATE_PRODUCT", "UPDATE_PRODUCT", "DELETE_PRODUCT", "READ_PRODUCT"],
    },
    {
      group: "PURCHASE",
      permissions: ["CREATE_PURCHASE", "UPDATE_PURCHASE", "DELETE_PURCHASE", "READ_PURCHASE"],
    },
    {
      group: "PURCHASE PRODUCT",
      permissions: ["CREATE_PURCHASE_PRODUCT", "UPDATE_PURCHASE_PRODUCT", "DELETE_PURCHASE_PRODUCT", "READ_PURCHASE_PRODUCT"],
    },

    {
      group: "PURCHASE PAYMENT",
      permissions: ["CREATE_PURCHASE_PAYMENT", "UPDATE_PURCHASE_PAYMENT", "DELETE_PURCHASE_PAYMENT", "READ_PURCHASE_PAYMENT"],
    },
    {
      group: "NON PURCHASE PAYMENT",
      permissions: ["CREATE_NON_PURCHASE_PAYMENT", "UPDATE_NON_PURCHASE_PAYMENT", "DELETE_NON_PURCHASE_PAYMENT", "READ_NON_PURCHASE_PAYMENT"],
    },
    {
      group: "PURCHASE RETURN",
      permissions: ["CREATE_PURCHASE_RETURN", "UPDATE_PURCHASE_RETURN", "DELETE_PURCHASE_RETURN", "READ_PURCHASE_RETURN"],
    },
    {
      group: "ACCOUNT",
      permissions: ["CREATE_ACCOUNT", "UPDATE_ACCOUNT", "DELETE_ACCOUNT", "READ_ACCOUNT"],
    },

    {
      group: "DEPARTMENT",
      permissions: ["CREATE_DEPARTMENT", "UPDATE_DEPARTMENT", "DELETE_DEPARTMENT", "READ_DEPARTMENT"],
    },
    {
      group: "EMPLOYEE",
      permissions: ["CREATE_EMPLOYEE", "UPDATE_EMPLOYEE", "DELETE_EMPLOYEE", "READ_EMPLOYEE"],
    },
    {
      group: "SALARY_INCREMENTS",
      permissions: ["CREATE_SALARY_INCREMENTS", "UPDATE_SALARY_INCREMENTS", "DELETE_SALARY_INCREMENTS", "READ_SALARY_INCREMENTS"],
    },
    {
      group: "STOCK PRODUCT",
      permissions: ["CREATE_STOCK_PRODUCT", "UPDATE_STOCK_PRODUCT", "DELETE_STOCK_PRODUCT", "READ_STOCK_PRODUCT"],
    },
    {
      group: "BALANCE ADJUSTMENT",
      permissions: [
        "CREATE_BALANCE_ADJUSTMENT",
        "UPDATE_BALANCE_ADJUSTMENT",
        "DELETE_BALANCE_ADJUSTMENT",
        "READ_BALANCE_ADJUSTMENT",
      ],
    },
    {
      group: "BALANCE TRANSFER",
      permissions: ["CREATE_BALANCE_TRANSFER", "UPDATE_BALANCE_TRANSFER", "DELETE_BALANCE_TRANSFER", "READ_BALANCE_TRANSFER"],
    },
    {
      group: "ACCOUNT_TRANSACTION",
      permissions: [
        "CREATE_ACCOUNT_TRANSACTION",
        "UPDATE_ACCOUNT_TRANSACTION",
        "DELETE_ACCOUNT_TRANSACTION",
        "READ_ACCOUNT_TRANSACTION",
      ],
    },
    {
      group: "CLIENT",
      permissions: ["CREATE_CLIENT", "UPDATE_CLIENT", "DELETE_CLIENT", "READ_CLIENT"],
    },
    {
      group: "QUOTATION",
      permissions: ["CREATE_QUOTATION", "UPDATE_QUOTATION", "DELETE_QUOTATION", "READ_QUOTATION"],
    },
    {
      group: "QUOTATION PRODUCTS",
      permissions: [
        "CREATE_QUOTATION_PRODUCTS",
        "UPDATE_QUOTATION_PRODUCTS",
        "DELETE_QUOTATION_PRODUCTS",
        "READ_QUOTATION_PRODUCTS",
      ],
    },
    {
      group: "INVOICE",
      permissions: ["CREATE_INVOICE", "UPDATE_INVOICE", "DELETE_INVOICE", "READ_INVOICE"],
    },
    {
      group: "EXPENSE_CATEGORY",
      permissions: ["CREATE_EXPENSE_CATEGORY", "UPDATE_EXPENSE_CATEGORY", "DELETE_EXPENSE_CATEGORY", "READ_EXPENSE_CATEGORY"],
    },
    {
      group: "EXPENSE_SUB_CATEGORY",
      permissions: ["CREATE_EXPENSE_SUB_CATEGORY", "UPDATE_EXPENSE_SUB_CATEGORY", "DELETE_EXPENSE_SUB_CATEGORY", "READ_EXPENSE_SUB_CATEGORY"],
    },
    {
      group: "EXPENSE",
      permissions: ["CREATE_EXPENSE", "UPDATE_EXPENSE", "DELETE_EXPENSE", "READ_EXPENSE"],
    },
    {
      group: "INVOICE PRODUCT",
      permissions: ["CREATE_INVOICE_PRODUCT", "UPDATE_INVOICE_PRODUCT", "DELETE_INVOICE_PRODUCT", "READ_INVOICE_PRODUCT"],
    },
    {
      group: "INVOICE PAYMENT",
      permissions: ["CREATE_INVOICE_PAYMENT", "UPDATE_INVOICE_PAYMENT", "DELETE_INVOICE_PAYMENT", "READ_INVOICE_PAYMENT"],
    },
    {
      group: "INVOICE NON INVOICE PAYMENT",
      permissions: ["CREATE_NON_INVOICE_PAYMENT", "UPDATE_NON_INVOICE_PAYMENT", "DELETE_NON_INVOICE_PAYMENT", "READ_NON_INVOICE_PAYMENT"],
    },
    {
      group: "LOAN AUTHORITY",
      permissions: ["CREATE_LOAN_AUTHORITY", "UPDATE_LOAN_AUTHORITY", "DELETE_LOAN_AUTHORITY", "READ_LOAN_AUTHORITY"],
    },
    {
      group: "LOAN",
      permissions: ["CREATE_LOAN", "UPDATE_LOAN", "DELETE_LOAN", "READ_LOAN"],
    },
    {
      group: "LOAN PAYMENT",
      permissions: ["CREATE_LOAN_PAYMENT", "UPDATE_LOAN_PAYMENT", "DELETE_LOAN_PAYMENT", "READ_LOAN_PAYMENT"],
    },
    {
      group: "ASSET TYPES",
      permissions: ["CREATE_ASSET_TYPES", "UPDATE_ASSET_TYPES", "DELETE_ASSET_TYPES", "READ_ASSET_TYPES"],
    },
    {
      group: "ASSET",
      permissions: ["CREATE_ASSET", "UPDATE_ASSET", "DELETE_ASSET", "READ_ASSET"],
    },
    {
      group: "INVENTORY ADJUSTMENT",
      permissions: ["CREATE_INVENTORY_ADJUSTMENT", "UPDATE_INVENTORY_ADJUSTMENT", "DELETE_INVENTORY_ADJUSTMENT", "READ_INVENTORY_ADJUSTMENT"],
    },
    {
      group: "PAYROLL",
      permissions: ["CREATE_PAYROLL", "UPDATE_PAYROLL", "DELETE_PAYROLL", "READ_PAYROLL"],
    },

    {
      group: "Application Settings",
      permissions: ["UPDATE_APPLICATION_SETTING", "READ_APPLICATION_SETTING"],
    },
  ];

  const handleFormSubmit = async () => {
    const submissionData = {
      permissions,
    };

    // console.log("submissionData", submissionData);
    // return;
    await onSubmit(submissionData);
  };

  useEffect(() => {
    if (!!data?.data?.permissions?.length) {
      setPermissions([...data?.data?.permissions?.map((permission) => permission.name)]);
    } else {
      setPermissions([]); // Reset permissions when data is not available
    }
  }, [data, clickedRoleId]);

  if (singleRoleLoading) return <ListLoading />;

  return (
    <div className="border border-teal-100 shadow-md px-5 py-5 rounded-xl">
      <div>
        <h1 className="text-xl font-semibold text-gray-700">Role Management Settings</h1>

        <hr className="mt-5 mb-8" />

        <div className="">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              {permissionList.map((groupData, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-5 py-3 border-t border-gray-200">
                  <div>
                    <p className="font-semibold mb-3 text-gray-500">{groupData.group}</p>
                  </div>
                  <div>
                    {groupData.permissions.map((permission, idx) => (
                      <div key={idx} className="flex items-center mb-3 gap-3">
                        <Switch
                          // onChange={() => handleToggle(groupData.group, permission)}
                          onChange={() => {
                            setPermissions(
                              permissions.includes(permission)
                                ? permissions.filter((p) => p !== permission)
                                : [...permissions, permission]
                            );
                          }}
                          checked={permissions?.includes(permission)}
                          offColor="#f00"
                          onColor="#0f0"
                          height={20}
                          width={40}
                        />
                        <p className="text-gray-500 mr-3 text-sm">{permission}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3 rtl:space-x-reverse mt-6">
              <Button
                className="bg-[#FF5B14] text-white w-[90px] h-[38px] flex justify-center items-center"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#2377E7] text-white w-[90px] h-[38px] flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoreRoleManagementSettings;
