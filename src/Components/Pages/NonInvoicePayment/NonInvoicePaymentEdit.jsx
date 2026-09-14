import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import NonInvoicePaymentForm from "./NonInvoicePaymentForm";
import { useGetNonInvoicePaymentsByIdQuery } from "../../../store/api/app/NonInvoice/nonInvoiceApiSlice";

const NonInvoicePaymentEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetNonInvoicePaymentsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;

  console.log("data non invoice payment edit", data);
  return (
    <div>
      <NonInvoicePaymentForm id={id} data={data?.data} />
    </div>
  );
};

export default NonInvoicePaymentEdit;
