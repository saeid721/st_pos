import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetStoreTransactionHistoryByPaginationQuery } from '../../../store/api/app/TransactionHistory/transactionHistoryApiSlice';
import { useGetProductsByPaginationQuery } from '../../../store/api/app/Products/productsApiSlice';

const InventoryPdf = ({ setPdfButtonClick, newColumns, store_id }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        },
        {
            Header: "Inventory Value",
            accessor: "inventory_value",
            id: "inventory_value"
        }
    ];

    const { data, isSuccess, isError, error } = useGetProductsByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
        store_id: store_id,
    });

    if (isError) {
        console.error("PDF error:", error);
        setPdfButtonClick(false);
        return null;
    }

    const transformedData = data?.data?.result?.map(item => ({
        ...item,
        inventory_value: (item.purchase_price || 0) * (item.inventory_count || 0)
    }));

    return isSuccess && data?.data?.result ? (
        <ReusablePdfGenerator
            title="Inventory Report"
            columns={columns}
            data={transformedData}
            fileName="inventory.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default InventoryPdf;
