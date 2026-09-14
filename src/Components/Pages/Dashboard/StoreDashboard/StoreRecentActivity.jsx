import React from 'react';
import { Link } from 'react-router-dom';
import {
    FileText,
    ShoppingCart,
    CreditCard,
    ArrowUpDown,
    Calendar,
    User,
    DollarSign,
    Building,
    CheckCircle,
    XCircle,
    TrendingUp,
    TrendingDown
} from 'lucide-react';
import { formatCurrency, formatDate } from '../../../../lib/format';

const StoreRecentActivity = ({ activeTab, invoiceData, purchaseData, expensesData, transactionsData }) => {
    const StatusBadge = ({ status }) => (
        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${status === true
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
            {status === true ? <CheckCircle size={10} /> : <XCircle size={10} />}
            {status === true ? 'Active' : 'Inactive'}
        </div>
    );

    const TransactionTypeBadge = ({ type }) => (
        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${type === 0
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
            {type === 0 ? <TrendingDown size={10} /> : <TrendingUp size={10} />}
            {type === 0 ? 'Debit' : 'Credit'}
        </div>
    );

    const thClass = "py-2 px-3 sm:px-4 text-[10px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap";
    const tdClass = "py-2 px-3 sm:px-4 whitespace-nowrap";

    const EmptyRow = ({ colSpan, label }) => (
        <tr>
            <td colSpan={colSpan} className="py-8 text-center text-xs text-slate-400">
                No {label} found
            </td>
        </tr>
    );

    return (
        <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
            {activeTab === 'Invoices' && (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-indigo-50/60 border-b border-slate-100">
                            <tr className="text-left">
                                <th className={thClass}>#</th>
                                <th className={thClass}>Invoice No</th>
                                <th className={thClass}>Date</th>
                                <th className={thClass}>Client</th>
                                <th className={thClass}>Subtotal</th>
                                <th className={thClass}>Net Total</th>
                                <th className={thClass}>Total Due</th>
                                <th className={thClass}>Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {invoiceData?.data?.length ? invoiceData.data.map((invoice, index) => (
                                <tr key={invoice.id} className="hover:bg-slate-50 transition-colors duration-150">
                                    <td className={tdClass}>
                                        <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-[10px] font-medium">
                                            {index + 1}
                                        </div>
                                    </td>
                                                                        <td className={tdClass}>
                                        <Link to={`/store/dashboard/invoices-list/${invoice.id}`} className="flex items-center gap-1.5 w-fit">
                                            <FileText size={13} className="text-indigo-500" />
                                            <span className="text-indigo-600 font-medium text-xs hover:text-indigo-800 hover:underline cursor-pointer">
                                                {invoice.invoice_no}
                                            </span>
                                        </Link>
                                    </td>
                                    <td className={tdClass}>
                                        <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                                            <Calendar size={12} className="text-slate-400" />
                                            {formatDate(invoice.invoice_date)}
                                        </div>
                                    </td>
                                    <td className={tdClass}>
                                        <div className="flex items-center gap-1.5">
                                            <User size={12} className="text-slate-400" />
                                            <span className="font-medium text-slate-900 text-xs">{invoice.client.name}</span>
                                        </div>
                                    </td>
                                    <td className={tdClass}>
                                        <span className="text-slate-900 font-medium text-xs">
                                            {formatCurrency(invoice.sub_total.toFixed(2))}
                                        </span>
                                    </td>
                                    <td className={tdClass}>
                                        <span className="text-slate-900 font-medium text-xs">
                                            {formatCurrency((invoice?.sub_total - invoice?.discounted_amount + invoice?.total_tax + invoice?.transport).toFixed(2))}
                                        </span>
                                    </td>
                                    <td className={tdClass}>
                                        <span className="text-amber-600 font-semibold text-xs">
                                            {formatCurrency(((invoice?.sub_total - invoice?.discounted_amount + invoice?.total_tax + invoice?.transport) - invoice?.invoice_payments?.reduce((acc, payment) => acc + payment.amount, 0) || 0)?.toFixed(2))}
                                        </span>
                                    </td>
                                    <td className={tdClass}>
                                        <StatusBadge status={invoice.status} />
                                    </td>
                                </tr>
                            )) : <EmptyRow colSpan={8} label="invoices" />}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'Purchases' && (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-emerald-50/60 border-b border-slate-100">
                            <tr className="text-left">
                                <th className={thClass}>#</th>
                                <th className={thClass}>Purchase No</th>
                                <th className={thClass}>Date</th>
                                <th className={thClass}>Supplier</th>
                                <th className={thClass}>Subtotal</th>
                                <th className={thClass}>Net Total</th>
                                <th className={thClass}>Total Due</th>
                                <th className={thClass}>Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {(purchaseData?.data)?.length ? purchaseData.data.map((purchase) => (
                                <tr key={purchase.id} className="hover:bg-slate-50 transition-colors duration-150">
                                    <td className={tdClass}>
                                        <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-[10px] font-medium">
                                            {purchase.id}
                                        </div>
                                    </td>
                                                                        <td className={tdClass}>
                                        <Link to={`/store/dashboard/purchases-list/${purchase.id}`} className="flex items-center gap-1.5 w-fit">
                                            <ShoppingCart size={13} className="text-emerald-500" />
                                            <span className="text-emerald-600 font-medium text-xs hover:text-emerald-800 hover:underline cursor-pointer">
                                                {purchase.purchase_no}
                                            </span>
                                        </Link>
                                    </td>
                                    <td className={tdClass}>
                                        <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                                            <Calendar size={12} className="text-slate-400" />
                                            {formatDate(purchase.purchase_date)}
                                        </div>
                                    </td>
                                    <td className={tdClass}>
                                        <div className="flex items-center gap-1.5">
                                            <Building size={12} className="text-slate-400" />
                                            <span className="font-medium text-slate-900 text-xs">{purchase.supplier?.name}</span>
                                        </div>
                                    </td>
                                    <td className={tdClass}>
                                        <span className="text-slate-900 font-medium text-xs">
                                            {formatCurrency(purchase.sub_total.toFixed(2))}
                                        </span>
                                    </td>
                                    <td className={tdClass}>
                                        <span className="text-slate-900 font-medium text-xs">
                                            {formatCurrency((purchase?.sub_total - purchase?.discounted_amount + purchase?.tax?.rate + purchase?.transport)?.toFixed(2))}
                                        </span>
                                    </td>
                                    <td className={tdClass}>
                                        <span className="text-amber-600 font-semibold text-xs">
                                            {formatCurrency(((purchase?.sub_total - purchase?.discounted_amount + purchase?.tax?.rate + purchase?.transport) - purchase?.purchase_payments?.reduce((acc, payment) => acc + payment.amount, 0) || 0)?.toFixed(2))}
                                        </span>
                                    </td>
                                    <td className={tdClass}>
                                        <StatusBadge status={purchase.status} />
                                    </td>
                                </tr>
                            )) : <EmptyRow colSpan={8} label="purchases" />}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'Expenses' && (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-violet-50/60 border-b border-slate-100">
                            <tr className="text-left">
                                <th className={thClass}>#</th>
                                <th className={thClass}>Sub Category</th>
                                <th className={thClass}>Expense Reason</th>
                                <th className={thClass}>Amount</th>
                                <th className={thClass}>Account</th>
                                <th className={thClass}>Date</th>
                                <th className={thClass}>Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {(expensesData?.data)?.length ? expensesData.data.map((expense, index) => (
                                <tr key={expense.id} className="hover:bg-slate-50 transition-colors duration-150">
                                    <td className={tdClass}>
                                        <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center text-violet-700 text-[10px] font-medium">
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className={tdClass}>
                                        <div className="flex items-center gap-1.5">
                                            <CreditCard size={13} className="text-violet-500" />
                                            <span className="text-violet-600 font-medium text-xs">
                                                {expense?.expense_sub_category?.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={tdClass}>
                                        <span className="text-slate-700 text-xs">{expense.reason}</span>
                                    </td>
                                    <td className={tdClass}>
                                        <div className="flex items-center gap-1">
                                            <DollarSign size={12} className="text-slate-400" />
                                            <span className="text-rose-600 font-semibold text-xs">
                                                {formatCurrency(expense.amount?.toFixed(2))}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={tdClass}>
                                        <div className="flex items-center gap-1.5">
                                            <Building size={12} className="text-slate-400" />
                                            <span className="text-slate-700 text-xs">{expense.account_transaction?.account?.bank_name}</span>
                                        </div>
                                    </td>
                                    <td className={tdClass}>
                                        <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                                            <Calendar size={12} className="text-slate-400" />
                                            {formatDate(expense.date)}
                                        </div>
                                    </td>
                                    <td className={tdClass}>
                                        <StatusBadge status={expense.status} />
                                    </td>
                                </tr>
                            )) : <EmptyRow colSpan={7} label="expenses" />}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'Transactions' && (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-amber-50/60 border-b border-slate-100">
                            <tr className="text-left">
                                <th className={thClass}>#</th>
                                <th className={thClass}>Reason</th>
                                <th className={thClass}>Date</th>
                                <th className={thClass}>Type</th>
                                <th className={thClass}>Account</th>
                                <th className={thClass}>Amount</th>
                                <th className={thClass}>Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {transactionsData?.data?.length ? transactionsData.data.map((transaction, index) => (
                                <tr key={transaction.id} className="hover:bg-slate-50 transition-colors duration-150">
                                    <td className={tdClass}>
                                        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 text-[10px] font-medium">
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className={tdClass}>
                                        <div className="flex items-center gap-1.5">
                                            <ArrowUpDown size={13} className="text-amber-500" />
                                            <span className="text-amber-600 font-medium text-xs">{transaction.reason}</span>
                                        </div>
                                    </td>
                                    <td className={tdClass}>
                                        <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                                            <Calendar size={12} className="text-slate-400" />
                                            {formatDate(transaction.transaction_date)}
                                        </div>
                                    </td>
                                    <td className={tdClass}>
                                        <TransactionTypeBadge type={transaction.type} />
                                    </td>
                                    <td className={tdClass}>
                                        <div className="flex items-center gap-1.5">
                                            <Building size={12} className="text-slate-400" />
                                            <span className="text-slate-700 text-xs">{transaction.account.bank_name}</span>
                                        </div>
                                    </td>
                                    <td className={tdClass}>
                                        <div className="flex items-center gap-1">
                                            <DollarSign size={12} className="text-slate-400" />
                                            <span className={`font-semibold text-xs ${transaction.type === 0 ? 'text-rose-600' : 'text-emerald-600'
                                                }`}>
                                                {formatCurrency(transaction.amount?.toFixed(2))}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={tdClass}>
                                        <StatusBadge status={transaction.status} />
                                    </td>
                                </tr>
                            )) : <EmptyRow colSpan={7} label="transactions" />}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default StoreRecentActivity;