import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetFeaturesByIdQuery } from "../../../store/api/app/Features/featuresApiSlice";
import { useGetExpenseSubCategoryByIdQuery } from "../../../store/api/app/ExpenseSubCategory/expenseSubCategoriesApiSlice";
import { useParams } from "react-router-dom";


const ExpenseSubCategoryView = ({ isOpen, onClose, data }) => {
  const { id } = useParams();
  const { data: viewData } = useGetExpenseSubCategoryByIdQuery(id);
  const items = [
    {
      status: "Status",
      value: viewData?.data?.status,
    },
    {
      title: "Name",
      value: viewData?.data?.name,
    },
    {
      title: "Code",
      value: viewData?.data?.code,
    },
    {
      title: "Note",
      value: viewData?.data?.note,
    },
    {
      title: "Expense Category",
      value: viewData?.data?.expense_category?.name,
    },
  ];
  return (
    <div>
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        title="Expense Sub Category"
        items={items}
      />
    </div>
  );
};

export default ExpenseSubCategoryView;
