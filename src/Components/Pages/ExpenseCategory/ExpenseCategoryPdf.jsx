import React from 'react';
import { useGetExpenseCategoryByPaginationQuery } from '../../../store/api/app/ExpenseCategory/expenseCategoriesApiSlice';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';

const ExpenseCategoryPdf = ({ setPdfButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetExpenseCategoryByPaginationQuery({
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
            title="Expense Category Report"
            columns={columns}
            data={data.data.result}
            fileName="expense_categories.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default ExpenseCategoryPdf;
