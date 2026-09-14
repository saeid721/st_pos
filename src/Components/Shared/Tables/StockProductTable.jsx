import React, { useEffect, useMemo, useState } from "react";
import { useGetStockProductsQuery } from "../../../store/api/app/StockProduct/stockProductApiSlice";
import { toast } from "react-toastify";
import StockProductTableBody from "./StockProductTableBody";
import { useGetStoreCurrenciesQuery } from "../../../store/api/app/Currency/currenciesApiSlice";

const StockProductTable = ({
  selectedProductIds,
  allProducts,
  onChange,
  removeProduct,
  quotation,
  purchase,
  invoiceProductList,
  id,
  purchaseProducts,
}) => {
  const [tableData, setTableData] = useState([]);

  const { data: stockProducts } = useGetStockProductsQuery();
  const {data: storeCurrency} = useGetStoreCurrenciesQuery();

  console.log("allProducts::: ", allProducts);

  const memoizedProducts = useMemo(() => allProducts?.data || [], [allProducts]);
  const memoizedSelectedIds = useMemo(() => selectedProductIds || [], [selectedProductIds]);
  const memoizedInvoiceList = useMemo(() => invoiceProductList || [], [invoiceProductList]);
  console.log(memoizedSelectedIds);
  console.log(memoizedInvoiceList);
  console.log("memoizedProducts", memoizedProducts);
  useEffect(() => {
    if (!memoizedProducts || !memoizedSelectedIds) return;

    const initialData = memoizedProducts
      .filter((product) => memoizedSelectedIds.includes(product.product_id))
      .map((product) => {
        return {
          stockId: product?.id,
          id: product?.product_id,
          code: `AP-${String(product.id).padStart(6, "0")}`,
          name: product.product.name,
          quantity:
            memoizedInvoiceList?.find((quotationProduct) => quotationProduct?.product_id === product.product_id)?.quantity || 1,
          price:
            memoizedInvoiceList?.length > 0 && id
              ? memoizedInvoiceList?.find((quotationProduct) => quotationProduct?.product_id === product.product_id)?.sale_price
              : product?.product?.sale_price || 0,
          unit_cost:
            memoizedInvoiceList?.length > 0
              ? memoizedInvoiceList?.find((quotationProduct) => quotationProduct?.product_id === product.product_id)?.sale_price
              : quotation
              ? product?.regular_price
              : product?.product?.sale_price || 0,
        };
      });

    setTableData((prevData) => {
      const isDataUnchanged = JSON.stringify(prevData) === JSON.stringify(initialData);
      return isDataUnchanged ? prevData : initialData;
    });
  }, [memoizedProducts, memoizedSelectedIds, memoizedInvoiceList, id]);

  useEffect(() => {
    const formattedData = tableData.map((item) => ({
      quantity: item.quantity,
      sale_price: purchase ? parseFloat(item.price) : parseFloat(item.price),
      product_id: item?.id,
    }));
    onChange?.(formattedData);
  }, [tableData, onChange, memoizedInvoiceList]);

  console.log(tableData);
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

      const stockProduct = stockProducts?.data.find((product) => product.product_id === product_id);

      if (stockProduct && newQuantity > stockProduct.stock_quantity) {
        toast.error("Quantity exceeds available stock!");
        return prev;
      }

      newData[index] = {
        ...newData[index],
        quantity: newQuantity,
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
      };
      return newData;
    });
  };

  const updatePrice = (index, increment) => {
    setTableData((prev) => {
      const newData = [...prev];
      newData[index] = {
        ...newData[index],
        price: increment,
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
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">{quotation ? "Price" : "Sale Price"} </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Unit Cost</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Subtotal</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData?.map((item, index) => (
              <StockProductTableBody
                key={index}
                item={item}
                index={index}
                updateQuantity={updateQuantity}
                updatePurchasePrice={updatePurchasePrice}
                updatePrice={updatePrice}
                removeProduct={removeProduct}
                purchase={purchase}
                updateTableData={updateTableData}
                quotationProducts={memoizedInvoiceList}
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

export default StockProductTable;
