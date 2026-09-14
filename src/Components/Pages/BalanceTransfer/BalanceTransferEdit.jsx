import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetBalanceAdjustmentsByIdQuery } from "../../../store/api/app/BalanceAdjustments/BalanceAdjustmentsApiSlice";
import BalanceTransferForm from "./BalanceTransferForm";
import { useGetBalanceTransfersByIdQuery } from "../../../store/api/app/BalanceTransfer/BalanceTransferApiSlice";

const BalanceTransferEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
  useGetBalanceTransfersByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <BalanceTransferForm id={id} data={data?.data} />
    </div>
  );
};

export default BalanceTransferEdit;
