import React, { useEffect } from "react";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreateRolesStoreMutation, useUpdateRolesStoreMutation } from "../../../store/api/app/Roles/rolesStoreApiSlice";

const RolesStoreForm = ({ id, data }) => {
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
  } = useSubmit(id, id ? useUpdateRolesStoreMutation : useCreateRolesStoreMutation);

  const handleFormSubmit = async (data) => {
    console.log("data: ", data);
    await onSubmit(data);
  };

  const options = [
    {
      value: "home",
      label: "Home",
    },
  ];

  useEffect(() => {
    reset({
      name: data?.name,
    });
  }, [data]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
          <TextInput
            name="name"
            label="Enter Title"
            type="text"
            register={register}
            error={errors.name}
            required={true}
            // className="h-[48px]"
            placeholder="Enter Title"
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

export default RolesStoreForm;
