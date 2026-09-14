import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetAccountsByIdQuery } from "../../../store/api/app/Account/accountApiSlice";
import StoreProductListForm from "./StockProductListForm";
import { useGetStockProductsByIdQuery } from "../../../store/api/app/StockProduct/stockProductApiSlice";

const StoreProductListEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } = useGetStockProductsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  console.log(data?.data);
  return (
    <div>
      <StoreProductListForm id={id} data={data?.data} />
    </div>
  );
};

export default StoreProductListEdit;
