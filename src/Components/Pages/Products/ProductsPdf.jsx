import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetProductsByPaginationQuery } from '../../../store/api/app/Products/productsApiSlice';

const ProductsPdf = ({ setPdfButtonClick, newColumns, store_id }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetProductsByPaginationQuery({
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
            title="Products Report"
            columns={columns}
            data={data.data.result}
            fileName="products.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default ProductsPdf;
