
import React, { useEffect, useState } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";

import useSubmit from "../../Shared/Constant/hooks/useSubmit";

import { useChangePasswordMutation } from "../../../store/api/app/SuperAdmin/superAdminApiSlice";

const ChangePassword = ({ id, data }) => {
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
    } = useSubmit(id, id ? useChangePasswordMutation : useChangePasswordMutation);


    
    const handleFormSubmit = async (data) => {
        // console.log("submittedData", data);
        // return
        await onSubmit(data);
      };
    
      useEffect(() => {
        const { ...rest } = data || {};
        reset({ ...rest });
      }, [data, reset]);

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Card className="mt-[40px] py-[30px] px-[20px]">

                <TextInput
                    name="email"
                    label="Enter Your Email"
                    type="email"
                    register={register}
                    error={errors.email}
                    placeholder="Enter Email"
                    required={true}
                />

                <TextInput
                    name="password"
                    label="Enter Your Old Password"
                    type="text"
                    register={register}
                    error={errors.password}
                    placeholder="Enter Password"
                    required={true}
                />


                <TextInput
                    name="new_password"
                    label="Enter Your New Password"
                    type="text"
                    register={register}
                    error={errors.new_password}
                    placeholder="Enter New Password"
                    required={true}
                />



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

export default ChangePassword;
