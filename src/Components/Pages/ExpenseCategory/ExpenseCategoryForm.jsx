import React, { useEffect, useState } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateFeaturesMutation, useUpdateFeaturesMutation } from "../../../store/api/app/Features/featuresApiSlice";
import { useCreateExpenseCategoryMutation, useUpdateExpenseCategoryMutation } from "../../../store/api/app/ExpenseCategory/expenseCategoriesApiSlice";

const ExpenseCategoryForm = ({ id, data }) => {
  const [branchId, setBranchId] = useState(null);
  const navigate = useNavigate(); // Get the navigate function
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
    id ? useUpdateExpenseCategoryMutation : useCreateExpenseCategoryMutation
  );

  const branch = localStorage.getItem("branch_id");

  useEffect(() => {
    if (branch) {
      const parsedData = JSON.parse(branch);
      setBranchId(parsedData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, [branch]);



  const handleFormSubmit = async (data) => {
    data.branch_id = branchId
    await onSubmit(data);
  };

  const options = [
    {
      value: "home",
      label: "Home",
    },
    {
      value: "product",
      label: "Product",
    },
  ];

  useEffect(() => {
    reset({
      ...data,
    });
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
          <TextInput
            name="name"
            label="Enter Name"
            type="text"
            register={register}
            error={errors.name}
            required={true}
            // className="h-[48px]"
            placeholder="Enter Title"
          />
          <TextInput
            name="code"
            label="Enter Code"
            type="text"
            register={register}
            error={errors.code}
            // required={true}
            // className="h-[48px]"
            placeholder="Enter Title"
          />
          <TextInput
            name="note"
            label="Enter Note"
            type="text"
            register={register}
            error={errors.note}
            // required={true}
            // className="h-[48px]"
            placeholder="Enter Title"
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

export default ExpenseCategoryForm;
