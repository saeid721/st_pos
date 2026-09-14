import React, { useEffect } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateFeaturesMutation, useGetFeaturesQuery, useUpdateFeaturesMutation } from "../../../store/api/app/Features/featuresApiSlice";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useCreatePlansMutation, useGetPlansQuery, useUpdatePlansMutation } from "../../../store/api/app/Plans/plansApiSlice";
import { useCreateStoresMutation, useUpdateStoresMutation } from "../../../store/api/app/store/storeApiSlice";

const StoreForm = ({ id, data }) => {
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
    id ? useUpdateStoresMutation : useCreateStoresMutation
  );
  const { data: features, isFetching, isLoading: featuresIsLoading, isError, error } =
    useGetFeaturesQuery(id);

  const { data: plans, isLoading: plansIsLoading, isError: plansIsError, error: plansError } = useGetPlansQuery();

  // const handleFormSubmit = async (data) => {
  //   await onSubmit(data);
  // };
  const handleFormSubmit = async (formDataValues) => {
    const formData = new FormData();
    const keys = Object.keys(formDataValues);


    keys.forEach((key) => {
      if (["logo"].includes(key)) {
        if (formDataValues[key] instanceof FileList && formDataValues[key].length > 0) {
          formData.append(key, formDataValues[key][0]); // Add the new file
        } else if (data?.[key]) {
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
    reset({
      ...data,
    });
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
          <TextInput
            name="store"
            label="Store Name"
            type="text"
            register={register}
            error={errors.store}
            required={true}
            placeholder="Enter Store Name"
          />
          <TextInput
            name="owner_name"
            label="Owner Name"
            type="text"
            register={register}
            error={errors.owner_name}
            required={true}
            placeholder="Enter Owner Name"
          />
          <TextInput
            name="email"
            label="Email"
            type="email"
            register={register}
            error={errors.email}
            required={true}
            placeholder="Enter Email"
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
            name="address"
            label="Address"
            type="text"
            register={register}
            error={errors.address}
            required={true}
            placeholder="Enter Address"
          />
          <TextInput
            name="password"
            label="Password"
            type="password"
            register={register}
            error={errors.password}
            required={true}
            placeholder="Enter Password"
          />
          <TextInput
            name="logo"
            label="Logo"
            type="file"
            register={register}
            error={errors.logo}
            // required={true}
            placeholder="Enter Logo"
            imgUrl={data?.logo}
          />

          <CustomReactSelect
            control={control}
            name="plan_id"
            label="Plan"
            placeholder="Select Plan"
            options={
              plans?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
            required={true}
          // error={errors.section_type}
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

export default StoreForm;
