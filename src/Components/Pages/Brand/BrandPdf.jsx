import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetBrandsByPaginationQuery } from '../../../store/api/app/Brand/brandApiSlice';

const BrandPdf = ({ setPdfButtonClick, newColumns, store_id }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetBrandsByPaginationQuery({
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
            title="Brand Report"
            columns={columns}
            data={data.data.result}
            fileName="brand.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default BrandPdf;
