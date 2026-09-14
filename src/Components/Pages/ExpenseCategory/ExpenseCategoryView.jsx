import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetExpenseCategoryByIdQuery } from "../../../store/api/app/ExpenseCategory/expenseCategoriesApiSlice";
import { useParams } from "react-router-dom";

const ExpenseCategoryView = ({ isOpen, onClose, data }) => {
  const {id} = useParams();
  const { data: viewData } = useGetExpenseCategoryByIdQuery(id);
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
  ];
  return (
    <div>
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        title="Expense Categorey Details"
        items={items}
      />
    </div>
  );
};

export default ExpenseCategoryView;
