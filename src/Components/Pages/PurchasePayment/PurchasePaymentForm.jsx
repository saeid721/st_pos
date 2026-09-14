import React, { useEffect, useState } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateAccountsMutation, useGetAccountsQuery, useGetAvailableBalanceByAccountQuery, useUpdateAccountsMutation } from "../../../store/api/app/Account/accountApiSlice";
import { useSelector } from "react-redux";
import { useGetBranchesQuery } from "../../../store/api/app/Branch/branchApiSlice";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useGetClientsQuery } from "../../../store/api/app/Client/clientApiSlice";
import { useCreateInvoicePaymentsMutation, useGetInvoicePaymentSummaryByClientQuery, useUpdateInvoicePaymentsMutation } from "../../../store/api/app/Invoice/invoiceApiSlice";
import { useGetInvoicesByClientQuery, useGetInvoicesByIdQuery } from "../../../store/api/app/InvoiceList/invoiceListApiSlice";
import { useGetSuppliersQuery } from "../../../store/api/app/Suppliers/suppliersApiSlice";
import { useGetPurchasesByIdQuery, useGetPurchasesQuery } from "../../../store/api/app/Purchases/purchasesApiSlice";
import { useCreatePurchasePaymentsMutation, useGetPurchasePaymentSummaryBySupplierQuery, useUpdatePurchasePaymentsMutation } from "../../../store/api/app/PurchasePayment/PurchasePaymentApiSlice";

