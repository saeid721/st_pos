import React from 'react';
import ReusablePrintComponent from '../../Shared/ReusablePrintComponent/ReusablePrintComponent';
import { useGetStoreTransactionHistoryByPaginationQuery } from '../../../store/api/app/TransactionHistory/transactionHistoryApiSlice';

const TransactionHistoryPrint = ({ setPrintButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        { Header: 'Status', accessor: 'status', id: 'status' }
    ];

    const { data, isSuccess, isError, error } = useGetStoreTransactionHistoryByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
    });

    if (isError) {
        console.error('Print error:', error);
        setPrintButtonClick(false);
        return null;
    }

    const transformedData = data?.data?.result?.map(item => ({
        ...item,
    }));

    return isSuccess && data?.data?.result ? (
        <ReusablePrintComponent
            title="Transaction History Report"
            columns={columns}
            data={transformedData}
            setPrintButtonClick={setPrintButtonClick}
        />
    ) : null;
};

export default TransactionHistoryPrint;
