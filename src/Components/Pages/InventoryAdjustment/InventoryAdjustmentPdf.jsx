import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetInventoryAdjustmentByPaginationQuery } from '../../../store/api/app/InventoryAdjustment/inventoryAdjustmentApiSlice';

const InventoryAdjustmentPdf = ({ setPdfButtonClick, newColumns, store_id }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetInventoryAdjustmentByPaginationQuery({
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

    return isSuccess && data?.data?.result ? (
        <ReusablePdfGenerator
            title="Inventory Adjustment Report"
            columns={columns}
            data={data.data.result}
            fileName="inventory-adjustment.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default InventoryAdjustmentPdf;
