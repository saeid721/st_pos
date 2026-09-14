import React, { useEffect } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateSalaryIncrementsMutation, useUpdateSalaryIncrementsMutation } from "../../../store/api/app/Increment/incrementApiSlice";
import { useGetEmployeesQuery } from "../../../store/api/app/Employees/employeesApiSlice";
import { useSelector } from "react-redux";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";

const IncrementForm = ({ id, data }) => {
  const navigate = useNavigate(); // Get the navigate function
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
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
    id ? useUpdateSalaryIncrementsMutation : useCreateSalaryIncrementsMutation
  );

  const { data: employees, isFetching, isLoading: featuresIsLoading, isError, error } =
    useGetEmployeesQuery({
      store_id: store_id
    });

  const handleFormSubmit = async (data) => {
    const newDate = new Date(data.increment_date).toISOString();
    data.increment_date = newDate;
    data.increment_amount = parseFloat(data.increment_amount)
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
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <CustomReactSelect
              control={control}
              name={"empolyee_id"}
              label={"Employee"}
              placeholder={"Select Employee"}
              required={true}
              options={
                employees?.data?.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              error={errors?.empolyee_id}
            />
            <TextInput
              name="reason"
              label="Increment Reason"
              type="text"
              register={register}
              error={errors.reason}
              required={true}
              placeholder="Enter Reason"
            />
            <TextInput
              name="increment_amount"
              label="Increment Amount"
              type="number"
              register={register}
              error={errors.increment_amount}
              // required={true}
              placeholder="Enter Increment Amount"
            />
            <TextInput
              name="increment_date"
              label="Increment Date"
              type="datetime-local"
              register={register}
              error={errors.increment_date}
              // required={true}
              placeholder="Enter Increment Date"
            />
          </div>
          <TextInput
            name="note"
            label="Note"
            type="text"
            register={register}
            error={errors.note}
            // required={true}
            placeholder="Enter Note"
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

export default IncrementForm;
