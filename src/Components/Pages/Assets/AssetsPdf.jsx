import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetAssetsByPaginationQuery } from '../../../store/api/app/AssetsApi/assetsApiSlice';

const AssetsPdf = ({ setPdfButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetAssetsByPaginationQuery({
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
            title="Assets Report"
            columns={columns}
            data={data.data.result}
            fileName="assets.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default AssetsPdf;
