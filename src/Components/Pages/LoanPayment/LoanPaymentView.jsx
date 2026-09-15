import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
import { useGetLoanAuthoritiesByIdQuery } from '../../../store/api/app/LoanAuthoritiesApi/loanAuthoritiesApiSlice';
import { useGetLoanPaymentsByIdQuery } from '../../../store/api/app/paymentsApi/paymentsApiSlice';
import { useSelector } from 'react-redux';
import { useGetStoresByIdQuery } from '../../../store/api/app/store/storeApiSlice';
import { formatCurrency, formatDate } from '../../../lib/format';
import { useReactToPrint } from 'react-to-print';

const LoanPaymentView = () => {
  const { id } = useParams();
  const { data: viewData, isLoading, isError } = useGetLoanPaymentsByIdQuery(id);




  const loanPayment = viewData?.data;
  console.log("loanPayment::", loanPayment);
  const loans = loanPayment?.loans || [];
  console.log("loans", loans);

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const { data: storeData } = useGetStoresByIdQuery(store_id);

  const navigate = useNavigate();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Loan Payment-${loanPayment?.name || 'Details'}`, // Static title here
  });

  const onPrint = () => {
    const title = `Loan Payment-${loanPayment?.name || 'Details'}`;
    const originalTitle = document.title;

    document.title = title;
    handlePrint?.();

    // Restore title after short delay
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  const totalPaid = loanPayment?.loan?.loan_payments?.reduce((acc, payment) => acc + payment.amount, 0) || 0;

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen">Error loading data</div>;

  return (
    <div className="bg-gray-100 min-h-screen" ref={componentRef}>

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

            <div className="text-right">
              <h3 className="text-lg font-semibold">Authority Details</h3>
              <p className="text-sm text-gray-600 mt-2"><strong>Name:</strong> {loanPayment?.loan?.authority?.name || ""}</p>
              <p className="text-sm text-gray-600"><strong>Email:</strong> {loanPayment?.loan?.authority?.email || ""}</p>
              <p className="text-sm text-gray-600"><strong>Contact Number:</strong> {loanPayment?.loan?.authority?.contact_number || ""}</p>
              <p className="text-sm text-gray-600"><strong>Address:</strong> {loanPayment?.loan?.authority?.address || ""}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
          <div className="p-4 border-b border-gray-200">
            {/* <h3 className="font-medium">All Loans:</h3> */}
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Ref</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Ref</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payable</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Paid</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <img src={loanPayment?.image_path} alt="Loan" className="h-10 w-10 rounded-full" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loanPayment?.loan?.reference_no}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loanPayment?.reference_no}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(loanPayment?.loan?.payable?.toFixed(2))}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(loanPayment?.amount?.toFixed(2))}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(loanPayment?.interest?.toFixed(2))}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loanPayment?.account_transaction?.account?.bank_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loanPayment?.note}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {loanPayment?.status === true ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Inactive
                    </span>
                  )
                  }
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(loanPayment?.date)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loanPayment?.created_user?.storeRole?.name}</td>
              </tr>

            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div></div>

          <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white">
                <tr className="bg-gray-100">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Loan Amount:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(loanPayment?.account_transaction?.amount.toFixed(2))}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Interest:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right"> {formatCurrency(loanPayment?.loan?.interest?.toFixed(2))}</td>
                </tr>
                <tr className="bg-indigo-50">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Payable:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right"> {formatCurrency(loanPayment?.loan?.payable.toFixed(2))}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Total Paid:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(totalPaid.toFixed(2))}</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Total Due:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency((loanPayment?.loan?.payable - totalPaid).toFixed(2))}</td>
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

export default LoanPaymentView;