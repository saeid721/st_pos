import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetTaxsByPaginationQuery } from '../../../store/api/app/Tax/taxApiSlice';

const TaxPdf = ({ setPdfButtonClick, newColumns, store_id }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetTaxsByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
        store_id: store_id,
    });

    if (isError) {
        console.error("PDF error:", error);
        setPdfButtonClick(false);
        return null;
    }

    return isSuccess && data?.data?.result ? (
        <ReusablePdfGenerator
            title="Tax Report"
            columns={columns}
            data={data.data.result}
            fileName="tax.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default TaxPdf;
