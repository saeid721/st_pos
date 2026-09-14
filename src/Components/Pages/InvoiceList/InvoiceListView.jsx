import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
import { useGetInvoicesByIdQuery } from '../../../store/api/app/InvoiceList/invoiceListApiSlice';
import { useSelector } from 'react-redux';
import { useGetStoresByIdQuery } from '../../../store/api/app/store/storeApiSlice';
import { formatCurrency, formatDate } from '../../../lib/format';
import { useReactToPrint } from 'react-to-print';

const InvoiceListView = () => {
  const { id } = useParams();
  const { data: viewData, isLoading, isError } = useGetInvoicesByIdQuery(id);
  console.log("viewData::", viewData);

  const invoiceData = viewData?.data;
  console.log("invoiceData::", invoiceData);

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const { data: storeData } = useGetStoresByIdQuery(store_id);

  const navigate = useNavigate();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice-${invoiceData?.invoice_no || 'Details'}`, // Static title here
  });

  const onPrint = () => {
    const title = `Invoice-${invoiceData?.invoice_no || 'Details'}`;
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


  const totalPaidAmount = invoiceData?.invoice_payments?.reduce((acc, payment) => acc + payment.amount, 0) || 0;

  return (
    <div className="bg-gray-100 min-h-screen" ref={componentRef}>
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Invoice Details</h1>
          </div>
        </div>
      </div>

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
              <h3 className="text-lg font-semibold">Client Details</h3>
              <p className="text-sm text-gray-600"><strong>Client ID:</strong> {invoiceData?.client?.client_id || ""}</p>
              <p className="text-sm text-gray-600 mt-2"><strong>Client Name:</strong> {invoiceData?.client?.name || ""}</p>
              <p className="text-sm text-gray-600"><strong>Company Name:</strong> {invoiceData?.client?.company_name || ""}</p>
              <p className="text-sm text-gray-600"><strong>Email:</strong> {invoiceData?.client?.email || ""}</p>
              <p className="text-sm text-gray-600"><strong>Contact Number:</strong> {invoiceData?.client?.phone || ""}</p>
              <p className="text-sm text-gray-600"><strong>Address:</strong> {invoiceData?.client?.address || ""}</p>
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice No</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoiceData?.invoice_no}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(invoiceData?.invoice_date)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* create td for status. if status true show green dot else show red dot */}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${invoiceData?.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {invoiceData?.status ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoiceData?.created_user?.storeRole?.name}</td>

              </tr>
            </tbody>
          </table>
        </div>
        {/* Purchase Products Table */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-medium">Invoice Products:</h3>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Qty</th>
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Tax</th> */}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale Cost</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                invoiceData?.invoiceProducts?.map((product) => (
                  <tr>
                    {console.log("product::", product)}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.product?.product_code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.product?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.quantity} {product?.product?.unit?.name}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product?.purchase_price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product?.product?.Taxs?.rate)}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product?.sale_price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product?.sale_price * product?.quantity)}</td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>

        {/* Status and Summary Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Status */}
          <div className=" bg-white rounded-lg shadow-sm lg:col-span-2">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium">Payment History:</h3>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cheque No</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt No</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  invoiceData?.invoice_payments?.map((payment, index) => (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(payment?.date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(payment?.amount?.toFixed(2))}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment?.account_transaction?.account?.bank_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment?.account_transaction?.cheque_no}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment?.account_transaction?.receipt_no}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* create td for status. if status true show green dot else show red dot */}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${invoiceData?.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {invoiceData?.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>
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
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">SubTotal:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(invoiceData?.sub_total?.toFixed(2))}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Discount:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">- {formatCurrency(invoiceData?.discounted_amount ? invoiceData?.discounted_amount?.toFixed(2) : 0)}</td>
                </tr>
                <tr className="bg-indigo-50">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Transport:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">+ {formatCurrency(invoiceData?.transport ? invoiceData?.transport?.toFixed(2) : 0)}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Tax ({invoiceData?.tax?.name}%):</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">+{formatCurrency(invoiceData?.total_tax?.toFixed(2))}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Total:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">+{formatCurrency((invoiceData?.sub_total - invoiceData?.discounted_amount + invoiceData?.total_tax + invoiceData?.transport)?.toFixed(2))}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Total Paid:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">- {formatCurrency(totalPaidAmount.toFixed(2))}</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Due:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">={formatCurrency(((invoiceData?.sub_total - invoiceData?.discounted_amount + invoiceData?.total_tax + invoiceData?.transport) - totalPaidAmount)?.toFixed(2))}</td>
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

export default InvoiceListView;