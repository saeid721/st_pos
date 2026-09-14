import React, { useEffect, useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import ProductsTableBody from "./ProductsTableBody";
import { useGetStockProductsQuery } from "../../../store/api/app/StockProduct/stockProductApiSlice";
import { toast } from "react-toastify";
import { useGetStoreCurrenciesQuery } from "../../../store/api/app/Currency/currenciesApiSlice";
import InvoiceReturnTableBody from "./InvoiceReturnTableBody";

const InvoiceReturnTable = ({
    invoiceReturnProducts,
    id,
    updateQuantity,
    invoiceProductsData,
    invoice
}) => {
    console.log("invoice", invoice);

    const calculateTotals = () => {
        // return tableData.reduce(
        //     (acc, item) => ({
        //         subtotal: acc.subtotal + item.price * item.quantity,
        //     }),
        //     { subtotal: 0, tax: 0 }
        // );
    };

    return (
        <div className="w-full mt-6">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">#</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Code</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Product Name</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Invoice Qty</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Current Qty</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Return Qty</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Unit Price</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Total Price</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Return Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {invoiceReturnProducts?.map((item, index) => (
                            <InvoiceReturnTableBody
                                item={item}
                                index={index}
                                invoiceReturnProducts={invoiceReturnProducts}
                                id={id}
                                invoiceProductsData={invoiceProductsData}
                                updateQuantity={updateQuantity}
                            />
                        ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                        <tr>
                            <td colSpan="6" className="py-3 px-4"></td>

                            <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">Total</td>
                            <td className="py-3 px-4 text-sm font-medium text-gray-900"> {invoice?.sub_total?.toFixed(2)}</td>
                            <td className="py-3 px-4"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default InvoiceReturnTable;
