import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetPlansByIdQuery } from "../../../store/api/app/Plans/plansApiSlice";
import ProductsForm from "./ProductsForm";
import { useGetProductsByIdQuery } from "../../../store/api/app/Products/productsApiSlice";

const ProductsEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetProductsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <ProductsForm id={id} data={data?.data} />
    </div>
  );
};

export default ProductsEdit;
