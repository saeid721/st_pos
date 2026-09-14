import React, { useEffect } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";

import useSubmit from "../../Shared/Constant/hooks/useSubmit";


import {
  useCreateSuperAdminsMutation,
  useUpdateSuperAdminsMutation,
} from "../../../store/api/app/SuperAdmin/superAdminApiSlice";


import { useGetRolesQuery } from "../../../store/api/app/Roles/rolesApiSlice";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";

const SuperAdminForm = ({ id, data }) => {
  const navigate = useNavigate(); // Get the navigate function
  const { data: RolesData, isLoading: isLoadingRoles } = useGetRolesQuery();

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
  } = useSubmit(id, id ? useUpdateSuperAdminsMutation : useCreateSuperAdminsMutation);

  const handleFormSubmit = async (data) => {
    const formData = new FormData();
    const keys = Object.keys(data);

    keys.forEach((key) => {
      if (["profile"].includes(key)) {
        // Check if a new file was uploaded
        if (data[key] instanceof FileList && data[key].length > 0) {
          formData.append(key, data[key][0]); // Add the new file
        } else if (data?.[key]) {
          // If no new file, retain the existing image URL
          formData.append(key, data[key]); // Add existing image URL
        }
      } else {
        formData.append(key, data[key]); // Add other fields
      }
    });

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    reset({ ...data });
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
          <TextInput
            name="name"
            label="Enter Name"
            type="text"
            register={register}
            error={errors.name}
            required={true}
            // className="h-[48px]"
            placeholder="Enter Name"
          />
          <TextInput
            name="email"
            label="Enter Email"
            type="text"
            register={register}
            error={errors.email}
            required={true}
            // className="h-[48px]"
            placeholder="Enter Email"
          />
          <TextInput
            name="password"
            label="Enter Password"
            type="password"
            register={register}
            error={errors.password}
            required={true}
            // className="h-[48px]"
            placeholder="Enter Password"
          />
          <TextInput
            name="bio"
            label="Enter Bio"
            type="text"
            register={register}
            error={errors.bio}
            required={true}
            // className="h-[48px]"
            placeholder="Enter Bio"
          />
          <TextInput
            name="profile"
            label="Enter Profile"
            type="file"
            register={register}
            error={errors.profile}
            required={true}
            // className="h-[48px]"
            placeholder="Enter Profile"
          />
        </div>

        <div>
          <CustomReactSelect
            control={control}
            error={errors?.role_id}
            name="role_id"
            label="Select Role"
            placeholder="Select Role"
            required={true}
            options={
              RolesData?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
            isLoading={isLoadingRoles}
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

export default SuperAdminForm;
