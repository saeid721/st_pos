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
import { useCreateNonInvoicePaymentsMutation, useGetNonInvoicePaymentSummaryByClientQuery, useUpdateNonInvoicePaymentsMutation } from "../../../store/api/app/NonInvoice/nonInvoiceApiSlice";

const NonInvoicePaymentForm = ({ id, data }) => {
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
    id ? useUpdateNonInvoicePaymentsMutation : useCreateNonInvoicePaymentsMutation
  );
  const { store_id } = auth.user;

  const client_id = watch("client_id");
  const invoice_id = watch("invoice_id");
  const type = watch("type");
  const account_id = watch("account_id");


  const { data: clients } = useGetClientsQuery({
    store_id: store_id,
  });

  const { data: accountPaymentClientsData } = useGetNonInvoicePaymentSummaryByClientQuery({
    client_id: client_id,
    branch_id: branchId,
  })

  console.log("accountPaymentClientsData::", accountPaymentClientsData);

  const { data: invoices } = useGetInvoicesByClientQuery({
    client_id: client_id,
  })

  const { data: accounts, isLoading: isLoadingAccounts, isError: isErrorAccounts, error: errorAccounts } = useGetAccountsQuery({ store_id: auth.store_id });


  console.log("invoices::", invoices);

  const branch = localStorage.getItem("branch_id");

  const options = [
    { value: 0, label: "Add Due" },
    { value: 1, label: "Add Payment" },
  ]

  useEffect(() => {
    if (branch) {
      const parsedData = JSON.parse(branch);
      setBranchId(parsedData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, [branch]);
  console.log("branchId", branchId);




  const handleFormSubmit = async (data) => {
    const newDate = new Date(data.date).toISOString();
    data.date = newDate;

    console.log("data", data);

    const newData = {
      client_id: data.client_id,
      amount: parseFloat(data.amount),
      type: data.type,
      note: data.note,
      branch_id: branchId,
      date: data.date,
      account_id: account_id,
      cheque_no: data.cheque_no,
      receipt_no: data.receipt_no,
    }

    await onSubmit(newData);
  };

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        account_id: data?.account_transaction?.account_id,
        branch_id: branchId,
      });
    }
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
          <div className="grid grid-cols-2 gap-4">

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
            <CustomReactSelect
              control={control}
              name="type"
              label="Type"
              placeholder="Select Type"
              options={options}
              required={true}
            // error={errors.section_type}
            />
          </div>

          {
            client_id && (
              <>
                <div className="grid grid-cols-3 gap-5">
                  <TextInput
                    name="invoice_total"
                    label="Non Invoice Total"
                    type="text"
                    register={register}
                    placeholder="Enter Invoice Total"
                    value={accountPaymentClientsData?.data?.total_non_invoice_amount}
                    defaultValue={accountPaymentClientsData?.data?.total_non_invoice_amount}
                    disabled={true}
                  />
                  <TextInput
                    name="total_paid"
                    label="Non Invoice Paid"
                    type="text"
                    register={register}
                    placeholder="Enter Total Paid"
                    value={accountPaymentClientsData?.data?.total_paid_amount}
                    defaultValue={accountPaymentClientsData?.data?.total_paid_amount}
                    disabled={true}
                  />
                  <TextInput
                    name="total_due"
                    label="Current Due"
                    type="text"
                    register={register}
                    placeholder="Enter Total Due"
                    value={accountPaymentClientsData?.data?.total_due_amount}
                    defaultValue={accountPaymentClientsData?.data?.total_due_amount}
                    disabled={true}
                  />
                </div>


              </>
            )
          }
          {
            (type === 1 || data?.type === 1) && (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex-1">
                    <CustomReactSelect
                      control={control}
                      name="account_id"
                      label="Account"
                      placeholder="Select Account"
                      options={
                        accounts?.data?.map((item) => ({
                          value: item.id,
                          label: item.bank_name,
                        })) || []
                      }
                      required={true}
                      // error={errors.section_type}
                      defaultValue={id && data?.account_transaction?.account_id}
                    />
                  </div>
                  <div className="flex-1">
                    <TextInput
                      name="cheque_no"
                      label="Cheque No"
                      type="text"
                      register={register}
                      error={errors.cheque_no}
                      placeholder="Enter Cheque No"
                      className={"mb-2"}
                      defaultValue={data?.account_transaction?.cheque_no}
                    />
                  </div>
                  <div className="flex-1">
                    <TextInput
                      name="receipt_no"
                      label="Receipt No"
                      type="text"
                      register={register}
                      error={errors.receipt_no}
                      placeholder="Enter Receipt No"
                      className={"mb-2"}
                      defaultValue={data?.account_transaction?.receipt_no}
                    />
                  </div>
                </div>

              </>
            )
          }

          <div className="grid grid-cols-2 gap-4">
            <TextInput
              name="amount"
              label="Amount *"
              type="text"
              register={register}
              placeholder="Enter Amount *"
              error={errors.amount}
              required={true}
            />



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
            required={true}
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

export default NonInvoicePaymentForm;
