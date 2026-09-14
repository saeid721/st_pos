import React, { useEffect, useState } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateExpenseCategoryMutation, useGetExpenseCategoryQuery, useUpdateExpenseCategoryMutation } from "../../../store/api/app/ExpenseCategory/expenseCategoriesApiSlice";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useCreateExpenseSubCategoryMutation, useGetExpenseSubCategoryQuery, useUpdateExpenseSubCategoryMutation } from "../../../store/api/app/ExpenseSubCategory/expenseSubCategoriesApiSlice";
import { useGetAccountsQuery, useGetAvailableBalanceByAccountQuery } from "../../../store/api/app/Account/accountApiSlice";
import { useSelector } from "react-redux";
import { useCreateExpenseMutation, useUpdateExpenseMutation } from "../../../store/api/app/Expense/expenseApiSlice";

const ExpenseForm = ({ id, data }) => {
  const [branchId, setBranchId] = useState(null);
  const navigate = useNavigate(); // Get the navigate function
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;

  console.log("data:: ", data);
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
    setValue
  } = useSubmit(
    id,
    id ? useUpdateExpenseMutation : useCreateExpenseMutation
  );

  console.log("store_id: ", store_id);

  const { data: expenseCategories } = useGetExpenseCategoryQuery();
  const { data: expenseSubCategories } = useGetExpenseSubCategoryQuery();
  const { data: accounts } = useGetAccountsQuery({
    store_id: store_id,
  });

  const account_id = watch('account_id')
  console.log("account_id:: ", account_id);
  const available_balance = useGetAvailableBalanceByAccountQuery({
    account_id: account_id,
  })

  useEffect(() => {
    setValue('available_balance', available_balance?.data?.available_balance)
  }, [])

  const branch = localStorage.getItem("branch_id");

  useEffect(() => {
    if (branch) {
      const parsedData = JSON.parse(branch);
      setBranchId(parsedData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, [branch]);



  const handleFormSubmit = async (formDataValue) => {
    console.log("in data:", formDataValue);

    const { available_balance, ...formDataValues } = formDataValue;
    if (formDataValues.date) {
      const newDate = new Date(formDataValues.date).toISOString();
      formDataValues.date = newDate;
    }

    formDataValues.branch_id = branchId;

    formDataValues.payment = JSON.stringify({
      account_id: formDataValues.account_id,
      amount: parseFloat(formDataValues.amount),
      cheque_no: formDataValues.cheque_no,
      receipt_no: formDataValues.receipt_no,
    });

    const formData = new FormData();
    const keys = Object.keys(formDataValues);

    keys.forEach((key) => {
      if (key === "image_path") {
        // Handle file uploads
        if (formDataValues[key] instanceof FileList && formDataValues[key].length > 0) {
          formData.append(key, formDataValues[key][0]); // Add the new file
        } else if (data?.[key]) {
          formData.append(key, data[key]); // Retain the existing image URL
        }
      } else {
        formData.append(key, formDataValues[key]); // Add other fields
      }
    });

    try {
      console.log("FormData to be submitted:", formData);
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  useEffect(() => {
    reset({
      ...data,
      exp_cat_id: data?.exp_cat_id,
      exp_sub_cat_id: data?.exp_sub_cat_id,
      account_id: data?.account_transaction?.account?.id,
      cheque_no: data?.account_transaction?.cheque_no,
      receipt_no: data?.account_transaction?.receipt_no,
    });
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <TextInput
              name="reason"
              label="Enter Reason Name"
              type="text"
              register={register}
              error={errors.reason}
              required={true}
              // className="h-[48px]"
              placeholder="Enter Reason Name"
            />
            <CustomReactSelect
              control={control}
              name="exp_cat_id"
              label="Expense Category"
              placeholder="Select Expense Category"
              options={
                expenseCategories?.data?.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              required={true}
            // error={errors.section_type}
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <CustomReactSelect
            control={control}
            name="exp_sub_cat_id"
            label="Expense Sub Category"
            placeholder="Select Expense Sub Category"
            options={
              expenseSubCategories?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
            required={true}
          // error={errors.section_type}
          />
          <CustomReactSelect
            control={control}
            name="account_id"
            label="Enter Account"
            placeholder="Select Account"
            options={
              accounts?.data?.map((item) => ({
                value: item.id,
                label: item.bank_name,
              })) || []
            }
            required={true}
          // error={errors.section_type}
          />
          </div>

          <TextInput
            name="available_balance"
            label="Available Balance"
            type="text"
            register={register}
            value={available_balance?.data?.data?.available_balance}
            defaultValue={available_balance?.data?.data?.available_balance}
          />
          <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
          <TextInput
            name="amount"
            label="Enter Amount"
            type="number"
            register={register}
            error={errors.amount}
            required={true}
            // className="h-[48px]"
            placeholder="Enter Amount"
          />
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
          </div>
          <TextInput
            name="date"
            label="Enter Date"
            type="datetime-local"
            register={register}
            error={errors.receipt_no}
            required={true}
            // className="h-[48px]"
            placeholder="Enter Date"
          />
          <TextInput
            name="note"
            label="Enter Note"
            type="text"
            register={register}
            error={errors.note}
            // required={true}
            // className="h-[48px]"
            placeholder="Enter Note"
          />
          <TextInput
            name="image_path"
            label="Enter Image"
            type="file"
            register={register}
            error={errors.image_path}
            // required={true}
            // className="h-[48px]"
            placeholder="Enter Image"
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

export default ExpenseForm;
