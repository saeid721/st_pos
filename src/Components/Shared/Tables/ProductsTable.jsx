import React, { useEffect, useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import ProductsTableBody from "./ProductsTableBody";
import { useGetStockProductsQuery } from "../../../store/api/app/StockProduct/stockProductApiSlice";
import { toast } from "react-toastify";
import { useGetStoreCurrenciesQuery } from "../../../store/api/app/Currency/currenciesApiSlice";

const ProductsTable = ({
  selectedProductIds,
  allProducts,
  onChange,
  removeProduct,
  quotation,
  purchase,
  quotationProducts,
  id,
  purchaseProducts,
}) => {
  const [tableData, setTableData] = useState([]);

  console.log("quotationProducts:: ", quotationProducts);

  const { data: stockProducts } = useGetStockProductsQuery();
  const { data: storeCurrency } = useGetStoreCurrenciesQuery();

  useEffect(() => {
    if (!allProducts?.data || !selectedProductIds) return;

    const initialData = allProducts?.data
      .filter((product) => selectedProductIds.includes(product.id))
      .map((product) => ({
        id: product.id,
        code: `AP-${String(product.id).padStart(6, "0")}`,
        name: product.name,
        quantity: quotationProducts?.find((quotationProduct) => quotationProduct?.product_id === product.id)?.quantity || purchaseProducts?.find((purchaseProducts) => purchaseProducts?.product_id === product.id)?.quantity || 1,
        price:
          quotationProducts?.length > 0 && id
            ? quotationProducts?.find((quotationProduct) => quotationProduct?.product_id === product.id)?.sale_price
            : purchaseProducts?.length > 0 && id
              ? purchaseProducts?.find((purchaseProducts) => purchaseProducts?.product_id === product.id)?.purchase_price
              : quotation
                ? product?.sale_price
                : product?.purchase_price || 0,
        unit_cost:
          quotationProducts?.length > 0
            ? quotationProducts?.find((quotationProduct) => quotationProduct?.product_id === product.id)?.sale_price
            : quotation
              ? product?.sale_price
              : product?.purchase_price || 0,
      }));

    setTableData(initialData);
  }, [selectedProductIds, allProducts, quotationProducts, id]);

  useEffect(() => {
    const formattedData = tableData.map((item) => ({
      quantity: item.quantity,
      price: purchase ? parseFloat(item.price) : parseFloat(item.price),
      unit_cost: parseFloat(item.unit_cost),
      product_id: item.id,
    }));

    onChange?.(formattedData);
  }, [tableData, onChange, quotationProducts]);

  const updateTableData = (index, updatedData) => {
    setTableData((prev) => {
      const newData = [...prev];
      newData[index] = {
        ...newData[index],
        ...updatedData,
      };
      return newData;
    });
  };

  const updateQuantity = (index, increment, product_id) => {
    setTableData((prev) => {
      const newData = [...prev];
      const newQuantity = Math.max(1, newData[index].quantity + increment);

      // const stockProduct = stockProducts?.data.find((product) => product.product_id === product_id);
      const stockProduct = allProducts?.data.find((product) => product.id === product_id);

      // if (stockProduct && newQuantity > stockProduct.stock_quantity) {
      // if (stockProduct && newQuantity > stockProduct.inventory_count) {
      //   toast.error("Quantity exceeds available stock!");
      //   return prev;
      // }

      newData[index] = {
        ...newData[index],
        quantity: newQuantity,
      };

      return newData;
    });
  };

  const updatePrice = (index, newPrice) => {
    setTableData((prev) => {
      const newData = [...prev];
      newData[index] = {
        ...newData[index],
        price: newPrice,
        unit_cost: newPrice, // keep unit_cost same as price
      };
      return newData;
    });
  };

  const updatePurchasePrice = (index, increment) => {
    setTableData((prev) => {
      const newData = [...prev];
      const newPrice = Math.max(0, parseFloat(newData[index].price) + increment);
      newData[index] = {
        ...newData[index],
        price: newPrice,
        unit_cost: newPrice,
      };
      return newData;
    });
  };

  const calculateTotals = () => {
    return tableData.reduce(
      (acc, item) => ({
        subtotal: acc.subtotal + item.price * item.quantity,
      }),
      { subtotal: 0, tax: 0 }
    );
  };

  return (
    <div className="w-full mt-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">#</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Code</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Quantity</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">{quotation ? "Price" : "Purchase Price"} </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Unit Cost</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Subtotal</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData?.map((item, index) => (
              <ProductsTableBody
                item={item}
                index={index}
                updateQuantity={updateQuantity}
                updatePurchasePrice={updatePurchasePrice}
                updatePrice={updatePrice}
                removeProduct={removeProduct}
                purchase={purchase}
                updateTableData={updateTableData}
                quotationProducts={quotationProducts}
                id={id}
              />
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan="5" className="py-3 px-4"></td>

              <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">Total</td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">{storeCurrency?.data?.currency?.symbol} {calculateTotals().subtotal.toFixed(2)}</td>
              <td className="py-3 px-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
