import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import {
  useCreateAccountsMutation,
  useGetAccountsQuery,
  useUpdateAccountsMutation,
} from "../../../store/api/app/Account/accountApiSlice";
import { useGetSuppliersQuery } from "../../../store/api/app/Suppliers/suppliersApiSlice";
import { useSelector } from "react-redux";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useGetProductsQuery } from "../../../store/api/app/Products/productsApiSlice";
import ProductsTable from "../../Shared/Tables/ProductsTable";
import { useGetClientsByPaginationQuery, useGetClientsQuery } from "../../../store/api/app/Client/clientApiSlice";
import { useGetTaxsQuery } from "../../../store/api/app/Tax/taxApiSlice";
import {
  useCreateStockProductsMutation,
  useGetStockProductsQuery,
  useUpdateStockProductsMutation,
} from "../../../store/api/app/StockProduct/stockProductApiSlice";
import { useGetBranchesQuery } from "../../../store/api/app/Branch/branchApiSlice";
import StockProductTable from "../../Shared/Tables/StockProductTable";
import {
  useCreateInvoicesMutation,
  useGetInvoiceProductListQuery,
  useUpdateInvoicesMutation,
} from "../../../store/api/app/InvoiceList/invoiceListApiSlice";

const InvoiceListForm = ({ id, data }) => {
  const [productsList, setProductsList] = useState([]);

  const navigate = useNavigate(); // Get the navigate function
  const { register, unregister, control, errors, reset, handleSubmit, onSubmit, setValue, watch, isLoading } = useSubmit(
    id,
    id ? useUpdateInvoicesMutation : useCreateInvoicesMutation
  );

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;

  const { data: clients } = useGetClientsQuery({
    store_id: store_id,
  });
  const { data: taxs } = useGetTaxsQuery({
    store_id: store_id,
  });
  const { data: accounts } = useGetAccountsQuery({
    store_id: store_id,
  });
  const { data: products } = useGetStockProductsQuery({
    store_id: store_id,
  });
  const { data: invoiceProductList } = useGetInvoiceProductListQuery({
    invoice_id: id,
  });
  const { data: branch } = useGetBranchesQuery({
    store_id: store_id,
  });

  console.log("invoiceProductList", invoiceProductList);

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
      setValue("products", invoiceProductList?.data?.products?.map((product) => product?.product_id) || []);
    }
  }, [id, invoiceProductList]);

  const removeProduct = async (productId) => {
    const updatedProducts = selectedProducts?.filter((id) => id !== productId);
    setValue("products", updatedProducts); // Update the products field with the new array

    // Remove product from productsList
    const updatedProductsList = productsList?.filter((product) => product.product_id !== productId);
    setProductsList(updatedProductsList);

    await deleteQuotationProducts(productId).unwrap();
  };

  const handleProductsChange = useCallback((product) => {
    setProductsList(product);
  }, []);

  const calculateNetTotals = () => {
    return productsList.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  };

  const discount_type = watch("discount_type");
  const discount = watch("discount");
  const transport = watch("transport");
  const client = watch("client_id");
  const branch_id = watch("branch_id");
  const tax_id = watch("tax_id");
  const account_id = watch("account_id");

  const getAllCalculations = { totalPrice: 0, totalTax: 0, netTotal: 0 };
  const totalPrice = () => {
    if (selectedProducts.length <= 0) {
      return getAllCalculations;
    }

    // Reset calculations
    getAllCalculations.totalPrice = 0;
    getAllCalculations.netTotal = 0;
    getAllCalculations.totalTax = 0;

    productsList?.forEach((product) => {
      const price = product.sale_price * product.quantity;
      getAllCalculations.totalPrice += price;
    });

    // Initialize netTotal with totalPrice
    getAllCalculations.netTotal = getAllCalculations.totalPrice;

    // Apply discount
    if (discount && discount_type === "FLAT") {
      getAllCalculations.netTotal -= parseFloat(discount);
    } else if (discount && discount_type === "PERCENTAGE") {
      const discountTotal = (getAllCalculations.totalPrice * parseFloat(discount)) / 100;
      getAllCalculations.netTotal -= discountTotal;
    }

    // Apply transport cost
    if (transport) {
      getAllCalculations.netTotal += parseFloat(transport);
    }

    // Apply tax
    if (tax_id) {
      const taxDetail = taxs?.data?.find((taxId) => taxId?.id === tax_id);
      if (taxDetail) {
        const totalTax = (getAllCalculations.totalPrice * taxDetail.rate) / 100;
        getAllCalculations.totalTax = totalTax;
        getAllCalculations.netTotal += totalTax; // Add tax to netTotal
      }
    }
  };

  totalPrice();

  //   if (discount_type === "FLAT") {
  //
  //     setValue("net_total", calculateNetTotals() - discount + transport);
  //   }
  // }, [discount, discount_type]);
  //payment options
  const paymentOptions = watch("payment_options");
  const addPaymentOptions = [
    { value: true, label: "YES" },
    { value: false, label: "NO" },
  ];
  const handleFormSubmit = async (data) => {
    const invoiceData = {
      reference: data?.reference,
      transport: parseInt(data?.transport),
      discount_type: data?.discount_type, // Options: PERCENTAGE, FLAT
      discount: parseInt(data?.discount),
      po_reference: data?.po_reference,
      payment_terms: data?.payment_terms,
      delivery_place: data?.delivery_place,
      invoice_date: new Date(`${data?.invoice_date}:00Z`).toISOString(),
      note: data?.note,
      client_id: data?.client_id,
      tax_id: data?.tax_id,
      branch_id: branch_id,
      products: productsList,
      ...(paymentOptions && {
        payment: {
          amount: parseInt(data?.paid_amount),
          cheque_no: data?.cheque_no,
          receipt_no: data?.receipt_no,
          transaction_date: new Date(`${data?.invoice_date}:00Z`).toISOString(),
          account_id: data?.account_id,
        },
      }),
    };

    // Combine form data with products list

    await onSubmit(invoiceData);
  };

  useEffect(() => {
    reset({
      ...data,
    });
  }, [data, reset]);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
          e.preventDefault(); // Prevent form submission on Enter
        }
      }}
    >
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex-1">
            <CustomReactSelect
              control={control}
              name="branch_id"
              label="Branch"
              placeholder="Select Branch"
              options={
                branch?.data?.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              required={true}
            // error={errors.section_type}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
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
            </div>
            <div className="flex-1">
              <TextInput
                name="reference"
                label="Reference"
                type="text"
                register={register}
                error={errors.reference}
                placeholder="Enter Reference"
              />
            </div>
          </div>
          {client && (
            <CustomReactSelect
              control={control}
              name="products"
              label="Products"
              placeholder="Select Products"
              isMulti={true}
              options={
                products?.data?.map((item) => ({
                  value: item.product.id,
                  label: item.product.name,
                })) || []
              }
              required={true}
            // error={errors.section_type}
            />
          )}

          {selectedProducts?.length > 0 && (
            <StockProductTable
              selectedProductIds={selectedProducts}
              allProducts={products}
              onChange={handleProductsChange}
              removeProduct={removeProduct}
              invoice={true}
              invoiceProductList={id ? invoiceProductList?.data?.products : undefined}
              id={id}
            />
          )}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <div className="flex-2">
              <CustomReactSelect
                control={control}
                name="discount_type"
                label="discount_type"
                placeholder="Select discount_type"
                options={options}
              // error={errors.section_type}
              />
            </div>

            <div className="flex-1">
              <TextInput
                name="discount"
                label="Discount"
                type="number"
                register={register}
                error={errors.discount}
                placeholder="Enter Discount"
              />
            </div>

            <div className="flex-1">
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <TextInput
              name="transport"
              label="Transport Cost"
              type="number"
              register={register}
              error={errors.transport}
              placeholder="Enter transport cost"
            />
            <div className="flex-2">
              <CustomReactSelect
                control={control}
                name="tax_id"
                label="Invoice Tax"
                placeholder="Select Invoice tax"
                options={
                  taxs?.data?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  })) || []
                }
                required={true}
              // error={errors.section_type}
              />
            </div>

            <div className="flex-1">
              <TextInput
                name="total_tax"
                label="Total Tax "
                type="text"
                value={getAllCalculations.totalTax}
                register={register}
                error={errors.total_tax}
                readonly="readonly"
                placeholder=""
              />
            </div>

            <div className="flex-1">
              <TextInput
                name="net_total"
                label="Net Total"
                type="text"
                register={register}
                error={errors.net_total}
                value={getAllCalculations.netTotal}
                placeholder="Enter Net Total"
                readonly="readonly"
                className={"mb-2"}
              />
            </div>
          </div>
          <div className="md:flex mb-1 gap-2">
            <div className="flex-1">
              <TextInput
                name="po_reference"
                label="PO Reference"
                type="text"
                register={register}
                error={errors.po_reference}
                placeholder="Enter PO Reference"
              />
            </div>
            <div className="flex-1">
              <TextInput
                name="payment_terms"
                label="Payment Terms"
                type="text"
                register={register}
                error={errors.payment_terms}
                placeholder="Enter Payment Terms"
              />
            </div>
            <div className="flex-1">
              <CustomReactSelect
                control={control}
                name="payment_options"
                label="Add Payment?"
                placeholder="Select Payment Type"
                options={addPaymentOptions}
                error={errors.payment_options}
              />
            </div>
          </div>
          {paymentOptions && (
            <div className="md:flex gap-2 mb-1">
              <div className="flex-1">
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
                  required={true}
                // error={errors.section_type}
                />
              </div>

              <div className="flex-1">
                <TextInput
                  name="paid_amount"
                  label="Paid Amount*"
                  type="number"
                  register={register}
                  error={errors.amount}
                  placeholder="Enter Paid Amount*"
                  className={"mb-2"}
                  required={true}
                />
              </div>

              <div className="flex-1">
                <TextInput
                  name="cheque_no"
                  label="Cheque No"
                  type="text"
                  register={register}
                  error={errors.cheque_no}
                  placeholder="Enter Cheque No"
                  className={"mb-2"}
                />
              </div>
              <div className="flex-1">
                <TextInput
                  name="receipt_no"
                  label="Receipt No"
                  type="text"
                  register={register}
                  error={errors.receipt_no}
                  placeholder="Enter Receipt No"
                  className={"mb-2"}
                />
              </div>
            </div>
          )}

          <div className="md:flex mb-1 gap-2">
            {/* <TextInput
              name="delivery_place"
              label="Delivery Place"
              type="text"
              register={register}
              error={errors.delivery_place}
              placeholder="Enter Delivery Place"
            /> */}
            <TextInput name="invoice_date" label="Date" type="datetime-local" register={register} error={errors.invoice_date} />
          </div>

          <div>
            <TextInput name="note" label="Note" type="text" register={register} error={errors.note} placeholder="Enter Note" />
          </div>
        </div>

        <div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse mt-6">
          <Button
            type="button"
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

export default InvoiceListForm;
