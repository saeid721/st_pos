import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
import { useGetInvoicePaymentsByIdQuery } from '../../../store/api/app/Invoice/invoiceApiSlice';
import { useSelector } from 'react-redux';
import { useGetStoresByIdQuery } from '../../../store/api/app/store/storeApiSlice';
import { formatCurrency, formatDate } from '../../../lib/format';
import { useReactToPrint } from 'react-to-print';

const InvoicePaymentView = () => {
  const { id } = useParams();
  const { data: viewData, isLoading, isError } = useGetInvoicePaymentsByIdQuery(id);

  const invoicePaymentData = viewData?.data;
  console.log("invoicePaymentData::", invoicePaymentData);

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const { data: storeData } = useGetStoresByIdQuery(store_id);

  const navigate = useNavigate();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice-${invoicePaymentData?.invoice?.invoice_no || 'Details'}`, // Static title here
  });

  const onPrint = () => {
    const title = `Invoice-${invoicePaymentData?.invoice?.invoice_no || 'Details'}`;
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


  const totalPaidAmount = invoicePaymentData?.invoice?.invoice_payments.reduce((acc, payment) => {
    return acc + payment.amount;
  }, 0) || 0;

  const totalInvoice = invoicePaymentData?.invoice?.sub_total - invoicePaymentData?.invoice?.discounted_amount + invoicePaymentData?.invoice?.total_tax + invoicePaymentData?.invoice?.transport;


  return (
    <div className="bg-gray-100 min-h-screen" ref={componentRef}>
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Left - Title */}
            <h1 className="text-xl font-semibold">Payment Details</h1>

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
              <h3 className="text-lg font-semibold">Client Details</h3>
              <p className="text-sm text-gray-600"><strong>Client ID:</strong> {invoicePaymentData?.invoice?.client?.client_id || ""}</p>
              <p className="text-sm text-gray-600 mt-2"><strong>Client Name:</strong> {invoicePaymentData?.invoice?.client?.name || ""}</p>
              <p className="text-sm text-gray-600"><strong>Contact Number:</strong> {invoicePaymentData?.invoice?.client?.phone || ""}</p>
              <p className="text-sm text-gray-600"><strong>Address:</strong> {invoicePaymentData?.invoice?.client?.address || ""}</p>
            </div>
          </div>
        </div>

        {/* Loans Table */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
          <div className="p-4 border-b border-gray-200">
            {/* <h3 className="font-medium">All Loans:</h3> */}
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice No</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Total</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cheque No</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt No</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoicePaymentData?.invoice?.invoice_no}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(invoicePaymentData?.invoice?.invoice_date)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency((invoicePaymentData?.invoice?.sub_total + invoicePaymentData?.invoice?.total_tax)?.toFixed(2))}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(invoicePaymentData?.amount?.toFixed(2))}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoicePaymentData?.account_transaction?.account?.bank_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(invoicePaymentData?.date)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoicePaymentData?.account_transaction?.cheque_no}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoicePaymentData?.account_transaction?.receipt_no}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoicePaymentData?.note}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoicePaymentData?.created_user?.storeRole?.name}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {/* create td for status. if status true show green dot else show red dot */}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${invoicePaymentData?.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {invoicePaymentData?.status ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Status and Summary Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Status */}
          <div className="bg-white rounded-lg shadow-sm">

          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white">
                <tr className="bg-gray-100">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Subtotal:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(invoicePaymentData?.invoice?.sub_total?.toFixed(2))}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Discount:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">- {formatCurrency(invoicePaymentData?.invoice?.discounted_amount?.toFixed(2))}</td>
                </tr>
                <tr className="bg-indigo-50">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Transport:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">+ {formatCurrency(invoicePaymentData?.invoice?.transport || 0)}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Tax:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">+{formatCurrency(invoicePaymentData?.invoice?.total_tax?.toFixed(2))}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Total:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(totalInvoice?.toFixed(2))}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Total Paid:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">- {formatCurrency(totalPaidAmount.toFixed(2))}</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Total Due:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency((totalInvoice - totalPaidAmount).toFixed(2))}</td>
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

export default InvoicePaymentView;