import React, { useEffect } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateSuppliersMutation, useUpdateSuppliersMutation } from "../../../store/api/app/Suppliers/suppliersApiSlice";

const SuppliersForm = ({ id, data }) => {
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
    id ? useUpdateSuppliersMutation : useCreateSuppliersMutation
  );

  const handleFormSubmit = async (data) => {
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
              name="company_name"
              label="Company Name"
              type="text"
              register={register}
              error={errors.company_name}
              required={true}
              placeholder="Enter Company Name"
            />
            <TextInput
              name="phone"
              label="Phone"
              type="text"
              register={register}
              error={errors.phone}
              required={true}
              placeholder="Enter Phone"
            />
            <TextInput
              name="email"
              label="Email"
              type="text"
              register={register}
              error={errors.email}
              required={true}
              placeholder="Enter Email"
            />
          </div>
          <TextInput
            name="address"
            label="Address"
            type="text"
            register={register}
            error={errors.address}
            required={true}
            placeholder="Enter Address"
          />
          <TextInput
            name="code"
            label="Code"
            type="text"
            register={register}
            error={errors.code}
            required={true}
            placeholder="Enter Code"
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

export default SuppliersForm;
