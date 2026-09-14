import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import InvoiceListForm from "./InvoiceListForm";
import { useGetInvoicesByIdQuery } from "../../../store/api/app/InvoiceList/invoiceListApiSlice";

const InvoiceListEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } = useGetInvoicesByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;
  if (isError || error) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <InvoiceListForm id={id} data={data?.data} />
    </div>
  );
};

export default InvoiceListEdit;
