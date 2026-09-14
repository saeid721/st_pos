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
import { useCreateBalanceAdjustmentsMutation, useUpdateBalanceAdjustmentsMutation } from "../../../store/api/app/BalanceAdjustments/BalanceAdjustmentsApiSlice";
import { useCreateBalanceTransfersMutation, useUpdateBalanceTransfersMutation } from "../../../store/api/app/BalanceTransfer/BalanceTransferApiSlice";

const BalanceTransferForm = ({ id, data }) => {
  const [branchId, setBranchId] = useState(null);
  const navigate = useNavigate(); // Get the navigate function
  const { isAuth, auth } = useSelector((state) => state.auth);
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
    id ? useUpdateBalanceTransfersMutation : useCreateBalanceTransfersMutation
  );

  // console.log("data:::::}}", data);

  const { data: accounts, isLoading: isLoadingAccounts, isError: isErrorAccounts, error: errorAccounts } = useGetAccountsQuery({ store_id: auth.store_id });
  console.log("accounts", accounts);
  console.log("data,,,,,", data);

  const from_account_id = watch('from_account_id')
  const to_account_id = watch('to_account_id')
  const available_balance = useGetAvailableBalanceByAccountQuery({
    account_id: from_account_id || Number(data?.from_account_id),
  })
  console.log("data?.from_account_id", data?.from_account_id);
  console.log("available_balance", available_balance);



  const branch = localStorage.getItem("branch_id");

  useEffect(() => {
    if (branch) {
      const parsedData = JSON.parse(branch);
      setBranchId(parsedData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, [branch]);

  console.log("from_account_id", from_account_id);



  const handleFormSubmit = async (data) => {
    const newDate = new Date(data.date).toISOString();
    data.date = newDate;

    delete data.available_balance;
    data.branch_id = branchId;
    data.from_account_id = from_account_id;
    data.to_account_id = to_account_id;
    data.amount = parseFloat(data.amount);
    console.log("data:::::", data);
    await onSubmit(data);
  };

  useEffect(() => {
    if (data) {
      reset({
        reason: data.reason,
        date: data.date,
        amount: data.amount,
        from_account_id: Number(data?.from_account_id),
        to_account_id: Number(data?.to_account_id),
        available_balance: available_balance?.data?.available_balance || 0,
        note: data.note,
      });

    }
  }, [data, accounts, reset, available_balance]);

  console.log("available_balance?.data?.data?.available_balance, ", available_balance?.data?.data?.available_balance);


  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
          <TextInput
            name="reason"
            label="Transfer Reason"
            type="text"
            register={register}
            error={errors.reason}
            required={true}
            placeholder="Enter Transfer Reason"
          />
          <CustomReactSelect
            control={control}
            error={errors?.from_account_id}
            name="from_account_id"
            label="From Account"
            placeholder="Select From Account"
            required={true}
            options={
              accounts?.data?.map((item) => ({
                value: item.id,
                label: item.bank_name,
              })) || []
            }
            isLoading={isLoadingAccounts}
          />
          <CustomReactSelect
            control={control}
            error={errors?.to_account_id}
            name="to_account_id"
            label="To Account"
            placeholder="Select To Account"
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
            value={available_balance?.data?.data?.available_balance}
            defaultValue={available_balance?.data?.data?.available_balance}
          />
          <TextInput
            name="amount"
            label="Amount"
            type="text"
            register={register}
            error={errors.amount}
            required={true}
            placeholder="Enter Amount"
          />

          <TextInput
            name="note"
            label="Note"
            type="text"
            register={register}
            error={errors.note}
            required={true}
            placeholder="Enter note"
          />
          <TextInput
            name="date"
            label="Date"
            type="datetime-local"
            register={register}
            error={errors.date}
            required={true}
            placeholder="Enter Date"
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

export default BalanceTransferForm;
