import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
import { useGetLoansByIdQuery } from '../../../store/api/app/LoansApi/loansApiSlice';
import { useGetStoresByIdQuery } from '../../../store/api/app/store/storeApiSlice';
import { useSelector } from 'react-redux';
import { formatCurrency, formatDate } from '../../../lib/format';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';

const LoanView = () => {
  const { id } = useParams();
  const { data: viewData, isLoading, isError } = useGetLoansByIdQuery(id);
  console.log("viewData::", viewData);

  const loanData = viewData?.data;
  console.log("loanData::", loanData);

  const loanPayments = loanData?.loan_payments;
  console.log("loanPayments::", loanPayments);

  const backendUrl = import.meta.env.VITE_LOCAL_API_URL;

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const { data: storeData } = useGetStoresByIdQuery(store_id);

  const navigate = useNavigate();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Loan-${loanData?.reference_no || 'Details'}`, // Static title here
  });

  const onPrint = () => {
    const title = `Loan-${loanData?.reference_no || 'Details'}`;
    const originalTitle = document.title;

    document.title = title;
    handlePrint?.();

    // Restore title after short delay
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };


  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen">Error loading data</div>;


  const totalPaidAmount = loanData?.loan_payments?.reduce((acc, payment) => acc + payment.amount, 0) || 0;

  return (
    <div className="bg-gray-100 min-h-screen" ref={componentRef}>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between">
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
              <h3 className="text-lg font-semibold">Authority Details</h3>
              <p className="text-sm text-gray-600 mt-2"><strong>Name:</strong> {loanData?.authority?.name || ""}</p>
              <p className="text-sm text-gray-600"><strong>Email:</strong> {loanData?.authority?.email || ""}</p>
              <p className="text-sm text-gray-600"><strong>Contact Number:</strong> {loanData?.authority?.contact_number || ""}</p>
              <p className="text-sm text-gray-600"><strong>Address:</strong> {loanData?.authority?.address || ""}</p>
            </div>
          </div>
        </div>

        {/* Purchase Table */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
          <div className="p-4 border-b border-gray-200">
            {/* <h3 className="font-medium">All Loans:</h3> */}
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ref. No</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Account</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">

              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <img src={`${backendUrl}${loanData?.image_path}`} alt="Loan" className="w-10 h-10 rounded-full object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loanData?.reference_no}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loanData?.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loanData?.transaction.account.bank_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(loanData?.date)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${loanData?.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {loanData?.status ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loanData?.created_user?.storeRole?.name}</td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Status and Summary Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Status */}
          <div className=" bg-white rounded-lg shadow-sm lg:col-span-2">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium">Loan Payment:</h3>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ref. NO</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  loanPayments?.map((payment, index) => (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <img src={`${backendUrl}${payment?.image_path}`} alt="Loan" className="w-10 h-10 rounded-full object-cover" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment?.reference_no}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment?.account_transaction.account.bank_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(payment?.amount.toFixed(2))}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(payment?.interest.toFixed(2))}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${payment?.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {payment?.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(payment?.date)}</td>

                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white">
                <tr className="bg-gray-100">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Loan Amount:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(loanData?.transaction?.amount?.toFixed(2))}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Interest:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">+ {formatCurrency(loanData?.interest_amount?.toFixed(2))}</td>
                </tr>
                <tr className="bg-indigo-50">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Payable:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">= {formatCurrency(loanData?.payable?.toFixed(2))}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Total Paid:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">- {formatCurrency(totalPaidAmount.toFixed(2))}</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Due:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency((loanData?.payable - totalPaidAmount)?.toFixed(2))}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button onClick={handlePrint} className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Printer className="mr-2 h-4 w-4" /> Print
          </button>
          <button onClick={() => navigate(-1)} className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanView;