import { Loader } from 'lucide-react';
import React, { useMemo } from 'react';
import { CiViewList } from 'react-icons/ci';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetFooterByFooterTypeQuery } from '../../../store/api/app/footer/footerApiSlice';
import useDelete from '../../Shared/Constant/hooks/useDelete';
import CustomTable from '../../Shared/Tables/CustomTable';

const FooterTypeWisedFooter = () => {
    const { footer_type } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    const {
        data,
        isLoading: seasonLoading,
        isError: seasonError,
    } = useGetFooterByFooterTypeQuery({ footer_type: footer_type });

    const { handleDelete } = useDelete();

    const handleView = (rowData) => {
        setSelectedData(rowData);
        setIsModalOpen(true);
    };

    const columns = useMemo(
        () => [
            {
                Header: 'Cover',
                accessor: 'cover',
            },
    
            {
                Header: 'Thumbnail',
                accessor: 'thumbnail',
            },
            {
                Header: 'Page Title',
                accessor: 'page_title',
            },

            {
                Header: 'Sub Page Title',
                accessor: 'sub_page_title',
            },

            {
                Header: 'Sort Order',
                accessor: 'sort_order',
            },
    

            {
                Header: 'Footer URL Type',
                accessor: 'footer_url_type',
            },
        ],
        []
    );

    const handleAddNew = () => {
        navigate(`${location.pathname}/new`);
    };

    if (seasonLoading) return <Loader />;
    if (seasonError) return <p>Error: </p>;

    return (
        <>
            <CustomTable
                columns={columns}
                data={data?.data || []}
                onAddNew={handleAddNew}
                showViewAction={true}
                showEditAction={true}
                showDeleteAction={true}
                handleView={handleView}
                handleDelete={handleDelete}
                editPath={location.pathname}
                showStatus={true}
                path={'footer'}
            />
        </>
    );
};

export default FooterTypeWisedFooter;
