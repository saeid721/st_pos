import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetNonPurchasePaymentsByPaginationQuery } from '../../../store/api/app/NonPurchasePayment/nonPurchasePaymentApiSlice';

const NonPurchasePaymentPdf = ({ setPdfButtonClick, newColumns }) => { 
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetNonPurchasePaymentsByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
    });

    if (isError) {
        console.error("PDF error:", error);
        setPdfButtonClick(false);
        return null;
    }

    const transformedData = data?.data?.result?.map(item => ({
        ...item,
        type: item.type === 0 ? "Due" : "Payment",
    }));


    return isSuccess && transformedData ? (
        <ReusablePdfGenerator
            title="Non Purchase Payment Report"
            columns={columns}
            data={transformedData}
            fileName="non_purchase_payment.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default NonPurchasePaymentPdf;
