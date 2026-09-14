import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetExpenseByPaginationQuery } from '../../../store/api/app/Expense/expenseApiSlice';

const ExpensePdf = ({ setPdfButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetExpenseByPaginationQuery({
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
            title="Expense Report"
            columns={columns}
            data={data.data.result}
            fileName="expense.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default ExpensePdf;
