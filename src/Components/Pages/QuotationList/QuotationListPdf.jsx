import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetQuotationsByPaginationQuery } from '../../../store/api/app/QuotationList/quotationListApiSlice';

const QuotationListPdf = ({ setPdfButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetQuotationsByPaginationQuery({
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
            title="Quotation List Report"
            columns={columns}
            data={data.data.result}
            fileName="quotation_list.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default QuotationListPdf;
