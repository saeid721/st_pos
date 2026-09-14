import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetSubCategoriesByPaginationQuery } from '../../../store/api/app/SubCategory/subCategoryApiSlice';

const SubCategoryPdf = ({ setPdfButtonClick, newColumns, store_id }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetSubCategoriesByPaginationQuery({
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
            title="Sub Category Report"
            columns={columns}
            data={data.data.result}
            fileName="sub_category.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default SubCategoryPdf;
