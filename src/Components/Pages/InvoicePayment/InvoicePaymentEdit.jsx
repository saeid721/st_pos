import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";
import InvoicePaymentForm from "./InvoicePaymentForm";
import { useGetAccountsByIdQuery } from "../../../store/api/app/Account/accountApiSlice";
import { useGetInvoicePaymentsByIdQuery } from "../../../store/api/app/Invoice/invoiceApiSlice";

const InvoicePaymentEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetInvoicePaymentsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <InvoicePaymentForm id={id} data={data?.data} />
    </div>
  );
};

export default InvoicePaymentEdit;
