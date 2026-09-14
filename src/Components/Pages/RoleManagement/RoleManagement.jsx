import React from 'react';
import RoleManagementList from '../../SuperAdmin/RoleManagement/RoleManagementList';
import RoleManagementSettings from '../../SuperAdmin/RoleManagement/RoleManagementSettings';

const RoleManagement = () => {
    return (
        <div className='mt-10 mb-10'>
            <h1 className='text-2xl font-semibold mb-8'>Role Management</h1>
            <div >
                <div>
                    <RoleManagementList />
                </div>

            </div>
        </div>
    );
};

export default RoleManagement;