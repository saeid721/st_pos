import React, { useState, useEffect } from "react";
import { Plus, Minus, X, ArrowLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import { useCreateInventoryAdjustmentMutation, useUpdateInventoryAdjustmentMutation } from "../../../store/api/app/InventoryAdjustment/inventoryAdjustmentApiSlice";
import { Card } from "../../ui/card";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../../../store/api/app/Products/productsApiSlice";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";


const InventoryAdjustmentForm = ({ id, data }) => {
  const navigate = useNavigate(); // Get the navigate function
  const {
    register,
    unregister,
    control,
    errors,
    reset,
    handleSubmit,
    onSubmit,
    watch,
    isLoading,
  } = useSubmit(
    id,
    id ? useUpdateInventoryAdjustmentMutation : useCreateInventoryAdjustmentMutation
  );

  console.log("data:: ", data);

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;
  const { data: products } = useGetProductsQuery({ store_id });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    if (id && data) {
      // If editing, populate selected products from data
      const initialProducts = data.adjustmentItems?.map(item => ({
        product_id: item.product.id,
        code: item.product.product_code,
        name: item.product.name,
        stock: item.product.inventory_count,
        adjustment_type: item.adjustment_type,
        quantity: item.quantity
      })) || [];
      setSelectedProducts(initialProducts);
    } else {
      // Reset selected products for new adjustment
      setSelectedProducts([]);
    }
  }, [id, data]);

  const handleProductSelect = (productId) => {
    if (!productId) return;

    const product = products?.data?.find(p => p.id === parseInt(productId));
    if (!product) return;

    // Check if product already exists in the list
    const existingProduct = selectedProducts.find(p => p.product_id === product.id);
    if (existingProduct) return;

    console.log("product", product);

    const newProduct = {
      product_id: product.id,
      code: product.product_code,
      name: product.name,
      stock: product.inventory_count,
      adjustment_type: "INCREMENT",
      quantity: 1
    };

    setSelectedProducts([...selectedProducts, newProduct]);
    setSelectedProductId("");
  };

  console.log("selectedProducts", selectedProducts);

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.product_id !== productId));
  };

  const handleQuantityChange = (productId, change) => {
    setSelectedProducts(selectedProducts?.map(product => {
      if (product.product_id === productId) {
        const newQuantity = Math.max(1, product.quantity + change);
        return { ...product, quantity: newQuantity };
      }
      return product;
    }));
  };

  const handleAdjustmentTypeChange = (productId, type) => {
    setSelectedProducts(selectedProducts?.map(product => {
      if (product.product_id === productId) {
        return { ...product, adjustment_type: type };
      }
      return product;
    }));
  };

  const handleFormSubmit = async (data) => {
    if (selectedProducts.length === 0 || !data.reason) {
      alert("Please fill in all required fields and add at least one product.");
      return;
    }


    const adjustmentData = {
      reason: data.reason,
      note: data.note,
      date: new Date(data.date).toISOString(),
      items: selectedProducts?.map(product => ({
        product_id: product.product_id,
        adjustment_type: product.adjustment_type,
        quantity: product.quantity
      }))
    };

    await onSubmit(adjustmentData);
  };

  useEffect(() => {
    reset({
      ...data,
    });
  }, [data, reset]);

  const handleReset = () => {
    setSelectedProducts([]);
  };

  const availableProducts = products?.data?.filter(
    product => !selectedProducts.some(selected => selected.product_id === product.id)
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-2 gap-5 mb-4">
          <TextInput
            name="reason"
            label="Adjustment Reason"
            type="text"
            register={register}
            error={errors.reason}
            required={true}
            placeholder="Enter Adjustment Reason"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Products <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => handleProductSelect(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a product</option>
              {availableProducts?.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} [{product.product_code}]
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        {selectedProducts.length > 0 && (
          <div className="mb-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="border border-gray-200 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                    <th className="border border-gray-200 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    {/* <th className="border border-gray-200 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th> */}
                    <th className="border border-gray-200 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adjustment Type</th>
                    <th className="border border-gray-200 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="border border-gray-200 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedProducts?.map((product, index) => (
                    <tr key={product.product_id} className="hover:bg-gray-50 transition-colors">
                      <td className="border border-gray-200 px-4 py-3 text-sm">{index + 1}</td>
                      <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">{product.code}</td>
                      <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900">{product.name}</td>
                      {/* <td className="border border-gray-200 px-4 py-3 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.stock === 0
                          ? 'bg-yellow-100 text-yellow-800'
                          : product.stock < 10
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-green-100 text-green-800'
                          }`}>
                          {product.stock}
                        </span>
                      </td> */}
                      <td className="border border-gray-200 px-4 py-3 text-sm">
                        <select
                          value={product.adjustment_type}
                          onChange={(e) => handleAdjustmentTypeChange(product.product_id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="INCREMENT">Increment</option>
                          <option value="DECREMENT">Decrement</option>
                        </select>
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(product.product_id, -1)}
                            className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors"
                            disabled={product.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1 border border-gray-300 rounded-md min-w-[50px] text-center bg-white">
                            {product.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(product.product_id, 1)}
                            className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-sm">
                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(product.product_id)}
                          className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-5">
          <TextInput
            name="note"
            label="Note"
            type="text"
            register={register}
            error={errors.note}
            placeholder="Write your note here!"
          />
          <TextInput
            name="date"
            label="Adjustment Date"
            type="date"
            register={register}
            error={errors.date}
            required={true}
          />
        </div>

        <div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse mt-6">
          <Button
            className="bg-[#FF5B14] text-white w-[90px] h-[38px] flex justify-center items-center"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#2377E7] text-white w-[90px] h-[38px] flex justify-center items-center"
          >
            {isLoading ? <Loader /> : "Submit"}
          </Button>
        </div>
      </Card>
    </form >
  );
};

export default InventoryAdjustmentForm;