import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetNonInvoicePaymentsByIdQuery } from "../../../store/api/app/NonInvoice/nonInvoiceApiSlice";
import NonPurchasePaymentForm from "./NonPurchasePaymentForm";
import { useGetNonPurchasePaymentsByIdQuery } from "../../../store/api/app/NonPurchasePayment/nonPurchasePaymentApiSlice";

const NonPurchasePaymentEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetNonPurchasePaymentsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;

  console.log("data non invoice payment edit", data);
  return (
    <div>
      <NonPurchasePaymentForm id={id} data={data?.data} />
    </div>
  );
};

export default NonPurchasePaymentEdit;
