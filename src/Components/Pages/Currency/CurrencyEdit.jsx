import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import CurrencyForm from "./CurrencyForm";
import { useGetCurrenciesByIdQuery } from "../../../store/api/app/Currency/currenciesApiSlice";

const CurrencyEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetCurrenciesByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <CurrencyForm id={id} data={data?.data} />
    </div>
  );
};

export default CurrencyEdit;
