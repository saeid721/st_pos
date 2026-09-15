import React, { useState, useEffect } from "react";
import { Search, Plus, Trash2, MinusCircle, PlusCircle, Minus, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
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
import { set } from "date-fns";
import ClientCreateModal from "./ClientCreateModal";

const POS = ({ id, data }) => {
  const { register, unregister, control, errors, reset, handleSubmit, onSubmit, setValue, watch, isLoading } = useSubmit(
    id,
    id ? useUpdateInvoicesMutation : useCreateInvoicesMutation, '/store/dashboard/POS'
  );
  const { data: storeCurrency } = useGetStoreCurrenciesQuery();

  const [selectedClient, setSelectedClient] = useState("");
  const [discountType, setDiscountType] = useState("fixed");
  const backendUrl = import.meta.env.VITE_LOCAL_API_URL;
   const [tableData, setTableData] = useState([]);
  const [showModalAfterSubmit, setShowModalAfterSubmit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");


  // Pagination State
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  //Get Auth
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const {
    data: stockProduct,
    isLoading: isStockLoading,
    isError,
    error,
    refetch: refetchStockProducts,
  } = useGetStockProductsByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    search: search,
    category_id: selectedCategory || undefined,
    sub_category_id: selectedSubCategory || undefined,
    store_id: store_id,
  });

  const { data: categories } = useGetCategoriesByPaginationQuery({
    page: 1,
    limit: 100,
    store_id: store_id,
  });

  const { data: subCategories } = useGetSubCategoriesByPaginationQuery({
    page: 1,
    limit: 100,
    store_id: store_id,
  });

  const { data: taxs } = useGetTaxsQuery({
    store_id: store_id,
  });

  const { data: clients, refetch: refetchClients } = useGetClientsQuery({
    store_id: store_id,
  });

  const [showClientModal, setShowClientModal] = useState(false);

  const { data: accounts } = useGetAccountsQuery({
    store_id: store_id,
  });

  const { data: branch } = useGetBranchesQuery({
    store_id: store_id,
  });

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


  // Pagination configuration
  const itemsPerPage = paginationData?.page_limit;
  const totalPages = paginationData?.total_page;
  const currentPage = paginationData?.current_page;

  // Pagination handlers
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPaginationPage(newPage);
    }
  };

  const handleFirstPage = () => {
    setPaginationPage(1);
  };

  const handleLastPage = () => {
    setPaginationPage(totalPages);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setPaginationPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setPaginationPage((prev) => prev + 1);
    }
  };

    useEffect(() => {
    setPaginationPage(1);
    refetchStockProducts();
  }, [selectedCategory, selectedSubCategory, search]);

  const handleSavePayment = () => {
    if (!client_id) {
      toast.error("Please select a client!");
      return;
    }
    setShowModalAfterSubmit(true);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    let pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  //Selected Product Controller
  const allTableData = (index, product) => {
    setTableData((prev) => {
      const newData = [...prev];

      // Find if the product already exists (assume 'id' is the unique key)
      const existingProductIndex = newData.findIndex((item) => item.id === product.id);

      if (existingProductIndex !== -1) {
        // If product exists, update its stock_quantity
        newData[existingProductIndex] = {
          ...newData[existingProductIndex],
          getQuantity: newData[existingProductIndex].getQuantity + 1,
        };
      } else {
        // If product does not exist, add it to the array with stock_quantity set to 1
        newData.push({
          ...product,
          getQuantity: 1, // Initialize stock_quantity to 1
        });
      }

      return newData;
    });
  };

  const updateQuantity = (index, increment, product_id) => {
    setTableData((prev) => {
      const newData = [...prev];
      const currentProduct = newData[index];
      const newQuantity = Math.max(1, currentProduct.getQuantity + increment);

      if (newQuantity > currentProduct.stock_quantity) {
        // Avoid triggering `toast` during render or state update logic
        setTimeout(() => toast.error("Quantity exceeds available stock!"), 0);
        return prev; // No change to state
      }

      newData[index] = {
        ...currentProduct,
        getQuantity: newQuantity,
      };

      return newData;
    });
  };

  const updateInputQuantity = (index, increment, product_id) => {
    setTableData((prev) => {
      const newData = [...prev];
      const currentProduct = newData[index];
      const newQuantity = Math.max(1, increment);

      if (newQuantity > currentProduct.stock_quantity) {
        // Avoid triggering `toast` during render or state update logic
        setTimeout(() => toast.error(`Available stock ${currentProduct.stock_quantity}!`), 0);
        return prev; // No change to state
      }

      newData[index] = {
        ...currentProduct,
        getQuantity: newQuantity,
      };

      return newData;
    });
  };

  // Left Table Handler

  const removeFromCart = (productId) => {
    setTableData(tableData?.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    const subtotal = tableData?.reduce((sum, item) => sum + item.product.sale_price * item.getQuantity, 0);
    // Apply tax
    let taxCost = 0;
    if (tax_id) {
      const taxDetail = taxs?.data?.find((taxId) => taxId?.id === tax_id);
      console.log("taxDetail", taxDetail);
      taxCost = taxDetail ? (subtotal * (Number(taxDetail.rate) || 0)) / 100 : 0;
    }

    const discountAmount = discount_type === "FLAT" ? Number(discount) || 0 : (subtotal * (Number(discount) || 0)) / 100;
    const transportCost = Number(transport) || 0;
    const netTotal = (subtotal - discountAmount + transportCost + taxCost).toFixed(2);
    return { subtotal, taxCost, netTotal };
  };
  const discountOptions = [
    {
      value: "FLAT",
      label: "FLAT",
    },
    {
      value: "PERCENTAGE",
      label: "PERCENTAGE",
    },
  ];
  const TableData = tableData.map((item) => ({
    quantity: item.getQuantity,
    sale_price: item.product.sale_price,
    product_id: item.product.id,
  }));
  const handleFormSubmit = async (data) => {
    const { payment_options, ...rest } = data;
    const finalData = {
      ...rest,
      products: TableData,
      discount: Number(data?.discount),
      transport: Number(data?.transport),
      invoice_date: new Date(`${data?.invoice_date}:00Z`).toISOString(),
      ...(payment_options && {
        payment: {
          amount: parseInt(data?.paid_amount),
          cheque_no: data?.cheque_no,
          receipt_no: data?.receipt_no,
          transaction_date: new Date(`${data?.invoice_date}:00Z`).toISOString(),
          account_id: data?.account_id,
        },
      }),
    };
    // Combine form data with products list
    console.log("submitData:: ", finalData);
    setTableData([]);
    setSelectedClient("");
    setShowModalAfterSubmit(false);
    await onSubmit(finalData);
  };

  // console.log(TableData);

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault(); // Prevent form submission on Enter
          }
        }}
      >
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 lg:gap-5">
          {/* Right Side - Products */}
                    <div className="space-y-4 xl:order-last xl:col-span-3 bg-white rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_18px_-12px_rgba(15,23,42,0.18)] p-3 sm:p-4">
            <div className="grid grid-cols-2 gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value ? Number(e.target.value) : ""); setSelectedSubCategory(""); }}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a category</option>
                {categories?.data?.result?.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a subcategory</option>
                {subCategories?.data?.result
                  ?.filter((sub) => !selectedCategory || sub.category_id === selectedCategory || sub.category?.id === selectedCategory)
                  ?.map((sub) => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
              </select>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3">
              {productsData?.map((product, index) => {
                // Find matching item from tableData
                const matched = tableData?.find(
                  (item) => item?.id === product?.id || item?.product_id === product?.product_id
                );

                // Check if it should be disabled
                const isDisabled =
                  Number(product?.stock_quantity || 0) <= 0 ||
                  (matched && Number(matched?.getQuantity || 0) >= Number(product?.stock_quantity || 0));

                return (
                  <Card
                    key={product.id}
                    className={`relative overflow-hidden rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${isDisabled ? "opacity-50 pointer-events-none" : "cursor-pointer"
                      }`}
                  >
                    <CardContent
                      className="p-0 cursor-pointer"
                      onClick={() => allTableData(index, product)}
                    >
                      <div className="absolute top-1.5 left-1.5 z-10 bg-red-500 text-white px-1.5 py-0.5 rounded-md text-[10px] font-bold shadow-sm">
                        {product?.stock_quantity}
                      </div>

                      <div className="h-28 sm:h-32 bg-slate-50 flex items-center justify-center overflow-hidden">
                        {product?.product?.main_image ? (
                          <img
                            className="h-full w-full object-cover"
                            src={`${backendUrl}${product?.product?.main_image}`}
                            alt={product?.product?.name}
                          />
                        ) : (
                          <span className="text-xs text-slate-400">No Preview</span>
                        )}
                      </div>

                      <div className="px-2.5 py-2 text-xs sm:text-sm font-medium text-slate-700 line-clamp-2 leading-snug">
                        {product?.product?.name}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            {/* // Pagination */}
            <div className="flex justify-center items-center flex-wrap gap-1.5 pt-2">
              <button
                onClick={handleFirstPage}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 disabled:opacity-30"
              >
                <ChevronsLeft size={16} />
              </button>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold transition-colors ${currentPage === pageNum ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  {pageNum}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
              <button
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 disabled:opacity-30"
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>

          {/* Left Side - Cart */}

          <div className="space-y-4 xl:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_18px_-12px_rgba(15,23,42,0.18)] p-3 sm:p-4">
              <div className="grid grid-cols-2 gap-4">
                <CustomReactSelect
                  control={control}
                  name="branch_id"
                  label="Branch"
                  placeholder="Select Branch"
                  options={
                    branch?.data?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    })) || []
                  }
                  required={true}
                // error={errors.section_type}
                />
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <CustomReactSelect
                      control={control}
                      name="client_id"
                      label="Client"
                      placeholder="Select Client"
                      options={
                        clients?.data?.map((item) => ({
                          value: item.id,
                          label: item.name,
                        })) || []
                      }
                      required={true}
                    />
                  </div>
                  {/* button */}
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
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5 sm:p-3 text-left text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">Product</th>
                    <th className="p-2.5 sm:p-3 text-left text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">Price</th>
                    <th className="p-2.5 sm:p-3 text-left text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">Quantity</th>
                    <th className="p-2.5 sm:p-3 text-left text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">Subtotal</th>
                    <th className="p-2.5 sm:p-3 text-left text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tableData.map((item, index) => {
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-3">{item?.product?.name}</td>
                        <td className="p-3">৳{item?.product.sale_price?.toFixed(2)}</td>
                        <td className="p-3 flex">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(index, -1, item.id);
                            }}
                            disabled={item?.getQuantity <= 1}
                            className={`w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full disabled:opacity-75 ${item?.getQuantity <= 1 ? "cursor-not-allowed" : ""
                              } `}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="w-20 text-center flex">
                            <input
                              className="w-16 text-center"
                              type="number"
                              onChange={(e) => {
                                e.stopPropagation();
                                const newValue = Number(e.target.value); // Ensure it's a number
                                updateInputQuantity(index, newValue, item.id); // Pass the new value and ID
                              }}
                              value={item?.getQuantity || 1} // Ensure value uses the updated state or defaults to 1
                            />
                          </div>{" "}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(index, 1, item.id);
                            }}
                            disabled={item?.getQuantity >= item?.stock_quantity}
                            className={`w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full disabled:opacity-75 ${item?.getQuantity >= item?.stock_quantity ? "cursor-not-allowed" : ""
                              } `}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </td>
                        <td className="p-3">৳{(item?.product.sale_price * item?.getQuantity).toFixed(2)}</td>
                        <td className="p-3">
                          <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {tableData.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-3 text-center text-gray-500">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="bg-slate-50 border-t border-slate-200 px-3 py-2.5 text-right">
                <span className="text-sm font-bold text-slate-700">Sub Total: ৳{calculateTotal()?.subtotal?.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_18px_-12px_rgba(15,23,42,0.18)] p-3 sm:p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <CustomReactSelect
                  control={control}
                  name="discount_type"
                  label="Discount Type"
                  placeholder="Select discount_type"
                  options={discountOptions}
                // error={errors.section_type}
                />
              </div>
              <div>
                <TextInput
                  name="discount"
                  label="Discount"
                  type="number"
                  register={register}
                  error={errors.discount}
                  placeholder="Enter Discount"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextInput
                name="transport"
                label="Transport Cost"
                type="number"
                register={register}
                error={errors.transport}
                placeholder="Enter transport cost"
              />
              <div className="flex justify-stretch items-end ">
                <CustomReactSelect
                  control={control}
                  name="tax_id"
                  label="Invoice Tax"
                  placeholder="Select Invoice tax"
                  options={
                    taxs?.data?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    })) || []
                  }
                  required={true} // Sets the flex basis to 70%
                />

                <div className="flex-[0_0_25%] p-2 rounded bg-gray-50 text-right">{storeCurrency?.data?.currency?.symbol}{calculateTotal()?.taxCost || 0}</div>
              </div>
            </div>

                        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-center p-3 rounded-lg shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-white">Net Total: ৳{calculateTotal()?.netTotal || 0}</h3>
            </div>
            </div>


            {showModalAfterSubmit && (
              <POSModal setShowModalAfterSubmit={setShowModalAfterSubmit} register={register} errors={errors} control={control} paymentOptions={paymentOptions} addPaymentOptions={addPaymentOptions} accounts={accounts} calculateTotal={calculateTotal} />
            )}




                        <div className="grid grid-cols-2 gap-3">
              <button type="submit" className="bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold py-2.5 rounded-lg shadow-sm transition-colors" onClick={() => setShowModalAfterSubmit(false)}>
                Save
              </button>
              <button type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded-lg shadow-sm transition-colors" onClick={handleSavePayment}>
                Save & Payment
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* Client Create Modal */}
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
