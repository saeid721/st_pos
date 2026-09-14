import { useEffect, useState } from 'react';
import { Eye, Edit, Trash, RefreshCw } from 'lucide-react';
import { useGetClientsByIdQuery } from '../../../store/api/app/Client/clientApiSlice';
import { useParams } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../../lib/format';
import { useGetSuppliersByIdQuery } from '../../../store/api/app/Suppliers/suppliersApiSlice';

const SuppliersView = () => {
  const [activeTab, setActiveTab] = useState('purchases');
  const [perPage, setPerPage] = useState(10);
  const [purchasePayments, setPurchasePayments] = useState([]);
  const [purchaseReturns, setPurchaseReturns] = useState([]);

  const backendUrl = import.meta.env.VITE_LOCAL_API_URL;

  const { id } = useParams();

  const { data: viewData, isLoading, isError } = useGetSuppliersByIdQuery(id);
  const supplierData = viewData?.data || {};

  const purchases = supplierData?.purchase || [];
  const nonPurchasePaymentsData = supplierData?.non_purchase_payments || [];
  useEffect(() => {
    // Function to fetch and process data
    const processInvoiceData = async () => {
      try {
        const allPurchasePayments = [];
        const allPurchaseReturns = [];

        const purchases = supplierData?.purchase || [];

        purchases.forEach(purchase => {
          if (purchase.purchase_payments && purchase.purchase_payments.length > 0) {
            purchase.purchase_payments.forEach(payment => {
              allPurchasePayments.push(payment);
            });
          }

          if (purchase.purchase_returns && purchase.purchase_returns.length > 0) {
            purchase.purchase_returns.forEach(returnItem => {
              allPurchaseReturns.push(returnItem);
            });
          }
        });

        setPurchasePayments(allPurchasePayments);
        setPurchaseReturns(allPurchaseReturns);
      } catch (error) {
        console.error("Error processing invoice data:", error);
      } finally {
      }
    };

    // Call the function
    processInvoiceData();
  }, [supplierData]);

  const totalPurchaseAmount = purchases.reduce((acc, purchase) => {
    const net_total = (purchase?.sub_total + purchase?.transport + purchase?.total_tax) - purchase?.discounted_amount;
    return acc + net_total;
  }, 0);

  const totalPaidAmount = purchases.reduce((acc, invoice) => {
    const total_paid = invoice?.purchase_payments?.reduce((acc, payment) => acc + payment.amount, 0);
    return acc + total_paid;
  }, 0);

  const purchaseDue = totalPurchaseAmount - totalPaidAmount;

  const totalNonPurchaseAmount = nonPurchasePaymentsData?.filter(payment => payment.type === 1).reduce((acc, payment) => {
    return acc + payment.amount;
  }, 0);

  const totalNonPurchaseDueAmount = nonPurchasePaymentsData?.filter(payment => payment.type === 0).reduce((acc, payment) => {
    return acc + payment.amount;
  }, 0);
  const totalNonPurchasePaidAmount = nonPurchasePaymentsData?.filter(payment => payment.type === 1).reduce((acc, payment) => {
    return acc + payment.amount;
  }, 0);

  const nonPurchaseDue = totalNonPurchaseDueAmount - totalNonPurchasePaidAmount;


  // Function to get active tab label
  const getActiveTabLabel = () => {
    switch (activeTab) {
      case 'purchases': 
        return 'Purchases';
      case 'purchaseReturns':
        return 'Purchase Returns';
      case 'purchasePayments':
        return 'Purchase Payments';
      case 'nonPurchaseTransactions':
        return 'Non Purchase Transactions';
      default:
        return 'Purchases';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Supplier Details</h1>
          <div className="text-sm breadcrumbs">
            <ul className="flex space-x-2">
              <li><a href="#" className="text-blue-500">Dashboard</a></li>
              <li><span className="text-gray-500">&gt;</span></li>
              <li><a href="#" className="text-blue-500">Suppliers</a></li>
              <li><span className="text-gray-500">&gt;</span></li>
              <li><span className="text-gray-700">Details</span></li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow col-span-1">
            <div className="flex flex-col items-center mb-4">
              <div className="w-32 h-32 bg-gray-500 rounded-full flex items-center justify-center text-white mb-4">
                {supplierData?.photo ? (
                  <img src={`${backendUrl}${supplierData?.photo}`} alt="Client" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span>No Preview</span>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-800">{supplierData?.name}</h2>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <span className="text-gray-600">Supplier ID</span>
                <span className="text-gray-800 font-medium">{supplierData?.supplier_id}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <span className="text-gray-600">Name</span>
                <span className="text-gray-800 font-medium">{supplierData?.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <span className="text-gray-600">Email</span>
                <span className="text-gray-800 font-medium">{supplierData?.email}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <span className="text-gray-600">Contact Number</span>
                <span className="text-gray-800 font-medium">{supplierData?.phone}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <span className="text-gray-600">Company Name</span>
                <span className="text-gray-800 font-medium">{supplierData?.company_name}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <span className="text-gray-600">Address</span>
                <span className="text-gray-800 font-medium text-sm">{supplierData?.address}</span>
              </div>
            </div>

            {
              supplierData?.status === true ? (
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md mt-4">
                  Active
                </button>
              ) : (
                <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md mt-4">
                  Inactivate
                </button>
              )
            }
          </div>

          <div className="md:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-cyan-500 p-6 rounded-lg shadow text-white">
                <div className="mb-4 flex justify-between">
                  <h3 className="text-lg font-medium">Purchase Total</h3>
                  <p className="text-right text-xl font-bold">{totalPurchaseAmount}</p>
                </div>
                <div className="mb-4 flex justify-between">
                  <h3 className="text-lg font-medium">Non Purchase Total</h3>
                  <p className="text-right text-xl font-bold">{totalNonPurchaseAmount}</p>
                </div>
                <div className="pt-2 border-t border-cyan-400 flex justify-between">
                  <h3 className="text-lg font-medium">Total</h3>
                  <p className="text-right text-2xl font-bold">{totalPurchaseAmount + totalNonPurchaseAmount}</p>
                </div>
              </div>

              <div className="bg-red-500 p-6 rounded-lg shadow text-white">
                <div className="mb-4 flex justify-between">
                  <h3 className="text-lg font-medium">Purchase Due</h3>
                  <p className="text-right text-xl font-bold">{formatCurrency(purchaseDue)}</p>
                </div>
                <div className="mb-4 flex justify-between">
                  <h3 className="text-lg font-medium">Non Purchase Due</h3>
                  <p className="text-right text-xl font-bold">{formatCurrency(nonPurchaseDue)}</p>
                </div>
                <div className="pt-2 border-t border-red-400 flex justify-between">
                  <h3 className="text-lg font-medium">Total Due</h3>
                  <p className="text-right text-2xl font-bold">{formatCurrency(purchaseDue + nonPurchaseDue)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="flex border-b overflow-x-auto">
                <button
                  onClick={() => setActiveTab('purchases')}
                  className={`px-6 py-3 flex items-center space-x-1 ${activeTab === 'purchases' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
                >
                  <span>Purchases</span>
                  <span className="ml-2 text-white bg-black rounded-full px-2 text-xs">{purchases?.length}</span>
                </button>
                <button
                  onClick={() => setActiveTab('purchaseReturns')}
                  className={`px-6 py-3 ${activeTab === 'purchaseReturns' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
                >
                  <span>Purchase Returns</span>
                  <span className="ml-2 text-white bg-black rounded-full px-2 text-xs">{purchaseReturns?.length}</span>
                </button>
                <button
                  onClick={() => setActiveTab('purchasePayments')}
                  className={`px-6 py-3 ${activeTab === 'purchasePayments' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
                >
                  <span>Purchase Payments</span>
                  <span className="ml-2 text-white bg-black rounded-full px-2 text-xs">{purchasePayments?.length}</span>
                </button>
                <button
                  onClick={() => setActiveTab('nonPurchaseTransactions')}
                  className={`px-6 py-3 ${activeTab === 'nonPurchaseTransactions' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
                >
                  <span>Non Purchase Transactions</span>
                  <span className="ml-2 text-white bg-black rounded-full px-2 text-xs">{nonPurchasePaymentsData?.length}</span>
                </button>
              </div>

              <div className="p-4">
                {/* <div className="flex justify-between items-center mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64"
                    />
                    <div className="absolute left-3 top-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="mr-2 text-gray-600">From - To</span>
                    <button className="p-2 bg-green-500 text-white rounded-md">
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </div> */}
            

                <div className="overflow-x-auto">
                  {
                    activeTab === 'purchases' ? (
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr className="bg-gray-100 border-b">
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Purchase No</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">SubTotal</th>
                            <th className="p-3 text-left">Transport</th>
                            <th className="p-3 text-left">Discount</th>
                            <th className="p-3 text-left">Net Total</th>
                            <th className="p-3 text-left">Total Paid</th>
                            <th className="p-3 text-left">Total Due</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {purchases?.map((item, index) => {
                            const net_total = (item?.sub_total + item?.transport + item?.total_tax) - item?.discounted_amount;
                            const total_paid = item?.purchase_payments?.reduce((acc, payment) => acc + payment.amount, 0);
                            const total_due = net_total - total_paid;
                            return (
                              <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3 text-blue-500">{item.purchase_no}</td>
                                <td className="p-3">{formatDate(item?.purchase_date)}</td>
                                <td className="p-3">{formatCurrency(item?.sub_total?.toFixed(2))}</td>
                                <td className="p-3">{formatCurrency(item?.transport?.toFixed(2))}</td>
                                <td className="p-3">{formatCurrency(item?.discounted_amount?.toFixed(2))}</td>
                                <td className="p-3">{formatCurrency(net_total?.toFixed(2))}</td>
                                <td className="p-3">{formatCurrency(total_paid?.toFixed(2))}</td>
                                <td className="p-3">{formatCurrency(total_due?.toFixed(2))}</td>
                                <td className="p-3">
                                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                    {item.status === true ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                                <td className="p-3">
                                  <div className="flex space-x-1">
                                    <button className="p-1 bg-blue-500 text-white rounded">
                                      <Eye size={16} />
                                    </button>
                                    <button className="p-1 bg-cyan-500 text-white rounded">
                                      <Edit size={16} />
                                    </button>
                                    <button className="p-1 bg-red-500 text-white rounded">
                                      <Trash size={16} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    ) : activeTab === 'purchaseReturns' ? (
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr className="bg-gray-100 border-b">
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Return No</th>
                            <th className="p-3 text-left">Purchase No</th>
                            <th className="p-3 text-left">Return Reason</th>
                            <th className="p-3 text-left">Cost of Return Products</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {purchaseReturns?.map((item, index) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                              <td className="p-3">{index + 1}</td>
                              <td className="p-3 text-blue-500">{item.return_no}</td>
                              <td className="p-3">{item?.purchase?.purchase_no}</td>
                              <td className="p-3">{item.reason}</td>
                              <td className="p-3">{item.total_return}</td>
                              <td className="p-3">{formatDate(item.date)}</td>
                              <td className="p-3">
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                  {item.status === true ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="p-3">
                                <div className="flex space-x-1">
                                  <button className="p-1 bg-blue-500 text-white rounded">
                                    <Eye size={16} />
                                  </button>
                                  <button className="p-1 bg-cyan-500 text-white rounded">
                                    <Edit size={16} />
                                  </button>
                                  <button className="p-1 bg-red-500 text-white rounded">
                                    <Trash size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : activeTab === 'purchasePayments' ? (
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr className="bg-gray-100 border-b">
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Purchase No</th>
                            <th className="p-3 text-left">Total</th>
                            <th className="p-3 text-left">Paid Amount</th>
                            <th className="p-3 text-left">Account</th>
                            <th className="p-3 text-left">Payment Date</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {purchasePayments?.map((item, index) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                              <td className="p-3">{index + 1}</td>
                              <td className="p-3 text-blue-500">{item.purchase?.purchase_no}</td>
                              <td className="p-3">{formatCurrency(((item?.purchase?.sub_total + item?.purchase?.transport + item?.purchase?.total_tax) - item?.purchase?.discounted_amount)?.toFixed(2))}</td>
                              <td className="p-3">{formatCurrency(item.amount)}</td>
                              <td className="p-3">{item.account_transaction?.account?.bank_name}</td>
                              <td className="p-3">{formatDate(item?.date)}</td>
                              <td className="p-3">
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                  {item.status === true ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="p-3">
                                <div className="flex space-x-1">
                                  <button className="p-1 bg-blue-500 text-white rounded">
                                    <Eye size={16} />
                                  </button>
                                  <button className="p-1 bg-cyan-500 text-white rounded">
                                    <Edit size={16} />
                                  </button>
                                  <button className="p-1 bg-red-500 text-white rounded">
                                    <Trash size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr className="bg-gray-100 border-b">
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Payment Type</th>
                            <th className="p-3 text-left">Paid Amount</th>
                            <th className="p-3 text-left">Account</th>
                            <th className="p-3 text-left">Payment Date</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {nonPurchasePaymentsData?.map((item, index) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                              <td className="p-3">{index + 1}</td>
                              <td className="p-3 text-blue-500">{item.type === 0 ? <p className="text-white bg-red-400 p-1 w-fit">Due</p> : <p className="text-white bg-green-500 p-1 w-fit">Payment</p>}</td>
                              <td className="p-3">{item.amount?.toFixed(2)}</td>
                              <td className="p-3">{item.account_transaction?.account?.bank_name}</td>
                              <td className="p-3">{formatDate(item?.date)}</td>
                              <td className="p-3">
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                  {item.status === true ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="p-3">
                                <div className="flex space-x-1">
                                  <button className="p-1 bg-blue-500 text-white rounded">
                                    <Eye size={16} />
                                  </button>
                                  <button className="p-1 bg-cyan-500 text-white rounded">
                                    <Edit size={16} />
                                  </button>
                                  <button className="p-1 bg-red-500 text-white rounded">
                                    <Trash size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )

                  }

                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    {/* <span className="mr-2 text-gray-600">Per Page</span>
                    <select
                      className="border border-gray-300 rounded p-1"
                      value={perPage}
                      onChange={(e) => setPerPage(parseInt(e.target.value))}
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                    </select> */}
                  </div>

                  <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700" onClick={() => window.history.back()}>
                    ← Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuppliersView;