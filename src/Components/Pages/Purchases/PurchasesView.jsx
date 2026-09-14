import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
import { useGetInvoicePaymentsByIdQuery } from '../../../store/api/app/Invoice/invoiceApiSlice';
import { useGetPayrollsByIdQuery } from '../../../store/api/app/PayrollApi/payrollApiSlice';
import { useGetPurchasesByIdQuery } from '../../../store/api/app/Purchases/purchasesApiSlice';
import { useSelector } from 'react-redux';
import { useGetStoresByIdQuery } from '../../../store/api/app/store/storeApiSlice';
import { useSystemSettings } from '../../../lib/SystemSettingsProvider';
import { useReactToPrint } from 'react-to-print';

const PurchaseView = () => {
  const { id } = useParams();
  const { data: viewData, isLoading, isError } = useGetPurchasesByIdQuery(id);

  const { settings } = useSystemSettings();


  const purchaseData = viewData?.data;

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const { data: storeData } = useGetStoresByIdQuery(store_id);

  const componentRef = useRef();
  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Purchase-Details', // Static title here
  });

  const onPrint = () => {
    const title = `Purchase-${purchaseData?.purchase_no || 'Details'}`;
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


  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return `${settings?.currency}0`;
    return `${settings?.currency ? settings?.currency : '৳'}${amount}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getDate()}th ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`;
  };


  const totalPaidAmount = purchaseData?.purchase_payments?.reduce((acc, payment) => acc + payment.amount, 0) || 0;
  const subTotalAmount =  purchaseData?.purchase_products?.reduce((acc, product) => acc + (product?.purchase_price * product?.quantity), 0) || 0;

  return (
    <div className="bg-gray-100 min-h-screen" ref={componentRef}>
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Left - Title */}
            <h1 className="text-xl font-semibold">Purchase Details</h1>
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
              <h3 className="text-lg font-semibold">Supplier Details</h3>
              <p className="text-sm text-gray-600"><strong>Supplier ID:</strong> {purchaseData?.supplier?.supplier_id || ""}</p>
              <p className="text-sm text-gray-600 mt-2"><strong>Supplier Name:</strong> {purchaseData?.supplier?.name || ""}</p>
              <p className="text-sm text-gray-600"><strong>Company Name:</strong> {purchaseData?.supplier?.company_name || ""}</p>
              <p className="text-sm text-gray-600"><strong>Contact Number:</strong> {purchaseData?.supplier?.phone || ""}</p>
              <p className="text-sm text-gray-600"><strong>Address:</strong> {purchaseData?.supplier?.address || ""}</p>
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase No</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PO Reference</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PO Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchaseData?.purchase_no}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchaseData?.po_reference}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(purchaseData?.po_date)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(purchaseData?.purchase_date)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* create td for status. if status true show green dot else show red dot */}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${purchaseData?.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {purchaseData?.status ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(purchaseData?.salary_date)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchaseData?.created_user?.storeRole?.name}</td>



              </tr>
            </tbody>
          </table>
        </div>
        {/* Purchase Products Table */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-medium">Purchase Products:</h3>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchased Qty</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Tax</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th> */}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                purchaseData?.purchase_products?.map((product) => (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.product?.product_code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.product?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.quantity} {product?.product?.unit?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product?.purchase_price)}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product?.product?.Taxs?.rate)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product?.unit_cost)}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product?.purchase_price * product?.quantity)}</td>
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
                  purchaseData?.purchase_payments?.map((payment, index) => (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(payment?.date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(payment?.amount?.toFixed(2))}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment?.account_transaction?.account?.bank_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment?.account_transaction?.cheque_no}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment?.account_transaction?.receipt_no}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* create td for status. if status true show green dot else show red dot */}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${purchaseData?.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {purchaseData?.status ? 'Active' : 'Inactive'}
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
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(subTotalAmount?.toFixed(2))}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Discount:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">- {formatCurrency(purchaseData?.discounted_amount?.toFixed(2))}</td>
                </tr>
                <tr className="bg-indigo-50">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Transport:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">+ {formatCurrency(purchaseData?.transport?.toFixed(2))}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Tax ({purchaseData?.tax?.name}%):</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">+{formatCurrency(purchaseData?.total_tax?.toFixed(2))}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Total:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">+{formatCurrency((subTotalAmount - purchaseData?.discounted_amount + purchaseData?.total_tax + purchaseData?.transport)?.toFixed(2))}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Total Paid:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">- {formatCurrency(totalPaidAmount.toFixed(2))}</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Due:</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">={formatCurrency(((subTotalAmount - purchaseData?.discounted_amount + purchaseData?.total_tax + purchaseData?.transport) - totalPaidAmount)?.toFixed(2))}</td>
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

export default PurchaseView;