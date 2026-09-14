import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";
import SuppliersForm from "./SuppliersForm";
import { useGetSuppliersByIdQuery } from "../../../store/api/app/Suppliers/suppliersApiSlice";

const SuppliersEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetSuppliersByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <SuppliersForm id={id} data={data?.data} />
    </div>
  );
};

export default SuppliersEdit;
