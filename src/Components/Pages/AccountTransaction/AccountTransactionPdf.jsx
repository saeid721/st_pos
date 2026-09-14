import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetAccountTransactionsByPaginationQuery } from '../../../store/api/app/AccountTransaction/accountTransactionApiSlice';

const AccountTransactionPdf = ({ setPdfButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetAccountTransactionsByPaginationQuery({
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
        type: item.type === 0 ? 'Debit' : 'Credit',
        account: item.account
            ? `${item.account.bank_name || ''} - ${item.account.account_number || ''}`
            : '',
    }));

    return isSuccess && data?.data?.result ? (
        <ReusablePdfGenerator
            title="Account Transaction Report"
            columns={columns}
            data={transformedData}
            fileName="account_transaction.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default AccountTransactionPdf;
