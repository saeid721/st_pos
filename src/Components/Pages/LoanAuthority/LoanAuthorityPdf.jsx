import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetLoanAuthoritiesByPaginationQuery } from '../../../store/api/app/LoanAuthoritiesApi/loanAuthoritiesApiSlice';

const LoanAuthorityPdf = ({ setPdfButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetLoanAuthoritiesByPaginationQuery({
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
            title="Loan Authority Report"
            columns={columns}
            data={data.data.result}
            fileName="loan_authority.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default LoanAuthorityPdf;
