import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetExpenseSubCategoryByIdQuery } from "../../../store/api/app/ExpenseSubCategory/expenseSubCategoriesApiSlice";
import ExpenseForm from "./ExpenseForm";
import { useGetExpenseByIdQuery } from "../../../store/api/app/Expense/expenseApiSlice";

const ExpenseEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetExpenseByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <ExpenseForm id={id} data={data?.data} />
    </div>
  );
};

export default ExpenseEdit;
