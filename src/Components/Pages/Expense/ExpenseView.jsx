import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetExpenseByIdQuery } from "../../../store/api/app/Expense/expenseApiSlice";
import { useParams } from "react-router-dom";
import fallbackSrc from "/fallBack_Image.jpg";
import { formatDate } from "../../../lib/format";
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";
import { useSelector } from "react-redux";

const ExpenseView = ({ isOpen, onClose, data }) => {
  const { id } = useParams();

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const {data: storeData} = useGetStoresByIdQuery(store_id);

  const { data: viewData } = useGetExpenseByIdQuery(id);
  console.log("storeData", storeData);

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="mt-5">

        {/* Top Section - Logo and Company Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between">
            {/* Left - Logo and Company Info */}
            <div>
              <img
                src={import.meta.env.VITE_LOCAL_API_URL + storeData?.data?.logo}
                alt="Company Logo"
                className="w-16 h-16 rounded-full"
              />
              <p className="text-gray-600 text-sm">Phone: {storeData?.data?.phone}</p>
              <p className="text-gray-600 text-sm">Email: {storeData?.data?.email}</p>
              <p className="text-gray-600 text-sm">Address: {storeData?.data?.address}</p>
            </div>

            {/* Right - Authority Details */}
            <div className="text-right">
              <h3 className="text-lg font-semibold">Expense Details</h3>
              <p className="text-sm text-gray-600"><strong>Date:</strong> {formatDate(viewData?.data?.date) || ""}</p>
              <p className="text-sm text-gray-600"><strong>Category:</strong> {viewData?.data?.expense_category.name || ""}</p>
              <p className="text-sm text-gray-600"><strong>Sub Category:</strong> {viewData?.data?.expense_sub_category.name || ""}</p>
            </div>
          </div>
        </div>


        <h2 className="text-2xl font-bold mb-4 text-center">Expense Details</h2>
        {/* Create a table to display the data */}

        <table className="min-w-full border-collapse border border-gray-200 bg-white">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">Image</th>
              <th className="border border-gray-200 px-4 py-2">Expense Reason</th>
              <th className="border border-gray-200 px-4 py-2">Amount</th>
              <th className="border border-gray-200 px-4 py-2">Account</th>
              <th className="border border-gray-200 px-4 py-2">Status</th>
              <th className="border border-gray-200 px-4 py-2">Created By</th>
            </tr>
          </thead>
          <tbody>
            <td className="border border-gray-200 px-4 py-2 text-center">
              {
                viewData?.data?.image_path ? (
                  <img
                    src={import.meta.env.VITE_LOCAL_API_URL + viewData?.data?.image_path}
                    alt="Expense"
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  <img
                    src={fallbackSrc}
                    alt="Expense"
                    className="w-16 h-16 object-cover"
                  />
                )
              }
            </td>
            <td className="border border-gray-200 px-4 py-2 text-center">
              {viewData?.data?.reason}
            </td>
            <td className="border border-gray-200 p x-4 py-2 text-center">
              {viewData?.data?.amount}
            </td>
            <td className="border border-gray-200 px-4 py-2 text-center">
              {viewData?.data?.account_transaction?.account?.bank_name}
            </td>
            <td className="border border-gray-200 px-4 py-2 text-center ">
              { }
              <span className="flex items-center space-x-3 rtl:space-x-reverse">
                <span
                  className={`h-[35px] w-[120px] rounded-full flex justify-center items-center ${viewData?.data?.status === 1 || viewData?.data?.status === true
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                    }`}
                >
                  <span>
                    {viewData?.data?.status === 1 || viewData?.data?.status === true
                      ? "Active"
                      : "Inactive"}
                  </span>
                </span>
              </span>
            </td>
            <td className="border border-gray-200 px-4 py-2 text-center align-middle h-auto">
              {viewData?.data?.created_user?.storeRole?.name}
            </td>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseView;
