import React from 'react';
import StoreRoleManagementList from '../../SuperAdmin/RoleManagement/StoreRoleManagementList';

const StoreRoleManagement = () => {
    return (
        <div className='mt-10 mb-10'>
            <h1 className='text-2xl font-semibold mb-8'>Role Management</h1>
            <div >
                <div>
                    <StoreRoleManagementList />
                </div>

            </div>
        </div>
    );
};

export default StoreRoleManagement;