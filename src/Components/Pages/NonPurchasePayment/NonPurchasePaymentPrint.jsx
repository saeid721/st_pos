import React from 'react';
import ReusablePrintComponent from '../../Shared/ReusablePrintComponent/ReusablePrintComponent';
import { useGetNonPurchasePaymentsByPaginationQuery } from '../../../store/api/app/NonPurchasePayment/nonPurchasePaymentApiSlice';


const NonPurchasePaymentPrint = ({ setPrintButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        { Header: 'Status', accessor: 'status', id: 'status' }
    ];

    const { data, isSuccess, isError, error } = useGetNonPurchasePaymentsByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
    });

    if (isError) {
        console.error('Print error:', error);
        setPrintButtonClick(false);
        return null;
    }

    const transformedData = data?.data?.result?.map(item => ({
        ...item,
        type: item.type === 0 ? "Due" : "Payment",
    }));

    return isSuccess && transformedData ? (
        <ReusablePrintComponent
            title="Non Purchase Payment Report"
            columns={columns}
            data={transformedData}
            setPrintButtonClick={setPrintButtonClick}
        />
    ) : null;
};

export default NonPurchasePaymentPrint;
