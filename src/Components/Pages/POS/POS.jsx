import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Search,
  Plus,
  Trash2,
  Minus,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ShoppingCart,
  ImageOff,
  Loader2,
  AlertTriangle,
  RotateCcw,
  Save,
  CreditCard,
} from "lucide-react";
import { Card, CardContent } from "@/Components/ui/card";
import { useGetStockProductsByPaginationQuery } from "../../../store/api/app/StockProduct/stockProductApiSlice";
import { useGetCategoriesByPaginationQuery } from "../../../store/api/app/Category/categoryApiSlice";
import { useGetSubCategoriesByPaginationQuery } from "../../../store/api/app/SubCategory/subCategoryApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetTaxsQuery } from "../../../store/api/app/Tax/taxApiSlice";
import { useCreateInvoicesMutation, useUpdateInvoicesMutation } from "../../../store/api/app/InvoiceList/invoiceListApiSlice";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { useGetClientsQuery } from "../../../store/api/app/Client/clientApiSlice";
import TextInput from "../../Shared/TextInput/TextInput";
import { useGetAccountsQuery } from "../../../store/api/app/Account/accountApiSlice";
import { useGetBranchesQuery } from "../../../store/api/app/Branch/branchApiSlice";
import { useGetStoreCurrenciesQuery } from "../../../store/api/app/Currency/currenciesApiSlice";
import POSModal from "../../Shared/Modal/POSModal";
import ClientCreateModal from "./ClientCreateModal";

const DEBOUNCE_MS = 400;

