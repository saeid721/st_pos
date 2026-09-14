import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
import { useGetLoansByIdQuery } from '../../../store/api/app/LoansApi/loansApiSlice';
import { useGetStoresByIdQuery } from '../../../store/api/app/store/storeApiSlice';
import { useSelector } from 'react-redux';
import { formatCurrency, formatDate } from '../../../lib/format';
import { useGetInvoiceReturnsByIdQuery } from '../../../store/api/app/InvoiceReturn/invoiceReturnApiSlice';
import { useSystemSettings } from '../../../lib/SystemSettingsProvider';
import { useReactToPrint } from 'react-to-print';

const InvoiceReturnView = () => {
  const { id } = useParams();
  const { data: viewData, isLoading, isError } = useGetInvoiceReturnsByIdQuery(id);
  console.log("viewData::", viewData);

  const { settings } = useSystemSettings();

  const invoiceReturnData = viewData?.data;


  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const { data: storeData } = useGetStoresByIdQuery(store_id);

  const backendUrl = import.meta.env.VITE_LOCAL_API_URL;

  const navigate = useNavigate();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice-${invoiceReturnData?.invoice?.invoice_no || 'Details'}`, // Static title here
  });

  const onPrint = () => {
    const title = `Invoice-${invoiceReturnData?.invoice?.invoice_no || 'Details'}`;
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

  const invoiceId = viewData?.data?.invoice?.id;
  const subTotal = viewData?.data?.invoice_return_products?.reduce((sum, invoice) => {
    const invoice_qty = invoice?.product?.invoiceProducts?.find(
      invProd => invProd.product_id === invoice?.product?.id && invProd.invoice_id === invoiceId
    )?.quantity || 0;
    const unit_cost = invoice?.product?.invoiceProducts?.find(
      invProd => invProd.product_id === invoice?.product?.id && invProd.invoice_id === invoiceId
    )?.unit_cost || 0;
    return sum + (unit_cost * invoice_qty);
  }, 0);

  const costOfReturnProducts = viewData?.data?.invoice_return_products?.reduce((sum, invoice) => {
    return sum + (invoice?.sale_price * invoice?.quantity);
  }, 0)

  const total = subTotal - costOfReturnProducts - viewData?.data?.invoice?.discounted_amount + viewData?.data?.invoice?.transport + viewData?.data?.invoice?.total_tax
  // const totalPaid = viewData?.data?.invoice?.invoice_payments?.reduce((acc, item) => {
  //   return acc + item.amount
  // });
  const totalPaid = viewData?.data?.invoice?.invoice_payments?.reduce((acc, item) => acc + (item.amount || 0), 0) || 0;
  console.log("totalPaid: ", totalPaid);
  const due = total - totalPaid;

  console.log("invoiceReturnData: ", invoiceReturnData);
  return (
    <div className="bg-gray-100 min-h-screen" ref={componentRef}>
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Invoice Return Details</h1>
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
              <p className="text-sm text-gray-600 mt-2"><strong>Client Name:</strong> {""} {invoiceReturnData?.invoice?.client?.name}</p>
              <p className="text-sm text-gray-600"><strong>Phone:</strong> {""} {invoiceReturnData?.invoice?.client?.phone}</p>
              <p className="text-sm text-gray-600"><strong>Address:</strong> {""} {invoiceReturnData?.invoice?.client?.address}</p>
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return No</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Reason</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {viewData?.data?.invoice?.invoice_no}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{viewData?.data?.return_no}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(viewData?.data?.invoice?.invoice_date)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(viewData?.data?.date)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{viewData?.data?.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${viewData?.data?.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {viewData?.data?.status ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{viewData?.data?.created_user?.storeRole?.name}</td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Status and Summary Section */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 mx-auto">
          <div className=" bg-white rounded-lg shadow-sm lg:col-span-2">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium">Return Products:</h3>
            </div>
            <table className="min-w-full divide-y divide-gray-200 mx-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Qty</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Qty</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SubTotal</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Return</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  viewData?.data?.invoice_return_products?.map((invoice, index) => {
                    const invoice_qty = invoice?.product?.invoiceProducts?.find(
                      invProd => invProd.product_id === invoice?.product?.id && invProd.invoice_id === invoiceId
                    )?.quantity
                    const unit_cost = invoice?.product?.invoiceProducts?.find(
                      invProd => invProd.product_id === invoice?.product?.id && invProd.invoice_id === invoiceId
                    )?.unit_cost
                    return (
                      <tr key={invoice?.id || index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice?.product?.product_code}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice?.product?.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {
                            invoice_qty
                          } {invoice?.product?.unit?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice?.quantity} {invoice?.product?.unit?.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice?.sale_price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice?.sale_price * invoice_qty}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice?.sale_price * invoice?.quantity}</td>
                      </tr>
                    )
                  }
                  )
                }
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={6} className="px-6 py-3 text-right font-semibold text-gray-900">Total:</td>
                  <td className="px-6 py-3 font-semibold text-gray-900">
                    {
                      viewData?.data?.invoice_return_products?.reduce((sum, invoice) => {
                        const invoice_qty = invoice?.product?.invoiceProducts?.find(
                          invProd => invProd.product_id === invoice?.product?.id && invProd.invoice_id === invoiceId
                        )?.quantity || 0;
                        const unit_cost = invoice?.product?.invoiceProducts?.find(
                          invProd => invProd.product_id === invoice?.product?.id && invProd.invoice_id === invoiceId
                        )?.unit_cost || 0;
                        return sum + (unit_cost * invoice_qty);
                      }, 0)
                    }
                  </td>
                  <td className="px-6 py-3 font-semibold text-gray-900">
                    {
                      viewData?.data?.invoice_return_products?.reduce((sum, invoice) => {
                        return sum + (invoice?.sale_price * invoice?.quantity);
                      }, 0)
                    }
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>






          {/* Status and Summary Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Status */}
            <div className=" bg-white rounded-lg shadow-sm lg:col-span-2">

            </div>

            {/* Summary */}
            <div className="bg-white rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white">
                  <tr className="bg-gray-100">
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Subtotal:</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                      {/* {formatCurrency(loanData?.transaction?.amount?.toFixed(2))} */}
                      {settings?.currency}
                      {
                        subTotal
                      }
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Cost of Return Products:</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right"> - {settings?.currency}
                      {/* {formatCurrency(loanData?.interest_amount?.toFixed(2))} */}
                      {costOfReturnProducts}
                    </td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Discount:</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">- {formatCurrency(viewData?.data?.invoice?.discounted_amount ? viewData?.data?.invoice?.discounted_amount?.toFixed(2) : 0)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Transport:</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">+ {formatCurrency(viewData?.data?.invoice?.transport ? viewData?.data?.invoice?.transport?.toFixed(2) : 0)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Tax:</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">+ {formatCurrency(viewData?.data?.invoice?.total_tax?.toFixed(2))}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Total:</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">= {
                      total
                    }</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Total Paid:</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">- {totalPaid >= 0 ? totalPaid : 0}</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Due:</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{due}</td>
                  </tr>
                </tbody>
              </table>
            </div>
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

export default InvoiceReturnView;