import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetLoansByPaginationQuery } from '../../../store/api/app/LoansApi/loansApiSlice';

const LoanPdf = ({ setPdfButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetLoansByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
    });

    if (isError) {
        console.error("PDF error:", error);
        setPdfButtonClick(false);
        return null;
    }

    const formattedData = data?.data?.result?.map(loan => ({
        ...loan,
        payable: loan?.payable ? loan.payable.toFixed(2) : "0.00",
        per_installment: loan?.per_installment ? loan.per_installment.toFixed(2) : "0.00",
    }));

    return isSuccess && data?.data?.result ? (
        <ReusablePdfGenerator
            title="Loan Report"
            columns={columns}
            data={formattedData}
            fileName="loan.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default LoanPdf;
