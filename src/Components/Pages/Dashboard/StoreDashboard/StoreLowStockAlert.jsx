import { AlertTriangle, Package } from 'lucide-react';
import React from 'react';

const StoreLowStockAlert = ({ lowStockProducts }) => {
    const items = lowStockProducts?.data || [];

    return (
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_18px_-12px_rgba(15,23,42,0.18)]">
            <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-rose-50 text-rose-600">
                    <AlertTriangle size={14} />
                </span>
                <h3 className="text-[13px] sm:text-[15px] font-bold text-slate-800 tracking-tight">Stock Alert</h3>
            </div>

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                    <Package size={24} className="mb-2" />
                    <p className="text-xs">No low-stock products right now</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-slate-100">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="text-left py-2 px-3 sm:px-4 font-semibold text-slate-500 text-[10px] uppercase tracking-wider whitespace-nowrap">#</th>
                                <th className="text-left py-2 px-3 sm:px-4 font-semibold text-slate-500 text-[10px] uppercase tracking-wider whitespace-nowrap">Code</th>
                                <th className="text-left py-2 px-3 sm:px-4 font-semibold text-slate-500 text-[10px] uppercase tracking-wider whitespace-nowrap">Name</th>
                                <th className="text-left py-2 px-3 sm:px-4 font-semibold text-slate-500 text-[10px] uppercase tracking-wider whitespace-nowrap">Quantity</th>
                                <th className="text-left py-2 px-3 sm:px-4 font-semibold text-slate-500 text-[10px] uppercase tracking-wider whitespace-nowrap">Alert Qty</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {items.map((item, index) => (
                                <tr key={item.id} className="hover:bg-rose-50/30 transition-colors duration-150">
                                    <td className="py-2 px-3 sm:px-4">
                                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className="py-2 px-3 sm:px-4">
                                        <span className="inline-block bg-slate-100 px-2 py-0.5 rounded-md font-mono text-[11px] text-slate-700 whitespace-nowrap">
                                            {item?.product?.product_code}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3 sm:px-4">
                                        <span className="text-indigo-600 font-medium text-xs whitespace-nowrap">
                                            {item?.product?.name}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3 sm:px-4">
                                        <span className="inline-flex items-center gap-1 text-rose-600 font-semibold text-xs bg-rose-50 px-1.5 py-0.5 rounded-md border border-rose-100 whitespace-nowrap">
                                            <AlertTriangle size={11} />
                                            {item?.stock_quantity} ps
                                        </span>
                                    </td>
                                    <td className="py-2 px-3 sm:px-4">
                                        <span className="text-slate-600 text-xs whitespace-nowrap">
                                            {item?.product?.alert_qty} ps
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default StoreLowStockAlert;