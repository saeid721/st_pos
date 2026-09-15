import React, { useRef } from 'react';
import { useGetInventoryAdjustmentByIdQuery } from '../../../store/api/app/InventoryAdjustment/inventoryAdjustmentApiSlice';
import { useSystemSettings } from '../../../lib/SystemSettingsProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useGetStoresByIdQuery } from '../../../store/api/app/store/storeApiSlice';
import { useReactToPrint } from 'react-to-print';

const InventoryAdjustmentView = () => {

  const backendUrl = import.meta.env.VITE_LOCAL_API_URL;

  const { id } = useParams();

  const { data: viewData, isLoading, isError } = useGetInventoryAdjustmentByIdQuery(id);
  const inventoryAdjustmentData = viewData?.data || {};

  const { settings } = useSystemSettings();

  console.log("inventoryAdjustmentData", inventoryAdjustmentData);

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const { data: storeData } = useGetStoresByIdQuery(store_id);

  const componentRef = useRef();
  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Inventory-Adjustment-Details', // Static title here
  });

  const onPrint = () => {
    const title = `Inventory-Adjustment-${inventoryAdjustmentData?.inventory_adjustment_no || 'Details'}`;
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

  return (
    <div className="bg-gray-100 min-h-screen" ref={componentRef}>

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
              <h3 className="text-lg font-semibold">Adjustment Details</h3>
              <p className="text-sm text-gray-600"><strong>Reason:</strong> {inventoryAdjustmentData?.reason || ""}</p>
              {/* <p className="text-sm text-gray-600 mt-2"><strong>Created By:</strong> {inventoryAdjustmentData?.created_user?.storeRole?.name || ""}</p> */}
            </div>
          </div>
        </div>

        {/* Purchase Table */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
          <div className="p-4 border-b border-gray-200">
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adjustment No</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adjustment Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inventoryAdjustmentData?.adjustment_no}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inventoryAdjustmentData?.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(inventoryAdjustmentData?.date)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inventoryAdjustmentData?.note}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${inventoryAdjustmentData?.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {inventoryAdjustmentData?.status ? 'Active' : 'Inactive'}
                  </span>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inventoryAdjustmentData?.created_user?.storeRole?.name}</td> */}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-medium">Adjustment Products:</h3>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Price</th> */}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adjustment Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                inventoryAdjustmentData?.adjustmentItems?.map((product) => (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.product?.product_code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.product?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.quantity} {product?.product?.unit?.name}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${product?.adjustment_type === "INCREMENT" ? 'bg-green-100 w-fit' : 'bg-red-500 w-fit'}`}>
                      {product?.adjustment_type === "INCREMENT" ? "Increment" : "Decrement"}
                    </td>
                  </tr>
                ))
              }

            </tbody>
          </table>
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

export default InventoryAdjustmentView;