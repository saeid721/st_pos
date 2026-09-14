import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetUnitsByPaginationQuery } from '../../../store/api/app/Unit/unitApiSlice';

const UnitPdf = ({ setPdfButtonClick, newColumns, store_id }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetUnitsByPaginationQuery({
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
            title="Unit Report"
            columns={columns}
            data={data.data.result}
            fileName="unit.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default UnitPdf;
