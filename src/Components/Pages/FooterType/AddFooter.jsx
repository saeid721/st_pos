import React from 'react';
import FooterForm from './FooterForm';
import { useParams } from 'react-router-dom';

const AddFooter = () => {
    const { footer_type } = useParams();
    return (
        <div>
            <FooterForm footer_type={footer_type} />
        </div>
    );
};

export default AddFooter;