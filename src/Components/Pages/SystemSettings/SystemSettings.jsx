import React, { useEffect, useState } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

const SystemSettings = () => {
  const navigate = useNavigate();

  // Local state to hold fetched system settings
  const [systemSettingsData, setSystemSettingsData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form setup
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const accessToken = Cookies.get("accessToken");

  // Fetch system settings from backend on mount
  useEffect(() => {
    const fetchSettings = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_LOCAL_API_URL}/system-settings/first`, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        });
        const result = await response.json();
        console.log("result:::", result);
        if (response.ok) {
          setSystemSettingsData(result.data);
          reset({
            currency: result.data.currency || "",
            copyright_text: result.data.copyright_text || "",
            white_logo: result.data.white_logo || "",
            black_logo: result.data.black_logo || "",
            small_logo: result.data.small_logo || "",
            favicon: result.data.favicon || "",
          });
        } else {
          // alert("Failed to fetch system settings");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        // alert("Error fetching system settings");
      }
      setIsFetching(false);
    };

    fetchSettings();
  }, [reset]);

  // On form submit
  const onSubmit = async (formDataValues) => {
    setIsSubmitting(true);

    const formData = new FormData();

    Object.keys(formDataValues).forEach((key) => {
      if (["white_logo", "black_logo", "small_logo", "favicon"].includes(key)) {
        const fileList = formDataValues[key];
        if (fileList && fileList.length > 0) {
          formData.append(key, fileList[0]);
        } else if (systemSettingsData && systemSettingsData[key]) {
          // If no new file uploaded, send existing URL or handle accordingly
          formData.append(key, systemSettingsData[key]);
        }
      } else {
        formData.append(key, formDataValues[key]);
      }
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_LOCAL_API_URL}/system-settings/update`, {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        // Note: no need to set Content-Type, browser will set multipart/form-data automatically
      });

      console.log("response", response);

      const result = await response.json();

      if (response.ok) {
        // alert(result.message || "Updated Successfully");
        console.log("result", result);
        navigate(-1);
      } else {
        // alert(result.message || "Failed to update");
        console.log("result", result);
      }
    } catch (error) {
      console.error("Update error:", error);
      // alert("Error updating system settings");
    }

    setIsSubmitting(false);
  };

  if (isFetching) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">

        <div className="grid grid-cols-1 gap-5">
          <TextInput
            name="currency"
            label="Currency"
            type="text"
            register={register}
            error={errors.currency}
            required={true}
            placeholder="Enter Currency"
          />
          <TextInput
            name="copyright_text"
            label="Copyright Text"
            type="text"
            register={register}
            error={errors.copyright_text}
            required={true}
            placeholder="Enter Copyright Text"
          />
          {/* <TextInput
            name="white_logo"
            label="White Logo"
            type="file"
            register={register}
            error={errors.white_logo}
            placeholder="Upload White Logo"
            accept="image/*"
            imgUrl={systemSettingsData?.white_logo}
          />
          <TextInput
            name="black_logo"
            label="Black Logo"
            type="file"
            register={register}
            error={errors.black_logo}
            placeholder="Upload Black Logo"
            accept="image/*"
            imgUrl={systemSettingsData?.black_logo}
          />
          <TextInput
            name="small_logo"
            label="Small Logo"
            type="file"
            register={register}
            error={errors.small_logo}
            placeholder="Upload Small Logo"
            accept="image/*"
            imgUrl={systemSettingsData?.small_logo}
          /> */}
          <TextInput
            name="favicon"
            label="Favicon"
            type="file"
            register={register}
            error={errors.favicon}
            placeholder="Upload Favicon"
            accept="image/*"
            imgUrl={systemSettingsData?.favicon}
          />
        </div>

        <div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse mt-6">
          <Button
            className="bg-[#FF5B14] text-white w-[90px] h-[38px] flex justify-center items-center"
            onClick={() => navigate(-1)}
            type="button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#2377E7] text-white w-[90px] h-[38px] flex justify-center items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader /> : "Submit"}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default SystemSettings;
