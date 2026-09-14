import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetInvoicePaymentsByIdQuery } from "../../../store/api/app/Invoice/invoiceApiSlice";
import PurchasePaymentForm from "./PurchasePaymentForm";
import { useGetPurchasePaymentsByIdQuery } from "../../../store/api/app/PurchasePayment/PurchasePaymentApiSlice";

const PurchasePaymentEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetPurchasePaymentsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <PurchasePaymentForm id={id} data={data?.data} />
    </div>
  );
};

export default PurchasePaymentEdit;
