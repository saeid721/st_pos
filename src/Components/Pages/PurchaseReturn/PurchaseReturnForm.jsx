import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateCategoriesMutation, useUpdateCategoriesMutation } from "../../../store/api/app/Category/categoryApiSlice";
import { useGetSuppliersQuery } from "../../../store/api/app/Suppliers/suppliersApiSlice";
import { useGetPurchasesByIdQuery, useGetPurchasesBySupplierQuery, useGetPurchasesProductsQuery } from "../../../store/api/app/Purchases/purchasesApiSlice";
import { useSelector } from "react-redux";
import { useCreatePurchaseReturnsMutation, useUpdatePurchaseReturnsMutation } from "../../../store/api/app/PurchaseReturn/purchaseReturnApiSlice";
import { useGetProductsQuery } from "../../../store/api/app/Products/productsApiSlice";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import PurchaseReturnTable from "../../Shared/Tables/purchaseReturnTable";
import { useGetAccountsQuery, useGetAvailableBalanceByAccountQuery } from "../../../store/api/app/Account/accountApiSlice";

const PurchaseReturnForm = ({ id, data }) => {
  const [branchId, setBranchId] = useState(null);
  const navigate = useNavigate(); // Get the navigate function

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;

  const [purchaseProductsData, setPurchaseProductsData] = useState([]);

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
    id ? useUpdatePurchaseReturnsMutation : useCreatePurchaseReturnsMutation
  );

  const supplier_id = watch("supplier_id");
  const purchase_id = watch("purchase_id");
  const account_id = watch("account_id");

  const { data: suppliers } = useGetSuppliersQuery({
    store_id: store_id,
  });

  const { data: products } = useGetProductsQuery({ store_id });
  const { data: purchases } = useGetPurchasesBySupplierQuery({ supplier_id });
  const { data: purchaseProducts } = useGetPurchasesProductsQuery({ purchase_id });

  const { data: purchase } = useGetPurchasesByIdQuery(purchase_id);

  const { data: accounts, isLoading: isLoadingAccounts, isError: isErrorAccounts, error: errorAccounts } = useGetAccountsQuery({ store_id: auth.store_id });


  const available_balance = useGetAvailableBalanceByAccountQuery({
    account_id: account_id,
  })

  const branch = localStorage.getItem("branch_id");
  useEffect(() => {
    if (branch) {
      const parsedData = JSON.parse(branch);
      setBranchId(parsedData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, [branch]);


  useEffect(() => {
    const productsData = purchaseProducts?.data?.map((item) => ({
      quantity: 0,
      product_id: item?.product?.id,
    }));
    setPurchaseProductsData(productsData);
  }, [purchaseProducts]);

  useEffect(() => {
    reset({
      ...data,
    });
  }, [data, reset]);

  const updateQuantity = (index, value, product_id) => {
    setPurchaseProductsData((prev) => {
      const updatedProducts = [...prev];
      const product = { ...updatedProducts[index] }; // deep clone of product
      const newQuantity = product.quantity + value;
  
      if (newQuantity >= 0) {
        product.quantity = newQuantity;
        updatedProducts[index] = product;
      }
  
      return updatedProducts;
    });
  };
  
  const totalPurchaseValue = useMemo(() => {
    if (!purchaseProducts?.data) return 0;

    const totalPurchaseProductsValue = purchaseProducts?.data?.reduce((sum, item) => {
      return sum + item.purchase_price * item.quantity;
    }, 0);
    const transport = purchase?.data?.transport || 0;
    const discount = purchase?.data?.discount || 0;
    const total_tax = purchase?.data?.total_tax || 0;

    const totalPurchaseValue = totalPurchaseProductsValue + transport  - discount + total_tax;

    return totalPurchaseValue;
  }, [purchaseProducts, purchase]);


  const total_return = purchaseProductsData?.reduce((acc, item) => {
    const product = purchaseProducts?.data?.products?.find(product => product?.product?.id === item?.product_id);
    return acc + ((product?.unit_cost || 0) * (item?.quantity || 0));

  }, 0);

  const totalPayment = useMemo(() => {
    if (!purchase?.data?.purchase_payments) return 0;

    return purchase?.data?.purchase_payments.reduce((sum, payment) => {
      return sum + (payment?.account_transaction?.amount || 0);
    }, 0);
  }, [purchase]);

  console.log("totalPayment", totalPayment);

  useEffect(() => {
    if (data) {
      setPurchaseProductsData(data?.purchase_return_products?.map(item => ({
        quantity: item?.quantity,
        product_id: item?.product_id,
      })));
    }
  }, [data]);

  const handleFormSubmit = async (data) => {

    const newDate = new Date(data.date).toISOString();
    data.date = newDate;

    delete data.supplier_id;
    delete data.products;
    delete data.total_paid;
    delete data.total_tax;
    delete data.transport;
    delete data.purchase_due;
    data.branch_id = branchId;
    data.purchase_id = purchase_id;
    data.total_return = total_return;


    data.products = purchaseProductsData;
    data.payment = {
      cheque_no: data.cheque_no,
      receipt_no: data.receipt_no,
      transaction_date: newDate,
      account_id: account_id,
    }
    console.log("Form data: ", data);
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
          <div className="grid grid-cols-2 gap-5">
            <TextInput
              name="reason"
              label="Return Reason"
              type="text"
              register={register}
              error={errors.reason}
              required={true}
              placeholder="Enter Return Reason"
            />
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
          </div>


          {/* <CustomReactSelect
            control={control}
            name="products"
            label="Products"
            placeholder="Select Products"
            isMulti={true}
            options={
              products?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
            required={true}
          // error={errors.section_type}
          /> */}
          {
            supplier_id && <CustomReactSelect
              control={control}
              name="purchase_id"
              label="Purchase"
              placeholder="Select Purchase"
              // isMulti={true}
              options={
                purchases?.data?.map((item) => ({
                  value: item.id,
                  label: item.purchase_no,
                })) || []
              }
              required={true}
            // error={errors.section_type}
            />
          }


          {
            purchase_id && purchaseProducts?.data?.length > 0 ? <PurchaseReturnTable
              allProducts={purchaseProducts}
              updateQuantity={updateQuantity}
              purchaseReturnProducts={purchaseProducts?.data}
              purchaseProductsData={purchaseProductsData}
              purchase={purchase?.data}
            /> : null
          }

          <div className="grid grid-cols-3 gap-5">
            {
              purchase_id && (
                <>
                  <TextInput
                    name="discount"
                    label="Total Discount"
                    type="text"
                    register={register}
                    value={purchase?.data?.discounted_amount}
                    defaultValue={purchase?.data?.discounted_amount}
                    readOnly
                  />
                  <TextInput
                    name="transport"
                    label="Transport Cost"
                    type="text"
                    register={register}
                    value={purchase?.data?.transport}
                    defaultValue={purchase?.data?.transport}
                    readOnly
                  />
                  <TextInput
                    name="total_tax"
                    label="Invoice Tax"
                    type="text"
                    register={register}
                    value={purchase?.data?.total_tax}
                    defaultValue={purchase?.data?.total_tax}
                    readOnly
                  />
                </>
              )
            }
            <TextInput
              name="purchase_total"
              label="Purchase Total"
              type="text"
              register={register}
              value={totalPurchaseValue?.toFixed(2) || 0}
              defaultValue={totalPurchaseValue?.toFixed(2) || 0}
              readOnly
            />
            <TextInput
              name="total_paid"
              label="Total Paid"
              type="text"
              register={register}
              value={totalPayment?.toFixed(2) || 0}
              defaultValue={totalPayment?.toFixed(2) || 0}
              readOnly
            />
            <TextInput
              name="purchase_due"
              label="Purchase Due"
              type="text"
              register={register}
              defaultValue={(totalPurchaseValue - totalPayment)?.toFixed(2) || 0}
              value={(totalPurchaseValue - totalPayment)?.toFixed(2) || 0}

              readOnly
            />

          </div>

          <div className="grid grid-cols-4 gap-5">
            {
              purchaseProductsData?.find(product => product.quantity > 0) && (
                <>
                  <CustomReactSelect
                    control={control}
                    error={errors?.account_id}
                    name="account_id"
                    label="Account"
                    placeholder="Select Account"
                    required={true}
                    options={
                      accounts?.data?.map((item) => ({
                        value: item.id,
                        label: item.bank_name,
                      })) || []
                    }
                    isLoading={isLoadingAccounts}
                  />
                  <TextInput
                    name="available_balance"
                    label="Available Balance"
                    type="text"
                    register={register}
                    value={available_balance?.data?.data?.available_balance}
                    defaultValue={available_balance?.data?.data?.available_balance}
                  />
                  <TextInput
                    name="cheque_no"
                    label="Cheque No"
                    type="text"
                    register={register}
                    error={errors.cheque_no}
                    required={true}
                    placeholder="Enter  Cheque No"
                  />

                  <TextInput
                    name="receipt_no"
                    label=" Receipt No"
                    type="text"
                    register={register}
                    error={errors.receipt_no}
                    required={true}
                    placeholder="Enter  Receipt No"
                  />
                </>
              )
            }
          </div>

          <TextInput
            name="note"
            label="note"
            type="text"
            register={register}
            error={errors.note}
            required={true}
            placeholder="Enter note"
          />
          <TextInput
            name="date"
            label="Return Date"
            type="datetime-local"
            register={register}
            error={errors.date}
            required={true}
            placeholder="Enter Return Date"
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

export default PurchaseReturnForm;
