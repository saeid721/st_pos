import React from 'react';
import ReusablePdfGenerator from '../../Shared/ReusablePdfGenerator/ReusablePdfGenerator';
import { useGetAccountsByPaginationQuery } from '../../../store/api/app/Account/accountApiSlice';

const AccountPdf = ({ setPdfButtonClick, newColumns }) => {
    const columns = [
        ...newColumns,
        {
            Header: "Status",
            accessor: "status",
            id: "status"
        }
    ];

    const { data, isSuccess, isError, error } = useGetAccountsByPaginationQuery({
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
            title="Account Report"
            columns={columns}
            data={data.data.result}
            fileName="account.pdf"
            setPdfButtonClick={setPdfButtonClick}
        />
    ) : null;
};

export default AccountPdf;
