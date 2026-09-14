import React from 'react';
import { useSelector } from 'react-redux';
import { useGetBranchesQuery } from '../../../store/api/app/Branch/branchApiSlice';
import { useNavigate } from 'react-router-dom';

const StoreAllBranches = () => {
    const navigate = useNavigate(); // Get the navigate function
    const { isAuth, auth } = useSelector((state) => state.auth);
    const { store_id } = auth.user;

    // Get store branches using the store_id from the auth state
    const { data: allBranches } = useGetBranchesQuery({
        store_id: store_id,
    });

    const handleBranchClick = (id) => {
        // Store this id in local storage
        localStorage.setItem('branch_id', id);
        navigate(`/store/dashboard`);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4">
                <div className="bg-white shadow-lg rounded-lg p-8 md:w-[70%] mx-auto">
                    <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
                        Select Your Branch
                    </h2>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                        {allBranches?.data?.map((branch, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer border border-gray-200"
                                onClick={() => handleBranchClick(branch?.id)}
                            >
                                <div className="flex flex-col gap-4">
                                    <h5 className="text-xl font-semibold text-gray-800">
                                        <strong>Name:</strong> {branch.name}
                                    </h5>
                                    <p className="text-sm text-gray-600">
                                        <strong>Email:</strong> {branch.email}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <strong>Address:</strong> {branch.address}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <strong>Phone:</strong> {branch.mobile}
                                    </p>
                                </div>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreAllBranches;
