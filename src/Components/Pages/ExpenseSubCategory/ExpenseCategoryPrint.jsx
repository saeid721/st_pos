import React from 'react';
import { useGetExpenseSubCategoryByPaginationQuery } from '../../../store/api/app/ExpenseSubCategory/expenseSubCategoriesApiSlice';
import ReusablePrintComponent from '../../Shared/ReusablePrintComponent/ReusablePrintComponent';

const ExpenseSubCategoryPrint = ({ setPrintButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        { Header: 'Status', accessor: 'status', id: 'status' }
    ];

    const { data, isSuccess, isError, error } = useGetExpenseSubCategoryByPaginationQuery({
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
            title="Expense Sub Category Report"
            columns={columns}
            data={data.data.result}
            setPrintButtonClick={setPrintButtonClick}
        />
    ) : null;
};

export default ExpenseSubCategoryPrint;
