import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateAccountsMutation, useUpdateAccountsMutation } from "../../../store/api/app/Account/accountApiSlice";
import { useGetSuppliersQuery } from "../../../store/api/app/Suppliers/suppliersApiSlice";
import { useSelector } from "react-redux";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useGetProductsQuery } from "../../../store/api/app/Products/productsApiSlice";
import ProductsTable from "../../Shared/Tables/ProductsTable";
import { useGetClientsByPaginationQuery, useGetClientsQuery } from "../../../store/api/app/Client/clientApiSlice";
import { useGetTaxsByIdQuery, useGetTaxsQuery } from "../../../store/api/app/Tax/taxApiSlice";
import { useCreateQuotationsMutation, useDeleteQuotationsProductMutation, useGetQuotationListProductsQuery, useUpdateQuotationsMutation } from "../../../store/api/app/QuotationList/quotationListApiSlice";
import { useGetBranchesQuery } from "../../../store/api/app/Branch/branchApiSlice";
import { useGetPurchasesProductsQuery } from "../../../store/api/app/Purchases/purchasesApiSlice";

const QuotationListForm = ({ id, data }) => {
  const [productsList, setProductsList] = useState([]);


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
    id ? useUpdateQuotationsMutation : useCreateQuotationsMutation
  );
  const [deleteQuotationProducts] = useDeleteQuotationsProductMutation();

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;

  const { data: clients } = useGetClientsQuery({
    store_id: store_id,
  });
  const { data: branches } = useGetBranchesQuery({
    store_id: store_id,
  });
  const { data: taxs } = useGetTaxsQuery({
    store_id: store_id,
  });
  const { data: products } = useGetProductsQuery({
    store_id: store_id,
  });

  const { data: quotationProducts } = useGetQuotationListProductsQuery({
    quotation_id: id,
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


  const selectedProducts = useMemo(() => {
    return watch("products") || [];
  }, [watch("products")]);

  useEffect(() => {
    if (id) {
      setValue(
        "products",
        quotationProducts?.data?.map(product => product?.product_id) || []
      );
    }
  }, [id, quotationProducts, setValue]);


  const removeProduct = async(productId) => {
    const updatedProducts = selectedProducts?.filter(
      (id) => id !== productId
    );
    setValue("products", updatedProducts); // Update the products field with the new array

    // Remove product from productsList
    const updatedProductsList = productsList?.filter((product) => product.product_id !== productId);
    setProductsList(updatedProductsList);

    await deleteQuotationProducts(productId).unwrap();
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

  const { data: tax } = useGetTaxsByIdQuery(tax_id);

  const calculateTotalTax = useCallback(() => {
    const subtotal = calculateSubTotals();
    const taxRate = tax?.data?.rate || 0; // Assuming 'rate' is the correct field for tax percentage.
    const discountAmount = discount_type === 'FLAT' ? parseFloat(discount) : subtotal * (discount / 100) || 0;
    const newSubTotal = calculateSubTotals() - discountAmount;
    return subtotal * (taxRate / 100);
  }, [tax, calculateSubTotals]);

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
    setValue('net_total', calculateNetTotals());
  }, [calculateNetTotals, setValue]);

  const handleFormSubmit = async (data) => {
    // Combine form data with products list
    const newDate = new Date(data.quotation_date).toISOString();
    data.quotation_date = newDate;
    data.transport = parseFloat(transport);
    data.discount = parseFloat(discount);

    const formattedArray = productsList?.map(item => ({
      quantity: item.quantity,
      sale_price: item.price,
      product_id: item.product_id
    }));

    const { net_total, total_tax, ...newData } = data

    const submitData = {
      ...newData,
      products: formattedArray
    };
    await onSubmit(submitData);
  };


  useEffect(() => {
    if (data || quotationProducts) {
      reset({
        ...data,
        products: quotationProducts?.data?.map(product => product?.product_id) || [],
      });
    }
  }, [data, quotationProducts, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-2 gap-5">
          <CustomReactSelect
            control={control}
            name="branch_id"
            label="Branch"
            placeholder="Select Branch"
            options={
              branches?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
            required={true}
          // error={errors.section_type}
          />
          <CustomReactSelect
            control={control}
            name="client_id"
            label="Client"
            placeholder="Select Client"
            options={
              clients?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
            required={true}
          // error={errors.section_type}
          />
          <TextInput
            name="reference"
            label="Reference"
            type="text"
            register={register}
            error={errors.reference}
            // required={true}
            placeholder="Enter Reference"
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
          {
            selectedProducts?.length > 0 && <ProductsTable
              selectedProductIds={selectedProducts}
              allProducts={products}
              onChange={handleProductsChange}
              removeProduct={removeProduct}
              quotation={true}
              quotationProducts={quotationProducts?.data}
              id={id}
            />
          }
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
            // required={true}
            placeholder="Enter transport cost"
          />
          <CustomReactSelect
            control={control}
            name="tax_id"
            label="Quotation Tax"
            placeholder="Select Quotation tax"
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
            name="total_tax"
            label="Total Tax "
            type="number"
            register={register}
            error={errors.total_tax}
            required={true}
            value={calculateTotalTax().toFixed(2)}
            placeholder="Enter Total Tax"
          />

          <TextInput
            name="net_total"
            label="Net Total"
            type="text"
            register={register}
            error={errors.net_total}
            value={calculateNetTotals()}
            // required={true}
            placeholder="Enter Net Total"
          />
          <TextInput
            name="delivery_place"
            label="Delivery Place"
            type="text"
            register={register}
            error={errors.delivery_place}
            // required={true}
            placeholder="Enter Delivery Place"
          />
          <TextInput
            name="po_reference"
            label="po_reference"
            type="text"
            register={register}
            error={errors.po_reference}
            // required={true}
            placeholder="Enter po_reference"
          />
          <TextInput
            name="payment_terms"
            label="payment_terms"
            type="text"
            register={register}
            error={errors.payment_terms}
            // required={true}
            placeholder="Enter payment_terms"
          />
          <TextInput
            name="quotation_date"
            label="Quotation Date"
            type="datetime-local"
            register={register}
            error={errors.quotation_date}
            required={true}
            placeholder="Enter Quotation Date"
          />
          <TextInput
            name="note"
            label="Note"
            type="text"
            register={register}
            error={errors.note}
            // required={true}
            placeholder="Enter note"
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

export default QuotationListForm;
