import React, { useEffect, useRef } from "react";
import { X, Plus, Minus } from "lucide-react";
import { useGetStockProductsByIdQuery } from "../../../store/api/app/StockProduct/stockProductApiSlice";
import { useGetStoreCurrenciesQuery } from "../../../store/api/app/Currency/currenciesApiSlice";

const InvoiceReturnTableBody = ({
  item,
  index,
  updateQuantity,
  invoiceReturnProducts,
  invoiceProductsData
}) => {
  

  const invoiceReturnProduct = invoiceProductsData?.find(
    (product) => product?.product_id === item?.product?.id
  );

  console.log("invoiceReturnProduct:  ", invoiceReturnProduct);


  return (
    <tr key={item?.id} className="hover:bg-gray-50">
      {/* Serial */}
      <td className="py-3 px-4 text-sm text-gray-900">{index + 1}</td>
      {/* code */}
      <td className="py-3 px-4 text-sm text-gray-900">{item?.product?.product_code}</td>
      {/* Name */}
      <td className="py-3 px-4 text-sm text-blue-600">{item?.product?.name}</td>
      {/* Invoice Quantity */}
      <td className="py-3 px-4 text-sm text-blue-600">{item?.quantity} pcs</td>
      {/* Current Quantity */}
      <td className="py-3 px-4 text-sm text-blue-600">{item?.quantity} pcs</td>
      {/* Return Quantity */}
      <td className="py-3 px-4">
        <div className="flex items-center space-x-2">
          <button
            // onClick={() => updateQuantity(index, -1)}
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity(index, -1, item?.id);
            }}
            type="button"
            className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center">{invoiceReturnProduct?.quantity}</span>
          <button
            // onClick={() => updateQuantity(index, 1)}
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity(index, 1, item?.id);
            }}
            type="button"
            className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </td>

      {/* Unit Cost */}
      <td className="py-3 px-4 text-sm text-gray-900">{item?.unit_cost?.toFixed(2)}</td>
      {/* Sub Total */}
      <td className="py-3 px-4 text-sm text-gray-900">{(item?.unit_cost * item?.quantity)?.toFixed(2)}</td>
      {/* Return Price */}
      <td className="py-3 px-4 text-sm text-gray-900">{(item?.unit_cost * invoiceReturnProduct?.quantity)?.toFixed(2)}</td>
    </tr>
  );
};

export default InvoiceReturnTableBody;
