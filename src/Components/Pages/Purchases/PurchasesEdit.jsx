import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetAccountsByIdQuery } from "../../../store/api/app/Account/accountApiSlice";
import PurchasesForm from "./PurchasesForm";
import { useGetPurchasesByIdQuery } from "../../../store/api/app/Purchases/purchasesApiSlice";

const PurchasesEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetPurchasesByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <PurchasesForm id={id} data={data?.data} />
    </div>
  );
};

export default PurchasesEdit;
