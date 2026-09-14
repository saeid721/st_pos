import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetCategoriesByIdQuery } from "../../../store/api/app/Category/categoryApiSlice";
import { useGetAccountsByIdQuery } from "../../../store/api/app/Account/accountApiSlice";
import { useGetStockProductsByIdQuery } from "../../../store/api/app/StockProduct/stockProductApiSlice";
import { useParams } from "react-router-dom";

const StoreProductListView = ({ isOpen, onClose, data, title }) => {
  const { id } = useParams();
  const { data: viewData } = useGetStockProductsByIdQuery(id);
  console.log("viewData", viewData);
  const items = [
    {
      status: "Status",
      value: viewData?.data?.status,
    },
    {
      title: "Product",
      value: viewData?.data?.product?.name,
    },
    {
      title: "Store",
      value: viewData?.data?.store?.store,
    },
    {
      title: "Branch",
      value: viewData?.data?.branch?.name,
    },
    {
      title: "Stock Quantity",
      value: viewData?.data?.stock_quantity,
    },
    {
      title: "Purchase Price",
      value: viewData?.data?.purchase_price,
    },
    {
      title: "Regular Price",
      value: viewData?.data?.product?.regular_price,
    },
  ];
  return (
    <div>
      <ViewModal isOpen={isOpen} onClose={onClose} data={data} title={title} items={items} />
    </div>
  );
};

export default StoreProductListView;
