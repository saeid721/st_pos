import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetBalanceTransfersByPaginationQuery } from '../../../store/api/app/BalanceTransfer/BalanceTransferApiSlice';

const BalanceTransferPdf = ({ setPdfButtonClick, newColumns }) => {  
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetBalanceTransfersByPaginationQuery({
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
    }));

    return isSuccess && data?.data?.result ? (
        <ReusablePdfGenerator
            title="Balance Transfer Report"
            columns={columns}
            data={transformedData}
            fileName="balance_transfer.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default BalanceTransferPdf;
