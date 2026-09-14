import React, { useEffect } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateTaxsMutation, useUpdateTaxsMutation } from "../../../store/api/app/Tax/taxApiSlice";

const TaxForm = ({ id, data }) => {
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
    id ? useUpdateTaxsMutation : useCreateTaxsMutation
  );

  const handleFormSubmit = async (data) => {
    data.rate = parseFloat(data.rate)
    await onSubmit(data);
  };

  useEffect(() => {
    reset({
      ...data,
      name: data?.name,
    });
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <TextInput
              name="name"
              label="Name"
              type="text"
              register={register}
              error={errors.name}
              required={true}
              placeholder="Enter Name"
            />
            <TextInput
              name="code"
              label="Code"
              type="text"
              register={register}
              error={errors.code}
              // required={true}
              placeholder="Enter Code"
            />
            <TextInput
              name="rate"
              label="Rate"
              type="number"
              register={register}
              error={errors.rate}
              required={true}
              placeholder="Enter Rate"
            />
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

export default TaxForm;
