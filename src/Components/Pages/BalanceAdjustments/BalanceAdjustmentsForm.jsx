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

const BalanceAdjustmentsForm = ({ id, data }) => {
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
    id ? useUpdateBalanceAdjustmentsMutation : useCreateBalanceAdjustmentsMutation
  );

  const { data: branchesData, isLoading: isLoadingBranches } = useGetBranchesQuery({ store_id: auth.store_id });

  const { data: accounts, isLoading: isLoadingAccounts, isError: isErrorAccounts, error: errorAccounts } = useGetAccountsQuery({ store_id: auth.store_id });
  console.log("accounts", accounts);

  const account_id = watch('account_id')
  const available_balance = useGetAvailableBalanceByAccountQuery({
    account_id: account_id,
  })
  console.log("account_id", account_id);



  const branch = localStorage.getItem("branch_id");

  useEffect(() => {
    if (branch) {
      const parsedData = JSON.parse(branch);
      setBranchId(parsedData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, [branch]);

  const options = [
    {
      value: 1,
      label: "Add Balance",
    },
    {
      value: 0,
      label: "Remove Balance",
    },
  ];


  const handleFormSubmit = async (data) => {
    // const newDate =  new Date(data.date).toISOString();
    // data.date = newDate;

    delete data.available_balance;
    data.branch_id = branchId;
    data.account_id = account_id;
    data.amount = parseFloat(data.amount);
    console.log("data:::::", data);
    await onSubmit(data);
  };

  useEffect(() => {
    reset({
      ...data,
    });
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
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
          <CustomReactSelect
            control={control}
            error={errors?.type}
            name="type"
            label="Type"
            placeholder="Select Type"
            required={true}
            options={options
            }
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
          {/* <TextInput
            name="date"
            label="Date"
            type="datetime-local"
            register={register}
            error={errors.date}
            required={true}
            placeholder="Enter Date"
          /> */}
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

export default BalanceAdjustmentsForm;
