import React, { useEffect } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateClientsMutation, useUpdateClientsMutation } from "../../../store/api/app/Client/clientApiSlice";
import { useGetStoresByIdQuery, useUpdateStoresMutation } from "../../../store/api/app/store/storeApiSlice";
import { useSelector } from "react-redux";

const StoreSettings = ({ data }) => {
    const navigate = useNavigate(); // Get the navigate function

    const { isAuth, auth } = useSelector((state) => state.auth);
    const { store_id } = auth.user;
    const { data: storeData } = useGetStoresByIdQuery(store_id);
    console.log("storeData:", storeData);

    const id = store_id;
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
        id ? useUpdateStoresMutation : useUpdateStoresMutation
    );
    console.log("data:", data);

    const handleFormSubmit = async (formDataValues) => {
        console.log("in data:", formDataValues);
        const formData = new FormData();
        const keys = Object.keys(formDataValues);

        keys.forEach((key) => {
            if (["logo"].includes(key)) {
                // Check if a new file was uploaded
                if (formDataValues[key] instanceof FileList && formDataValues[key].length > 0) {
                    formData.append(key, formDataValues[key][0]); // Add the new file
                } else if (data?.[key]) {
                    // If no new file, retain the existing image URL
                    formData.append(key, data[key]); // Add existing image URL
                }
            } else {
                formData.append(key, formDataValues[key]); // Add other fields
            }
        });

        try {
            await onSubmit(formData);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    useEffect(() => {
        if (storeData) {
            reset({
                store: storeData?.data?.store,
                email: storeData?.data?.email,
                phone: storeData?.data?.phone,
                address: storeData?.data?.address,
                logo: storeData?.data?.logo,
            })
        }
    }, [storeData, reset]);

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Card className="mt-[40px] py-[30px] px-[20px]">
                <div className="grid grid-cols-1 gap-5">
                    <TextInput
                        name="store"
                        label="Store"
                        type="text"
                        register={register}
                        error={errors.store}
                        required={true}
                        placeholder="Enter Store"
                        readonly="readonly"
                    />
                    <TextInput
                        name="email"
                        label="Email"
                        type="text"
                        register={register}
                        error={errors.email}
                        required={true}
                        placeholder="Enter Email"
                        readonly="readonly"
                    />
                    <TextInput
                        name="phone"
                        label="Phone"
                        type="text"
                        register={register}
                        error={errors.phone}
                        required={true}
                        placeholder="Enter Phone"
                    />
                    <TextInput
                        name="address"
                        label="Address"
                        type="text"
                        register={register}
                        error={errors.address}
                        required={true}
                        placeholder="Enter Address"
                    />
                    <TextInput
                        name="logo"
                        label="Logo"
                        type="file"
                        register={register}
                        error={errors.logo}
                        // required={true}
                        placeholder="Enter Logo"
                        imgUrl={data?.logo}
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

export default StoreSettings;
