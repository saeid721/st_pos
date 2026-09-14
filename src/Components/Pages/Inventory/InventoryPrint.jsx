import React from 'react';
import ReusablePrintComponent from '../../Shared/ReusablePrintComponent/ReusablePrintComponent';
import { useGetProductsByPaginationQuery } from '../../../store/api/app/Products/productsApiSlice';

const InventoryPrint = ({ setPrintButtonClick, newColumns, store_id }) => {
    const columns = [
        ...newColumns,
        // { Header: 'Inventory Value', accessor: 'inventory_value', id: 'inventory_value' },
        { Header: 'Status', accessor: 'status', id: 'status' },
    ];

    const { data, isSuccess, isError, error } = useGetProductsByPaginationQuery({
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

    const transformedData = data?.data?.result?.map(item => ({
        ...item,
        inventory_value: (item.purchase_price || 0) * (item.inventory_count || 0)
    }));

    return isSuccess && data?.data?.result ? (
        <ReusablePrintComponent
            title="Inventory Report"
            columns={columns}
            data={transformedData}
            setPrintButtonClick={setPrintButtonClick}
        />
    ) : null;
};

export default InventoryPrint;
