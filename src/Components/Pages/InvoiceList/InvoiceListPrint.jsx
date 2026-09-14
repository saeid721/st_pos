import React from 'react';
import ReusablePrintComponent from '../../Shared/ReusablePrintComponent/ReusablePrintComponent';
import { useGetInvoicesByPaginationQuery } from '../../../store/api/app/InvoiceList/invoiceListApiSlice';
import { useSystemSettings } from '../../../lib/SystemSettingsProvider';

const InvoiceListPrint = ({ setPrintButtonClick, newColumns }) => {
    const { settings } = useSystemSettings();
    // Step 1: Remove columns that are not valid for printing
    const filteredColumns = newColumns.filter(
        col =>
            !(
                (col.Header === 'Sub Total' && col.accessor === 'sub_total') ||
                (col.Header === 'Tax' && col.accessor === 'total_tax') ||
                (col.Header === 'Net Total' && col.accessor === 'store_id') ||
                (col.Header === 'Total Paid' && col.accessor === 'invoice_payments') ||
                (col.Header === 'Total Due' && col.accessor === 'is_paid') ||
                (col.Header === 'Discount' && col.accessor === 'discount')
            )
    );

    // Step 2: Add calculated columns
    const columns = [
        ...filteredColumns,
        { Header: 'Sub Total', accessor: 'sub_total', id: 'sub_total' },
        { Header: 'Tax', accessor: 'total_tax', id: 'total_tax' },
        { Header: 'Discount', accessor: 'discount', id: 'discount' },
        { Header: 'Net Total', accessor: 'net_total', id: 'net_total' },
        { Header: 'Total Paid', accessor: 'total_paid', id: 'total_paid' },
        { Header: 'Total Due', accessor: 'total_due', id: 'total_due' },
    ];

    // Step 3: Fetch invoice data
    const { data, isSuccess, isError, error } = useGetInvoicesByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
    });

    if (isError) {
        console.error('Print error:', error);
        setPrintButtonClick(false);
        return null;
    }

    // Step 4: Transform and enrich data for print
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

        const discountDisplay = discount_type === 'FLAT' ? `${settings?.currency}${discount}` : `${discount}%`;

        return {
            ...invoice,
            discount: discountDisplay,
            sub_total: sub_total.toFixed(2),
            total_tax: total_tax.toFixed(2),
            net_total: netTotal.toFixed(2),
            total_paid: totalPaid.toFixed(2),
            total_due: totalDue.toFixed(2),
        };
    });

    return isSuccess && enrichedData ? (
        <ReusablePrintComponent
            title="Invoice List Report"
            columns={columns}
            data={enrichedData}
            setPrintButtonClick={setPrintButtonClick}
        />
    ) : null;
};

export default InvoiceListPrint;
