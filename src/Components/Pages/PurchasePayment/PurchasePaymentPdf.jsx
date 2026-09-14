import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetPurchasePaymentsByPaginationQuery } from '../../../store/api/app/PurchasePayment/PurchasePaymentApiSlice';

const PurchasePaymentPdf = ({ setPdfButtonClick, newColumns }) => { 
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetPurchasePaymentsByPaginationQuery({
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
    }));


    return isSuccess && transformedData ? (
        <ReusablePdfGenerator
            title="Purchase Payment Report"
            columns={columns}
            data={transformedData}
            fileName="purchase_payment.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default PurchasePaymentPdf;
