import React, { useEffect } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import Editor from "../../Shared/Editor/Editor";
import { useCreateProductsMutation, useUpdateProductsMutation } from "../../../store/api/app/Products/productsApiSlice";
import { useGetSubCategoriesQuery } from "../../../store/api/app/SubCategory/subCategoryApiSlice";
import { useGetBrandsQuery } from "../../../store/api/app/Brand/brandApiSlice";
import { useGetSuppliersQuery } from "../../../store/api/app/Suppliers/suppliersApiSlice";
import { useGetUnitsQuery } from "../../../store/api/app/Unit/unitApiSlice";
import { useGetTaxsQuery } from "../../../store/api/app/Tax/taxApiSlice";
import { useGetCategoriesQuery } from "../../../store/api/app/Category/categoryApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductsForm = ({ id, data }) => {
  const navigate = useNavigate(); // Get the navigate function

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;

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
    id ? useUpdateProductsMutation : useCreateProductsMutation
  );

  const tex_type = watch("tex_type");
  const regular_price = watch("regular_price");
  const discount = watch("discount");

  const category_id = watch('category_id')
  const { data: categories, isLoading: plansIsLoading, isError: plansIsError, error: plansError } = useGetCategoriesQuery({
    store_id: store_id
  });
  const { data: subCategories } = useGetSubCategoriesQuery({
    store_id: store_id,
    category_id: category_id
  });
  const { data: suppliers } = useGetSuppliersQuery({
    store_id: store_id,
  });
  const { data: brands } = useGetBrandsQuery({
    store_id: store_id,
  });
  const { data: units } = useGetUnitsQuery({
    store_id: store_id,
  });
  const { data: taxs } = useGetTaxsQuery({
    store_id: store_id,
  });



  const handleFormSubmit = async (formDataValues) => {
    const formData = new FormData();
    const keys = Object.keys(formDataValues);

    // if(!tex_type){
    //   toast.error("Please select Tax Type!");
    //   return;
    // }

    keys.forEach((key) => {
      if (["main_image"].includes(key)) {
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


  const options = [
    {
      value: "FLAT",
      label: "FLAT",
    },
    {
      value: "PERCENTAGE",
      label: "PERCENTAGE",
    },
  ];

  useEffect(() => {
    if (data) {
      console.log("data:::", data);
      // Extract and transform data for resetting the form
      const { main_image, ...rest } = data;

      // Prepare transformed fields
      const transformedData = {
        ...rest,
      };

      reset(transformedData);
    }
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
          <div className="md:flex gap-2 mb-1">
            <TextInput
              name="name"
              label="Name"
              type="text"
              register={register}
              error={errors.name}
              required={true}
              placeholder="Enter Name"
            />
            <TextInput
              name="product_code"
              label="Product code"
              type="text"
              register={register}
              error={errors.product_code}
              // required={true}
              placeholder="Enter product code"
            />
          </div>
          <TextInput
            name="model"
            label="Model"
            type="text"
            register={register}
            error={errors.model}
            // required={true}
            placeholder="Enter Model"
          />
          {/* <TextInput
            name="barcode_symbology"
            label="Barcode Symbology"
            type="text"
            register={register}
            error={errors.barcode_symbology}
            required={true}
            placeholder="Enter Barcode Symbology"
          /> */}
          <div>
            <h6 className="font-semibold text-[14px]">Description</h6>
            <Editor
              name="description"
              errors={errors}
              control={control}
              required={false}
              isHighlight={true}
            />
          </div>
          <TextInput
            name="main_image"
            label="Upload Image"
            type="file"
            register={register}
            // required={!data?.thumbnail}
            error={errors.main_image}
            imgUrl={data?.main_image}
          />
          {/* <CustomReactSelect
            control={control}
            name="tex_type"
            label="Tax Type"
            placeholder="Select tax Type"
            options={options}
            required={true}
          // error={errors.section_type}
          /> */}
          {/* <CustomReactSelect
            control={control}
            name="tax_id"
            label="Tax"
            placeholder="Select Tax"
            options={
              taxs?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
            required={true}
          // error={errors.section_type}
          /> */}
          {/* <TextInput
            name="purchase_price"
            label="Purchase Price"
            type="number"
            register={register}
            error={errors.purchase_price}

            placeholder="Enter Purchase Price"
          /> */}
          <div className="md:flex gap-2 mb-1">
            <TextInput
              name="regular_price"
              label="Regular Price"
              type="number"
              register={register}
              error={errors.regular_price}
              required={true}
              placeholder="Enter Regular Price"
            />
            <TextInput
              name="discount"
              label="Discount(%)"
              type="number"
              register={register}
              error={errors.discount}

              placeholder="Enter Discount(%)"
            />
            <TextInput
              name="sale_price"
              label="Sale Price"
              type="number"
              register={register}
              error={errors.sale_price}
              placeholder="Enter Sale Price"
              value={regular_price - (regular_price * discount / 100)}
              readonly={true}
            />
          </div>
          {/* <TextInput
            name="inventory_count"
            label="Inventory count"
            type="number"
            register={register}
            error={errors.inventory_count}

            placeholder="Enter Inventory Count"
          /> */}
          <div className="grid md:grid-cols-3 grid-cols-1 gap-2 mb-1">
            <TextInput
              name="alert_qty"
              label="Alert quantity"
              type="number"
              register={register}
              error={errors.alert_qty}

              placeholder="Enter Alert quantity"
            />
            <CustomReactSelect
              control={control}
              name="category_id"
              label="Category"
              placeholder="Select Category"
              options={
                categories?.data?.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              required={true}
            // error={errors.section_type}
            />
            <CustomReactSelect
              control={control}
              name="sub_category_id"
              label="Sub Category"
              placeholder="Select Sub Category"
              options={
                subCategories?.data?.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              required={true}
            // error={errors.section_type}
            />
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-2 mb-1">
            <CustomReactSelect
              control={control}
              name="supplier_id"
              label="Supplier"
              placeholder="Select Supplier"
              options={
                suppliers?.data?.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              required={true}
            // error={errors.section_type}
            />
            <CustomReactSelect
              control={control}
              name="brand_id"
              label="Brand"
              placeholder="Select Brand"
              options={
                brands?.data?.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              required={true}
            // error={errors.section_type}
            />
            <CustomReactSelect
              control={control}
              name="unit_id"
              label="Unit"
              placeholder="Select Unit"
              options={
                units?.data?.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              required={true}
            // error={errors.section_type}
            />
          </div>

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

export default ProductsForm;
