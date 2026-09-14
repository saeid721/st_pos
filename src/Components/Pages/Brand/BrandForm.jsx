import React, { useEffect } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateSuppliersMutation, useUpdateSuppliersMutation } from "../../../store/api/app/Suppliers/suppliersApiSlice";
import { useCreateBrandsMutation, useUpdateBrandsMutation } from "../../../store/api/app/Brand/brandApiSlice";

const BrandForm = ({ id, data }) => {
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
    id ? useUpdateBrandsMutation : useCreateBrandsMutation
  );
  console.log("data:", data);

  const handleFormSubmit = async (formDataValues) => {
    console.log("in data:", formDataValues);
    const formData = new FormData();
    const keys = Object.keys(formDataValues);

    keys.forEach((key) => {
      if (["photo"].includes(key)) {
        // Check if a new file was uploaded
        if (formDataValues[key] instanceof FileList && formDataValues[key].length > 0) {
          formData.append(key, formDataValues[key][0]); // Add the new file
        } else if (data?.[key]) {
          // If no new file, retain the existing image URL
          formData.append(key, data[key]); // Add existing image URL
        }
      } else {
        formData.append(key, formDataValues[key]); // Add other fields
      }
    });

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    if (data) {
      const { photo, ...rest } = data;

      // Prepare transformed fields
      const transformedData = {
        ...rest,
      };

      reset(transformedData);
    }
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
          </div>
          <TextInput
            name="photo"
            label="Photo"
            type="file"
            register={register}
            error={errors.photo}
            // required={true}
            placeholder="Enter Photo"
            imgUrl={data?.photo}
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

export default BrandForm;
