import React, { useEffect, useRef } from "react";
import { X, Plus, Minus } from "lucide-react";
import { useGetStockProductsByIdQuery } from "../../../store/api/app/StockProduct/stockProductApiSlice";
import { useGetStoreCurrenciesQuery } from "../../../store/api/app/Currency/currenciesApiSlice";

const ProductsTableBody = ({
  item,
  index,
  updatePurchasePrice,
  updatePrice,
  updateQuantity,
  removeProduct,
  updateTableData,
  quotationProducts,
  purchase,
  id,
}) => {
  console.log("quotationProducts: body:: ", quotationProducts);
  const hasUpdated = useRef(false);

  const { data: stockProduct } = useGetStockProductsByIdQuery(item?.id);
  const { data: storeCurrency } = useGetStoreCurrenciesQuery();

  if (purchase && !id) {
    useEffect(() => {
      if (stockProduct?.data?.purchase_price && !hasUpdated.current) {
        updateTableData(index, { price: stockProduct.data.purchase_price });
        hasUpdated.current = true; // Prevent further updates for this item
      }
    }, [stockProduct, index, updateTableData]);
  }

  console.log("item::: ", item);

  return (
    <tr key={item.id} className="hover:bg-gray-50">
      {/* Serial */}
      <td className="py-3 px-4 text-sm text-gray-900">{index + 1}</td>
      {/* code */}
      <td className="py-3 px-4 text-sm text-gray-900">{item.code}</td>
      {/* Name */}
      <td className="py-3 px-4 text-sm text-blue-600">{item.name}</td>
      {/* Quantity */}
      <td className="py-3 px-4">
        <div className="flex items-center space-x-2">
          <button
            // onClick={() => updateQuantity(index, -1)}
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity(index, -1, item.id);
            }}
            type="button"
            className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            // onClick={() => updateQuantity(index, 1)}
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity(index, 1, item.id);
            }}
            type="button"
            className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </td>
      {/* Price */}
      <td className="py-3 px-4">
        <div className="flex items-center space-x-2">
          {/* Minus Button */}
          <button
            type="button"
            onClick={() => updatePurchasePrice(index, -1)}
            className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full"
          >
            <Minus className="w-4 h-4" />
          </button>

          {/* Input Field */}
          <div className="w-24 text-center flex items-center justify-center">
            {storeCurrency?.data?.currency?.symbol}
            <input
              className="w-16 text-center border rounded ml-1"
              type="text"
              value={item?.price}
              onChange={(e) =>
                updatePrice(index, parseFloat(e.target.value) || 0)
              }
              onBlur={(e) =>
                updatePrice(index, parseFloat(e.target.value) || 0)
              }
            />

          </div>

          {/* Plus Button */}
          <button
            type="button"
            onClick={() => updatePurchasePrice(index, 1)}
            className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </td>

      {/* Unit Cost */}
      <td className="py-3 px-4 text-sm text-gray-900">{storeCurrency?.data?.currency?.symbol} {item?.price?.toFixed(2)}</td>
      {/* Sub Total */}
      <td className="py-3 px-4 text-sm text-gray-900">{storeCurrency?.data?.currency?.symbol} {(item.price * item.quantity)?.toFixed(2)}</td>
      {/* Action */}
      <td className="py-3 px-4">
        <button
          type="button"
          onClick={() => removeProduct(item.id)}
          className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

export default ProductsTableBody;
