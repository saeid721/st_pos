import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetApplicationSettingsQuery,
  useUpdateApplicationSettingsMutation,
} from "../../../store/api/app/ApplicationSettings/applicationSettingsApiSlice";
import TextInput from "../../Shared/TextInput/TextInput";
import { Loader } from "lucide-react";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import SiteLanguageSelector from "../../Shared/Select/SiteLanguageSelector";

const ApplicationSettingsEdit = () => {
  const navigate = useNavigate();

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
  } = useSubmit(null, useUpdateApplicationSettingsMutation, false);

  const handleFormSubmit = async (formData) => {
    const formDataToSubmit = new FormData();

    // Append all form data to the FormData object
    Object.keys(formData).forEach((key) => {
      if (["site_logo"].includes(key)) {
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

  const {
    data,
    isLoading: isLoadingSettings,
    isError,
    error,
  } = useGetApplicationSettingsQuery();

  console.log("data", data);

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (data?.data) {
      const { site_logo, ...rest } = data.data;
      reset({
        ...rest,
      });
    }
  }, [data, reset]);

  if (isLoadingSettings) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-8 divide-y divide-gray-200 my-[50px] bg-white overflow-hidden sm:rounded-lg p-3 shadow-xl"
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Edit Application Settings
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Update your application settings here.
            </p>
          </div>


          <SiteLanguageSelector
            selectedSiteLanguage={selectedSiteLanguage}
            setSelectedSiteLanguage={setSelectedSiteLanguage}
          />


          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedSiteLanguage === 'english' && <TextInput
                name="site_name"
                label="Site Name (English)"
                type="text"
                register={register}
                error={errors.site_name}
                placeholder="Enter site name"
                className="col-span-1"
                isHighlight={true}
              />}

              {selectedSiteLanguage === 'bangla' && <TextInput
                name="site_name_bn"
                label="Site Name (Bangla)"
                type="text"
                register={register}
                error={errors.site_name_bn}
                placeholder="Enter site name"
                className="col-span-1"
                isHighlight={true}
                required={false}
              />}


              {selectedSiteLanguage === 'hindi' && <TextInput
                name="site_name_hi"
                label="Site Name (Hindi)"
                type="text"
                register={register}
                error={errors.site_name_hi}
                placeholder="Enter site name"
                className="col-span-1"
                isHighlight={true}
                required={false}
              />}

              {selectedSiteLanguage === 'arabic' && <TextInput
                name="site_name_ar"
                label="Site Name (Arabic)"
                type="text"
                register={register}
                error={errors.site_name_ar}
                placeholder="Enter site name"
                className="col-span-1"
                isHighlight={true}
                required={false}
              />}



              <TextInput
                name="site_url"
                label="Site URL"
                type="text"
                register={register}
                error={errors.site_url}
                placeholder="Enter site URL"
                className="col-span-1"
              />

              <TextInput
                name="contact_email"
                label="Contact Email"
                type="email"
                register={register}
                error={errors.contact_email}
                placeholder="Enter contact email"
                className="col-span-1"
              />

              <TextInput
                name="phone_number"
                label="Phone Number"
                type="tel"
                register={register}
                error={errors.phone_number}
                placeholder="Enter phone number"
                className="col-span-1"
              />
            </div>

            <TextInput
                name="site_logo"
                label="Upload Logo"
                type="file"
                register={register}
                error={errors.site_logo}
                placeholder="Upload Logo"
                className="w-full"
                imgUrl={data?.data?.site_logo}
              />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             

              <TextInput
                name="copyright"
                label="Copyright"
                type="text"
                register={register}
                error={errors.copyright}
                placeholder="Enter copyright information"
                className="col-span-1 sm:col-span-2"
              />

              <TextInput
                name="meta_title"
                label="Meta Title"
                type="text"
                register={register}
                error={errors.meta_title}
                placeholder="Enter meta title"
                className="col-span-1 sm:col-span-2"
              />
              <TextInput
                name="meta_keywords"
                label="Meta Keywords"
                type="text"
                register={register}
                error={errors.meta_keywords}
                placeholder="Enter meta keywords"
                className="col-span-1 sm:col-span-2"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                {...register("meta_description", { required: true })}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your description here..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ApplicationSettingsEdit;
