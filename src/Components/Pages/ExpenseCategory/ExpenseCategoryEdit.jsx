import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetFeaturesByIdQuery } from "../../../store/api/app/Features/featuresApiSlice";
import ExpenseCategoryForm from "./ExpenseCategoryForm";
import { useGetExpenseCategoryByIdQuery } from "../../../store/api/app/ExpenseCategory/expenseCategoriesApiSlice";

const ExpenseCategoryEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetExpenseCategoryByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <ExpenseCategoryForm id={id} data={data?.data} />
    </div>
  );
};

export default ExpenseCategoryEdit;
