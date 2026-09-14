import React, { useEffect, useState } from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetCategoriesByIdQuery } from "../../../store/api/app/Category/categoryApiSlice";
import { useGetAccountsByIdQuery } from "../../../store/api/app/Account/accountApiSlice";
import { useParams } from "react-router-dom";
import { Search, FileText, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";
import { useSelector } from "react-redux";

const AccountView = ({ isOpen, onClose, data }) => {
  const { id } = useParams();
  const { data: viewData } = useGetAccountsByIdQuery(id);
  console.log("viewData", viewData);
  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const { data: storeData } = useGetStoresByIdQuery(store_id);

  // Filtered transactions based on search
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  console.log("filteredTransactions", filteredTransactions);

  // Calculate total pages
  const totalPages = Math.ceil(filteredTransactions?.length / itemsPerPage);

  // Get current transactions
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions?.slice(indexOfFirstItem, indexOfLastItem);

  // Update filtered transactions when search term changes
  useEffect(() => {
    if (searchTerm) {
      const filtered = viewData?.data?.account_transaction?.filter(transaction =>
        transaction.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.type.toString().includes(searchTerm) ||
        transaction.amount.toString().includes(searchTerm)
      );
      setFilteredTransactions(filtered);
    } else {
      console.log("viewData?.data?.account_transaction", viewData?.data?.account_transaction);
      setFilteredTransactions(viewData?.data?.account_transaction);
    }
    setCurrentPage(1); // Reset to first page on search or data change
  }, [searchTerm, viewData?.data]);

  // console.log("viewData?.data?.account_transaction", viewData?.data?.account_transaction);

  // Page change handlers
  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  const totalTransaction = viewData?.data?.account_transaction?.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
  const totalCredit = viewData?.data?.account_transaction?.filter(transaction => transaction.type === 1).reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
  const totalDebit = viewData?.data?.account_transaction?.filter(transaction => transaction.type === 0).reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
  const availableBalance = totalCredit - totalDebit;

  if (!viewData?.data) return <div className="p-4 text-center">Loading...</div>;


  return (
    <div>
      <div className="min-h-screen bg-gray-50">

        {/* Company info */}
        <div className="container mx-auto px-4 pt-6">
          <div className="flex flex-col md:flex-row justify-between">
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
            <div className="mt-4 md:mt-0 md:text-right">
              <h2 className="text-sm font-medium text-gray-600">Account Details</h2>
              <p className="text-gray-600 text-sm">Bank Name: {viewData?.data?.bank_name}</p>
              <p className="text-gray-600 text-sm">Account Number: {viewData?.data?.account_number}</p>
              {/* <p className="text-gray-600 text-sm">Created At: {viewData.data.createdAt}</p> */}
            </div>
          </div>
        </div>

        {/* Account Summary Cards */}
        <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-cyan-500 text-white rounded-md p-4 flex flex-col">
            <span className="text-3xl font-bold">{totalTransaction?.toFixed(2)}</span>
            <span className="text-sm">Total Transactions</span>
          </div>
          <div className="bg-indigo-500 text-white rounded-md p-4 flex flex-col">
            <span className="text-3xl font-bold">TK{totalCredit?.toFixed(2)}</span>
            <span className="text-sm">Credit Amount</span>
          </div>
          <div className="bg-yellow-500 text-white rounded-md p-4 flex flex-col">
            <span className="text-3xl font-bold">TK{totalDebit?.toFixed(2)}</span>
            <span className="text-sm">Debit Amount</span>
          </div>
          <div className="bg-blue-500 text-white rounded-md p-4 flex flex-col">
            <span className="text-3xl font-bold">TK{availableBalance?.toFixed(2)}</span>
            <span className="text-sm">Available Balance</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="container mx-auto px-4 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Transactions Table */}
        <div className="container mx-auto px-4 mb-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reason
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created By
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentTransactions?.map((transaction, index) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.transaction_date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.type === 1 ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {transaction.type === 1 ? 'Credit' : 'Debit'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        TK{transaction.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {transaction.status === true ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.created_user.storeRole.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              Previous
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredTransactions?.length)}
                </span>{' '}
                of <span className="font-medium">{filteredTransactions?.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  <span className="sr-only">First Page</span>
                  <ChevronsLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Page numbers */}
                {Number.isInteger(totalPages) && totalPages > 0 && (
                  [...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${currentPage === pageNum
                            ? 'bg-blue-50 border-blue-500 text-blue-600 z-10'
                            : 'bg-white text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      (pageNum === currentPage - 2 && currentPage > 3) ||
                      (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <span
                          key={pageNum}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })
                )}


                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  <span className="sr-only">Last Page</span>
                  <ChevronsRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AccountView;
