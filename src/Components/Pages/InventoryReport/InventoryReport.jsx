import { AiFillPrinter } from "react-icons/ai";
import React, { useRef } from "react";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useForm } from "react-hook-form";
import TextInput from "../../Shared/TextInput/TextInput";
import { useGetCategoriesByIdQuery, useGetCategoriesQuery } from "../../../store/api/app/Category/categoryApiSlice";
import { useSelector } from "react-redux";
import { useGetSubCategoriesByIdQuery, useGetSubCategoriesQuery } from "../../../store/api/app/SubCategory/subCategoryApiSlice";
import { useGetProductsByIdQuery, useGetProductsQuery } from "../../../store/api/app/Products/productsApiSlice";
import ReactToPrint from "react-to-print";
import { useGetInventoryReportQuery } from "../../../store/api/app/Report/reportApiSlice";
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";


const InventoryReport = () => {
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const componentRef = useRef(null);

  const { data: storeData } = useGetStoresByIdQuery(store_id);


  const {
    register,
    control,
    handleSubmit,
    watch
  } = useForm();

  const categoryID = watch("categoryID");
  const subCategoryID = watch("subCategoryID");
  const productID = watch("product_id");
  const fromDate = watch("fromDate");
  const toDate = watch("toDate");

  const { data: categories } = useGetCategoriesQuery({ store_id });
  const { data: subCategories } = useGetSubCategoriesQuery({
    store_id,
    category_id: categoryID
  });
  const { data: products } = useGetProductsQuery({ store_id });

  const {data: product } = useGetProductsByIdQuery(productID);
  const {data: category } = useGetCategoriesByIdQuery(categoryID);
  const {data: subCategory } = useGetSubCategoriesByIdQuery(subCategoryID);
  console.log("product", product);


  const { data: inventoryReport } = useGetInventoryReportQuery({
    product_category_id: categoryID,
    product_sub_category_id: subCategoryID,
    product_id: productID,
    fromDate: fromDate ? new Date(fromDate).toISOString() : undefined,
    toDate: toDate ? new Date(toDate).toISOString() : undefined,
  });

  console.log(inventoryReport);

  const calculateStockInAmount = inventoryReport?.data?.allProducts?.reduce((total, item) => {
    return total + (item.stockIn || 0); 
  }, 0); 

  const calculateStockOutAmount = inventoryReport?.data?.allProducts?.reduce((total, item) => {
    return total + (item.stockOut || 0); 
  }, 0); 

  const calculateAvailableStockAmount = inventoryReport?.data?.allProducts?.reduce((total, item) => {
    return total + (item.availableStock || 0); 
  }, 0); 


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        {/* Form */}
        <h2 className="text-2xl font-bold text-center mb-4">Inventory Report</h2>
        <div className="grid grid-cols-2 gap-5">
          {/* Category Dropdown */}
          <CustomReactSelect
            control={control}
            name="categoryID"
            label="Category"
            placeholder="Select Category"
            options={
              categories?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
          />

          {/* Subcategory Dropdown */}
          <CustomReactSelect
            control={control}
            name="subCategoryID"
            label="Sub Category"
            placeholder="Select Sub Category"
            options={
              subCategories?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
            isDisabled={!categoryID}
          />

          {/* Product Dropdown */}
          <CustomReactSelect
            control={control}
            name="product_id"
            label="Product Name"
            placeholder="Select Product Name"
            options={
              products?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
          />

          {/* From Date */}
          <TextInput
            name="fromDate"
            label="From Date"
            type="datetime-local"
            register={register}
            placeholder="Enter From Date"
          />

          {/* To Date */}
          <TextInput
            name="toDate"
            label="To Date"
            type="datetime-local"
            register={register}
            placeholder="Enter To Date"
          />
        </div>

        {/* Submit Button */}
        {/* <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Generate Report
            </button>
          </div> */}

        {/* Content to Print */}
        {
          inventoryReport?.data?.allProducts?.length && (
            <div ref={componentRef} className="py-4 px-4">
              <div className="flex justify-between border-b pb-4">
                <div>
                  <h2 className="text-2xl font-bold">{storeData?.data?.store}</h2>
                  <p>Phone: {storeData?.data?.phone}</p>
                  <p>Email: {storeData?.data?.email}</p>
                  <p>
                    Address: {storeData?.data?.address}
                  </p>
                  
                </div>
                <div>
                  <h3 className="text-xl font-bold">Inventory Report</h3>
                  <p>
                    <span className="font-bold">Date:</span> {new Date().toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-bold">Product Name: </span>{product?.data?.name}
                  </p>
                  <p>
                    <span className="font-bold">Category Name: </span>{category?.data?.name}
                  </p>
                  <p>
                    <span className="font-bold">Sub Category Name: </span>{subCategory?.data?.name}
                  </p>
                  <p>
                    <span className="font-bold">Date Range: </span>
                    {fromDate && toDate
                      ? `${new Date(fromDate).toLocaleDateString()} - ${new Date(toDate).toLocaleDateString()}`
                      : 'All Time'}
                  </p>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Code</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Stock In</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Stock Out</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Stock In Hand</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      inventoryReport?.data?.allProducts?.map(inventory => (
                        <tr className="odd:bg-gray-100 even:bg-white">
                          <td className="border border-gray-300 px-4 py-2">1</td>
                          <td className="border border-gray-300 px-4 py-2">{inventory?.productCode}</td>
                          <td className="border border-gray-300 px-4 py-2">{inventory?.productName}</td>
                          <td className="border border-gray-300 px-4 py-2">{inventory?.stockIn}</td>
                          <td className="border border-gray-300 px-4 py-2">{inventory?.stockOut}</td>
                          <td className="border border-gray-300 px-4 py-2">{inventory?.availableStock}</td>
                        </tr>
                      ))
                    }

                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold" colSpan="3">Total Quantity</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-green-500">{calculateStockInAmount}</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-green-500">{calculateStockOutAmount}</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-green-500">{calculateAvailableStockAmount}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )
        }


        {/* Print Button */}
        <div className="mt-4 flex justify-end">
          <ReactToPrint
            trigger={() => (
              <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2">
                <AiFillPrinter />
                Print Report
              </button>
            )}
            content={() => componentRef.current}
            documentTitle="Inventory Report"
            pageStyle="@media print { body { -webkit-print-color-adjust: exact; } }"
          />
        </div>

      </div>
    </div>
  );
};

export default InventoryReport;