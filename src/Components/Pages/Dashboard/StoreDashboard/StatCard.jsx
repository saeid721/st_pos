import React from "react";
import { Link } from "react-router-dom";

export const ACCENTS = {
  sky: { grad: "from-sky-500 to-blue-600", bar: "bg-gradient-to-r from-sky-500 to-blue-600", ring: "ring-sky-100", border: "border-sky-200", bg: "bg-sky-50/60" },
  teal: { grad: "from-teal-500 to-emerald-600", bar: "bg-gradient-to-r from-teal-500 to-emerald-600", ring: "ring-teal-100", border: "border-teal-200", bg: "bg-teal-50/60" },
  violet: { grad: "from-violet-500 to-indigo-600", bar: "bg-gradient-to-r from-violet-500 to-indigo-600", ring: "ring-violet-100", border: "border-violet-200", bg: "bg-violet-50/60" },
  rose: { grad: "from-rose-500 to-pink-600", bar: "bg-gradient-to-r from-rose-500 to-pink-600", ring: "ring-rose-100", border: "border-rose-200", bg: "bg-rose-50/60" },
  emerald: { grad: "from-emerald-500 to-green-600", bar: "bg-gradient-to-r from-emerald-500 to-green-600", ring: "ring-emerald-100", border: "border-emerald-200", bg: "bg-emerald-50/60" },
  fuchsia: { grad: "from-fuchsia-500 to-purple-600", bar: "bg-gradient-to-r from-fuchsia-500 to-purple-600", ring: "ring-fuchsia-100", border: "border-fuchsia-200", bg: "bg-fuchsia-50/60" },
  amber: { grad: "from-amber-500 to-orange-600", bar: "bg-gradient-to-r from-amber-500 to-orange-600", ring: "ring-amber-100", border: "border-amber-200", bg: "bg-amber-50/60" },
  slate: { grad: "from-slate-600 to-slate-800", bar: "bg-gradient-to-r from-slate-600 to-slate-800", ring: "ring-slate-200", border: "border-slate-200", bg: "bg-slate-50/60" },
  indigo: { grad: "from-indigo-500 to-blue-600", bar: "bg-gradient-to-r from-indigo-500 to-blue-600", ring: "ring-indigo-100", border: "border-indigo-200", bg: "bg-indigo-50/60" },
};

const StatCard = ({ title, value, icon: Icon, accent = "slate", currency = "৳", to }) => {
  const theme = ACCENTS[accent] || ACCENTS.slate;

      const className =
    `group relative isolate block ${theme.bg} border ${theme.border} rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_18px_-12px_rgba(15,23,42,0.18)] hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_24px_-12px_rgba(15,23,42,0.22)] hover:-translate-y-0.5 transition-all duration-200` +
    (to ? " cursor-pointer" : "");

  const inner = (
    <>
      <span className={`absolute inset-x-0 top-0 h-[3px] ${theme.bar}`} />
      {Icon && (
                <Icon
          size={54}
          strokeWidth={1.2}
          className="absolute -right-2 -bottom-3 text-slate-900 opacity-[0.07] pointer-events-none"
        />
      )}
      <div className="relative p-2.5 sm:p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[9.5px] sm:text-[10.5px] font-bold text-slate-400 uppercase tracking-wide truncate">
              {title}
            </p>
            <p className="mt-1 text-base sm:text-xl font-extrabold text-slate-800 tabular-nums leading-none truncate">
              {currency}
              {value ?? "0.00"}
            </p>
          </div>
          {Icon && (
            <span
              className={`flex-shrink-0 inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br ${theme.grad} text-white shadow-md ring-[3px] ${theme.ring}`}
            >
              <Icon size={16} strokeWidth={2.2} />
            </span>
          )}
        </div>
        {to && (
          <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
            View details →
          </span>
        )}
      </div>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
};

export default StatCard;