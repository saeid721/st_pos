import React, { useEffect, useMemo, useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import ProductsTableBody from "./ProductsTableBody";
import { useGetStockProductsQuery } from "../../../store/api/app/StockProduct/stockProductApiSlice";
import { toast } from "react-toastify";
import { useGetStoreCurrenciesQuery } from "../../../store/api/app/Currency/currenciesApiSlice";
import InvoiceReturnTableBody from "./InvoiceReturnTableBody";
import PurchaseReturnTableBody from "./purchaseReturnTableBody";

const PurchaseReturnTable = ({
    purchaseReturnProducts,
    id,
    updateQuantity,
    purchaseProductsData,
    purchase,
    allProducts
}) => {

    // const calculateTotals = () => {
    //     return allProducts?.data?.reduce(
    //         (acc, item) => ({
    //             subtotal: acc.subtotal + item.purchase_price * item.quantity,
    //         }),
    //         { subtotal: 0, tax: 0 }
    //     );
    // };

    const totalPurchaseValue = useMemo(() => {
        if (!allProducts?.data) return 0;

        return allProducts.data.reduce((sum, item) => {
            return sum + item.purchase_price * item.quantity;
        }, 0);
    }, [allProducts]);
    console.log("totalPurchaseValue", totalPurchaseValue);


    return (
        <div className="w-full mt-6">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">#</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Code</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Name</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Purchase Qty</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Current Qty</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Return Qty</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Unit Cost</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Total Price</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Return Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {purchaseReturnProducts?.map((item, index) => (
                            <PurchaseReturnTableBody
                                item={item}
                                index={index}
                                purchaseReturnProducts={purchaseReturnProducts}
                                id={id}
                                purchaseProductsData={purchaseProductsData}
                                updateQuantity={updateQuantity}
                                allProducts={allProducts}
                            />
                        ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                        <tr>
                            <td colSpan="6" className="py-3 px-4"></td>

                            <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">Total</td>
                            <td className="py-3 px-4 text-sm font-medium text-gray-900"> {totalPurchaseValue.toFixed(2)}</td>
                            <td className="py-3 px-4"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default PurchaseReturnTable;
