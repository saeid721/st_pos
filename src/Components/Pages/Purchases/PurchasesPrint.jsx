import React from 'react';
import { useGetPurchasesByPaginationQuery } from '../../../store/api/app/Purchases/purchasesApiSlice';
import ReusablePrintComponent from '../../Shared/ReusablePrintComponent/ReusablePrintComponent';

const PurchasesPrint = ({ setPrintButtonClick, newColumns }) => {
    // Step 1: Filter out UI-only calculated columns
    const filteredColumns = newColumns.filter(
        col =>
            !(
                (col.Header === 'Net Total' && col.accessor === 'store_id') ||
                (col.Header === 'Total Paid' && col.accessor === 'purchase_payments') ||
                (col.Header === 'Total Due' && col.accessor === 'is_paid')
            )
    );

    // Step 2: Add clean calculated columns for print
    const columns = [
        ...filteredColumns,
        { Header: 'Net Total', accessor: 'net_total', id: 'net_total' },
        { Header: 'Total Paid', accessor: 'total_paid', id: 'total_paid' },
        { Header: 'Total Due', accessor: 'total_due', id: 'total_due' }
    ];

    // Step 3: Fetch data
    const { data, isSuccess, isError, error } = useGetPurchasesByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
    });

    if (isError) {
        console.error('Print error:', error);
        setPrintButtonClick(false);
        return null;
    }

    // Step 4: Prepare enriched data with calculations
    const enrichedData = data?.data?.result?.map(purchase => {
        const {
            sub_total = 0,
            transport = 0,
            total_tax = 0,
            discounted_amount = 0,
            purchase_payments = [],
        } = purchase;

        const totalPaid = purchase_payments.reduce((sum, p) => sum + p.amount, 0);
        const netTotal = sub_total + transport + total_tax - discounted_amount;
        const totalDue = sub_total - totalPaid;

        return {
            ...purchase,
            net_total: netTotal.toFixed(2),
            total_paid: totalPaid.toFixed(2),
            total_due: totalDue.toFixed(2),
        };
    });

    return isSuccess && enrichedData ? (
        <ReusablePrintComponent
            title="Purchases Report"
            columns={columns}
            data={enrichedData}
            setPrintButtonClick={setPrintButtonClick}
        />
    ) : null;
};

export default PurchasesPrint;
