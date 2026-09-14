import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetSalaryIncrementsByPaginationQuery } from '../../../store/api/app/Increment/incrementApiSlice';

const IncrementPdf = ({ setPdfButtonClick, newColumns, store_id }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetSalaryIncrementsByPaginationQuery({
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
            title="Salary Increments Report"
            columns={columns}
            data={data.data.result}
            fileName="salary-increments.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default IncrementPdf;
