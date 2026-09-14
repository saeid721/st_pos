import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";
import TaxForm from "./TaxForm";
import { useGetTaxsByIdQuery } from "../../../store/api/app/Tax/taxApiSlice";

const TaxEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetTaxsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <TaxForm id={id} data={data?.data} />
    </div>
  );
};

export default TaxEdit;
