import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetEmployeesByPaginationQuery } from '../../../store/api/app/Employees/employeesApiSlice';

const EmployeesPdf = ({ setPdfButtonClick, newColumns, store_id }) => {    
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetEmployeesByPaginationQuery({
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
            title="Employees Report"
            columns={columns}
            data={data.data.result}
            fileName="employees.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default EmployeesPdf;
