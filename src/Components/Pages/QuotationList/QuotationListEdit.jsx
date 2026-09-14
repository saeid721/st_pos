import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetAccountsByIdQuery } from "../../../store/api/app/Account/accountApiSlice";
import QuotationListForm from "./QuotationListForm";
import { useGetQuotationsByIdQuery } from "../../../store/api/app/QuotationList/quotationListApiSlice";

const QuotationListEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetQuotationsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <QuotationListForm id={id} data={data?.data} />
    </div>
  );
};

export default QuotationListEdit;
