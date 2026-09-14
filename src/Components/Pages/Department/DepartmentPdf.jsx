import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetDepartmentsByPaginationQuery } from '../../../store/api/app/Department/departmentApiSlice';

const DepartmentPdf = ({ setPdfButtonClick, newColumns, store_id }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetDepartmentsByPaginationQuery({
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
            title="Department Report"
            columns={columns}
            data={data.data.result}
            fileName="department.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default DepartmentPdf;
