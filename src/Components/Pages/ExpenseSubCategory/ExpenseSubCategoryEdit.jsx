import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetExpenseCategoryByIdQuery } from "../../../store/api/app/ExpenseCategory/expenseCategoriesApiSlice";
import ExpenseSubCategoryForm from "./ExpenseSubCategoryForm";
import { useGetExpenseSubCategoryByIdQuery } from "../../../store/api/app/ExpenseSubCategory/expenseSubCategoriesApiSlice";


const ExpenseSubCategoryEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetExpenseSubCategoryByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <ExpenseSubCategoryForm id={id} data={data?.data} />
    </div>
  );
};

export default ExpenseSubCategoryEdit;
