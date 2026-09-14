import React from "react";
import { useGetBalanceSheetReportQuery } from "../../../store/api/app/Report/reportApiSlice";
import { useGetStoreCurrenciesQuery } from "../../../store/api/app/Currency/currenciesApiSlice";
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";
import { useSelector } from "react-redux";

const BalanceSheet = () => {
  const { data: balanceSheet } = useGetBalanceSheetReportQuery();
  const { data: storeCurrency } = useGetStoreCurrenciesQuery();

  const {
    totalAsset,
    liabilities,
    loanDue,
    supplierDue,
    bankBalance,
    clientTotalDue,
    inventoryValue,
    assets
  } = balanceSheet?.data || {};

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const { data: storeData } = useGetStoresByIdQuery(store_id);

  const calculateTotalIncome = parseFloat(totalAsset) - parseFloat(inventoryValue) + parseFloat(clientTotalDue) + parseFloat(bankBalance);
  const calculateTotalLiabilities = supplierDue + loanDue;
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <header className="text-center border-b pb-4">
          <h1 className="text-2xl font-bold">Balance Sheet</h1>
          <div className="mt-2">
            <h2 className="font-semibold text-lg">{storeData?.data?.store}</h2>
            <p>Phone: {storeData?.data?.phone}</p>
            <p>Email: {storeData?.data?.email}</p>
            <p>
              Address: {storeData?.data?.address}
            </p>
          </div>
        </header>

        {/* Table Section */}
        <div className="mt-6">
          <table className="w-full border-collapse border border-gray-200">
            {/* Table Head */}
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 bg-gray-100 text-left">
                  Incomes
                </th>
                <th className="border border-gray-300 p-2 bg-gray-100 text-right"></th>
                <th className="border border-gray-300 p-2 bg-gray-100 text-left text-red-600">
                  Liabilities
                </th>
                <th className="border border-gray-300 p-2 bg-gray-100 text-right"></th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {/* Row 1 */}
              <tr>
                <td className="border border-gray-300 p-2">Total Security/Asset=&gt;</td>
                <td className="border border-gray-300 p-2 text-right">{storeCurrency?.data?.currency?.symbol}{balanceSheet?.data?.totalAsset.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">Supplier's Dues=&gt;</td>
                <td className="border border-gray-300 p-2 text-right">{storeCurrency?.data?.currency?.symbol}{balanceSheet?.data?.supplierDue.toFixed(2)}</td>
              </tr>
              {/* Row 2 */}
              <tr>
                <td className="border border-gray-300 p-2">Inventory Value=&gt;</td>
                <td className="border border-gray-300 p-2 text-right">-{storeCurrency?.data?.currency?.symbol}{balanceSheet?.data?.inventoryValue.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">Bank Loan=&gt;</td>
                <td className="border border-gray-300 p-2 text-right">{storeCurrency?.data?.currency?.symbol}{balanceSheet?.data?.loanDue.toFixed(2)}</td>
              </tr>
              {/* Row 3 */}
              <tr>
                <td className="border border-gray-300 p-2">Client's Dues=&gt;</td>
                <td className="border border-gray-300 p-2 text-right">{storeCurrency?.data?.currency?.symbol}{balanceSheet?.data?.clientTotalDue.toFixed(2)}</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
              {/* Row 4 */}
              <tr>
                <td className="border border-gray-300 p-2">Bank Balance=&gt;</td>
                <td className="border border-gray-300 p-2 text-right">{storeCurrency?.data?.currency?.symbol}{balanceSheet?.data?.bankBalance.toFixed(2)}</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
              {/* Totals */}
              <tr className="font-bold">
                <td className="border border-gray-300 p-2">Total=&gt;</td>
                <td className="border border-gray-300 p-2 text-right">{storeCurrency?.data?.currency?.symbol}{calculateTotalIncome.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">Total=&gt;</td>
                <td className="border border-gray-300 p-2 text-right">{storeCurrency?.data?.currency?.symbol}{calculateTotalLiabilities.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total Asset */}
        <div className="mt-6 text-center font-bold text-xl">
          (Income - Liabilities)
          <div className="text-red-600">Total Asset: {storeCurrency?.data?.currency?.symbol}{(calculateTotalIncome - calculateTotalLiabilities).toFixed(2)}</div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-gray-800 text-white rounded shadow hover:bg-gray-900">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceSheet;