const POS = ({ id, data }) => {
  const { register, control, errors, handleSubmit, onSubmit, watch, reset, isLoading } = useSubmit(
    id,
    id ? useUpdateInvoicesMutation : useCreateInvoicesMutation,
    "/store/dashboard/POS"
  );
  const { data: storeCurrency } = useGetStoreCurrenciesQuery();

  const backendUrl = import.meta.env.VITE_LOCAL_API_URL;
  const [tableData, setTableData] = useState([]);
  const [showModalAfterSubmit, setShowModalAfterSubmit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [showClientModal, setShowClientModal] = useState(false);

  // Search: raw input vs debounced value actually sent to the API
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const searchDebounceRef = useRef(null);

  // Pagination State
  const [paginationPage, setPaginationPage] = useState(1);
  const [limit] = useState(12);
  const [order] = useState("desc");

  // Get Auth
  const { auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;

  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      setSearch(searchInput);
    }, DEBOUNCE_MS);
    return () => clearTimeout(searchDebounceRef.current);
  }, [searchInput]);

  const {
    data: stockProduct,
    isFetching: isStockFetching,
    isError: isStockError,
    error: stockError,
  } = useGetStockProductsByPaginationQuery({
    page: paginationPage,
    limit,
    order,
    search,
    category_id: selectedCategory || undefined,
    sub_category_id: selectedSubCategory || undefined,
    store_id,
  });

  const { data: categories } = useGetCategoriesByPaginationQuery({
    page: 1,
    limit: 100,
    store_id,
  });

  const { data: subCategories } = useGetSubCategoriesByPaginationQuery({
    page: 1,
    limit: 100,
    store_id,
  });

  const { data: taxs } = useGetTaxsQuery({ store_id });

  const { data: clients, refetch: refetchClients } = useGetClientsQuery({ store_id });

  const { data: accounts } = useGetAccountsQuery({ store_id });

  const { data: branch } = useGetBranchesQuery({ store_id });

  const discount_type = watch("discount_type");
  const discount = watch("discount");
  const transport = watch("transport");
  const client_id = watch("client_id");
  const tax_id = watch("tax_id");
  const paymentOptions = watch("payment_options");

  const addPaymentOptions = [
    { value: true, label: "YES" },
    { value: false, label: "NO" },
  ];

  const productsData = stockProduct?.data?.result;
  const paginationData = stockProduct?.data?.pagination;

  const totalPages = paginationData?.total_page || 1;
  const currentPage = paginationData?.current_page || 1;

  // Reset to page 1 whenever a filter changes (not on page navigation itself)
  useEffect(() => {
    setPaginationPage(1);
  }, [selectedCategory, selectedSubCategory, search]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPaginationPage(newPage);
  };
  const handleFirstPage = () => setPaginationPage(1);
  const handleLastPage = () => setPaginationPage(totalPages);
  const handlePreviousPage = () => currentPage > 1 && setPaginationPage((p) => p - 1);
  const handleNextPage = () => currentPage < totalPages && setPaginationPage((p) => p + 1);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  };

  // ---- Cart logic -----------------------------------------------------
  // Cart is keyed by product.id (the stock-product row id), never by grid
  // render index, so adding/updating always targets the correct cart row
  // even after pagination/search/category changes reorder the grid.
  const addToCart = (product) => {
    const stock = Number(product?.stock_quantity || 0);
    if (stock <= 0) {
      toast.error("This product is out of stock!");
      return;
    }
    setTableData((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex !== -1) {
        const existing = prev[existingIndex];
        if (existing.getQuantity >= stock) {
          setTimeout(() => toast.error(`Only ${stock} in stock!`), 0);
          return prev;
        }
        const next = [...prev];
        next[existingIndex] = { ...existing, getQuantity: existing.getQuantity + 1 };
        return next;
      }
      return [...prev, { ...product, getQuantity: 1 }];
    });
  };

  const updateQuantityByStep = (productId, increment) => {
    setTableData((prev) => {
      const idx = prev.findIndex((item) => item.id === productId);
      if (idx === -1) return prev;
      const current = prev[idx];
      const stock = Number(current.stock_quantity || 0);
      const newQuantity = Math.max(1, current.getQuantity + increment);
      if (newQuantity > stock) {
        setTimeout(() => toast.error("Quantity exceeds available stock!"), 0);
        return prev;
      }
      const next = [...prev];
      next[idx] = { ...current, getQuantity: newQuantity };
      return next;
    });
  };

  const updateQuantityByInput = (productId, rawValue) => {
    setTableData((prev) => {
      const idx = prev.findIndex((item) => item.id === productId);
      if (idx === -1) return prev;
      const current = prev[idx];
      const stock = Number(current.stock_quantity || 0);

      // Guard against "", non-numeric, negative, or 0 input turning into NaN downstream
      const parsed = Number(rawValue);
      const safeValue = Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;

      if (safeValue > stock) {
        setTimeout(() => toast.error(`Available stock ${stock}!`), 0);
        const next = [...prev];
        next[idx] = { ...current, getQuantity: stock || 1 };
        return next;
      }

      const next = [...prev];
      next[idx] = { ...current, getQuantity: safeValue };
      return next;
    });
  };

  const removeFromCart = (productId) => {
    setTableData((prev) => prev.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    const subtotal = tableData?.reduce((sum, item) => sum + item.product.sale_price * item.getQuantity, 0) || 0;

    let taxCost = 0;
    if (tax_id) {
      const taxDetail = taxs?.data?.find((t) => t?.id === tax_id);
      taxCost = taxDetail ? (subtotal * (Number(taxDetail.rate) || 0)) / 100 : 0;
    }

    const discountAmount =
      discount_type === "FLAT" ? Number(discount) || 0 : (subtotal * (Number(discount) || 0)) / 100;
    const transportCost = Number(transport) || 0;
    const netTotal = Math.max(0, subtotal - discountAmount + transportCost + taxCost);

    return {
      subtotal,
      taxCost: Number(taxCost.toFixed(2)),
      discountAmount: Number(discountAmount.toFixed(2)),
      netTotal: Number(netTotal.toFixed(2)),
    };
  };

  const totals = calculateTotal();

  const discountOptions = [
    { value: "FLAT", label: "FLAT" },
    { value: "PERCENTAGE", label: "PERCENTAGE" },
  ];

  const cartItemCount = useMemo(
    () => tableData.reduce((sum, item) => sum + item.getQuantity, 0),
    [tableData]
  );

  const handleSavePayment = () => {
    if (!client_id) {
      toast.error("Please select a client!");
      return;
    }
    if (tableData.length === 0) {
      toast.error("Please add at least one product!");
      return;
    }
    setShowModalAfterSubmit(true);
  };

  const handleReset = () => {
    if (tableData.length === 0 && !client_id) {
      return; // nothing to reset
    }
    const confirmed = window.confirm("This will clear the cart and all entered fields. Continue?");
    if (!confirmed) return;

    setTableData([]);
    setShowModalAfterSubmit(false);
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSearchInput("");
    setSearch("");
    setPaginationPage(1);
    reset(); // clears branch, client, discount, transport, tax and all other form fields
    toast.success("Form has been reset");
  };

  const handleFormSubmit = async (formValues) => {
    if (tableData.length === 0) {
      toast.error("Please add at least one product!");
      return;
    }
    if (!formValues.client_id) {
      toast.error("Please select a client!");
      return;
    }

    const { payment_options, ...rest } = formValues;

    const productsPayload = tableData.map((item) => ({
      quantity: item.getQuantity,
      sale_price: item.product.sale_price,
      product_id: item.product.id,
    }));

    const finalData = {
      ...rest,
      products: productsPayload,
      discount: Number(formValues?.discount) || 0,
      transport: Number(formValues?.transport) || 0,
      subtotal: totals.subtotal,
      tax_amount: totals.taxCost,
      net_total: totals.netTotal,
      invoice_date: formValues?.invoice_date
        ? new Date(`${formValues.invoice_date}:00Z`).toISOString()
        : new Date().toISOString(),
      ...(payment_options && {
        payment: {
          amount: parseInt(formValues?.paid_amount, 10) || 0,
          cheque_no: formValues?.cheque_no,
          receipt_no: formValues?.receipt_no,
          transaction_date: formValues?.invoice_date
            ? new Date(`${formValues.invoice_date}:00Z`).toISOString()
            : new Date().toISOString(),
          account_id: formValues?.account_id,
        },
      }),
    };

    try {
      await onSubmit(finalData);
      // Only clear the cart/UI state once the submit hook has resolved
      // (it internally toasts + navigates on success and toasts on error;
      // clearing here regardless would wipe a cart the user still needs
      // to retry after a failed submission).
      setTableData([]);
      setShowModalAfterSubmit(false);
    } catch (err) {
      // useSubmit already surfaces the error toast; keep cart intact so
      // the user can correct the form and retry without re-adding items.
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
          }
        }}
      >
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 lg:gap-5">
          {/* Products */}
          <div className="space-y-4 xl:order-last xl:col-span-3 bg-white rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_18px_-12px_rgba(15,23,42,0.18)] p-3 sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value ? Number(e.target.value) : "");
                  setSelectedSubCategory("");
                }}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a category</option>
                {categories?.data?.result?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value ? Number(e.target.value) : "")}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="">Select a subcategory</option>
                {subCategories?.data?.result
                  ?.filter(
                    (sub) =>
                      !selectedCategory ||
                      sub.category_id === selectedCategory ||
                      sub.category?.id === selectedCategory
                  )
                  ?.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                placeholder="Search products by name..."
                className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {isStockFetching && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 animate-spin" size={16} />
              )}
            </div>

            {/* Error state */}
            {isStockError && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                <AlertTriangle size={16} className="shrink-0" />
                <span>{stockError?.data?.message || "Failed to load products. Please try again."}</span>
              </div>
            )}

            {/* Loading skeleton */}
            {isStockFetching && !productsData && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 overflow-hidden animate-pulse">
                    <div className="h-28 sm:h-32 bg-slate-100" />
                    <div className="h-8 bg-slate-100 mt-1 mx-2 rounded" />
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!isStockFetching && !isStockError && productsData?.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center py-12 text-slate-400">
                <ImageOff size={32} className="mb-2" />
                <p className="text-sm font-medium">No products found</p>
                <p className="text-xs">Try a different search term or category</p>
              </div>
            )}

            {/* Product grid */}
            {!isStockError && productsData?.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3">
                {productsData.map((product) => {
                  const matched = tableData.find((item) => item.id === product.id);
                  const stock = Number(product?.stock_quantity || 0);
                  const isOutOfStock = stock <= 0;
                  const isMaxed = matched && Number(matched.getQuantity || 0) >= stock;
                  const isDisabled = isOutOfStock || isMaxed;

                  return (
                    <Card
                      key={product.id}
                      className={`relative overflow-hidden rounded-xl border border-slate-200 shadow-sm transition-all duration-200 ${
                        isDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer hover:shadow-md hover:-translate-y-0.5"
                      }`}
                    >
                      <CardContent
                        className="p-0"
                        onClick={() => !isDisabled && addToCart(product)}
                      >
                        <div
                          className={`absolute top-1.5 left-1.5 z-10 text-white px-1.5 py-0.5 rounded-md text-[10px] font-bold shadow-sm ${
                            isOutOfStock ? "bg-slate-400" : "bg-red-500"
                          }`}
                        >
                          {isOutOfStock ? "OUT" : stock}
                        </div>

                        {matched && (
                          <div className="absolute top-1.5 right-1.5 z-10 bg-indigo-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold shadow-sm">
                            {matched.getQuantity}
                          </div>
                        )}

                        <div className="h-28 sm:h-32 bg-slate-50 flex items-center justify-center overflow-hidden">
                          {product?.product?.main_image ? (
                            <img
                              className="h-full w-full object-cover"
                              src={`${backendUrl}${product.product.main_image}`}
                              alt={product?.product?.name}
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <ImageOff className="text-slate-300" size={24} />
                          )}
                        </div>

                        <div className="px-2.5 py-2">
                          <p className="text-xs sm:text-sm font-medium text-slate-700 line-clamp-2 leading-snug">
                            {product?.product?.name}
                          </p>
                          {product?.product?.sale_price != null && (
                            <p className="text-[11px] sm:text-xs font-semibold text-indigo-600 mt-0.5">
                              ৳{Number(product.product.sale_price).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {productsData?.length > 0 && (
              <div className="flex justify-center items-center flex-wrap gap-1.5 pt-2">
                <button
                  type="button"
                  onClick={handleFirstPage}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 disabled:opacity-30"
                >
                  <ChevronsLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                </button>
                {getPageNumbers().map((pageNum) => (
                  <button
                    type="button"
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                      currentPage === pageNum ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 disabled:opacity-30"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleLastPage}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 disabled:opacity-30"
                >
                  <ChevronsRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Cart / Checkout */}
          <div className="space-y-4 xl:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_18px_-12px_rgba(15,23,42,0.18)] p-3 sm:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomReactSelect
                  control={control}
                  name="branch_id"
                  label="Branch"
                  placeholder="Select Branch"
                  options={branch?.data?.map((item) => ({ value: item.id, label: item.name })) || []}
                  required={true}
                />
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <CustomReactSelect
                      control={control}
                      name="client_id"
                      label="Client"
                      placeholder="Select Client"
                      options={clients?.data?.map((item) => ({ value: item.id, label: item.name })) || []}
                      required={true}
                    />
                  </div>
                  <button
                    type="button"
                    className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 transition-colors"
                    onClick={() => setShowClientModal(true)}
                    title="Add Client"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_18px_-12px_rgba(15,23,42,0.18)] overflow-hidden">
              <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 text-slate-600">
                  <ShoppingCart size={16} />
                  <span className="text-sm font-semibold">Cart</span>
                </div>
                <span className="text-xs font-medium text-slate-500">
                  {cartItemCount} item{cartItemCount === 1 ? "" : "s"}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-2.5 sm:p-3 text-left text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Product
                      </th>
                      <th className="p-2.5 sm:p-3 text-left text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Price
                      </th>
                      <th className="p-2.5 sm:p-3 text-left text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Qty
                      </th>
                      <th className="p-2.5 sm:p-3 text-left text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Subtotal
                      </th>
                      <th className="p-2.5 sm:p-3 text-left text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tableData.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-3 text-sm text-slate-700 max-w-[140px] truncate" title={item?.product?.name}>
                          {item?.product?.name}
                        </td>
                        <td className="p-3 text-sm text-slate-600 whitespace-nowrap">
                          ৳{Number(item?.product?.sale_price || 0).toFixed(2)}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantityByStep(item.id, -1);
                              }}
                              disabled={item.getQuantity <= 1}
                              className="w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <input
                              className="w-12 text-center border border-slate-200 rounded-md py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              type="number"
                              min={1}
                              max={item.stock_quantity}
                              onChange={(e) => {
                                e.stopPropagation();
                                updateQuantityByInput(item.id, e.target.value);
                              }}
                              value={item.getQuantity || 1}
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantityByStep(item.id, 1);
                              }}
                              disabled={item.getQuantity >= item.stock_quantity}
                              className="w-7 h-7 flex items-center justify-center bg-indigo-600 text-white rounded-full disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-sm font-semibold text-slate-700 whitespace-nowrap">
                          ৳{(Number(item?.product?.sale_price || 0) * item.getQuantity).toFixed(2)}
                        </td>
                        <td className="p-3">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600 p-1"
                            title="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {tableData.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-sm text-slate-400">
                          No items in cart. Tap a product to add it.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 border-t border-slate-200 px-3 py-2.5 text-right">
                <span className="text-sm font-bold text-slate-700">Sub Total: ৳{totals.subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_18px_-12px_rgba(15,23,42,0.18)] p-3 sm:p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomReactSelect
                  control={control}
                  name="discount_type"
                  label="Discount Type"
                  placeholder="Select discount type"
                  options={discountOptions}
                />
                <TextInput
                  name="discount"
                  label="Discount"
                  type="number"
                  register={register}
                  error={errors.discount}
                  placeholder="Enter Discount"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  name="transport"
                  label="Transport Cost"
                  type="number"
                  register={register}
                  error={errors.transport}
                  placeholder="Enter transport cost"
                />
                <div className="flex justify-stretch items-end gap-2">
                  <div className="flex-[0_0_70%]">
                    <CustomReactSelect
                      control={control}
                      name="tax_id"
                      label="Invoice Tax"
                      placeholder="Select Invoice tax"
                      options={taxs?.data?.map((item) => ({ value: item.id, label: item.name })) || []}
                      required={true}
                    />
                  </div>
                  <div className="flex-[0_0_25%] p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-right text-sm font-medium text-slate-600 truncate">
                    {storeCurrency?.data?.currency?.symbol}
                    {totals.taxCost}
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 rounded-xl shadow-md shadow-indigo-200/60 px-4 py-3.5 flex items-center justify-between">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -right-2 -bottom-8 w-20 h-20 bg-white/10 rounded-full" />
                <span className="relative text-xs sm:text-sm font-medium text-indigo-100 tracking-wide uppercase">
                  Net Total
                </span>
                <span className="relative text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  ৳{totals.netTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {showModalAfterSubmit && (
              <POSModal
                setShowModalAfterSubmit={setShowModalAfterSubmit}
                register={register}
                errors={errors}
                control={control}
                paymentOptions={paymentOptions}
                addPaymentOptions={addPaymentOptions}
                accounts={accounts}
                calculateTotal={calculateTotal}
              />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-1.5 bg-slate-700 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold py-2.5 rounded-lg shadow-sm transition-colors order-1"
                onClick={() => setShowModalAfterSubmit(false)}
              >
                {isLoading ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Save size={15} />
                )}
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                disabled={isLoading}
                className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold py-2.5 rounded-lg shadow-sm transition-colors order-2"
                onClick={handleSavePayment}
              >
                <CreditCard size={15} />
                Save & Payment
              </button>
              <button
                type="button"
                disabled={isLoading}
                title="Clear cart and reset the form"
                className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 disabled:opacity-60 disabled:cursor-not-allowed text-slate-700 text-xs sm:text-sm font-semibold py-2.5 rounded-lg border border-slate-200 shadow-sm transition-colors order-3"
                onClick={handleReset}
              >
                <RotateCcw size={15} />
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>

      {showClientModal && (
        <ClientCreateModal
          storeId={store_id}
          onClose={() => setShowClientModal(false)}
          onCreated={() => {
            setShowClientModal(false);
            refetchClients();
            toast.success("Client created successfully");
          }}
        />
      )}
    </div>
  );
};

export default POS;