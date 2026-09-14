import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
import { useGetLoanAuthoritiesByIdQuery } from '../../../store/api/app/LoanAuthoritiesApi/loanAuthoritiesApiSlice';
import { useGetStoresByIdQuery } from '../../../store/api/app/store/storeApiSlice';
import { useSelector } from 'react-redux';
import { formatCurrency, formatDate } from '../../../lib/format';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const LoanAuthorityView = () => {
  const { id } = useParams();
  const { data: viewData, isLoading, isError } = useGetLoanAuthoritiesByIdQuery(id);

  const authorityData = viewData?.data;
  console.log("authorityData::", authorityData);
  const loans = authorityData?.loans || [];
  console.log("loans", loans);

  // ✅ Always call these hooks
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const { data: storeData } = useGetStoresByIdQuery(store_id);

  const navigate = useNavigate();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Loan Authority-${authorityData?.name || 'Details'}`, // Static title here
  });

  const onPrint = () => {
    const title = `Loan Authority-${authorityData?.name || 'Details'}`;
    const originalTitle = document.title;

    document.title = title;
    handlePrint?.();

    // Restore title after short delay
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };


  // Calculate totals for the right side summary
  const totalDue = 50045.14; // Example value from your design

  const ccLoanTaken = loans?.filter(loan => loan.loan_type === 0)?.reduce((acc, loan) => {
    return acc + loan.transaction.amount;
  }
    , 0);
  const totalLoanTaken = loans?.reduce((acc, loan) => {
    return acc + loan.transaction.amount;
  }
    , 0);

  const totalPayableAmount = loans?.reduce((acc, loan) => {
    return acc + loan.payable;
  }, 0);

  const totalInterest = loans?.reduce((acc, loan) => {
    return acc + loan.loan_payments.reduce((acc, payment) => {
      return acc + payment.interest;
    }, 0);
  }
    , 0);

  const totalPaid = loans?.reduce((acc, loan) => {
    return acc + loan.loan_payments.reduce((acc, payment) => {
      return acc + payment.amount;
    }, 0);
  }, 0);

  console.log("totalInterest", totalInterest);

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen">Error loading data</div>;

  return (
    <div className="bg-gray-100 min-h-screen" ref={componentRef}>
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Left - Title */}
            <h1 className="text-xl font-semibold">Authority Details</h1>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
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
              <h3 className="text-lg font-semibold">Authority Details</h3>
              <p className="text-sm text-gray-600 mt-2"><strong>Name:</strong> {authorityData?.name || ""}</p>
              <p className="text-sm text-gray-600"><strong>Email:</strong> {authorityData?.email || ""}</p>
              <p className="text-sm text-gray-600"><strong>Contact Number:</strong> {authorityData?.contact_number || ""}</p>
              <p className="text-sm text-gray-600"><strong>Address:</strong> {authorityData?.address || ""}</p>
            </div>
          </div>
        </div>

        {/* Loans Table */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-medium">All Loans:</h3>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ref. No</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payable</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Installment</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {authorityData?.loans?.map((loan, index) => (
                <tr key={loan.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.reference_no}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.transaction.account.bank_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(loan.transaction.amount?.toFixed(2))}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(loan.payable?.toFixed(2))}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.interest}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(loan.due?.toFixed(2))}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loan.per_installment ? `${formatCurrency(loan.per_installment?.toFixed(2))} Per ${loan.payment_type === 0 ? 'Day' : loan.payment_type === 1 ? 'Month' : 'Year'} X ${loan.duration}` : 'No'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(loan.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Status and Summary Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Status */}
          <div className="bg-white rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(authorityData?.created_at) || "5th Nov, 2024"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Active
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white">
                <tr className="bg-gray-100">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">CC Limit:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(authorityData?.cc_limit)}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">CC Loan Taken:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">- {formatCurrency(ccLoanTaken?.toFixed(2))}</td>
                </tr>
                <tr className="bg-indigo-50">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Available CC Loan:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">= {authorityData?.cc_limit - ccLoanTaken}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Total Loan:<br /><span className="text-xs text-gray-500">(CC + Term)</span></td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(totalLoanTaken?.toFixed(2))}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Total Payable:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(totalPayableAmount.toFixed(2))}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Interest Paid:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(totalInterest.toFixed(2))}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Total Paid:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">- {formatCurrency(totalPaid.toFixed(2))}</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Total Due:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency((totalPayableAmount - totalPaid).toFixed(2))}</td>
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
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanAuthorityView;