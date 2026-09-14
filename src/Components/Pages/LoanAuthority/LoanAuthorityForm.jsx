import React, { useEffect } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateFeaturesMutation, useUpdateFeaturesMutation } from "../../../store/api/app/Features/featuresApiSlice";
import { useCreateExpenseCategoryMutation, useUpdateExpenseCategoryMutation } from "../../../store/api/app/ExpenseCategory/expenseCategoriesApiSlice";
import { useCreateLoanAuthoritiesMutation, useUpdateLoanAuthoritiesMutation } from "../../../store/api/app/LoanAuthoritiesApi/loanAuthoritiesApiSlice";

const LoanAuthorityForm = ({ id, data }) => {
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
    id ? useUpdateLoanAuthoritiesMutation : useCreateLoanAuthoritiesMutation
  );

  const handleFormSubmit = async (data) => {
    data.cc_limit = parseFloat(data.cc_limit)
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
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <TextInput
              name="email"
              label="Enter Email"
              type="email"
              register={register}
              error={errors.email}
              // required={true}
              // className="h-[48px]"
              placeholder="Enter Email"
            />
            <TextInput
              name="contact_number"
              label="Enter Contact Number"
              type="number"
              register={register}
              error={errors.contact_number}
              required={true}
              // className="h-[48px]"
              placeholder="Enter Contact Number"
            />
            <TextInput
              name="cc_limit"
              label="Enter Cc Limit"
              type="number"
              register={register}
              error={errors.cc_limit}
              required={true}
              // className="h-[48px]"
              placeholder="Enter Cc Limit"
            />
            <TextInput
              name="address"
              label="Enter Address"
              type="text"
              register={register}
              error={errors.address}
              // required={true}
              // className="h-[48px]"
              placeholder="Enter Address"
            />
          </div>
          <TextInput
            name="note"
            label="Enter Note"
            type="text"
            register={register}
            error={errors.note}
            // required={true}
            // className="h-[48px]"
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

export default LoanAuthorityForm;
