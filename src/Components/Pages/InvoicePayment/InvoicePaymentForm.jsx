import React, { useEffect, useState } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateAccountsMutation, useGetAccountsQuery, useUpdateAccountsMutation } from "../../../store/api/app/Account/accountApiSlice";
import { useSelector } from "react-redux";
import { useGetBranchesQuery } from "../../../store/api/app/Branch/branchApiSlice";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useGetClientsQuery } from "../../../store/api/app/Client/clientApiSlice";
import { useCreateInvoicePaymentsMutation, useGetInvoicePaymentSummaryByClientQuery, useUpdateInvoicePaymentsMutation } from "../../../store/api/app/Invoice/invoiceApiSlice";
import { useGetInvoicesByClientQuery, useGetInvoicesByIdQuery } from "../../../store/api/app/InvoiceList/invoiceListApiSlice";

const InvoicePaymentForm = ({ id, data }) => {
  const navigate = useNavigate(); // Get the navigate function
  const { isAuth, auth } = useSelector((state) => state.auth);
  const [invoiceData, setInvoiceData] = useState([]);
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
    id ? useUpdateInvoicePaymentsMutation : useCreateInvoicePaymentsMutation
  );
  const { store_id } = auth.user;

  const client_id = watch("client_id");
  const invoice_id = watch("invoice_id");
  const amount = watch("amount");


  const { data: clients } = useGetClientsQuery({
    store_id: store_id,
  });

  const { data: accountPaymentClientsData } = useGetInvoicePaymentSummaryByClientQuery({
    client_id: client_id,
    branch_id: branchId
  })
  console.log("accountPaymentClientsData::", accountPaymentClientsData);

  const { data: invoices } = useGetInvoicesByClientQuery({
    client_id: client_id,
  })

  const { data: accounts, isLoading: isLoadingAccounts, isError: isErrorAccounts, error: errorAccounts } = useGetAccountsQuery({ store_id: auth.store_id });
  const { data: singleInvoice } = useGetInvoicesByIdQuery(invoice_id);
  const { data: singleInvoiceForEdit } = useGetInvoicesByIdQuery(data?.invoice_id);

  console.log("invoices::", invoices);

  const branch = localStorage.getItem("branch_id");

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
    if (!singleInvoice?.data) return;

    const invoice = singleInvoice.data;

    // Prevent duplicates: check if this invoice_no is already in the array
    setInvoiceData((prev) => {
      const alreadyExists = prev.some(item => item.invoice_no === invoice.invoice_no);
      if (alreadyExists) return prev;

      const totalDue = (invoice.sub_total + invoice.total_tax) - invoice.invoice_payments?.reduce((acc, payment) => acc + payment.amount, 0);
      console.log("totalDue", totalDue);
      console.log("invoice.sub_total", invoice.sub_total);
      console.log("invoice.invoice_payments", invoice.invoice_payments);

      const newInvoiceData = {
        invoice_id: invoice.id,
        invoice_no: invoice.invoice_no,
        sub_total: invoice.sub_total + invoice.total_tax,
        total_due: totalDue,
      };

      return [...prev, newInvoiceData];
    });
  }, [singleInvoice?.data]);


  console.log("invoiceData:: ", invoiceData);

  const removeInvoice = (invoiceNo) => {
    setInvoiceData(prev => prev.filter(inv => inv.invoice_no !== invoiceNo));
  };


  const handleFormSubmit = async (data) => {
    const newDate = new Date(data.transaction_date).toISOString();
    data.transaction_date = newDate;

    const newData = {
      account_id: data.account_id,
      cheque_no: data.cheque_no,
      receipt_no: data.receipt_no,
      note: data.note,
      branch_id: branchId,
      transaction_date: data.transaction_date,
      invoices: invoiceData.map((invoice) => ({
        invoice_id: parseInt(invoice.invoice_id),
        amount: parseFloat(invoice.paid_amount) || parseFloat(amount) || 0
      }))
    }

    await onSubmit(newData);
  };

  console.log("data::::::::::", data);

  useEffect(() => {
    reset({
      ...data,
      account_id: data?.account_transaction?.account_id || "",
      cheque_no: data?.account_transaction?.cheque_no || "",
      receipt_no: data?.account_transaction?.receipt_no || "",
      amount: data?.amount || "",
      note: data?.note || "",
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
                  name="client_id"
                  label="Client"
                  placeholder="Select Client"
                  options={
                    clients?.data?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    })) || []
                  }
                  required={true}
                // error={errors.section_type}
                />

                {
                  client_id && (
                    <>
                      <div className="grid grid-cols-3 gap-5">
                        <TextInput
                          name="invoice_total"
                          label="Invoice Total"
                          type="text"
                          register={register}
                          placeholder="Enter Invoice Total"
                          value={accountPaymentClientsData?.data?.total_invoice_amount}
                          defaultValue={accountPaymentClientsData?.data?.total_invoice_amount}
                          disabled={true}
                        />
                        <TextInput
                          name="total_paid"
                          label="Total Paid"
                          type="text"
                          register={register}
                          placeholder="Enter Total Paid"
                          value={accountPaymentClientsData?.data?.total_paid_amount}
                          defaultValue={accountPaymentClientsData?.data?.total_paid_amount}
                          disabled={true}
                        />
                        <TextInput
                          name="total_due"
                          label="Total Due"
                          type="text"
                          register={register}
                          placeholder="Enter Total Due"
                          value={accountPaymentClientsData?.data?.total_due_amount}
                          defaultValue={accountPaymentClientsData?.data?.total_due_amount}
                          disabled={true}
                        />
                      </div>

                      <CustomReactSelect
                        control={control}
                        error={errors?.invoice_id}
                        name="invoice_id"
                        label="Select Invoice"
                        placeholder="Select Invoice"
                        required={true}
                        options={
                          invoices?.data?.map((item) => ({
                            value: item.id,
                            label: item.invoice_no,
                          })) || []
                        }
                      />
                      {invoiceData.map((invoice, index) => (
                        <div key={index} className="border rounded-lg shadow-sm p-4 relative bg-white">
                          {console.log("invoice,,,,", invoice)}
                          <h2 className="text-sm font-semibold mb-3">{invoice.invoice_no} Invoice Details</h2>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <label className="text-sm">Invoice No</label>
                              <input className="w-full border rounded px-2 py-1 bg-gray-100" value={invoice.invoice_no} disabled />
                            </div>
                            <div>
                              <label className="text-sm">Invoice Total</label>
                              <input className="w-full border rounded px-2 py-1 bg-gray-100" value={invoice.sub_total} disabled />
                            </div>
                            <div>
                              <label className="text-sm">Invoice Due</label>
                              <input className="w-full border rounded px-2 py-1 bg-gray-100" value={invoice.total_due} disabled />
                            </div>
                            <div>
                              <label className="text-sm">Paid Amount</label>
                              <input
                                className="w-full border rounded px-2 py-1"
                                value={invoice.paid_amount}
                                onChange={(e) => {
                                  const updated = [...invoiceData];
                                  updated[index].paid_amount = e.target.value;
                                  setInvoiceData(updated);
                                }}
                              />
                            </div>
                          </div>
                          <button
                            className="absolute top-3 right-3 text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                            onClick={() => removeInvoice(invoice.invoice_no)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </>
                  )
                }

                <div className="grid grid-cols-2 gap-5">
                  <TextInput
                    name="total_payment"
                    label="Total Payment"
                    type="text"
                    register={register}
                    placeholder="Enter Total Payment"
                    value={invoiceData?.reduce((acc, invoice) => acc + (parseFloat(invoice.paid_amount) || 0), 0)}
                    defaultValue={invoiceData?.reduce((acc, invoice) => acc + (parseFloat(invoice.paid_amount) || 0), 0)}
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
                </div>
              </>
            )
          }

          {
            id && (
              <div>
                <div className="grid grid-cols-3 gap-5">
                  <TextInput
                    name="invoice_no"
                    label="Invoice No"
                    type="text"
                    register={register}
                    value={singleInvoiceForEdit?.data?.invoice_no}
                    defaultValue={singleInvoiceForEdit?.data?.invoice_no}
                    readonly="readonly"
                  />
                  <TextInput
                    name="invoice_total"
                    label="Invoice Total"
                    type="text"
                    register={register}
                    placeholder="Enter Invoice Total"
                    value={singleInvoiceForEdit?.data?.sub_total}
                    defaultValue={singleInvoiceForEdit?.data?.sub_total}
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
                    value={singleInvoiceForEdit?.data?.sub_total - singleInvoiceForEdit?.data?.invoice_payments?.reduce((acc, payment) => acc + payment.amount, 0)}
                    defaultValue={singleInvoiceForEdit?.data?.sub_total - singleInvoiceForEdit?.data?.invoice_payments?.reduce((acc, payment) => acc + payment.amount, 0)}
                    readonly="readonly"
                  />
                </div>
              </div>
            )
          }


          <div className="grid grid-cols-3 gap-5">
            {
              id && <CustomReactSelect
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
            }
            <TextInput
              name="cheque_no"
              label="Enter Cheque No"
              type="text"
              register={register}
              error={errors.cheque_no}
              // required={true}
              // className="h-[48px]"
              placeholder="Enter Cheque No"
            />
            <TextInput
              name="receipt_no"
              label="Enter Receipt No"
              type="text"
              register={register}
              error={errors.receipt_no}
              // required={true}
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
              name="transaction_date"
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
            // required={true}
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

export default InvoicePaymentForm;
