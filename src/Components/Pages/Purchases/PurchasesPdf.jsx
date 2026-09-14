import React from 'react';
import { useGetPurchasesByPaginationQuery } from '../../../store/api/app/Purchases/purchasesApiSlice';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';

const PurchasesPdf = ({ setPdfButtonClick, newColumns }) => {
    const filteredColumns = newColumns.filter(
        col =>
            !(
                (col.Header === 'Net Total' && col.accessor === 'store_id') ||
                (col.Header === 'Total Paid' && col.accessor === 'purchase_payments') ||
                (col.Header === 'Total Due' && col.accessor === 'is_paid')
            )
    );

    const columns = [
        ...filteredColumns,
        {
            Header: 'Net Total',
            accessor: 'net_total',
            id: 'net_total'
        },
        {
            Header: 'Total Paid',
            accessor: 'total_paid',
            id: 'total_paid'
        },
        {
            Header: 'Total Due',
            accessor: 'total_due',
            id: 'total_due'
        }
    ];


    const { data, isSuccess, isError, error } = useGetPurchasesByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
    });

    if (isError) {
        console.error("PDF error:", error);
        setPdfButtonClick(false);
        return null;
    }

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

    console.log("enrichedData", enrichedData);

    return isSuccess && data?.data?.result ? (
        <ReusablePdfGenerator
            title="Purchases Report"
            columns={columns}
            data={enrichedData}
            fileName="purchases.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default PurchasesPdf;
