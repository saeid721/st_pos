import React, { useEffect, useState } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateCategoriesMutation, useUpdateCategoriesMutation } from "../../../store/api/app/Category/categoryApiSlice";
import { useSelector } from "react-redux";
import { useGetClientsQuery } from "../../../store/api/app/Client/clientApiSlice";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useGetProductsQuery } from "../../../store/api/app/Products/productsApiSlice";
import { useGetInvoiceProductListQuery, useGetInvoicesByClientQuery, useGetInvoicesQuery, useGetInvoiceSummaryByInvoiceIdQuery } from "../../../store/api/app/InvoiceList/invoiceListApiSlice";
import InvoiceReturnTableBody from "../../Shared/Tables/InvoiceReturnTableBody";
import InvoiceReturnTable from "../../Shared/Tables/InvoiceReturnTable";
import { useGetAccountsQuery, useGetAvailableBalanceByAccountQuery } from "../../../store/api/app/Account/accountApiSlice";
import { useCreateInvoiceReturnsMutation, useUpdateInvoiceReturnsMutation } from "../../../store/api/app/InvoiceReturn/invoiceReturnApiSlice";

const InvoiceReturnForm = ({ id, data }) => {
  const [branchId, setBranchId] = useState(null);
  const navigate = useNavigate(); // Get the navigate function

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;

  const [invoiceProductsData, setInvoiceProductsData] = useState([]);

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
    id ? useUpdateInvoiceReturnsMutation : useCreateInvoiceReturnsMutation
  );

  const client_id = watch("client_id");
  const invoice_id = watch("invoice_id");

  const { data: clients } = useGetClientsQuery({
    store_id: store_id,
  });

  const { data: products } = useGetProductsQuery({ store_id });
  const { data: invoices } = useGetInvoicesByClientQuery({ store_id, client_id });
  const { data: invoiceProducts } = useGetInvoiceProductListQuery({ invoice_id });


  const { data: accounts, isLoading: isLoadingAccounts, isError: isErrorAccounts, error: errorAccounts } = useGetAccountsQuery({ store_id: auth.store_id });


  const branch = localStorage.getItem("branch_id");
  useEffect(() => {
    if (branch) {
      const parsedData = JSON.parse(branch);
      setBranchId(parsedData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, [branch]);

  const { data: invoiceSummaryByInvoiceId } = useGetInvoiceSummaryByInvoiceIdQuery(
    {
      invoice_id: invoice_id || '',
      branch_id: branchId || 1
    },
    {
      skip: !invoice_id || !branchId
    }
  );


  useEffect(() => {
    const productsData = invoiceProducts?.data?.products?.map((item) => ({
      quantity: 0,
      product_id: item?.product?.id,
    }));
    setInvoiceProductsData(productsData);
  }, [invoiceProducts]);
  // console.log("setInvoiceProductsData", invoiceProductsData);

  const account_id = watch('account_id')
  const available_balance = useGetAvailableBalanceByAccountQuery({
    account_id: account_id,
  })

  useEffect(() => {
    reset({
      ...data,
    });
  }, [data, reset]);

  const updateQuantity2 = (index, value, product_id) => {
    console.log(":: ", index, value);
    setInvoiceProductsData((prev) => {
      const updatedProducts = [...prev];
      const product = updatedProducts[index];
      const newQuantity = product.quantity + value;
      if (newQuantity >= 0) {
        product.quantity = newQuantity;
      }
      return updatedProducts;
    })
  };

  const updateQuantity = (index, value, product_id) => {
    setInvoiceProductsData((prev) => {
      const updatedProducts = [...prev];
      const product = { ...updatedProducts[index] }; 
      const newQuantity = product.quantity + value;
  
      if (newQuantity >= 0) {
        product.quantity = newQuantity;
        updatedProducts[index] = product;
      }
  
      return updatedProducts;
    });
  };
  
  const totalDiscount = invoiceProducts?.data?.products?.reduce((acc, item) => {
    return acc + item?.invoice?.discount;
  }, 0);
  const totalTax = invoiceProducts?.data?.products?.reduce((acc, item) => {
    return acc + item?.invoice?.total_tax;
  }, 0);
  const transportCost = invoiceProducts?.data?.products?.reduce((acc, item) => {
    return acc + item?.invoice?.transport;
  }, 0);
  const invoiceTotal = invoiceProducts?.data?.invoice?.sub_total + invoiceProducts?.data?.invoice?.total_tax - invoiceProducts?.data?.invoice?.discounted_amount + invoiceProducts?.data?.invoice?.transport

  const total_return = invoiceProductsData?.reduce((acc, item) => {
    const product = invoiceProducts?.data?.products?.find(product => product?.product?.id === item?.product_id);
    console.log('Product', product);
    console.log('item', item);
    return acc + ((product?.unit_cost || 0) * (item?.quantity || 0));

  }, 0);
  console.log("total_return", total_return);

  const handleFormSubmit = async (data) => {

    const newDate = new Date(data.date).toISOString();
    data.date = newDate;

    delete data.available_balance;
    delete data.client_id;
    delete data.products;
    delete data.invoice_total;
    delete data.receipt_no;
    delete data.total_paid;
    delete data.total_tax;
    delete data.transport;
    delete data.total_return;
    data.branch_id = branchId;
    data.invoice_id = invoice_id;
    data.total_return = total_return;
    

    data.products = invoiceProductsData;
    data.payment = {
      cheque_no: data.cheque_no,
      receipt_no: data.receipt_no,
      // transaction_date: new Date(data.transaction_date).toISOString(),
      account_id: account_id,
    }
    console.log("Form data: ", data);
    await onSubmit(data);
  };




  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">
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
            client_id && <CustomReactSelect
              control={control}
              name="invoice_id"
              label="Invoice"
              placeholder="Select Invoice"
              // isMulti={true}
              options={
                invoices?.data?.map((item) => ({
                  value: item.id,
                  label: item.invoice_no,
                })) || []
              }
              required={true}
            // error={errors.section_type}
            />
          }


          {
            invoice_id && invoiceProducts?.data?.products?.length > 0 ? <InvoiceReturnTable
              allProducts={invoiceProducts}
              updateQuantity={updateQuantity}
              invoiceReturnProducts={invoiceProducts?.data?.products}
              invoiceProductsData={invoiceProductsData}
              invoice={invoiceProducts?.data?.invoice}
            /> : null
          }

          <div className="grid grid-cols-3 gap-5">
            {
              invoice_id && (
                <>
                  <TextInput
                    name="discount"
                    label="Total Discount"
                    type="text"
                    register={register}
                    value={invoiceProducts?.data?.invoice?.discounted_amount}
                    defaultValue={invoiceProducts?.data?.invoice?.discounted_amount}
                  />
                  <TextInput
                    name="transport"
                    label="Transport Cost"
                    type="text"
                    register={register}
                    value={invoiceProducts?.data?.invoice?.transport}
                    defaultValue={invoiceProducts?.data?.invoice?.transport}
                  />
                  <TextInput
                    name="total_tax"
                    label="Invoice Tax"
                    type="text"
                    register={register}
                    value={invoiceProducts?.data?.invoice?.total_tax}
                    defaultValue={invoiceProducts?.data?.invoice?.total_tax}
                  />
                </>
              )
            }
            <TextInput
              name="invoice_total"
              label="Invoice Total"
              type="text"
              register={register}
              value={invoiceTotal?.toFixed(2) || 0}
              defaultValue={invoiceTotal?.toFixed(2) || 0}
            />
            <TextInput
              name="total_paid"
              label="Total Paid"
              type="text"
              register={register}
              value={invoiceSummaryByInvoiceId?.data?.total_paid_amount}
              defaultValue={invoiceSummaryByInvoiceId?.data?.total_paid_amount}
            />
            <TextInput
              name="total_return"
              label="New Due"
              type="text"
              register={register}
              defaultValue={invoiceTotal && invoiceTotal - invoiceSummaryByInvoiceId?.data?.total_paid_amount}
              value={invoiceTotal && invoiceTotal - invoiceSummaryByInvoiceId?.data?.total_paid_amount}

              readOnly
            />

          </div>


          <div className="grid grid-cols-4 gap-5">
            {
              invoiceProductsData?.find(product => product.quantity > 0) && (
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

export default InvoiceReturnForm;
