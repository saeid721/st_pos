import React, { useEffect, useState } from "react";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";
import {
  useCreateSubscriptionsMutation,
  useUpdateSubscriptionsMutation,
} from "../../../store/api/app/Subscriptions/subscriptionsApiSlice";
import { useNavigate } from "react-router-dom";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import SiteLanguageSelector from "../../Shared/Select/SiteLanguageSelector";

const SubscriptionsForm = ({ id, data }) => {
  const navigate = useNavigate(); // Get the navigate function

  const [selectedSiteLanguage, setSelectedSiteLanguage] = useState("english");

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
    id ? useUpdateSubscriptionsMutation : useCreateSubscriptionsMutation
  );

  const handleFormSubmit = async (formData) => {
    const formattedData = {
      ...formData,
      price: parseFloat(formData.price), // Convert price to float
      duration: parseInt(formData.duration), // Convert price to float
    };

    await onSubmit(formattedData);
  };

  const DurationTypeOptions = [
    { value: "MONTH", label: "MONTH" },
    { value: "YEAR", label: "YEAR" },
  ];

  useEffect(() => {
    reset({
      ...data,
    });
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">

        <SiteLanguageSelector
          selectedSiteLanguage={selectedSiteLanguage}
          setSelectedSiteLanguage={setSelectedSiteLanguage}
        />
        {selectedSiteLanguage === "english" && (
          <div className="grid grid-cols-1 gap-5">
            <TextInput
              name="name"
              label="Enter Name (English)"
              type="text"
              register={register}
              error={errors.name}
              // className="h-[48px]"
              placeholder="Enter Name (English)"
            />
            <TextInput
              name="description"
              label="Enter Description (English)"
              type="text"
              register={register}
              error={errors.description}
              // className="h-[48px]"
              placeholder="Enter Description (English)"
            />
          </div>
        )}
        {selectedSiteLanguage === "bangla" && (
          <div className="grid grid-cols-1 gap-5">
            <TextInput
              name="name_bn"
              label="Enter Name (Bangla)"
              type="text"
              register={register}
              error={errors.name_bn}
              // className="h-[48px]"
              placeholder="Enter Name (Bangla)"
            />
            <TextInput
              name="description_bn"
              label="Enter Description (Bangla)"
              type="text"
              register={register}
              error={errors.description_bn}
              // className="h-[48px]"
              placeholder="Enter Description (Bangla)"
            />
          </div>
        )}
        {selectedSiteLanguage === "hindi" && (
          <div className="grid grid-cols-1 gap-5">
            <TextInput
              name="name_hi"
              label="Enter Name (Hindi)"
              type="text"
              register={register}
              error={errors.name_hi}
              // className="h-[48px]"
              placeholder="Enter Name (Hindi)"
            />
            <TextInput
              name="description_hi"
              label="Enter Description (Hindi)"
              type="text"
              register={register}
              error={errors.description_hi}
              // className="h-[48px]"
              placeholder="Enter Description (Hindi)"
            />
          </div>
        )}
        {selectedSiteLanguage === "arabic" && (
          <div className="grid grid-cols-1 gap-5">
            <TextInput
              name="name_ar"
              label="Enter Name (Arabic)"
              type="text"
              register={register}
              error={errors.name_ar}
              // className="h-[48px]"
              placeholder="Enter Name (Arabic)"
            />
            <TextInput
              name="description_ar"
              label="Enter Description (Arabic)"
              type="text"
              register={register}
              error={errors.description_ar}
              // className="h-[48px]"
              placeholder="Enter Description (Arabic)"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-5">
          <TextInput
            name="price"
            label="Enter Price"
            type="number"
            register={register}
            error={errors.price}
            // className="h-[48px]"
            placeholder="Enter Price"
          />
          <CustomReactSelect
            control={control}
            name="duration_type"
            label="Section Type"
            placeholder="Select Section Type"
            options={DurationTypeOptions}
            error={errors.duration_type}
            required={true}
          />
          <TextInput
            name="duration"
            label="Enter Duration"
            type="number"
            register={register}
            error={errors.duration}
            // className="h-[48px]"
            placeholder="Enter Duration"
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

export default SubscriptionsForm;
