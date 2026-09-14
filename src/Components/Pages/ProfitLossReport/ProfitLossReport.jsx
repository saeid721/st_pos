import React from "react";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useForm } from "react-hook-form";
import TextInput from "../../Shared/TextInput/TextInput";
import { useGetStoreCurrenciesQuery } from "../../../store/api/app/Currency/currenciesApiSlice";
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";
import { useSelector } from "react-redux";
import { useGetProfitLossReportQuery } from "../../../store/api/app/Report/reportApiSlice";

const ProfitLossReport = () => {
  const { data: storeCurrency } = useGetStoreCurrenciesQuery();
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

  const reportType = watch('reportType');
  const fromDate = watch('fromDate');
  const toDate = watch('toDate');

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const { data: storeData } = useGetStoresByIdQuery(store_id);

  const { data: profitLossReport } = useGetProfitLossReportQuery({
    reportType: reportType,
    fromDate: fromDate,
    toDate: toDate,
  })

  console.log("profitLossReport", profitLossReport?.data);
  console.log("reportType", reportType);
  console.log("fromDate", fromDate);
  console.log("toDate", toDate);


  const options = [
    { value: 0, label: "Gross Profit/loss" },
    { value: 1, label: "Net Profit/profit" },
  ]
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        {/* Dropdowns */}

        <div className="grid grid-cols-3 gap-5">
          <CustomReactSelect
            control={control}
            name="reportType"
            label="Report Type"
            placeholder="Select Report Type"
            options={options}
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

        {/* Report Header */}
        <div className="text-center border-b pb-4">
          <h2 className="font-semibold text-lg">{storeData?.data?.store}</h2>
          <p>Phone: {storeData?.data?.phone}</p>
          <p>Email: {storeData?.data?.email}</p>
          <p>
            Address: {storeData?.data?.address}
          </p>
          <h3 className="mt-2 text-lg font-semibold">
            Monthly Summary: December, 2024
          </h3>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Code</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Avg. Purchase Price</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Avg. Selling Price</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Sold Qty</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Profit / Loss</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-gray-100 even:bg-white">
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">PRO-00424</td>
                <td className="border border-gray-300 px-4 py-2">Sony AA Battery 4pcs</td>
                <td className="border border-gray-300 px-4 py-2">{storeCurrency?.data?.currency?.symbol}90.00</td>
                <td className="border border-gray-300 px-4 py-2">{storeCurrency?.data?.currency?.symbol}120.00</td>
                <td className="border border-gray-300 px-4 py-2">14</td>
                <td className="border border-gray-300 px-4 py-2 text-green-500 font-bold">420</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold" colSpan="5">Total Sales (Average)</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold" colSpan="2">{storeCurrency?.data?.currency?.symbol}32710.84</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold" colSpan="5">Total Purchase (Average)</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-red-500" colSpan="2">({storeCurrency?.data?.currency?.symbol}4591.28)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold" colSpan="5">Profit</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-500" colSpan="2">{storeCurrency?.data?.currency?.symbol}28119.35</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfitLossReport;
