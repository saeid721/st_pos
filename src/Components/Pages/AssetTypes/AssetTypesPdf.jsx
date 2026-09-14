import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetAssetTypesByPaginationQuery } from '../../../store/api/app/AssetTypesApi/featuresApiSlice';

const AssetTypesPdf = ({ setPdfButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetAssetTypesByPaginationQuery({
        page: 1,
        limit: 0,
        order: 'desc',
    });

    if (isError) {
        console.error("PDF error:", error);
        setPdfButtonClick(false);
        return null;
    }

    return isSuccess && data?.data?.result ? (
        <ReusablePdfGenerator
            title="Asset Types Report"
            columns={columns}
            data={data.data.result}
            fileName="asset_types.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default AssetTypesPdf;
