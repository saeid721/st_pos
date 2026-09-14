import React from 'react';
import { useGetProductsByIdQuery } from '../../../store/api/app/Products/productsApiSlice';
import { useParams } from 'react-router-dom';

const ProductsView = () => {
  const { id } = useParams();

  const { data: viewData, isLoading, isError } = useGetProductsByIdQuery(id);
  const productData = viewData?.data || {};
  console.log("productData,,", productData);

  const backendUrl = import.meta.env.VITE_LOCAL_API_URL;

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Header */}
      <div className="border-b p-4 flex justify-between items-center bg-gray-50">
        <h1 className="text-lg font-medium text-gray-700">Product Details</h1>
        <div className="text-sm text-blue-500 flex space-x-2">
          <a href="#">Dashboard</a>
          <span>&gt;</span>
          <a href="#">Products</a>
          <span>&gt;</span>
          <span className="text-gray-500">Details</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <div className="border rounded shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Image placeholder */}
            <div className="p-8 flex justify-center items-center border-r">
              <div className="w-full h-64 bg-gray-100 flex justify-center items-center">
                {productData?.main_image ? (
                  <img src={`${backendUrl}${productData?.main_image}`} alt="Client" className="w-full h-full" />
                ) : (
                  <span>No Preview</span>
                )}
                {/* <img src="/api/placeholder/400/320" alt="Product" className="max-h-full" /> */}
              </div>
            </div>

            {/* Right side - Details */}
            <div className="flex flex-col">
              {/* Product Info Table */}
              <div className="w-full">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Barcode</td>
                      <td className="py-2 px-4 flex items-center justify-between">
                        <span>{productData?.barcode_symbology}</span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Name</td>
                      <td className="py-2 px-4 text-blue-500">{productData?.name}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Code</td>
                      <td className="py-2 px-4">{productData?.product_code}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Item Model</td>
                      <td className="py-2 px-4">{productData?.model}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Barcode Symbology</td>
                      <td className="py-2 px-4 text-blue-500">{productData?.barcode_symbology}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Category</td>
                      <td className="py-2 px-4">{productData?.category?.name}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Sub Category</td>
                      <td className="py-2 px-4">{productData?.sub_category?.name}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Brand</td>
                      <td className="py-2 px-4">{productData?.brand?.name}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Unit</td>
                      <td className="py-2 px-4">{productData?.unit?.name}</td>
                    </tr>
                    {/* <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Product Tax</td>
                      <td className="py-2 px-4">{productData?.Taxs?.name}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Tax Type</td>
                      <td className="py-2 px-4">{productData?.tax_type}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Tax Amount</td>
                      <td className="py-2 px-4">/ 23.33 / confuse</td>
                    </tr> */}
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Regular Price</td>
                      <td className="py-2 px-4">{productData?.regular_price}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Selling Price</td>
                      <td className="py-2 px-4">
                        <span className="line-through text-gray-500">TK{productData?.regular_price}</span> <span> </span>
                        <span>TK{productData?.sale_price} ({productData?.regular_price && productData?.sale_price
                          ? `${Math.round(
                            ((productData.regular_price - productData.sale_price) /
                              productData.regular_price) *
                            100
                          )}%`
                          : ""})</span>
                      </td>
                    </tr>
                    {/* <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Avg. Purchase Price</td>
                      <td className="py-2 px-4">/ 1K25.00 / confuse</td>
                    </tr> */}
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Stock</td>
                      <td className="py-2 px-4">{productData?.StockProduct?.reduce((sum, stock) => sum + stock.stock_quantity, 0)} ps</td>
                    </tr>
                    {/* <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Inventory Value</td>
                      <td className="py-2 px-4"> / 1K600.00 / confuse</td>
                    </tr> */}
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Alert Quantity</td>
                      <td className="py-2 px-4">{productData?.alert_qty} ps</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Note</td>
                      <td className="py-2 px-4">{productData?.note}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium text-gray-600 bg-gray-50 border-r">Status</td>
                      <td className="py-2 px-4">
                        {
                          productData?.status === true ?
                            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Active</span>
                            :
                            <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Inactive</span>
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-4 flex justify-between">
          <button className="flex items-center border rounded px-4 py-2 text-gray-600 bg-white hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>

       

          <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsView;