import React, { useEffect, useState } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import {
  useCreateSocialsMutation,
  useGetSocialsByIdQuery,
  useUpdateSocialsMutation,
} from "../../../store/api/app/Socials/socialsApiSlice";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";

import SiteLanguageSelector from "../../Shared/Select/SiteLanguageSelector";

const SocialsForm = ({ id, data }) => {
  const navigate = useNavigate(); // Get the navigate function

  const [selectedSiteLanguage, setSelectedSiteLanguage] = useState("english");

  const { data: socialData, isLoading: isFetchingSocial } =
    useGetSocialsByIdQuery(id, { skip: !id });
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
  } = useSubmit(id, id ? useUpdateSocialsMutation : useCreateSocialsMutation);

  const handleFormSubmit = async (formData) => {
    const formDataToSubmit = new FormData();

    // Append all form data to the FormData object
    Object.keys(formData).forEach((key) => {
      if (["image"].includes(key)) {
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
      console.error("Failed to update Social:", err);
      alert("Failed to update Social.");
    }
  };

  useEffect(() => {
    const { image, ...rest } = data || {};
    reset({ ...rest });
  }, [data, reset]);

  if (id && isFetchingSocial) {
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
            <TextInput
              name="name"
              label="Enter Social Name (English)"
              type="text"
              register={register}
              error={errors.name}
              required={true}
              placeholder="Enter Social Name"
              isHighlight={true}
            />
          )}

          {selectedSiteLanguage === "bangla" && (
            <TextInput
              name="name_bn"
              label="Enter Social Name (Bangla)"
              type="text"
              register={register}
              error={errors.name_bn}
              placeholder="Enter Social Name"
              required={false}
              isHighlight={true}
            />
          )}

          {selectedSiteLanguage === "hindi" && (
            <TextInput
              name="name_hi"
              label="Enter Social Name (Hindi)"
              type="text"
              register={register}
              error={errors.name_hi}
              placeholder="Enter Social Name"
              required={false}
              isHighlight={true}
            />
          )}

          {selectedSiteLanguage === "arabic" && (
            <TextInput
              name="name_ar"
              label="Enter Social Name (Arabic)"
              type="text"
              register={register}
              error={errors.name_ar}
              placeholder="Enter Social Name"
              required={false}
              isHighlight={true}
            />
          )}

          <TextInput
            name="url"
            label="Enter URL"
            type="text"
            register={register}
            error={errors.name}
            placeholder="Enter Social URL"
          />

          <TextInput
            name="image"
            label="Upload Image"
            type="file"
            register={register}
            error={errors.image}
            required={!data?.image}
            // className="h-[48px]"
            placeholder="Upload Image"
            imgUrl={data?.image}
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

export default SocialsForm;
