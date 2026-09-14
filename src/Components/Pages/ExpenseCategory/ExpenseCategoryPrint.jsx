import React from 'react';
import { useGetExpenseCategoryByPaginationQuery } from '../../../store/api/app/ExpenseCategory/expenseCategoriesApiSlice';
import ReusablePrintComponent from '../../Shared/ReusablePrintComponent/ReusablePrintComponent';

const ExpenseCategoryPrint = ({ setPrintButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        { Header: 'Status', accessor: 'status', id: 'status' }
    ];

    const { data, isSuccess, isError, error } = useGetExpenseCategoryByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
    });

    if (isError) {
        console.error('Print error:', error);
        setPrintButtonClick(false);
        return null;
    }

    return isSuccess && data?.data?.result ? (
        <ReusablePrintComponent
            title="Expense Category Report"
            columns={columns}
            data={data.data.result}
            setPrintButtonClick={setPrintButtonClick}
        />
    ) : null;
};

export default ExpenseCategoryPrint;
