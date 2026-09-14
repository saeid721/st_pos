import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetAccountsByPaginationQuery } from '../../../store/api/app/Account/accountApiSlice';
import { useGetBalanceAdjustmentsByPaginationQuery } from '../../../store/api/app/BalanceAdjustments/BalanceAdjustmentsApiSlice';

const BalanceAdjustmentsPdf = ({ setPdfButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetBalanceAdjustmentsByPaginationQuery({
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
    }));

    return isSuccess && data?.data?.result ? (
        <ReusablePdfGenerator
            title="Balance Adjustments Report"
            columns={columns}
            data={transformedData}
            fileName="balance_adjustments.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default BalanceAdjustmentsPdf;
