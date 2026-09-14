import React, { useEffect, useState } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useSelector } from "react-redux";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useGetProductsQuery } from "../../../store/api/app/Products/productsApiSlice";
import { useUpdateStockProductsMutation } from "../../../store/api/app/StockProduct/stockProductApiSlice";
import { useGetBranchesQuery } from "../../../store/api/app/Branch/branchApiSlice";

const StoreProductListForm = ({ id, data }) => {
  const navigate = useNavigate(); // Get the navigate function
  const { register, unregister, control, errors, reset, handleSubmit, onSubmit, setValue, watch, isLoading } = useSubmit(
    null,
    useUpdateStockProductsMutation
  );

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;

  const { data: brunches } = useGetBranchesQuery({ store_id: store_id });
  const { data: products } = useGetProductsQuery({ store_id: store_id });

  const handleFormSubmit = async (data) => {
    const submitData = {
      ...data,
      purchase_price: parseFloat(data.purchase_price),
      stock_quantity: parseFloat(data.stock_quantity),
    };

    await onSubmit(submitData);
    console.log("submitData:: ", data);
  };

  useEffect(() => {
    reset({
      ...data,
    });
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
          <CustomReactSelect
            control={control}
            name="branch_id"
            label="Brunch"
            placeholder="Select Brunch"
            options={
              brunches?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
            required={true}
            // error={errors.section_type}
          />
          <CustomReactSelect
            control={control}
            name="product_id"
            label="Products"
            placeholder="Select Products"
            options={
              products?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
            required={true}
            // error={errors.section_type}
          />

          <TextInput
            name="stock_quantity"
            label="Stock Quantity"
            type="number"
            register={register}
            error={errors.stock_quantity}
            required={true}
            placeholder="Enter Stock Quantity"
          />
          <TextInput
            name="purchase_price"
            label="Purchase Price"
            type="number"
            register={register}
            error={errors.purchase_price}
            // required={true}
            placeholder="Enter Purchase Price"
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
          <Button type="submit" className="bg-[#2377E7] text-white w-[90px] h-[38px] flex justify-center items-center">
            {isLoading ? <Loader /> : "Submit"}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default StoreProductListForm;
