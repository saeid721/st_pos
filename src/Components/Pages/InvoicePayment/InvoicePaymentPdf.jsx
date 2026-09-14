import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetInvoicePaymentsByPaginationQuery } from '../../../store/api/app/Invoice/invoiceApiSlice';

const InvoicePaymentPdf = ({ setPdfButtonClick, newColumns }) => { 
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetInvoicePaymentsByPaginationQuery({
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
            title="Invoice Payment Report"
            columns={columns}
            data={data?.data?.result}
            fileName="invoice_payment.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default InvoicePaymentPdf;
