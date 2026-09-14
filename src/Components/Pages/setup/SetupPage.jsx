import React from "react";
import { Link } from "react-router-dom";
import {
  Settings, ShieldCheck, Coins, Scale, Percent, Tag, Wallet, ChevronRight, Building2,
} from "lucide-react";

const SETUP_ACCENTS = {
  sky: { grad: "from-sky-500 to-blue-600", ring: "ring-sky-100" },
  teal: { grad: "from-teal-500 to-emerald-600", ring: "ring-teal-100" },
  violet: { grad: "from-violet-500 to-indigo-600", ring: "ring-violet-100" },
  rose: { grad: "from-rose-500 to-pink-600", ring: "ring-rose-100" },
  emerald: { grad: "from-emerald-500 to-green-600", ring: "ring-emerald-100" },
  fuchsia: { grad: "from-fuchsia-500 to-purple-600", ring: "ring-fuchsia-100" },
  amber: { grad: "from-amber-500 to-orange-600", ring: "ring-amber-100" },
};

const SETUP_ITEMS = [
  {
    title: "Branch",
    description: "Manage the branches/outlets your store operates from.",
    icon: Building2,
    accent: "indigo",
    linkLabel: "Branches",
    to: "/store/dashboard/branches",
  },
  {
    title: "General",
    description: "General settings such as site title, site description, address and so on.",
    icon: Settings,
    accent: "sky",
    linkLabel: "Change Setting",
    to: "/store/dashboard/store-settings",
  },
  {
    title: "Role & Permissions",
    description: "Manage roles & permissions for users who are going to use the system.",
    icon: ShieldCheck,
    accent: "violet",
    linkLabel: "Roles & Permissions",
    to: "/store/dashboard/role-management",
  },
  {
    title: "Currencies",
    description: "Manage various types of currencies that you are going to use in the system.",
    icon: Coins,
    accent: "amber",
    linkLabel: "Currencies",
    to: "/store/dashboard/currency",
  },
  {
    title: "Units",
    description: "Manage unit types for measurement that you're going to use in the system.",
    icon: Scale,
    accent: "teal",
    linkLabel: "Units",
    to: "/store/dashboard/unit",
  },
  {
    title: "VAT Rates",
    description: "Manage VAT rates for VAT management that you're going to use in the system.",
    icon: Percent,
    accent: "rose",
    linkLabel: "VAT Rates",
    to: "/store/dashboard/tax",
  },
  {
    title: "Brands",
    description: "Manage brands that you're going to use in the system.",
    icon: Tag,
    accent: "fuchsia",
    linkLabel: "Brands",
    to: "/store/dashboard/brand",
  },
  {
    title: "Payment Methods",
    description: "Manage payment methods that you're going to use in the system.",
    icon: Wallet,
    accent: "emerald",
    linkLabel: "Payment Methods",
    to: "/store/dashboard/payment-methods",
  },
];

const SetupPage = () => {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-indigo-50/30 min-h-screen">

      {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {SETUP_ITEMS.map((item) => {
          const Icon = item.icon;
          const theme = SETUP_ACCENTS[item.accent] || SETUP_ACCENTS.sky;

          return (
            <Link
              key={item.title}
              to={item.to}
              className="group relative flex flex-col bg-white border border-slate-200/70 rounded-2xl p-4 sm:p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_18px_-12px_rgba(15,23,42,0.18)] hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_14px_28px_-12px_rgba(15,23,42,0.22)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`flex-shrink-0 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${theme.grad} text-white shadow-md ring-4 ${theme.ring}`}
                >
                  <Icon size={20} strokeWidth={2} />
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                  {item.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4 flex-1">
                {item.description}
              </p>

              <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-indigo-600 group-hover:gap-1.5 transition-all">
                {item.linkLabel}
                <ChevronRight size={15} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SetupPage;