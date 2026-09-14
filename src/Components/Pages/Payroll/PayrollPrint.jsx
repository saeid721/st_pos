import React from 'react';
import ReusablePrintComponent from '../../Shared/ReusablePrintComponent/ReusablePrintComponent';
import { useGetPayrollsByPaginationQuery } from '../../../store/api/app/PayrollApi/payrollApiSlice';

const PayrollPrint = ({ setPrintButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        { Header: 'Status', accessor: 'status', id: 'status' }
    ];

    const { data, isSuccess, isError, error } = useGetPayrollsByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
    });

    if (isError) {
        console.error('Print error:', error);
        setPrintButtonClick(false);
        return null;
    }

    return isSuccess && data?.data?.result ? (
        <ReusablePrintComponent
            title="Payroll Report"
            columns={columns}
            data={data.data.result}
            setPrintButtonClick={setPrintButtonClick}
        />
    ) : null;
};

export default PayrollPrint;
