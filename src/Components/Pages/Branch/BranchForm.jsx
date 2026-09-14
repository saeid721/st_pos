import React, { useEffect } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateBranchesMutation, useUpdateBranchesMutation } from "../../../store/api/app/Branch/branchApiSlice";

const BranchForm = ({ id, data }) => {
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
    id ? useUpdateBranchesMutation : useCreateBranchesMutation
  );

  const handleFormSubmit = async (formDataValues) => {
    const formData = new FormData();
    const keys = Object.keys(formDataValues);

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
      console.error("Error submitting form:", error);
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
            error={errors.name}
            required={true}
            placeholder="Enter Title"
          />
          <TextInput
            name="image"
            label="Upload Image"
            type="file"
            register={register}
            // required={!data?.thumbnail}
            error={errors.image}
            imgUrl={data?.image}
          />
          <TextInput
            name="email"
            label="email"
            type="email"
            // register={register({ required: "email is required", min: 1 })}
            register={register}
            error={errors.email}

            placeholder="Enter email"
          />
          <TextInput
            name="mobile"
            label="mobile"
            type="number"
            register={register}
            error={errors.mobile}

            placeholder="Enter mobile"
          />
          <TextInput
            name="address"
            label="address"
            type="text"
            register={register}
            error={errors.address}

            placeholder="Enter address"
          />
          <TextInput
            name="info"
            label="info"
            type="text"
            register={register}
            error={errors.info}

            placeholder="Enter info"
          />
          <TextInput
            name="note"
            label="note"
            type="text"
            register={register}
            error={errors.note}

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

export default BranchForm;
