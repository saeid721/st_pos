import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetStoreTransactionHistoryByPaginationQuery } from '../../../store/api/app/TransactionHistory/transactionHistoryApiSlice';

const TransactionHistoryPdf = ({ setPdfButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetStoreTransactionHistoryByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
    });

    if (isError) {
        console.error("PDF error:", error);
        setPdfButtonClick(false);
        return null;
    }

    const transformedData = data?.data?.result?.map(item => ({
        ...item,
        type: item.type === 1 ? 'Add Balance' : 'Remove Balance',
        account: `${item.account?.bank_name || ''} (${item.account?.account_number || ''})`,
        
    }));

    return isSuccess && data?.data?.result ? (
        <ReusablePdfGenerator
            title="Transaction History Report"
            columns={columns}
            data={transformedData}
            fileName="transaction_history.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default TransactionHistoryPdf;
