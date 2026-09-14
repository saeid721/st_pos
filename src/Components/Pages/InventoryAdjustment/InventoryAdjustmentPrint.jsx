import React from 'react';
import ReusablePrintComponent from '../../Shared/ReusablePrintComponent/ReusablePrintComponent';
import { useGetInventoryAdjustmentByPaginationQuery } from '../../../store/api/app/InventoryAdjustment/inventoryAdjustmentApiSlice';


const InventoryAdjustmentPrint = ({ setPrintButtonClick, newColumns, store_id }) => {
    const columns = [
        ...newColumns,
        { Header: 'Status', accessor: 'status', id: 'status' }
    ];

    const { data, isSuccess, isError, error } = useGetInventoryAdjustmentByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
        store_id: store_id,
    });

    if (isError) {
        console.error('Print error:', error);
        setPrintButtonClick(false);
        return null;
    }

    return isSuccess && data?.data?.result ? (
        <ReusablePrintComponent
            title="Inventory Adjustment Report"
            columns={columns}
            data={data.data.result}
            setPrintButtonClick={setPrintButtonClick}
        />
    ) : null;
};

export default InventoryAdjustmentPrint;