const PurchasePaymentForm = ({ id, data }) => {
  const navigate = useNavigate(); // Get the navigate function
  const { isAuth, auth } = useSelector((state) => state.auth);
  const [purchaseData, setPurchaseData] = useState([]);
  const [branchId, setBranchId] = useState(null);

  const {
    register,
    unregister,
    control,
    errors,
    reset,
    handleSubmit,
    onSubmit,
    watch,
    isLoading,
  } = useSubmit(
    id,
    id ? useUpdatePurchasePaymentsMutation : useCreatePurchasePaymentsMutation
  );
  const { store_id } = auth.user;

  const supplier_id = watch("supplier_id");
  const invoice_id = watch("invoice_id");
  const purchase_id = watch("purchase_id");
  const account_id = watch("account_id")
  const branch = localStorage.getItem("branch_id");



  const { data: branchesData, isLoading: isLoadingBranches } = useGetBranchesQuery({ store_id: auth.store_id });
  const { data: clients } = useGetClientsQuery({
    store_id: store_id,
  });

  const { data: suppliers } = useGetSuppliersQuery({
    store_id: store_id,
  });

  const { data: PurchasePaymentSuppliersData } = useGetPurchasePaymentSummaryBySupplierQuery({
    supplier_id: supplier_id,
    branch_id: branchId,
  })

  const { data: purchases } = useGetPurchasesQuery()

  const { data: accounts, isLoading: isLoadingAccounts, isError: isErrorAccounts, error: errorAccounts } = useGetAccountsQuery({ store_id: auth.store_id });
  const { data: singlePurchase } = useGetPurchasesByIdQuery(purchase_id)
  const { data: singlePurchaseForEdit } = useGetPurchasesByIdQuery(purchase_id)

  const available_balance = useGetAvailableBalanceByAccountQuery({
    account_id: account_id || data?.account_transaction?.account_id,
  })

  console.log("singlePurchase::", singlePurchase);


  useEffect(() => {
    if (branch) {
      const parsedData = JSON.parse(branch);
      setBranchId(parsedData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, [branch]);
  console.log("branchId", branchId);

  useEffect(() => {
    if (!singlePurchase?.data) return;

    const purchase = singlePurchase.data;

    // Prevent duplicates: check if this purchase_no is already in the array
    setPurchaseData((prev) => {
      const alreadyExists = prev.some(item => item.purchase_no === purchase.purchase_no);
      if (alreadyExists) return prev;

      const totalDue = purchase.sub_total - purchase.purchase_payments?.reduce((acc, payment) => acc + payment.amount, 0);
      console.log("totalDue", totalDue);
      console.log("purchase.sub_total", purchase.sub_total);
      console.log("purchase.purchase_payments", purchase.purchase_payments);

      const newPurchaseData = {
        purchase_id: purchase.id,
        purchase_no: purchase.purchase_no,
        sub_total: purchase.sub_total,
        total_due: totalDue,
      };

      return [...prev, newPurchaseData];
    });
  }, [singlePurchase?.data]);


  console.log("purchaseData::::::: ", purchaseData);

  const removePurchase = (purchaseNo) => {
    setPurchaseData(prev => prev.filter(inv => inv.purchase_no !== purchaseNo));
  };


  const handleFormSubmit = async (data) => {
    const newDate = new Date(data.date).toISOString();
    data.date = newDate;

    const newData = {
      account_id: data.account_id,
      cheque_no: data.cheque_no,
      receipt_no: data.receipt_no,
      // note: data.note,
      branch_id: branchId,
      date: data.date,
      purchases: purchaseData.map((purchase) => ({
        purchase_id: parseInt(purchase.purchase_id),
        amount: parseFloat(purchase.paid_amount) || 0
      }))
    }

    await onSubmit(newData);
  };

  useEffect(() => {
    reset({
      ...data,
      account_id: data?.account_transaction?.account_id,
      cheque_no: data?.account_transaction?.cheque_no,
      receipt_no: data?.account_transaction?.receipt_no,
      note: data?.note,
      date: data?.date,
    });
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
          {
            !id && (
              <>
                <CustomReactSelect
                  control={control}
                  name="supplier_id"
                  label="Supplier"
                  placeholder="Select Supplier"
                  options={
                    suppliers?.data?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    })) || []
                  }
                  required={true}
                // error={errors.section_type}
                />

                {
                  supplier_id && (
                    <>
                      <div className="grid grid-cols-3 gap-5">
                        <TextInput
                          name="purchase_total"
                          label="Purchase Total"
                          type="text"
                          register={register}
                          // placeholder="Enter Invoice Total"
                          value={PurchasePaymentSuppliersData?.data?.total_purchase_amount}
                          defaultValue={PurchasePaymentSuppliersData?.data?.total_purchase_amount}
                          disabled={true}
                        />
                        <TextInput
                          name="total_paid"
                          label="Total Paid"
                          type="text"
                          register={register}
                          placeholder="Enter Total Paid"
                          value={PurchasePaymentSuppliersData?.data?.total_paid_amount}
                          defaultValue={PurchasePaymentSuppliersData?.data?.total_paid_amount}
                          disabled={true}
                        />
                        <TextInput
                          name="total_due"
                          label="Total Due"
                          type="text"
                          register={register}
                          placeholder="Enter Total Due"
                          value={PurchasePaymentSuppliersData?.data?.total_due_amount}
                          defaultValue={PurchasePaymentSuppliersData?.data?.total_due_amount}
                          disabled={true}
                        />
                      </div>

                      <CustomReactSelect
                        control={control}
                        error={errors?.purchase_id}
                        name="purchase_id"
                        label="Select Purchase"
                        placeholder="Select Purchase"
                        required={true}
                        options={
                          purchases?.data?.map((item) => ({
                            value: item.id,
                            label: item.purchase_no,
                          })) || []
                        }
                        isLoading={isLoadingBranches}
                      />
                      {purchaseData.map((purchase, index) => (
                        <div key={index} className="border rounded-lg shadow-sm p-4 relative bg-white">
                          {console.log("purchase,,,,", purchase)}
                          <h2 className="text-sm font-semibold mb-3">{purchase.purchase_no} purchase Details</h2>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <label className="text-sm">Purchase No</label>
                              <input className="w-full border rounded px-2 py-1 bg-gray-100" value={purchase.purchase_no} disabled />
                            </div>
                            <div>
                              <label className="text-sm">Total</label>
                              <input className="w-full border rounded px-2 py-1 bg-gray-100" value={purchase.sub_total} disabled />
                            </div>
                            <div>
                              <label className="text-sm">Due</label>
                              <input className="w-full border rounded px-2 py-1 bg-gray-100" value={purchase.total_due} disabled />
                            </div>
                            <div>
                              <label className="text-sm">Paid Amount</label>
                              <input
                                className="w-full border rounded px-2 py-1"
                                value={purchase.paid_amount}
                                onChange={(e) => {
                                  const updated = [...purchaseData];
                                  updated[index].paid_amount = e.target.value;
                                  setPurchaseData(updated);
                                }}
                              />
                            </div>
                          </div>
                          <button
                            className="absolute top-3 right-3 text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                            onClick={() => removePurchase(purchase.invoice_no)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </>
                  )
                }

                <div className="grid grid-cols-3 gap-5">
                  <TextInput
                    name="total_payment"
                    label="Total Payment"
                    type="text"
                    register={register}
                    placeholder="Enter Total Payment"
                    value={purchaseData?.reduce((acc, invoice) => acc + (parseFloat(invoice.paid_amount) || 0), 0)}
                    defaultValue={purchaseData?.reduce((acc, invoice) => acc + (parseFloat(invoice.paid_amount) || 0), 0)}
                    disabled={true}
                  />
                  <CustomReactSelect
                    control={control}
                    error={errors?.account_id}
                    name="account_id"
                    label="Account"
                    placeholder="Select Account"
                    required={true}
                    options={
                      accounts?.data?.map((item) => ({
                        value: item.id,
                        label: item.bank_name,
                      })) || []
                    }
                    isLoading={isLoadingAccounts}
                  />
                  <TextInput
                    name="available_balance"
                    label="Available Balance"
                    type="text"
                    register={register}
                    value={available_balance?.data?.data?.available_balance?.toFixed(2)}
                    defaultValue={available_balance?.data?.data?.available_balance?.toFixed(2)}
                  />
                </div>
              </>
            )
          }

          {
            id && (
              <div>
                <div className="grid grid-cols-3 gap-5">
                  <TextInput
                    name="purchase_no"
                    label="Purchase No"
                    type="text"
                    register={register}
                    value={singlePurchaseForEdit?.data?.purchase_no}
                    defaultValue={singlePurchaseForEdit?.data?.purchase_no}
                    readonly="readonly"
                  />
                  <TextInput
                    name="invoice_total"
                    label="Invoice Total"
                    type="text"
                    register={register}
                    placeholder="Enter Invoice Total"
                    value={singlePurchaseForEdit?.data?.sub_total}
                    defaultValue={singlePurchaseForEdit?.data?.sub_total}
                    readonly="readonly"
                  />
                  <TextInput
                    name="total_due"
                    label="Total Due"
                    type="text"
                    register={register}
                    error={errors.total_due}
                    required={true}
                    placeholder="Enter Total Due"
                    value={singlePurchaseForEdit?.data?.sub_total - singlePurchaseForEdit?.data?.purchase_payments?.reduce((acc, payment) => acc + payment.amount, 0)}
                    defaultValue={singlePurchaseForEdit?.data?.sub_total - singlePurchaseForEdit?.data?.purchase_payments?.reduce((acc, payment) => acc + payment.amount, 0)}
                    readonly="readonly"
                  />
                </div>
              </div>
            )
          }


          <div className="grid grid-cols-3 gap-5">
            {
              id && (
                <>
                  <CustomReactSelect
                    control={control}
                    error={errors?.account_id}
                    name="account_id"
                    label="Account"
                    placeholder="Select Account"
                    required={true}
                    options={
                      accounts?.data?.map((item) => ({
                        value: item.id,
                        label: item.bank_name,
                      })) || []
                    }
                    isLoading={isLoadingAccounts}
                  />
                  <TextInput
                    name="available_balance"
                    label="Available Balance"
                    type="text"
                    register={register}
                    value={available_balance?.data?.data?.available_balance?.toFixed(2)}
                    defaultValue={available_balance?.data?.data?.available_balance?.toFixed(2)}
                    readonly="readonly"
                  />
                </>
              )
            }
            <TextInput
              name="cheque_no"
              label="Enter Cheque No"
              type="text"
              register={register}
              error={errors.cheque_no}
              required={true}
              // className="h-[48px]"
              placeholder="Enter Cheque No"
            />
            <TextInput
              name="receipt_no"
              label="Enter Receipt No"
              type="text"
              register={register}
              error={errors.receipt_no}
              required={true}
              // className="h-[48px]"
              placeholder="Enter Receipt No"
            />
            {
              id && <TextInput
                name="amount"
                label="amount"
                type="text"
                register={register}
                error={errors.amount}
                required={true}
                placeholder="Enter amount"
                readonly="readonly"
              />
            }
            <TextInput
              name="date"
              label="Enter Payment Date"
              type="datetime-local"
              register={register}
              error={errors.receipt_no}
              required={true}
              // className="h-[48px]"
              placeholder="Enter Payment Date"
            />
          </div>

          <TextInput
            name="note"
            label="Note"
            type="text"
            register={register}
            error={errors.note}
            placeholder="Enter note"
          />


        </div>

        <div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse mt-6">
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
          >
            {isLoading ? <Loader /> : "Submit"}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default PurchasePaymentForm;
