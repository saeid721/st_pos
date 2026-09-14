import React from 'react';
import ReusablePrintComponent from '../../Shared/ReusablePrintComponent/ReusablePrintComponent';
import { useGetBalanceAdjustmentsByPaginationQuery } from '../../../store/api/app/BalanceAdjustments/BalanceAdjustmentsApiSlice';

const BalanceAdjustmentsPrint = ({ setPrintButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        { Header: 'Status', accessor: 'status', id: 'status' }
    ];

    const { data, isSuccess, isError, error } = useGetBalanceAdjustmentsByPaginationQuery({
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
        type: item.type === 1 ? 'Add Balance' : 'Remove Balance',
    }));

    return isSuccess && data?.data?.result ? (
        <ReusablePrintComponent
            title="Balance Adjustments Report"
            columns={columns}
            data={transformedData}
            setPrintButtonClick={setPrintButtonClick}
        />
    ) : null;
};

export default BalanceAdjustmentsPrint;
