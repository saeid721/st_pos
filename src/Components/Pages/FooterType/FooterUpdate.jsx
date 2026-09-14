import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetFooterByIdQuery } from '../../../store/api/app/footer/footerApiSlice';
import { Loader } from 'lucide-react';
import Error from '../../Shared/Error/Error';
import FooterForm from './FooterForm';

const FooterUpdate = () => {

    const { id, footer_type } = useParams();

    const { data, isFetching, isLoading, isError, error } =
    useGetFooterByIdQuery(id);
  
    if (isLoading || isFetching) return <Loader />;
  
    if (!id) return <Error />;


    return (
        <div>
            <FooterForm id={id} data={data?.data} footer_type={footer_type}  />
        </div>
    );
};

export default FooterUpdate;