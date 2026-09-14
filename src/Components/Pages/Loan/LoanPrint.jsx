import React from 'react';
import ReusablePrintComponent from '../../Shared/ReusablePrintComponent/ReusablePrintComponent';
import { useGetLoansByPaginationQuery } from '../../../store/api/app/LoansApi/loansApiSlice';

const LoanPrint = ({ setPrintButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        { Header: 'Status', accessor: 'status', id: 'status' }
    ];

    const { data, isSuccess, isError, error } = useGetLoansByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
    });

    if (isError) {
        console.error('Print error:', error);
        setPrintButtonClick(false);
        return null;
    }

    const formattedData = data?.data?.result?.map(loan => ({
        ...loan,
        payable: loan?.payable ? loan.payable.toFixed(2) : "0.00",
        per_installment: loan?.per_installment ? loan.per_installment.toFixed(2) : "0.00",
    }));

    return isSuccess && data?.data?.result ? (
        <ReusablePrintComponent
            title="Loan Report"
            columns={columns}
            data={formattedData}
            setPrintButtonClick={setPrintButtonClick}
        />
    ) : null;
};

export default LoanPrint;
