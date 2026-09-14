import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetExpenseSubCategoryByPaginationQuery } from '../../../store/api/app/ExpenseSubCategory/expenseSubCategoriesApiSlice';

const ExpenseSubCategoryPdf = ({ setPdfButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetExpenseSubCategoryByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
    });

    if (isError) {
        console.error("PDF error:", error);
        setPdfButtonClick(false);
        return null;
    }

    return isSuccess && data?.data?.result ? (
        <ReusablePdfGenerator
            title="Expense Sub Category Report"
            columns={columns}
            data={data.data.result}
            fileName="expense_sub_categories.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default ExpenseSubCategoryPdf;
