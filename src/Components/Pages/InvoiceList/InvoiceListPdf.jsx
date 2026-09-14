import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetInvoicesByPaginationQuery } from '../../../store/api/app/InvoiceList/invoiceListApiSlice';
import { useSystemSettings } from '../../../lib/SystemSettingsProvider';

const InvoiceListPdf = ({ setPdfButtonClick, newColumns }) => {
    const { settings } = useSystemSettings();
    // Filter out columns that should not appear in the PDF
    const filteredColumns = newColumns.filter(
        col =>
            !(
                (col.Header === 'Net Total' && col.accessor === 'store_id') ||
                (col.Header === 'Total Paid' && col.accessor === 'invoice_payments') ||
                (col.Header === 'Total Due' && col.accessor === 'is_paid') ||
                (col.Header === 'Discount' && col.accessor === 'discount') ||
                (col.Header === 'Sub Total' && col.accessor === 'sub_total')
            )
    );

    // Define final columns with 4 additional fields
    const columns = [
        ...filteredColumns,
        {
            Header: 'Discount',
            accessor: 'discount',
            id: 'discount',
        },
        {
            Header: 'Net Total',
            accessor: 'net_total',
            id: 'net_total',
        },
        {
            Header: 'Total Paid',
            accessor: 'total_paid',
            id: 'total_paid',
        },
        {
            Header: 'Total Due',
            accessor: 'total_due',
            id: 'total_due',
        },
        {
            Header: 'Sub Total',
            accessor: 'sub_total',
            id: 'sub_total',
        },
    ];

    const { data, isSuccess, isError, error } = useGetInvoicesByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
    });

    if (isError) {
        console.error("PDF error:", error);
        setPdfButtonClick(false);
        return null;
    }

    const enrichedData = data?.data?.result?.map(invoice => {
        const {
            sub_total = 0,  
            transport = 0,
            total_tax = 0,
            discounted_amount = 0,
            invoice_payments = [],
            discount = 0,
            discount_type,
        } = invoice;

        const netTotal = sub_total + transport + total_tax - discounted_amount;
        const totalPaid = invoice_payments.reduce((sum, p) => sum + p.amount, 0);
        const totalDue = netTotal - totalPaid;

        const discountDisplay = discount_type === "FLAT" ? `${settings?.currency}${discount}` : `${discount}%`;

        return {
            ...invoice,
            sub_total: sub_total.toFixed(2),
            discount: discountDisplay,
            net_total: netTotal.toFixed(2),
            total_paid: totalPaid.toFixed(2),
            total_due: totalDue.toFixed(2),
        };
    });

    return isSuccess && enrichedData ? (
        <ReusablePdfGenerator
            title="Invoice List Report"
            columns={columns}
            data={enrichedData}
            fileName="invoice-list.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default InvoiceListPdf;
