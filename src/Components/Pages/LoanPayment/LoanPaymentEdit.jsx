import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetLoansByIdQuery } from "../../../store/api/app/LoansApi/loansApiSlice";
import LoanPaymentForm from "./LoanPaymentForm";
import { useGetLoanPaymentsByIdQuery } from "../../../store/api/app/paymentsApi/paymentsApiSlice";

const LoanPaymentAddEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetLoanPaymentsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <LoanPaymentForm id={id} data={data?.data} />
    </div>
  );
};

export default LoanPaymentAddEdit;
