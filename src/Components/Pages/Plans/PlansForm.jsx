import React, { useEffect } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateFeaturesMutation, useGetFeaturesQuery, useUpdateFeaturesMutation } from "../../../store/api/app/Features/featuresApiSlice";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useCreatePlansMutation, useUpdatePlansMutation } from "../../../store/api/app/Plans/plansApiSlice";

const PlansForm = ({ id, data }) => {
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
    id ? useUpdatePlansMutation : useCreatePlansMutation
  );
  const { data: features, isFetching, isLoading: featuresIsLoading, isError, error } =
    useGetFeaturesQuery(id);

  const isTrial = watch("is_trial");

  const handleFormSubmit = async (formDataValues) => {
    const formData = new FormData();
    const keys = Object.keys(formDataValues);

    formDataValues.duration_value = parseInt(formDataValues.duration_value);

    keys.forEach((key) => {
      if (key === 'feature_ids') {
        formData.append(
          key,
          JSON.stringify(formDataValues[key].filter((item) => item))
        ); // Convert array to JSON string
      } else if (["image"].includes(key)) {
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
      console.error("Error submitting form:", error?.message);
    }

    
  };


  const options = [
    {
      value: "DAY",
      label: "DAY",
    },
    {
      value: "WEEK",
      label: "WEEK",
    },
    {
      value: "MONTH",
      label: "MONTH",
    },
    {
      value: "YEAR",
      label: "YEAR",
    },
  ];
  const isTrialOptions = [
    {
      value: true,
      label: "Yes",
    },
    {
      value: false,
      label: "No",
    },
  ];

  useEffect(() => {
    if (data) {
      console.log("data:::", data);
      // Extract and transform data for resetting the form
      const { image, ...rest } = data;

      // Prepare transformed fields
      const transformedData = {
        ...rest,
        feature_ids: data.features ? data?.features?.map((item) => item.id) : [],
      };

      reset(transformedData);
    }
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
          <TextInput
            name="name"
            label="Name"
            type="text"
            register={register}
            error={errors?.name}
            required={true}
            placeholder="Enter Title"
          />
          <TextInput
            name="image"
            label="Upload Image"
            type="file"
            register={register}
            // required={!data?.thumbnail}
            error={errors?.image}
            imgUrl={data?.image}
          />
          <TextInput
            name="amount"
            label="Amount"
            type="number"
            // register={register({ required: "Amount is required", min: 1 })}
            register={register}
            error={errors.amount}

            placeholder="Enter Amount"
          />



          <CustomReactSelect
            control={control}
            name="duration_type"
            label="Duration Type"
            placeholder="Select Duration Type"
            options={options}
          // required={true}
          // error={errors.section_type}
          />
          <CustomReactSelect
            control={control}
            name="is_trial"
            label="Is Trial"
            placeholder="Select Is Trial"
            options={isTrialOptions}
          // required={true}
          // error={errors.section_type}
          />
          {
            isTrial && <TextInput
              name="trial_days"
              label="Trial Days"
              type="number"
              register={register}
              error={errors?.trial_days}
              placeholder="Enter Trial Days"
            />
          }
          <TextInput
            name="description"
            label="Description"
            type="text"
            register={register}
             error={errors.description}

            placeholder="Enter Description"
          />
          <TextInput
            name="duration_value"
            label="Duration Value"
            type="text"
            register={register}
            error={errors?.duration_value}
            placeholder="Enter Duration Value"
          />
          {/* <TextInput
            name="limit_clients"
            label="Limit Clients"
            type="number"
            register={register}
            error={errors.name}

            placeholder="Enter Limit Clients"
          />
          <TextInput
            name="limit_invoices"
            label="Limit Invoices"
            type="number"
            register={register}
            error={errors.name}

            placeholder="Enter Limit Invoices"
          />
          <TextInput
            name="limit_employees"
            label="Limit Employees"
            type="number"
            register={register}
            error={errors.name}

            placeholder="Enter Limit Employees"
          />
          <TextInput
            name="limit_domains"
            label="Limit Domains"
            type="number"
            register={register}
            error={errors.name}

            placeholder="Enter Limit Domains"
          />
          <TextInput
            name="limit_purchases"
            label="Limit Purchases"
            type="number"
            register={register}
            error={errors.name}

            placeholder="Enter Limit Purchases"
          /> */}

          <CustomReactSelect
            control={control}
            name={"feature_ids"}
            label={"Features"}
            placeholder={"Select Features"}
            isMulti={true}
            options={
              features?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
            error={errors?.feature_ids}
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

export default PlansForm;
