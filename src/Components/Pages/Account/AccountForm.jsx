import React, { useEffect } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateAccountsMutation, useUpdateAccountsMutation } from "../../../store/api/app/Account/accountApiSlice";
import { useSelector } from "react-redux";
import { useGetBranchesQuery } from "../../../store/api/app/Branch/branchApiSlice";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";

const AccountForm = ({ id, data }) => {
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
    id ? useUpdateAccountsMutation : useCreateAccountsMutation
  );

  const { data: branchesData, isLoading: isLoadingBranches } = useGetBranchesQuery({ store_id: auth.store_id });


  const handleFormSubmit = async (data) => {
    // const newDate =  new Date(data.date).toISOString();
    // data.date = newDate;
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
            error={errors?.branch_id}
            name="branch_id"
            label="Branch"
            placeholder="Select Branch"
            required={true}
            options={
              branchesData?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
            isLoading={isLoadingBranches}
          />
          <TextInput
            name="bank_name"
            label="Bank Name"
            type="text"
            register={register}
            error={errors.bank_name}
            required={true}
            placeholder="Enter Bank Name"
          />
          <TextInput
            name="branch_name"
            label="Branch Name"
            type="text"
            register={register}
            error={errors.branch_name}
            required={true}
            placeholder="Enter Branch Name"
          />
          <TextInput
            name="account_number"
            label="Account Number"
            type="number"
            register={register}
            error={errors.account_number}
            required={true}
            placeholder="Enter Account Number"
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

export default AccountForm;
