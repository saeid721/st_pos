import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetLoanAuthoritiesByIdQuery } from "../../../store/api/app/LoanAuthoritiesApi/loanAuthoritiesApiSlice";
import PayrollForm from "./PayrollForm";
import { useGetPayrollsByIdQuery } from "../../../store/api/app/PayrollApi/payrollApiSlice";

const PayrollEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetPayrollsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <PayrollForm id={id} data={data?.data} />
    </div>
  );
};

export default PayrollEdit;
