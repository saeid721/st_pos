import React from 'react';
import ReusablePrintComponent from '../../Shared/ReusablePrintComponent/ReusablePrintComponent';
import { useGetAccountTransactionsByPaginationQuery } from '../../../store/api/app/AccountTransaction/accountTransactionApiSlice';

const AccountTransactionPrint = ({ setPrintButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        { Header: 'Status', accessor: 'status', id: 'status' }
    ];

    const { data, isSuccess, isError, error } = useGetAccountTransactionsByPaginationQuery({
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
        type: item.type === 0 ? 'Debit' : 'Credit',
        account: item.account
            ? `${item.account.bank_name || ''} - ${item.account.account_number || ''}`
            : '',
    }));

    return isSuccess && data?.data?.result ? (
        <ReusablePrintComponent
            title="Account Transaction Report"
            columns={columns}
            data={transformedData}
            setPrintButtonClick={setPrintButtonClick}
        />
    ) : null;
};

export default AccountTransactionPrint;
