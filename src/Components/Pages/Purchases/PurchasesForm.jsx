import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateAccountsMutation, useGetAccountsQuery, useGetAvailableBalanceByAccountQuery, useUpdateAccountsMutation } from "../../../store/api/app/Account/accountApiSlice";
import { useGetSuppliersQuery } from "../../../store/api/app/Suppliers/suppliersApiSlice";
import { useSelector } from "react-redux";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useGetProductsQuery } from "../../../store/api/app/Products/productsApiSlice";
import ProductsTable from "../../Shared/Tables/ProductsTable";
import { useGetTaxsByIdQuery, useGetTaxsQuery } from "../../../store/api/app/Tax/taxApiSlice";
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useCreatePurchasesMutation, useGetPurchasesProductsQuery, useUpdatePurchasesMutation } from "../../../store/api/app/Purchases/purchasesApiSlice";

const PurchasesForm = ({ id, data }) => {
  const [productsList, setProductsList] = useState([]);
  const [branchId, setBranchId] = useState(null);


  const navigate = useNavigate(); // Get the navigate function
  const {
    register,
    unregister,
    control,
    errors,
    reset,
    handleSubmit,
    onSubmit,
    setValue,
    watch,
    isLoading,
  } = useSubmit(
    id,
    id ? useUpdatePurchasesMutation : useCreatePurchasesMutation
  );

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;

  const { data: suppliers } = useGetSuppliersQuery({
    store_id: store_id,
  });
  const { data: taxs } = useGetTaxsQuery({
    store_id: store_id,
  });
  const { data: products } = useGetProductsQuery({
    store_id: store_id,
  });
  const { data: accounts } = useGetAccountsQuery({
    store_id: store_id,
  });

  const account_id = watch('account_id')
  const { data: accountBalance, isFetching, error } = useGetAvailableBalanceByAccountQuery(
    account_id ? { account_id } : skipToken
  );

  const { data: purchaseProducts } = useGetPurchasesProductsQuery({
    purchase_id: id,
  });

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
  const amountOptions = [
    {
      value: "ACTIVE",
      label: "ACTIVE",
    },
    {
      value: "INACTIVE",
      label: "INACTIVE",
    },
  ];


  const selectedProducts = useMemo(() => {
    return watch("products") || [];
  }, [watch("products")]);


  useEffect(() => {
    if (id) {
      setValue(
        "products",
        purchaseProducts?.data?.map(product => product?.product_id) || []
      );
    }
  }, [id, purchaseProducts, setValue]);

  const removeProduct = (productId) => {
    const updatedProducts = selectedProducts?.filter(
      (id) => id !== productId
    );
    setValue("products", updatedProducts); // Update the products field with the new array
  };

  const handleProductsChange = useCallback((products) => {
    setProductsList(products);
  }, []);

  const calculateSubTotals = useCallback(() => {
    return productsList.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [productsList]);

  const discount_type = watch('discount_type')
  const discount = watch('discount')
  const transport = watch('transport')
  const tax_id = watch('tax_id')
  const add_payment = watch('add_payment')

  const { data: tax } = useGetTaxsByIdQuery(tax_id);

  // const calculateTotalTax = useCallback(() => {
  //   const taxRate = tax?.data?.rate || 0; // Assuming 'rate' is the correct field for tax percentage.
  //   const discountAmount = discount_type === 'FLAT' ? parseFloat(discount) : calculateSubTotals() * (discount / 100) || 0;

  //   const totalAfterDiscount = calculateSubTotals() - discountAmount;
  //   return totalAfterDiscount * (taxRate / 100);
  // }, [tax, calculateSubTotals]);

  const calculateTotalTax = useCallback(() => {
    const subtotal = calculateSubTotals();
    const taxRate = tax?.data?.rate || 0;

    // Calculate discount amount based on type
    let discountAmount = 0;
    if (discount_type === 'FLAT') {
      discountAmount = parseFloat(discount || 0);
    } else if (discount_type === 'PERCENTAGE') {
      discountAmount = subtotal * (parseFloat(discount || 0) / 100);
    }

    // Calculate amount after discount
    const totalAfterDiscount = subtotal - discountAmount;

    // Calculate tax on the discounted amount
    return totalAfterDiscount * (taxRate / 100);
  }, [tax, discount_type, discount, calculateSubTotals]);

  useEffect(() => {
    setValue('total_tax', calculateTotalTax());
  }, [calculateTotalTax, setValue]);




  const calculateNetTotals = useCallback(() => {
    const subtotal = calculateSubTotals();
    const totalTax = calculateTotalTax();
    const transportCost = parseFloat(transport || 0);
    const discountAmount = discount_type === 'FLAT' ? parseFloat(discount) : subtotal * (discount / 100) || 0;


    return subtotal + totalTax + transportCost - discountAmount;
  }, [calculateSubTotals, calculateTotalTax, transport, discount]);

  useEffect(() => {
    setValue('net_total', calculateNetTotals().toFixed(2));
  }, [calculateNetTotals, setValue]);
  useEffect(() => {
    setValue('available_balance', accountBalance?.data?.available_balance);
  }, [accountBalance, setValue]);


  const branch = localStorage.getItem("branch_id");

  useEffect(() => {
    if (branch) {
      const parsedData = JSON.parse(branch);
      setBranchId(parsedData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, [branch]);

  const handleFormSubmit = async (data) => {
    const newDate = new Date(data.purchase_date).toISOString();
    data.purchase_date = newDate;
    const newPoDate = new Date(data.po_date).toISOString();
    data.po_date = newPoDate;
    if (data.transaction_date) {
      const newtransactionDate = new Date(data.transaction_date).toISOString();
      data.transaction_date = newtransactionDate;
    }

    data.transport = parseFloat(transport);
    data.discount = parseFloat(discount);
    data.branch_id = branchId;


    const formattedArray = productsList?.map(item => ({
      quantity: item.quantity,
      purchase_price: item.price,
      product_id: item.product_id
    }));

    const payment = {
      amount: parseFloat(data?.amount),
      account_id: data?.account_id,
      cheque_no: data?.cheque_no,
      receipt_no: data?.receipt_no,
      transaction_date: data?.transaction_date
    }

    const { net_total, total_tax, amount, cheque_no, receipt_no, transaction_date, account_id, available_balance, add_payment, ...newData } = data

    const submitData = {
      ...newData,
      products: formattedArray,
      ...(add_payment === 'ACTIVE' && { payment }),
    };
    await onSubmit(submitData);
  };

  useEffect(() => {
    if (data || purchaseProducts) {
      // reset({
      //   ...data,
      //   products: purchaseProducts?.data?.map(product => product?.product_id) || [],
      // });
      const { po_date, purchase_date, ...rest } = data || {};
      const formattedPoDate = po_date
        ? new Date(po_date).toISOString().split("T")[0]
        : "";
      const formattedPurchaseDate = purchase_date
        ? new Date(purchase_date).toISOString().split("T")[0]
        : "";

      reset({ ...rest, po_date: formattedPoDate, purchase_date: formattedPurchaseDate, products: purchaseProducts?.data?.map(product => product?.product_id) || [], });
    }
  }, [data, purchaseProducts, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
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
            />
          </div>

          {
            selectedProducts?.length > 0 && <ProductsTable
              selectedProductIds={selectedProducts}
              allProducts={products}
              onChange={handleProductsChange}
              removeProduct={removeProduct}
              purchase={true}
              purchaseProducts={purchaseProducts?.data}
              id={id}
            />
          }
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <TextInput
              name="po_reference"
              label="PO Reference"
              type="text"
              register={register}
              error={errors.po_reference}
              // required={true}
              placeholder="Enter PO Reference"
            />
            <TextInput
              name="payment_terms"
              label="Payment Terms"
              type="text"
              register={register}
              error={errors.payment_terms}
              // required={true}
              placeholder="Enter Payment Terms"
            />
          </div>

          {
            selectedProducts?.length > 0 && (
              <>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                  <CustomReactSelect
                    control={control}
                    name="discount_type"
                    label="discount_type"
                    placeholder="Select discount_type"
                    options={options}
                    // required={true}
                  // error={errors.section_type}
                  />

                  <TextInput
                    name="discount"
                    label="Discount"
                    type="text"
                    register={register}
                    error={errors.discount}
                    // required={true}
                    placeholder="Enter Discount"
                  />
                  <TextInput
                    name="transport"
                    label="Transport Cost"
                    type="text"
                    register={register}
                    error={errors.transport}
                    required={true}
                    placeholder="Enter transport cost"
                  />
                  <CustomReactSelect
                    control={control}
                    name="tax_id"
                    label="Tax"
                    placeholder="Select tax"
                    options={
                      taxs?.data?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      })) || []
                    }
                    required={true}
                  // error={errors.section_type}
                  />

                  <TextInput
                    name="sub_total"
                    label="Total Tax"
                    type="text"
                    register={register}
                    value={calculateTotalTax().toFixed(2)}
                    error={errors.sub_total}
                    placeholder="Enter Total Tax"
                  />
                  <TextInput
                    name="net_total"
                    label="Net Total"
                    type="text"
                    register={register}
                    error={errors.net_total}
                    value={calculateNetTotals().toFixed(2)}
                    required={true}
                    placeholder="Enter Net Total"
                  />
                </div>




                {
                  !id && <CustomReactSelect
                    control={control}
                    name="add_payment"
                    label="Add Payment?"
                    placeholder="Select Add Payment?"
                    options={amountOptions}
                    required={true}
                  // error={errors.section_type}
                  />
                }
              </>
            )
          }




          {
            add_payment == 'ACTIVE' &&
            <>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                <CustomReactSelect
                  control={control}
                  name="account_id"
                  label="Account"
                  placeholder="Select Account"
                  options={
                    accounts?.data?.map((item) => ({
                      value: item.id,
                      label: item.bank_name,
                    })) || []
                  }
                // error={errors.section_type}
                />
                <TextInput
                  name="available_balance"
                  label="Available Balance"
                  type="text"
                  register={register}
                  error={errors.available_balance}
                  value={accountBalance?.data?.available_balance || ""}
                  defaultValue={accountBalance?.data?.available_balance || ""}
                  placeholder="Enter Available Balance"
                  readOnly // Make it read-only since it's calculated/fetched
                />
                <TextInput
                  name="amount"
                  label="Total Paid"
                  type="text"
                  register={register}
                  error={errors.amount}
                  placeholder="Enter Net Total"
                />
                <TextInput
                  name="cheque_no"
                  label="Cheque No"
                  type="text"
                  register={register}
                  error={errors.cheque_no}
                  placeholder="Enter Cheque No"
                />
                <TextInput
                  name="receipt_no"
                  label="Receipt No"
                  type="text"
                  register={register}
                  error={errors.receipt_no}
                  placeholder="Enter Receipe No"
                />
                <TextInput
                  name="transaction_date"
                  label="Transaction Date"
                  type="datetime-local"
                  register={register}
                  error={errors.transaction_date}
                  placeholder="Enter Transaction Date"
                />
              </div>
            </>
          }


          <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
            <TextInput
              name="note"
              label="Note"
              type="text"
              register={register}
              error={errors.note}
              // required={true}
              placeholder="Enter note"
            />
            <TextInput
              name="purchase_date"
              label="Purchase Date"
              type="datetime-local"
              register={register}
              error={errors.purchase_date}
              required={true}
              placeholder="Enter Purchase Date"
            />
            <TextInput
              name="po_date"
              label="PO Date"
              type="datetime-local"
              register={register}
              error={errors.po_date}
              required={true}
              placeholder="Enter PO Date"
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

export default PurchasesForm;
