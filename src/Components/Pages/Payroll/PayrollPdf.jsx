import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetPayrollsByPaginationQuery } from '../../../store/api/app/PayrollApi/payrollApiSlice';

const PayrollPdf = ({ setPdfButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetPayrollsByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
    });

    if (isError) {
        console.error("PDF error:", error);
        setPdfButtonClick(false);
        return null;
    }

    return isSuccess && data?.data?.result ? (
        <ReusablePdfGenerator
            title="Payroll Report"
            columns={columns}
            data={data.data.result}
            fileName="payroll.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default PayrollPdf;
