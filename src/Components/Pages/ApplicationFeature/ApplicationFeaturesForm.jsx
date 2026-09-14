import React, { useEffect, useState } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import {
  useCreateApplicationFeaturesMutation,
  useGetApplicationFeaturesByIdQuery,
  useUpdateApplicationFeaturesMutation,
} from "../../../store/api/app/ApplicationFeatures/applicationFeaturesApiSlice";
import SiteLanguageSelector from "../../Shared/Select/SiteLanguageSelector";

const ApplicationFeaturesForm = ({ id, data }) => {
  const navigate = useNavigate(); // Get the navigate function
  const [selectedSiteLanguage, setSelectedSiteLanguage] = useState("english");

  const { data: castData, isLoading: isFetchingCast } =
    useGetApplicationFeaturesByIdQuery(id, { skip: !id });
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
    id
      ? useUpdateApplicationFeaturesMutation
      : useCreateApplicationFeaturesMutation
  );

  const handleFormSubmit = async (formData) => {
    const formDataToSubmit = new FormData();

    // Append all form data to the FormData object
    Object.keys(formData).forEach((key) => {
      if (["icon"].includes(key)) {
        if (formData[key]?.length > 0) {
          formDataToSubmit.append(key, formData[key][0]);
        }
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    try {
      await onSubmit(formDataToSubmit);
    } catch (err) {
      console.error("Failed to update settings:", err);
      alert("Failed to update settings.");
    }
  };

  useEffect(() => {
    const { icon, ...rest } = data || {};
    reset({ ...rest });
  }, [data, reset]);

  if (id && isFetchingCast) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">

        <SiteLanguageSelector
          selectedSiteLanguage={selectedSiteLanguage}
          setSelectedSiteLanguage={setSelectedSiteLanguage}
        />
        <div className="grid grid-cols-1 gap-5">
          {selectedSiteLanguage === "english" && (
            <>
              <TextInput
                name="title"
                label="Enter Title (English)"
                type="text"
                register={register}
                error={errors.title}
                // className="h-[48px]"
                placeholder="Enter Title (English)"
                isHighlight={true}
              />
              <TextInput
                name="short_description"
                label="Enter Short Description (English)"
                type="text"
                register={register}
                error={errors.short_description}
                // className="h-[48px]"
                placeholder="Enter Short Description (English)"
                isHighlight={true}
              />
            </>
          )}

          {selectedSiteLanguage === "hindi" && (
            <>
              <TextInput
                name="title_hi"
                label="Enter Title (Hindi)"
                type="text"
                register={register}
                error={errors.title_hi}
                // className="h-[48px]"
                placeholder="Enter Title (Hindi)"
                isHighlight={true}
              />
              <TextInput
                name="short_description_hi"
                label="Enter Short Description (Hindi)"
                type="text"
                register={register}
                error={errors.short_description_hi}
                // className="h-[48px]"
                placeholder="Enter Short Description (Hindi)"
                isHighlight={true}
              />
            </>
          )}

          {selectedSiteLanguage === "bangla" && (
            <>
              <TextInput
                name="title_bn"
                label="Enter Title (Bangla)"
                type="text"
                register={register}
                error={errors.title_bn}
                // className="h-[48px]"
                placeholder="Enter Title (Bangla)"
                isHighlight={true}
              />
              <TextInput
                name="short_description_bn"
                label="Enter Short Description (Bangla)"
                type="text"
                register={register}
                error={errors.short_description_bn}
                // className="h-[48px]"
                placeholder="Enter Short Description (Bangla)"
                isHighlight={true}
              />
            </>
          )}

          {selectedSiteLanguage === "arabic" && (
            <>
              <TextInput
                name="title_ar"
                label="Enter Title (Arabic)"
                type="text"
                register={register}
                error={errors.title_ar}
                // className="h-[48px]"
                placeholder="Enter Title (Arabic)"
                isHighlight={true}
              />
              <TextInput
                name="short_description_ar"
                label="Enter Short Description (Arabic)"
                type="text"
                register={register}
                error={errors.short_description_ar}
                // className="h-[48px]"
                placeholder="Enter Short Description (Arabic)"
                isHighlight={true}
              />
            </>
          )}

          <TextInput
            name="icon"
            label="Upload Image"
            type="file"
            register={register}
            error={errors.icon}
            // className="h-[48px]"
            placeholder="Upload Image"
            imgUrl={data?.icon}
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
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Submit"}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default ApplicationFeaturesForm;
