import React, { useEffect, useState } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateFeaturesMutation, useGetFeaturesQuery, useUpdateFeaturesMutation } from "../../../store/api/app/Features/featuresApiSlice";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useSelector } from "react-redux";
import { useCreateEmployeesMutation, useUpdateEmployeesMutation } from "../../../store/api/app/Employees/employeesApiSlice";
import { useGetAssetTypesQuery } from "../../../store/api/app/AssetTypesApi/featuresApiSlice";
import { useCreateAssetsMutation, useUpdateAssetsMutation } from "../../../store/api/app/AssetsApi/assetsApiSlice";

const AssetsForm = ({ id, data }) => {
  const [dailyDepreciation, setDailyDepreciation] = useState(0)
  const [branchId, setBranchId] = useState(null);
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
    id ? useUpdateAssetsMutation : useCreateAssetsMutation
  );

  const depreciation = watch('depreciation');
  const asset_cost = watch('asset_cost');
  const depreciation_type = watch('depreciation_type');
  const salvage_value = watch('salvage_value');
  const useful_life = watch('useful_life');
  const date = watch('date');


  const { data: assetTypes, isFetching, isLoading: featuresIsLoading, isError, error } =
    useGetAssetTypesQuery();


  useEffect(() => {
    let duration;
    let dailyDepreciationValue = null;

    if (depreciation === true) {
      if (depreciation_type === 0) {
        duration = useful_life;  // Monthly depreciation
      } else if (depreciation_type === 1) {
        duration = useful_life * 12;  // Yearly depreciation converted to months
      }
    }
    console.log("duration: ", duration);

    if (depreciation && duration && asset_cost && salvage_value && date) {
      // Ensure `date` is in ISO format
      const startDate = new Date(date);
      console.log("startDate::; ", startDate);

      if (isNaN(startDate)) {
        console.error("Invalid date format!");
        return;
      }

      // Calculate end date by adding months
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + parseInt(duration));
      console.log("endDate:: ", endDate);

      // Calculate time difference in milliseconds
      const timeDiff = endDate - startDate;

      // Convert milliseconds to days
      const totalDays = timeDiff / (1000 * 3600 * 24); // 1000 ms * 3600 s * 24 hours

      // Calculate daily depreciation value
      const depreciableAmount = asset_cost - salvage_value;

      const dailyDepreciationValue = depreciableAmount / totalDays;
      setDailyDepreciation(dailyDepreciationValue)
      console.log("dailyDepreciationValue::: ", dailyDepreciationValue);
    } else {
      console.error("Please provide all required inputs!");
    }



  }, [depreciation, asset_cost, depreciation_type, salvage_value, useful_life])

  const branch = localStorage.getItem("branch_id");

  useEffect(() => {
    if (branch) {
      const parsedData = JSON.parse(branch);
      setBranchId(parsedData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, [branch]);



  const handleFormSubmit = async (formDataValue) => {
    console.log("formDataValues", formDataValue);
    formDataValue.branch_id = branchId;

    const { depreciation_value, ...formDataValues } = formDataValue;
    const formData = new FormData();

    // Convert date fields to ISO strings
    if (formDataValues.date) {
      formData.append("date", new Date(formDataValues.date).toISOString());
    }

    // Append remaining fields
    Object.keys(formDataValues).forEach((key) => {
      if (!["date"].includes(key)) {
        if (formDataValues[key] instanceof FileList && formDataValues[key].length > 0) {
          formData.append(key, formDataValues[key][0]);
        } else {
          formData.append(key, formDataValues[key]);
        }
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
      value: true,
      label: "Yes",
    },
    {
      value: false,
      label: "No",
    },
  ];
  const options2 = [
    {
      value: 0,
      label: "Monthly",
    },
    {
      value: 1,
      label: "Yearly",
    },


  ];

  useEffect(() => {
    if (data) {
      console.log("data:::", data);
      // Extract and transform data for resetting the form
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
          <div className="grid grid-cols-2 gap-5">
            <TextInput
              name="name"
              label="Asset Name"
              type="text"
              register={register}
              error={errors.name}
              required={true}
              placeholder="Enter Asset Name"
            />
            <CustomReactSelect
              control={control}
              name={"asset_type_id"}
              label={"Asset Type"}
              placeholder={"Select Asset Type"}
              required={true}
              options={
                assetTypes?.data?.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              error={errors?.asset_type_id}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <TextInput
              name="asset_cost"
              label="Asset Cost"
              type="text"
              register={register}
              error={errors.asset_cost}
              required={true}
              placeholder="Enter Asset Cost"
            />
            <CustomReactSelect
              control={control}
              name="depreciation"
              label="Depreciation"
              placeholder="Select Depreciation"
              options={options}
              required={true}
            // error={errors.section_type}
            />
          </div>
          {
            depreciation == true && (
              <>
                <div className="grid grid-cols-4 gap-3">
                  <CustomReactSelect
                    control={control}
                    name="depreciation_type"
                    label="Depreciation Type"
                    placeholder="Select Depreciation Type"
                    options={options2}
                    required={true}
                  // error={errors.section_type}
                  />
                  <TextInput
                    name="salvage_value"
                    label="Salvage Value"
                    type="number"
                    register={register}
                    required={true}
                    error={errors.salvage_value}
                    placeholder="Enter Salvage Value"
                  />
                  <TextInput
                    name="useful_life"
                    label="Useful Life"
                    type="number"
                    register={register}
                    required={true}
                    error={errors.useful_life}
                    placeholder="Enter Useful Life"
                  />
                  <TextInput
                    name="depreciation_value"
                    label="Depreciation"
                    type="number"
                    register={register}
                    value={dailyDepreciation.toFixed(2)}
                    defaultValue={dailyDepreciation.toFixed(2)}
                    readonly={true}
                    disabled={true}
                  />
                </div>
              </>
            )
          }

          <TextInput
            name="note"
            label="note"
            type="text"
            register={register}
            error={errors.note}
            placeholder="Enter note"
          />
          <div className="grid grid-cols-2 gap-5">
            <TextInput
              name="date"
              label="Date"
              type="datetime-local"
              register={register}
              error={errors.date}
              placeholder="Enter Date"
              defaultValue={new Date().toISOString().slice(0, 16)}
            />
            <TextInput
              name="image_path"
              label="Upload Image"
              type="file"
              register={register}
              error={errors.image_path}
              imgUrl={data?.image_path}
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

export default AssetsForm;
