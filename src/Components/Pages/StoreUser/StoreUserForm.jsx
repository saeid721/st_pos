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
import { useCreateStoreUsersMutation, useUpdateStoreUsersMutation } from "../../../store/api/app/StoreUser/StoreUserApiSlice";
import { useGetBranchesQuery } from "../../../store/api/app/Branch/branchApiSlice";
import { useSelector } from "react-redux";
import { useGetRolesStoreQuery } from "../../../store/api/app/Roles/rolesStoreApiSlice";

const StoreUserForm = ({ id, data }) => {
  const navigate = useNavigate(); // Get the navigate function

  const { isAuth, auth } = useSelector((state) => state.auth);
  console.log("auth", auth);


  const { data: RolesData, isLoading: isLoadingRoles } = useGetRolesQuery();

  const { data: branchesData, isLoading: isLoadingBranches } = useGetBranchesQuery({ store_id: auth.store_id });
  const { data: storeRolesData, isLoading: isLoadingstoreRoles } = useGetRolesStoreQuery({ store_id: auth.store_id });



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
  } = useSubmit(id, id ? useUpdateStoreUsersMutation : useCreateStoreUsersMutation, false);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
  };

  useEffect(() => {
    reset({ ...data });
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">

          <CustomReactSelect
            control={control}
            error={errors?.branch_id}
            name="branch_id"
            label="Branch"
            placeholder="Select Branch"
            required={true}
            options={
              branchesData?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
            isLoading={isLoadingBranches}
          />
          <CustomReactSelect
            control={control}
            error={errors?.branch_id}
            name="store_role_id"
            label="Select Role"
            placeholder="Select Role" 
            required={true}
            options={
              storeRolesData?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
            isLoading={isLoadingBranches}
          />

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

export default StoreUserForm;
