import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetSuppliersByIdQuery } from "../../../store/api/app/Suppliers/suppliersApiSlice";
import BrandForm from "./BrandForm";
import { useGetBrandsByIdQuery } from "../../../store/api/app/Brand/brandApiSlice";

const BrandEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetBrandsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <BrandForm id={id} data={data?.data} />
    </div>
  );
};

export default BrandEdit;
