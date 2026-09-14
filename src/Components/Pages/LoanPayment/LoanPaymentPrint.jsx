import React from 'react';
import ReusablePrintComponent from '../../Shared/ReusablePrintComponent/ReusablePrintComponent';
import { useGetLoanPaymentsByPaginationQuery } from '../../../store/api/app/paymentsApi/paymentsApiSlice';

const LoanPaymentPrint = ({ setPrintButtonClick, newColumns }) => {
    const updatedColumns = newColumns.map(col => {
        if (col.accessor === "loan.payable") {
            return { ...col, accessor: "payable" };
        }
        if (col.accessor === "amount") {
            return { ...col, accessor: "amount_paid" };
        }
        if (col.accessor === "interest") {
            return { ...col, accessor: "interest" };
        }
        return col;
    });

    const columns = [
        ...updatedColumns,
        { Header: 'Status', accessor: 'status', id: 'status' }
    ];

    const { data, isSuccess, isError, error } = useGetLoanPaymentsByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
    });

    if (isError) {
        console.error('Print error:', error);
        setPrintButtonClick(false);
        return null;
    }

    const formattedData = data?.data?.result?.map(payment => ({
        ...payment,
        payable: payment?.loan?.payable ? payment.loan.payable.toFixed(2) : "0.00",
        amount_paid: payment?.amount ? payment.amount.toFixed(2) : "0.00",
        interest: payment?.interest ? payment.interest.toFixed(2) : "0.00",
    }));

    return isSuccess && formattedData ? (
        <ReusablePrintComponent
            title="Loan Payment Report"
            columns={columns}
            data={formattedData}
            setPrintButtonClick={setPrintButtonClick}
        />
    ) : null;
};

export default LoanPaymentPrint;
