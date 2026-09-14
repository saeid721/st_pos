import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetCategoriesByIdQuery } from "../../../store/api/app/Category/categoryApiSlice";
import InvoiceReturnForm from "./InvoiceReturnForm";
import { useGetInvoiceReturnsByIdQuery } from "../../../store/api/app/InvoiceReturn/invoiceReturnApiSlice";

const InvoiceReturnEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
  useGetInvoiceReturnsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <InvoiceReturnForm id={id} data={data?.data} />
    </div>
  );
};

export default InvoiceReturnEdit;
