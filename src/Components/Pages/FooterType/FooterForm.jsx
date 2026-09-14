import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import Editor from "../../Shared/Editor/Editor";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Card } from "../../ui/card";
import SiteLanguageSelector from "../../Shared/Select/SiteLanguageSelector";
import { useCreateFooterMutation, useUpdateFooterMutation } from "../../../store/api/app/footer/footerApiSlice";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";

const FooterForm = ({ id, data, footer_type }) => {
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
    } = useSubmit(
        id,
        id ? useUpdateFooterMutation : useCreateFooterMutation,
    );


    const footerUrlTypeWatch = watch('footer_url_type')



    const footerUrlType = [
        {
            value: 'general',
            name: "general",
        },
        {
            value: 'custom',
            name: "custom",
        },
    ];


    const handleFormSubmit = async (formDataValues) => {
        const formData = new FormData();
        const keys = Object.keys(formDataValues);

        keys.forEach((key) => {
            if (["image", "cover"].includes(key)) {
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

        formData.set("footer_type", footer_type);

        try {
            await onSubmit(formData);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };




    useEffect(() => {
        const { image, cover, ...rest } = data || {};
        reset({ ...rest });
    }, [data, reset]);

    // if (id && isFetchingMovie) {
    //   return <div>Loading...</div>;
    // }


    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Card className="mt-[40px] py-[30px] px-[20px]">

                    <SiteLanguageSelector
                        selectedSiteLanguage={selectedSiteLanguage}
                        setSelectedSiteLanguage={setSelectedSiteLanguage}
                    />

                    <div className="grid grid-cols-1 gap-5">

                        <CustomReactSelect
                            control={control}
                            error={errors?.footer_url_type}
                            name={"footer_url_type"}
                            label={"URL Type"}
                            placeholder={"Select URL Type"}
                            required={false}
                            options={
                                footerUrlType?.map((item) => ({
                                    value: item.value,
                                    label: item.name,
                                })) || []
                            }
                        />

                        {
                            footerUrlTypeWatch === 'custom' &&

                            <TextInput
                                name="custom_url"
                                label="Custom URL "
                                type="text"
                                register={register}
                                error={errors.custom_url}
                                placeholder="Custom URL "
                            />

                        }

                        <TextInput
                            name="sort_order"
                            label="Sort Order "
                            type="number"
                            register={register}
                            error={errors.sort_order}
                            placeholder="Sort Order "
                        // isHighlight={true}
                        />


                        {selectedSiteLanguage === "english" && (
                            <TextInput
                                name="page_title"
                                label="Page Title (English)"
                                type="text"
                                register={register}
                                error={errors.page_title}
                                placeholder="Enter Page Title"
                                isHighlight={true}
                            />
                        )}

                        {selectedSiteLanguage === "bangla" && (
                            <TextInput
                                name="page_title_bn"
                                label="Page Title (Bangla)"
                                type="text"
                                register={register}
                                error={errors.page_title_bn}
                                placeholder="Enter Title"
                                required={false}
                                isHighlight={true}
                            />
                        )}

                        {selectedSiteLanguage === "hindi" && (
                            <TextInput
                                name="page_title_hi"
                                label="Page Title (Hindi)"
                                type="text"
                                register={register}
                                error={errors.page_title_hi}
                                placeholder="Enter Title"
                                required={false}
                                isHighlight={true}
                            />
                        )}

                        {selectedSiteLanguage === "arabic" && (
                            <TextInput
                                name="page_title_ar"
                                label="Page Title (Arabic)"
                                type="text"
                                register={register}
                                error={errors.page_title_ar}
                                placeholder="Enter Title"
                                required={false}
                                isHighlight={true}
                            />
                        )}


                        {selectedSiteLanguage === "english" && (
                            <TextInput
                                name="sub_page_title"
                                label="Sub Page Title (English)"
                                type="text"
                                register={register}
                                error={errors.sub_page_title}
                                placeholder="Enter Page Title"
                                isHighlight={true}
                            />
                        )}

                        {selectedSiteLanguage === "bangla" && (
                            <TextInput
                                name="sub_page_title_bn"
                                label="Sub Page Title (Bangla)"
                                type="text"
                                register={register}
                                error={errors.sub_page_title_bn}
                                placeholder="Enter Title"
                                required={false}
                                isHighlight={true}
                            />
                        )}

                        {selectedSiteLanguage === "hindi" && (
                            <TextInput
                                name="sub_page_title_hi"
                                label="Sub Page Title (Hindi)"
                                type="text"
                                register={register}
                                error={errors.sub_page_title_hi}
                                placeholder="Enter Title"
                                required={false}
                                isHighlight={true}
                            />
                        )}

                        {selectedSiteLanguage === "arabic" && (
                            <TextInput
                                name="sub_page_title_ar"
                                label="Sub Page Title (Arabic)"
                                type="text"
                                register={register}
                                error={errors.sub_page_title_ar}
                                placeholder="Enter Title"
                                required={false}
                                isHighlight={true}
                            />
                        )}




                        <div className="grid grid-cols-1 gap-4">
                            <TextInput
                                name="cover"
                                label="Upload Cover"
                                type="file"
                                register={register}
                                error={errors.cover}
                                imgUrl={data?.cover}
                            />

                        </div>

                        <TextInput
                            name="image"
                            label="Upload Image"
                            type="file"
                            register={register}
                            error={errors.image}
                            imgUrl={data?.image}
                        />


                        {selectedSiteLanguage === "english" && (
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Description (English)
                                </label>
                                <Editor
                                    name="description"
                                    errors={errors}
                                    control={control}
                                    required={false}
                                    isHighlight={true}
                                />
                            </div>
                        )}

                        {selectedSiteLanguage === "bangla" && (
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Description (Bangla)
                                </label>
                                <Editor
                                    name="description_bn"
                                    errors={errors}
                                    control={control}
                                    required={false}
                                    isHighlight={true}
                                />
                            </div>
                        )}

                        {selectedSiteLanguage === "hindi" && (
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Description (Hindi)
                                </label>
                                <Editor
                                    name="description_hi"
                                    errors={errors}
                                    control={control}
                                    required={false}
                                    isHighlight={true}
                                />
                            </div>
                        )}

                        {selectedSiteLanguage === "arabic" && (
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Description (Arabic)
                                </label>
                                <Editor
                                    name="description_ar"
                                    errors={errors}
                                    control={control}
                                    required={false}
                                    isHighlight={true}
                                />
                            </div>
                        )}



                    </div>

                    <div className="flex gap-5 mt-6">
                        <Button
                            className="bg-[#FF5B14] text-white w-[90px] h-[38px] flex justify-center items-center"
                            onClick={() => navigate(-1)}
                            type="button"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#2377E7] text-white w-fit px-4 h-[38px] flex justify-center items-center"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader /> : "Submit & Next"}
                        </Button>
                    </div>
                </Card>
            </form>
        </>
    );
};

export default FooterForm;
