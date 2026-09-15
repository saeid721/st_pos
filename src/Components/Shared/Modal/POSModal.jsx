import React, { useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import TextInput from "../TextInput/TextInput";
import CustomReactSelect from "../Select/CustomReactSelect";

const POSModal = ({ onClose, register, errors, control, accounts, totals, currency = "৳", paidAmount, isLoading }) => {
  // Esc to close + lock body scroll while the sheet is open
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const net = Number(totals?.netTotal || 0);
  const paid = Number(paidAmount || 0);
  const due = Math.max(0, net - paid);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-slate-200">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">Add Payment</h2>
            <p className="text-xs text-slate-500">Record the payment against this invoice</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Totals strip */}
        <div className="grid grid-cols-3 divide-x divide-slate-200 border-b border-slate-200 bg-slate-50">
          <div className="px-3 py-2.5 text-center">
            <p className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Net Total</p>
            <p className="text-sm font-bold text-slate-800">{currency}{net.toFixed(2)}</p>
          </div>
          <div className="px-3 py-2.5 text-center">
            <p className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Paid</p>
            <p className="text-sm font-bold text-emerald-600">{currency}{paid.toFixed(2)}</p>
          </div>
          <div className="px-3 py-2.5 text-center">
            <p className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Due</p>
            <p className={`text-sm font-bold ${due > 0 ? "text-red-600" : "text-slate-800"}`}>
              {currency}{due.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Scrollable body — this is what was missing; the form used to overflow off-screen */}
        <div className="overflow-y-auto px-4 sm:px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5">
          <CustomReactSelect
            control={control}
            name="account_id"
            label="Account"
            placeholder="Select account"
            options={accounts?.data?.map((item) => ({ value: item.id, label: item.bank_name })) || []}
            required={true}
            error={errors?.account_id}
          />
          <TextInput
            name="paid_amount"
            label="Paid Amount"
            type="number"
            register={register}
            error={errors?.paid_amount}
            placeholder="Enter paid amount"
            required={true}
          />
          <TextInput name="cheque_no" label="Cheque No" type="text" register={register} error={errors?.cheque_no} placeholder="Enter cheque no" />
          <TextInput name="receipt_no" label="Receipt No" type="text" register={register} error={errors?.receipt_no} placeholder="Enter receipt no" />
          <TextInput name="po_reference" label="PO Reference" type="text" register={register} error={errors?.po_reference} placeholder="Enter PO reference" />
          <TextInput name="payment_terms" label="Payment Terms" type="text" register={register} error={errors?.payment_terms} placeholder="Enter payment terms" />
          <TextInput name="reference" label="Reference" type="text" register={register} error={errors?.reference} placeholder="Enter reference" />
          <TextInput name="delivery_place" label="Delivery Place" type="text" register={register} error={errors?.delivery_place} placeholder="Enter delivery place" />
          <TextInput name="invoice_date" label="Date" type="datetime-local" register={register} error={errors?.invoice_date} />
          <TextInput name="note" label="Note" type="text" register={register} error={errors?.note} placeholder="Enter note" />
        </div>

        {/* Sticky footer */}
        <div className="flex gap-2.5 px-4 sm:px-5 py-3 border-t border-slate-200 bg-white rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-sm transition-colors"
          >
            {isLoading && <Loader2 size={15} className="animate-spin" />}
            {isLoading ? "Saving…" : "Confirm & Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default POSModal;