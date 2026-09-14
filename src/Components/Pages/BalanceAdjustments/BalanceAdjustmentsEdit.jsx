import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";
import { useGetAccountsByIdQuery } from "../../../store/api/app/Account/accountApiSlice";
import BalanceAdjustmentsForm from "./BalanceAdjustmentsForm";
import { useGetBalanceAdjustmentsByIdQuery } from "../../../store/api/app/BalanceAdjustments/BalanceAdjustmentsApiSlice";

const BalanceAdjustmentsEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
  useGetBalanceAdjustmentsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <BalanceAdjustmentsForm id={id} data={data?.data} />
    </div>
  );
};

export default BalanceAdjustmentsEdit;
