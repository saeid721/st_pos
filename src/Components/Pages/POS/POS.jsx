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

const DEBOUNCE_MS = 300;
const CART_ADD_SOUND_VOLUME = 0.35;

const getProductDetails = (stockProduct) => stockProduct?.product || {};

const getProductBarcode = (stockProduct) => {
  const product = getProductDetails(stockProduct);
  return product.barcode || product.barcode_number || product.ean || product.upc || "";
};

const HighlightedText = ({ value, query }) => {
  const text = String(value || "");
  if (!query || !text) return text || "-";

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.split(new RegExp(`(${escapedQuery})`, "ig")).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={`${part}-${index}`} className="rounded bg-amber-100 px-0.5 text-slate-900">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const POS = ({ id, data }) => {
  const { register, control, errors, handleSubmit, onSubmit, watch, reset, setValue, isLoading } = useSubmit(
    id,
    id ? useUpdateInvoicesMutation : useCreateInvoicesMutation,
    "/store/dashboard/POS"
  );
  const { data: storeCurrency } = useGetStoreCurrenciesQuery();

  const backendUrl = import.meta.env.VITE_LOCAL_API_URL;
  const currency = storeCurrency?.data?.currency?.symbol || "৳";
  const [tableData, setTableData] = useState([]);
  const tableDataRef = useRef([]);
  const cartAddAudioRef = useRef(null);
  const [showModalAfterSubmit, setShowModalAfterSubmit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [showClientModal, setShowClientModal] = useState(false);

  // Search: raw input vs debounced value actually sent to the API
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const searchDebounceRef = useRef(null);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(-1);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const suggestionSelectionRef = useRef(false);

  // Pagination State
  const [paginationPage, setPaginationPage] = useState(1);
  const [limit] = useState(12);
  const [order] = useState("desc");

  // Get Auth
  const { auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;

  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    // Empty string fires immediately so the grid clears without a 300ms lag
    if (searchInput === "") {
      setSearch("");
      setHighlightedSuggestion(-1);
      setSuggestionsOpen(false);
      return;
    }
    searchDebounceRef.current = setTimeout(() => {
      setSearch(searchInput.trim());
      setHighlightedSuggestion(-1);
    }, DEBOUNCE_MS);
    return () => clearTimeout(searchDebounceRef.current);
  }, [searchInput]);

  const {
    data: stockProduct,
    isFetching: isStockFetching,
    isError: isStockError,
    error: stockError,
    refetch: refetchStockProducts,
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
  const branch_id = watch("branch_id");
  const tax_id = watch("tax_id");

  const [withPayment, setWithPayment] = useState(false);

  const productsData = stockProduct?.data?.result;
  const normalizedSearchInput = searchInput.trim();
  const hasSearch = normalizedSearchInput.length > 0;
  const isSearchPending = hasSearch && search !== normalizedSearchInput;
  const suggestionProducts = hasSearch && !isSearchPending && Array.isArray(productsData) ? productsData : [];
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

  const commitTableData = (nextTableData) => {
    tableDataRef.current = nextTableData;
    setTableData(nextTableData);
  };

  const playCartAddSound = () => {
    if (!cartAddAudioRef.current) {
      cartAddAudioRef.current = new Audio(`${import.meta.env.BASE_URL}sounds/cart-add.wav`);
      cartAddAudioRef.current.preload = "auto";
      cartAddAudioRef.current.volume = CART_ADD_SOUND_VOLUME;
    }

    const audio = cartAddAudioRef.current;
    audio.currentTime = 0;
    audio.play()?.catch(() => undefined);
  };

  // ---- Cart logic -----------------------------------------------------
  // Cart is keyed by product.id (the stock-product row id), never by grid
  // render index, so adding/updating always targets the correct cart row
  // even after pagination/search/category changes reorder the grid.
  const addToCart = (product) => {
    const stock = Number(product?.stock_quantity || 0);
    if (stock <= 0) {
      toast.error("This product is out of stock!");
      return false;
    }
    const currentTableData = tableDataRef.current;
    const existingIndex = currentTableData.findIndex((item) => item.id === product.id);
    let nextTableData;

    if (existingIndex !== -1) {
      const existing = currentTableData[existingIndex];
      if (existing.getQuantity >= stock) {
        toast.error(`Only ${stock} in stock!`);
        return false;
      }
      nextTableData = [...currentTableData];
      nextTableData[existingIndex] = { ...existing, getQuantity: existing.getQuantity + 1 };
    } else {
      nextTableData = [...currentTableData, { ...product, getQuantity: 1 }];
    }

    commitTableData(nextTableData);
    playCartAddSound();
    return true;
  };

  const selectSuggestion = (product) => {
    if (!product || suggestionSelectionRef.current) return;
    suggestionSelectionRef.current = true;
    const wasAdded = addToCart(product);
    if (!wasAdded) {
      suggestionSelectionRef.current = false;
      return;
    }
    setSuggestionsOpen(false);
    setHighlightedSuggestion(-1);
    setSearchInput("");
    setSearch("");
    window.setTimeout(() => {
      suggestionSelectionRef.current = false;
      document.getElementById("pos-search")?.focus();
    }, 0);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "ArrowDown" && suggestionProducts.length > 0) {
      event.preventDefault();
      setSuggestionsOpen(true);
      setHighlightedSuggestion((current) => (current + 1) % suggestionProducts.length);
      return;
    }

    if (event.key === "ArrowUp" && suggestionProducts.length > 0) {
      event.preventDefault();
      setSuggestionsOpen(true);
      setHighlightedSuggestion((current) =>
        current <= 0 ? suggestionProducts.length - 1 : current - 1
      );
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setSuggestionsOpen(false);
      setHighlightedSuggestion(-1);
      return;
    }

    if (event.key !== "Enter") return;
    event.preventDefault();
    event.stopPropagation();

    if (!suggestionsOpen || isSearchPending || isStockFetching || isStockError) return;
    const exactMatch = suggestionProducts.find((product) => {
      const details = getProductDetails(product);
      const query = searchInput.trim().toLowerCase();
      return [details.product_code, getProductBarcode(product), details.sku, details.model]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase() === query);
    });
    const selectedProduct = suggestionProducts[highlightedSuggestion] ||
      (suggestionProducts.length === 1 ? suggestionProducts[0] : exactMatch);
    if (selectedProduct) selectSuggestion(selectedProduct);
  };

  const updateQuantityByStep = (productId, increment) => {
    const idx = tableDataRef.current.findIndex((item) => item.id === productId);
    if (idx === -1) return;
    const current = tableDataRef.current[idx];
    const stock = Number(current.stock_quantity || 0);
    const newQuantity = Math.max(1, current.getQuantity + increment);
    if (newQuantity > stock) {
      toast.error("Quantity exceeds available stock!");
      return;
    }
    const next = [...tableDataRef.current];
    next[idx] = { ...current, getQuantity: newQuantity };
    commitTableData(next);
  };

  const updateQuantityByInput = (productId, rawValue) => {
    const idx = tableDataRef.current.findIndex((item) => item.id === productId);
    if (idx === -1) return;
    const current = tableDataRef.current[idx];
    const stock = Number(current.stock_quantity || 0);

    // Guard against "", non-numeric, negative, or 0 input turning into NaN downstream
    const parsed = Number(rawValue);
    const safeValue = Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
    const next = [...tableDataRef.current];

    if (safeValue > stock) {
      toast.error(`Available stock ${stock}!`);
      next[idx] = { ...current, getQuantity: stock || 1 };
    } else {
      next[idx] = { ...current, getQuantity: safeValue };
    }

    commitTableData(next);
  };

  const removeFromCart = (productId) => {
    commitTableData(tableDataRef.current.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    const subtotal =
      tableData?.reduce(
        (sum, item) => sum + Number(item?.product?.sale_price || 0) * Number(item?.getQuantity || 0),
        0
      ) || 0;

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
    if (!branch_id) {
      toast.error("Please select a branch!");
      return;
    }
    if (!client_id) {
      toast.error("Please select a client!");
      return;
    }
    if (!tax_id) {
      toast.error("Please select an invoice tax!");
      return;
    }
    if (tableData.length === 0) {
      toast.error("Please add at least one product!");
      return;
    }
    // Prefill with NET total (tax + transport - discount), not subtotal
    setValue("paid_amount", totals.netTotal);
    setWithPayment(true);
    setShowModalAfterSubmit(true);
  };

  const handleReset = () => {
    if (tableData.length === 0 && !client_id) {
      return; // nothing to reset
    }
    const confirmed = window.confirm("This will clear the cart and all entered fields. Continue?");
    if (!confirmed) return;

    commitTableData([]);
    setShowModalAfterSubmit(false);
    setWithPayment(false);
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSearchInput("");
    setSearch("");
    setPaginationPage(1);
    reset(); // clears branch, client, discount, transport, tax and all other form fields
    toast.success("Form has been reset");
  };

const handleFormSubmit = async (formValues) => {
    if (!formValues.branch_id) {
      toast.error("Please select a branch!");
      return;
    }
    if (!formValues.client_id) {
      toast.error("Please select a client!");
      return;
    }
    if (tableData.length === 0) {
      toast.error("Please add at least one product!");
      return;
    }
    if (formValues.discount && !formValues.discount_type) {
      toast.error("Please select a discount type!");
      return;
    }

    // datetime-local is a LOCAL value — appending ":00Z" shifted every
    // timestamp by the timezone offset. Let Date parse it as local.
    const invoiceDate = formValues?.invoice_date
      ? new Date(formValues.invoice_date).toISOString()
      : new Date().toISOString();

    // Explicit whitelist — matches InvoiceListForm. Spreading ...rest was
    // leaking paid_amount / account_id / cheque_no into the invoice body.
    const finalData = {
      branch_id: formValues.branch_id,
      client_id: formValues.client_id,
      tax_id: formValues.tax_id,
      discount_type: formValues.discount_type || undefined,
      discount: Number(formValues?.discount) || 0,
      transport: Number(formValues?.transport) || 0,
      reference: formValues?.reference,
      po_reference: formValues?.po_reference,
      payment_terms: formValues?.payment_terms,
      delivery_place: formValues?.delivery_place,
      note: formValues?.note,
      invoice_date: invoiceDate,
      products: tableData.map((item) => ({
        quantity: item.getQuantity,
        sale_price: Number(item.product.sale_price),
        product_id: item.product.id,
      })),
      ...(withPayment && {
        payment: {
          amount: Number(formValues?.paid_amount) || 0,
          cheque_no: formValues?.cheque_no || undefined,
          receipt_no: formValues?.receipt_no || undefined,
          transaction_date: invoiceDate,
          account_id: formValues?.account_id,
        },
      }),
    };

    if (withPayment && !finalData.payment.account_id) {
      toast.error("Please select an account!");
      return;
    }

    // useSubmit now returns true/false instead of swallowing the error,
    // so a failed save keeps the cart intact for a retry.
    const ok = await onSubmit(finalData);
    if (ok) {
      commitTableData([]);
      setWithPayment(false);
      setShowModalAfterSubmit(false);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.tagName !== "TEXTAREA" && e.target.id !== "pos-search") {
            e.preventDefault();
          }
        }}
      >
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-5 items-start">
          {/* Products */}
          <div className="space-y-4 xl:order-last xl:col-span-7 xl:sticky xl:top-4 xl:max-h-[calc(100vh-2rem)] xl:overflow-y-auto bg-white rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_18px_-12px_rgba(15,23,42,0.18)] p-3 sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value ? Number(e.target.value) : "");
                  setSelectedSubCategory("");
                }}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a Category</option>
                {categories?.data?.result?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedSubCategory}
                disabled={!selectedCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value ? Number(e.target.value) : "")}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="">Select a Subcategory</option>
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
                id="pos-search"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setSuggestionsOpen(e.target.value.trim().length > 0);
                }}
                onFocus={() => searchInput.trim() && setSuggestionsOpen(true)}
                onKeyDown={handleSearchKeyDown}
                type="text"
                autoFocus
                autoComplete="off"
                spellCheck={false}
                placeholder="Scan barcode or search products…"
                className="w-full pl-10 pr-16 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {isStockFetching && (
                  <Loader2 className="text-indigo-500 animate-spin" size={15} />
                )}
                {searchInput && !isStockFetching && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput("");
                      setSearch("");
                      document.getElementById("pos-search")?.focus();
                    }}
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-500 transition-colors"
                    tabIndex={-1}
                    aria-label="Clear search"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                      <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </div>

              {suggestionsOpen && hasSearch && (
                <div className="absolute left-0 right-0 top-full z-[60] mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
                  {isStockError ? (
                    <div className="flex items-center justify-between gap-3 px-3 py-3 text-xs text-red-600">
                      <span>{stockError?.data?.message || "Search failed. Please try again."}</span>
                      <button
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => refetchStockProducts()}
                        className="shrink-0 rounded-md border border-red-200 px-2 py-1 font-semibold hover:bg-red-50"
                      >
                        Retry
                      </button>
                    </div>
                  ) : (isSearchPending || isStockFetching) && suggestionProducts.length === 0 ? (
                    <div className="space-y-2 px-3 py-3" aria-label="Searching">
                      {[0, 1, 2].map((item) => (
                        <div key={item} className="flex animate-pulse items-center gap-3">
                          <div className="h-10 w-10 shrink-0 rounded-md bg-slate-100" />
                          <div className="min-w-0 flex-1 space-y-1.5">
                            <div className="h-3 w-3/5 rounded bg-slate-100" />
                            <div className="h-2.5 w-2/5 rounded bg-slate-100" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : suggestionProducts.length === 0 ? (
                    <div className="px-3 py-4 text-center text-xs text-slate-500">
                      <p className="font-semibold text-slate-700">No products found</p>
                      <p className="mt-0.5">Try a product name, SKU, code, or barcode.</p>
                    </div>
                  ) : (
                    <>
                      {isStockFetching && (
                        <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-1.5 text-[11px] text-indigo-600">
                          <Loader2 size={13} className="animate-spin" /> Updating results
                        </div>
                      )}
                      <div className="max-h-[min(20rem,55vh)] overflow-y-auto p-1">
                        {suggestionProducts.map((product, index) => {
                          const details = getProductDetails(product);
                          const barcode = getProductBarcode(product);
                          const stock = Number(product?.stock_quantity || 0);
                          const isOutOfStock = stock <= 0;
                          const cartMatch = tableData.find((item) => item.id === product.id);
                          const isMaxed = Boolean(cartMatch && Number(cartMatch.getQuantity || 0) >= stock);
                          const isUnavailable = isOutOfStock || isMaxed;
                          const isHighlighted = index === highlightedSuggestion;

                          return (
                            <button
                              type="button"
                              key={product.id}
                              onMouseDown={(event) => event.preventDefault()}
                              onClick={() => !isUnavailable && !isStockFetching && selectSuggestion(product)}
                              onMouseEnter={() => setHighlightedSuggestion(index)}
                              disabled={isUnavailable || isStockFetching}
                              className={`flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left transition-colors ${
                                isUnavailable
                                  ? "cursor-not-allowed opacity-55"
                                  : isHighlighted
                                  ? "bg-indigo-50"
                                  : "hover:bg-slate-50"
                              }`}
                              aria-selected={isHighlighted}
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-slate-100 text-slate-300">
                                {details.main_image ? (
                                  <img
                                    src={`${backendUrl}${details.main_image}`}
                                    alt=""
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                  />
                                ) : (
                                  <ImageOff size={16} />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="truncate text-xs font-semibold text-slate-800">
                                    <HighlightedText value={details.name} query={searchInput.trim()} />
                                  </p>
                                  <span className="shrink-0 text-xs font-bold text-indigo-600 tabular-nums">
                                    {currency}{Number(details.sale_price || 0).toFixed(2)}
                                  </span>
                                </div>
                                <div className="mt-0.5 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-slate-500">
                                  {details.product_code && (
                                    <span className="truncate">
                                      Code: <HighlightedText value={details.product_code} query={searchInput.trim()} />
                                    </span>
                                  )}
                                  {details.sku && (
                                    <span className="truncate">
                                      SKU: <HighlightedText value={details.sku} query={searchInput.trim()} />
                                    </span>
                                  )}
                                  {barcode && (
                                    <span className="truncate">
                                      Barcode: <HighlightedText value={barcode} query={searchInput.trim()} />
                                    </span>
                                  )}
                                  {details.unit?.name && <span>Unit: {details.unit.name}</span>}
                                  <span className={isUnavailable ? "font-semibold text-red-600" : "font-semibold text-emerald-600"}>
                                    {isOutOfStock ? "Out of stock" : isMaxed ? "Max in cart" : `${stock} available`}
                                  </span>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 overflow-hidden animate-pulse bg-white">
                    <div className="h-28 sm:h-32 bg-slate-100" />
                    <div className="px-2 pt-1.5 pb-2 space-y-1.5">
                      <div className="h-3 bg-slate-100 rounded-full w-4/5" />
                      <div className="h-3.5 bg-slate-100 rounded-full w-2/5" />
                    </div>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2">
                {productsData.map((product) => {
                  const matched = tableData.find((item) => item.id === product.id);
                  const stock = Number(product?.stock_quantity || 0);
                  const isOutOfStock = stock <= 0;
                   const isMaxed = matched && Number(matched.getQuantity || 0) >= stock;
                  const isDisabled = isOutOfStock || isMaxed;
                  const inCart = Boolean(matched);

                  return (
                    <Card
                      key={product.id}
                      className={`relative overflow-hidden rounded-lg border transition-all duration-150 group ${
                        isOutOfStock
                          ? "border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed shadow-none"
                          : isMaxed
                          ? "border-amber-300 bg-amber-50/30 ring-1 ring-amber-200 cursor-not-allowed shadow-sm"
                          : inCart
                          ? "border-indigo-400 bg-white ring-2 ring-indigo-100 cursor-pointer shadow-md"
                          : "border-slate-200 bg-white cursor-pointer shadow-sm hover:shadow-md hover:border-indigo-200"
                      }`}
                    >
                      <CardContent
                        className="p-0"
                        onClick={() => !isDisabled && addToCart(product)}
                      >
                        <div
                          className={`absolute top-1.5 left-1.5 z-10 text-white px-1.5 py-0.5 rounded-full text-[9px] font-bold tracking-wide shadow ${
                            isOutOfStock
                              ? "bg-slate-500"
                              : isMaxed
                              ? "bg-amber-500"
                              : stock <= 5
                              ? "bg-orange-500"
                              : "bg-emerald-500"
                          }`}
                        >
                          {isOutOfStock ? "OUT" : isMaxed ? "MAX" : stock}
                        </div>

                        {matched && (
                          <div className="absolute top-1.5 right-1.5 z-10 bg-indigo-600 text-white min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full text-[9px] font-bold shadow">
                            {matched.getQuantity}
                          </div>
                        )}

                        <div className="relative h-28 sm:h-32 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center overflow-hidden">
                          {product?.product?.main_image ? (
                            <img
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                              src={`${backendUrl}${product.product.main_image}`}
                              alt={product?.product?.name}
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                e.currentTarget.nextSibling?.classList?.remove("hidden");
                              }}
                            />
                          ) : null}
                          <div className={`${product?.product?.main_image ? "hidden" : "flex"} flex-col items-center gap-1 text-slate-300`}>
                            <ImageOff size={22} />
                            <span className="text-[9px] font-medium text-slate-400">No Image</span>
                          </div>
                          {isOutOfStock && (
                            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
                          )}
                        </div>

                        <div className="px-2 pt-1.5 pb-2">
                          <p className="text-[11px] sm:text-xs font-semibold text-slate-700 line-clamp-1 leading-snug mb-0.5">
                            {product?.product?.name}
                          </p>
                          {product?.product?.sale_price != null && (
                            <div className="flex items-center justify-between gap-1">
                              <p className="text-[12px] sm:text-[13px] font-bold text-indigo-600 tabular-nums">
                                {currency}{Number(product.product.sale_price).toFixed(2)}
                              </p>
                              {inCart && !isMaxed && (
                                <span className="text-[9px] font-semibold text-indigo-500 bg-indigo-50 px-1 py-0.5 rounded">
                                  In cart
                                </span>
                              )}
                              {isMaxed && (
                                <span className="text-[9px] font-semibold text-amber-600 bg-amber-50 px-1 py-0.5 rounded">
                                  Max
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1 pt-3 pb-1">
                {/* First page */}
                <button
                  type="button"
                  onClick={handleFirstPage}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
                  title="First page"
                >
                  <ChevronsLeft size={14} />
                </button>

                {/* Previous page */}
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
                  title="Previous page"
                >
                  <ChevronLeft size={14} />
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((pageNum) => (
                    <button
                      type="button"
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-semibold border transition-colors shadow-sm ${
                        currentPage === pageNum
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-indigo-200"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                {/* Next page */}
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
                  title="Next page"
                >
                  <ChevronRight size={14} />
                </button>

                {/* Last page */}
                <button
                  type="button"
                  onClick={handleLastPage}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
                  title="Last page"
                >
                  <ChevronsRight size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Cart / Checkout */}
          <div className="space-y-4 xl:col-span-5">
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

              <div className="overflow-x-auto max-h-[46vh] xl:max-h-[42vh] overflow-y-auto overscroll-contain">
                <table className="w-full min-w-[360px] table-auto">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      <th className="px-3 py-2 text-left w-full">Product</th>
                      <th className="px-2 py-2 text-right whitespace-nowrap">Price</th>
                      <th className="px-2 py-2 text-center whitespace-nowrap">Quantity</th>
                      <th className="px-2 py-2 text-right whitespace-nowrap">Subtotal</th>
                      <th className="px-3 py-2 text-right whitespace-nowrap w-px">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tableData.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-1.5 text-[13px] text-slate-700 max-w-[160px] truncate" title={item?.product?.name}>
                          {item?.product?.name}
                        </td>
                        <td className="px-2 py-1.5 text-[13px] text-slate-600 text-right whitespace-nowrap tabular-nums">
                          {currency}{Number(item?.product?.sale_price || 0).toFixed(2)}
                        </td>
                        <td className="px-2 py-1.5">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantityByStep(item.id, -1);
                              }}
                              disabled={Number(item.getQuantity) <= 1}
                               className="w-6 h-6 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full disabled:opacity-40 disabled:cursor-not-allowed shrink-0 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <input
                              className="w-10 h-6 text-center border border-slate-200 rounded-md px-0.5 text-[13px] leading-none focus:outline-none focus:ring-2 focus:ring-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              type="number"
                              inputMode="numeric"
                              onFocus={(e) => e.target.select()}
                              min={1}
                              max={Number(item.stock_quantity || 0)}
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
                              disabled={Number(item.getQuantity) >= Number(item.stock_quantity || 0)}
                              className="w-6 h-6 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-full disabled:opacity-40 disabled:cursor-not-allowed shrink-0 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="px-2 py-1.5 text-[13px] font-semibold text-slate-700 text-right whitespace-nowrap tabular-nums">
                          {currency}{(Number(item?.product?.sale_price || 0) * item.getQuantity).toFixed(2)}
                        </td>
                        <td className="px-3 py-1.5 text-right w-px">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto flex h-7 w-7 items-center justify-center rounded-md text-red-500 hover:bg-red-50 hover:text-red-600 active:bg-red-100 transition-colors"
                            title="Remove"
                            aria-label={`Remove ${item?.product?.name || "item"}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {tableData.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-3 py-8 text-center text-sm text-slate-400">
                          No items in cart. Tap a product to add it.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between bg-slate-50 border-t border-slate-200 px-3 sm:px-4 py-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Sub Total</span>
                <span className="text-sm font-bold text-slate-700 tabular-nums">
                  {currency}{totals.subtotal.toFixed(2)}
                </span>
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
                    {currency}{Number(totals.taxCost).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 rounded-xl shadow-md shadow-indigo-200/60 px-4 py-2 flex items-center justify-between">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -right-2 -bottom-8 w-20 h-20 bg-white/10 rounded-full" />
                <span className="relative text-xs sm:text-sm font-medium text-indigo-100 tracking-wide uppercase">
                  Net Total
                </span>
                <span className="relative text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {currency}{totals.netTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {showModalAfterSubmit && (
              <POSModal
                onClose={() => {
                  setWithPayment(false);
                  setShowModalAfterSubmit(false);
                }}
                register={register}
                errors={errors}
                control={control}
                accounts={accounts}
                totals={totals}
                currency={currency}
                paidAmount={watch("paid_amount")}
                isLoading={isLoading}
                setValue={setValue}
                watch={watch}
              />
            )}

            <div className="sticky bottom-0 z-20 -mx-3 px-3 py-2.5 bg-white/95 backdrop-blur border-t border-slate-200 grid grid-cols-3 gap-2 sm:static sm:mx-0 sm:px-0 sm:py-0 sm:bg-transparent sm:backdrop-blur-0 sm:border-0 sm:gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-1.5 bg-slate-700 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold py-2.5 rounded-lg shadow-sm transition-colors order-1"
                onClick={() => {
                  setWithPayment(false);
                  setShowModalAfterSubmit(false);
                }}
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