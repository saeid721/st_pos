import React, { useRef } from "react";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useForm } from "react-hook-form";
import { useGetSummaryReportQuery } from "../../../store/api/app/Report/reportApiSlice";
import ReactToPrint from "react-to-print";
import { AiFillPrinter } from "react-icons/ai";
import { useGetStoreCurrenciesQuery } from "../../../store/api/app/Currency/currenciesApiSlice";
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";
import { useSelector } from "react-redux";

const SummaryReport = () => {
  const {data: storeCurrency} = useGetStoreCurrenciesQuery();
  const componentRef = useRef(null);
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

  const month = watch("month")
  const year = watch("year")

  const { data: summaryReport } = useGetSummaryReportQuery({
    month: month,
    year: year
  })

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const { data: storeData } = useGetStoresByIdQuery(store_id);

  const openingTotalBalance = summaryReport?.data?.openingBalances?.reduce((total, item) => {
    return total + (item.current_balance || 0);
  }, 0);
  const closingTotalBalance = summaryReport?.data?.closingBalances?.reduce((total, item) => {
    return total + (item.current_balance || 0);
  }, 0);
  const accountCollectionsTotalBalance = summaryReport?.data?.accountCollections?.reduce((total, item) => {
    return total + (item.current_balance || 0);
  }, 0);
  const balanceTransfersTotalBalance = summaryReport?.data?.balanceTransfers?.reduce((total, item) => {
    return total + (item.current_balance || 0);
  }, 0);


  const options1 = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ]
  const options2 = [
    { value: 2030, label: "2030" },
    { value: 2029, label: "2029" },
    { value: 2028, label: "2028" },
    { value: 2027, label: "2027" },
    { value: 2026, label: "2026" },
    { value: 2025, label: "2025" },
    { value: 2024, label: "2024" },
    { value: 2023, label: "2023" },
    { value: 2022, label: "2022" },
    { value: 2021, label: "2021" },
    { value: 2020, label: "2020" },
  ]
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        {/* Dropdowns */}

        <div className="grid grid-cols-2 gap-5">
          <CustomReactSelect
            control={control}
            name="month"
            label="Month"
            placeholder="Select Month"
            options={options1}
            required={true}
          // error={errors.section_type}
          />
          <CustomReactSelect
            control={control}
            name="year"
            label="Year"
            placeholder="Select year"
            options={options2}
            required={true}
          // error={errors.section_type}
          />
          {/* <div>
            <div className="flex space-x-4 mt-4 lg:mt-0 justify-end">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                View Report
              </button>
              <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                Reset
              </button>
            </div>
          </div> */}
        </div>

        {/* Report Header */}
        {
          summaryReport?.data ? (
            <div ref={componentRef} className="px-4">
              <div className="text-center border-b pb-4">
                <h2 className="font-bold text-2xl mt-6">{storeData?.data?.store}</h2>
                <p>Phone: {storeData?.data?.phone}</p>
                <p>Email: {storeData?.data?.email}</p>
                <p>
                  Address: {storeData?.data?.address}
                </p>
                <h3 className="mt-2 text-lg font-semibold">
                  Monthly Summary: {options1?.find(item => item.value == month)?.label}, {year}
                </h3>
              </div>


              <div className="overflow-x-auto mt-6">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left">#</th>
                      <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left">Particulars</th>
                      <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-right">
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Opening Balance */}
                    <tr className="bg-gray-200 font-bold">
                      <td colSpan={3} className="border border-gray-300 px-4 py-2">
                        Opening Balance
                      </td>
                    </tr>
                    {
                      summaryReport?.data?.openingBalances?.map((openingBalance, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2">
                            {index + 1}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {`${openingBalance.bank_name} - [${openingBalance.account_number}]`}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            {openingBalance.current_balance}
                          </td>
                        </tr>
                      ))
                    }
                    <tr className="font-bold">
                      <td colSpan={2} className="border border-gray-300 px-4 py-2 text-right">
                        Total
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">{storeCurrency?.data?.currency?.symbol}{openingTotalBalance}</td>
                    </tr>


                    {/* Sales */}
                    <tr className="bg-gray-200 font-bold">
                      <td colSpan={3} className="border border-gray-300 px-4 py-2">
                        Sales
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">1</td>
                      <td className="border border-gray-300 px-4 py-2">Invoice Sales</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">-{storeCurrency?.data?.currency?.symbol}{summaryReport?.data?.totalInvoiceSales}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">2</td>
                      <td className="border border-gray-300 px-4 py-2">Invoice Dues</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">-{storeCurrency?.data?.currency?.symbol}{summaryReport?.data?.invoiceDue}</td>
                    </tr>


                    {/* Account Collection */}
                    <tr className="bg-gray-200 font-bold">
                      <td colSpan={3} className="border border-gray-300 px-4 py-2">
                        Accounts Collection
                      </td>
                    </tr>
                    {
                      summaryReport?.data?.accountCollections?.map((openingBalance, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2">
                            {index + 1}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {`${openingBalance.bank_name} - [${openingBalance.account_number}]`}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            {openingBalance.current_balance}
                          </td>
                        </tr>
                      ))
                    }
                    <tr className="font-bold">
                      <td colSpan={2} className="border border-gray-300 px-4 py-2 text-right">
                        Total
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">-{storeCurrency?.data?.currency?.symbol}{accountCollectionsTotalBalance}</td>
                    </tr>


                    {/* Expenses */}
                    <tr className="bg-gray-200 font-bold">
                      <td colSpan={3} className="border border-gray-300 px-4 py-2">
                        Expenses
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">1</td>
                      <td className="border border-gray-300 px-4 py-2">Purchase</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">{storeCurrency?.data?.currency?.symbol}{summaryReport?.data?.totalPurchase}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">2</td>
                      <td className="border border-gray-300 px-4 py-2">General</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">{storeCurrency?.data?.currency?.symbol}{summaryReport?.data?.totalExpense}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">2</td>
                      <td className="border border-gray-300 px-4 py-2">Payroll</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">{storeCurrency?.data?.currency?.symbol}{summaryReport?.data?.totalPayroll}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">2</td>
                      <td className="border border-gray-300 px-4 py-2">Loan Interest</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">{storeCurrency?.data?.currency?.symbol}{summaryReport?.data?.totalLoanInterest}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">2</td>
                      <td className="border border-gray-300 px-4 py-2">Asset Depriciation</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">{storeCurrency?.data?.currency?.symbol}{summaryReport?.data?.totalDepreciation}</td>
                    </tr>

                    <tr className="font-bold">
                      <td colSpan={2} className="border border-gray-300 px-4 py-2 text-right">
                        Total
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">{storeCurrency?.data?.currency?.symbol} {summaryReport?.data?.totalPurchase - summaryReport?.data?.totalExpense + summaryReport?.data?.totalPayroll + summaryReport?.data?.totalLoanInterest + summaryReport?.data?.totalDepreciation}</td>
                    </tr>


                    {/* Transfer */}
                    <tr className="bg-gray-200 font-bold">
                      <td colSpan={3} className="border border-gray-300 px-4 py-2">
                        Transfer
                      </td>
                    </tr>
                    {
                      summaryReport?.data?.balanceTransfers?.map((openingBalance, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2">
                            {index + 1}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            Balance Transfer From [{openingBalance?.debit?.account?.bank_name} to {openingBalance?.credit?.account?.bank_name}]
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            {storeCurrency?.data?.currency?.symbol}{openingBalance.amount}
                          </td>
                        </tr>
                      ))
                    }
                    <tr className="font-bold">
                      <td colSpan={2} className="border border-gray-300 px-4 py-2 text-right">
                        Total
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">{storeCurrency?.data?.currency?.symbol}{balanceTransfersTotalBalance}</td>
                    </tr>


                    {/* Closing Balance */}
                    <tr className="bg-gray-200 font-bold">
                      <td colSpan={3} className="border border-gray-300 px-4 py-2">
                        Closing Balance
                      </td>
                    </tr>
                    {
                      summaryReport?.data?.closingBalances?.map((openingBalance, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2">
                            {index + 1}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {openingBalance.bank_name}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            {openingBalance.current_balance}
                          </td>
                        </tr>
                      ))
                    }
                    <tr className="font-bold">
                      <td colSpan={2} className="border border-gray-300 px-4 py-2 text-right">
                        Total
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">{storeCurrency?.data?.currency?.symbol}{closingTotalBalance}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="font-bold text-center mt-6 text-3xl">No Data found</p>
          )
        }

        {/* Print Button */}
        {
          summaryReport?.data && <div className="mt-4 flex justify-end">
            <ReactToPrint
              trigger={() => (
                <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2">
                  <AiFillPrinter />
                  Print Report
                </button>
              )}
              content={() => componentRef.current}
              documentTitle="Summary Report"
              pageStyle="@media print { body { -webkit-print-color-adjust: exact; } }"
            />
          </div>
        }


      </div>
    </div>
  );
};

export default SummaryReport;
