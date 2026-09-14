import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetExpenseCategoryByIdQuery } from "../../../store/api/app/ExpenseCategory/expenseCategoriesApiSlice";
import LoanAuthorityForm from "./LoanAuthorityForm";
import { useGetLoanAuthoritiesByIdQuery } from "../../../store/api/app/LoanAuthoritiesApi/loanAuthoritiesApiSlice";

const LoanAuthorityEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetLoanAuthoritiesByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <LoanAuthorityForm id={id} data={data?.data} />
    </div>
  );
};

export default LoanAuthorityEdit;
