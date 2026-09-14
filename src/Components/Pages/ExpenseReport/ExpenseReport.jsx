import React, { useRef } from "react";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useForm } from "react-hook-form";
import TextInput from "../../Shared/TextInput/TextInput";
import { useGetCategoriesByIdQuery, useGetCategoriesQuery } from "../../../store/api/app/Category/categoryApiSlice";
import { useSelector } from "react-redux";
import { useGetSubCategoriesQuery } from "../../../store/api/app/SubCategory/subCategoryApiSlice";
import { useGetExpenseReportQuery } from "../../../store/api/app/Report/reportApiSlice";
import ReactToPrint from "react-to-print";
import { AiFillPrinter } from "react-icons/ai";
import { useGetStoreCurrenciesQuery } from "../../../store/api/app/Currency/currenciesApiSlice";
import { useGetExpenseCategoryQuery } from "../../../store/api/app/ExpenseCategory/expenseCategoriesApiSlice";
import { useGetExpenseSubCategoryQuery } from "../../../store/api/app/ExpenseSubCategory/expenseSubCategoriesApiSlice";
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";

const ExpenseReport = () => {
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const componentRef = useRef(null);
  const {data: storeCurrency} = useGetStoreCurrenciesQuery();

  const { data: storeData } = useGetStoresByIdQuery(store_id);
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
  } = useForm();

  const categoryID = watch('categoryID');
  const subCategoryID = watch('subCategoryID');
  const fromDate = watch('fromDate');
  const toDate = watch('toDate');

  const { data: categories, isLoading: plansIsLoading, isError: plansIsError, error: plansError } = useGetExpenseCategoryQuery({
    store_id: store_id,
  });
  const { data: subCategories } = useGetExpenseSubCategoryQuery({
    store_id: store_id,
    category_id: categoryID,
  });

  const { data: category } = useGetCategoriesByIdQuery(categoryID);

  const { data: expenseReport } = useGetExpenseReportQuery({
    categoryID: categoryID,
    subCategoryID: subCategoryID,
    fromDate: fromDate ? new Date(fromDate).toISOString() : undefined,  // Ensure fromDate is a Date object
    toDate: toDate ? new Date(toDate).toISOString() : undefined,  // Same for toDate
  })

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-GB', options);

    // Add suffix to the day (st, nd, rd, th)
    const day = new Date(date).getDate();
    const suffix = (day % 10 === 1 && day !== 11) ? 'st' : (day % 10 === 2 && day !== 12) ? 'nd' : (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

    return formattedDate.replace(day, `${day}${suffix}`);
  };

  const calculateAmount = expenseReport?.data?.reduce((total, item) => {
    return total + (item.amount || 0);
  }, 0);



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        {/* Dropdowns */}
        <h2 className="text-3xl font-bold text-center mb-6">Expense Report</h2>

        <div className="grid grid-cols-2 gap-5">
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
            required={true}
          // error={errors.section_type}
          />
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
            required={true}
          // error={errors.section_type}
          />
          <TextInput
            name="fromDate"
            label="From Date"
            type="datetime-local"
            register={register}
            // error={errors.from_date}
            required={true}
            placeholder="Enter From Date"
          />
          <TextInput
            name="toDate"
            label="To Date"
            type="datetime-local"
            register={register}
            // error={errors.to_date}
            required={true}
            placeholder="Enter To Date"
          />
        </div>
        {/* <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Generate Report
          </button>
        </div> */}

        {/* Report Header */}
        <div ref={componentRef} className="px-4 py-4">
          <div className="flex justify-between border-b pb-4 mt-8">
            <div>
              <h2 className="text-2xl font-bold">{storeData?.data?.store}</h2>
              <p>Phone: {storeData?.data?.phone}</p>
              <p>Email: {storeData?.data?.email}</p>
              <p>
                Address: {storeData?.data?.address}
              </p>
            </div>
            <div>
              <h3>Expense Report</h3>
              <p><span className="text-bold">Date:</span> {new Date().toLocaleDateString()}</p>
              <p><span className="text-bold">Category: </span>{category?.data?.name}</p>
              <p><span className="text-bold">Date Range: </span>{formatDate(fromDate)} - {formatDate(toDate)}</p>
            </div>
          </div>

          {/* Data Table */}
          {
            expenseReport?.data?.length ? <div className="overflow-x-auto mt-6">

              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Expense Reason</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Sub Category</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Account</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Created By</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    expenseReport?.data?.map(report => (
                      <tr className="odd:bg-gray-100 even:bg-white">
                        <td className="border border-gray-300 px-4 py-2">1</td>
                        <td className="border border-gray-300 px-4 py-2">{report?.date}</td>
                        <td className="border border-gray-300 px-4 py-2">{report?.reason}</td>
                        <td className="border border-gray-300 px-4 py-2">{report?.subCategory?.category?.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{report?.subCategory?.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{report?.amount}</td>
                        <td className="border border-gray-300 px-4 py-2 text-green-500 font-bold">{report?.transaction?.account?.name}</td>
                        <td className="border border-gray-300 px-4 py-2 text-green-500 font-bold">{report?.user?.name}</td>
                      </tr>
                    ))
                  }

                </tbody>
                <tfoot>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold" colSpan="5">Total</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-green-500" colSpan="4">{storeCurrency?.data?.currency?.symbol}{calculateAmount}</td>
                  </tr>
                </tfoot>
              </table>

            </div>
              : (
                <p className="font-bold text-center mt-6 text-3xl">No Data found</p>
              )
          }
        </div>

        {/* Print Button */}
        {
          expenseReport?.data?.length && <div className="mt-4 flex justify-end">
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
        }


      </div>
    </div>
  );
};

export default ExpenseReport;
