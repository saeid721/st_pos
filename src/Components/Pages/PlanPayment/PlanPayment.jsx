// import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
// import { useState } from 'react';
// import { useGetPlansByIdQuery } from '../../../store/api/app/Plans/plansApiSlice';
// import { useGetStoresByIdQuery, useUpdateStoresMutation } from '../../../store/api/app/store/storeApiSlice';
// import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';

// export default function PlanPayment() {
//     const navigate = useNavigate();
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const { isAuth, auth } = useSelector((state) => state.auth);
//       const { store_id } = auth.user;
//       console.log("store_id", store_id);

//     const [searchParams] = useSearchParams();
//     const selectedPlan = searchParams.get('selectedPlan');

//     const { data: planData } = useGetPlansByIdQuery(selectedPlan);
//     const {data: storeData} = useGetStoresByIdQuery(store_id);
//     console.log("storeData", storeData);

//     const [submit, { isLoading, isSuccess, isError, error }] = useUpdateStoresMutation();

//     const paymentSubmit = async () => {
//         setIsSubmitting(true);

//         try {
//             const payload = {
//                 slug: storeData?.data?.slug,      
//                 plan_id: parseInt(selectedPlan), 
//             };

//             const response = await submit({id: store_id, data: payload}).unwrap();

//             if(response?.status !== 'success') {
//                 throw new Error(response?.message || 'Error occurred from server!');
//             }else{
//                 toast.success(response?.message);
//                 navigate('/store/dashboard');
//             }
//         } catch (err) {
//             console.error('Submit failed:', err);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };


//     return (
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//             <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Your Plan</h2>
//                 <p className="text-gray-600 mb-6">
//                     You're about to purchase this plan using <strong>Cash</strong>.
//                 </p>

//                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
//                     <p className="text-sm text-gray-500 mb-1">Plan Name:</p>
//                     <h3 className="text-lg font-semibold text-gray-800">{planData?.data?.name}</h3>
//                     <p className="text-sm text-gray-500 mt-2">Plan Duration:</p>
//                     <h3 className="text-lg font-semibold text-gray-800">{planData?.data?.duration_value} {planData?.data?.duration_type}</h3>
//                     <p className="text-sm text-gray-500 mt-2">Amount Payable:</p>
//                     <h3 className="text-lg font-semibold text-green-600">{planData?.data?.amount}</h3>
//                 </div>

//                 <p className="text-sm text-gray-500 mb-4">
//                     A representative will contact you for cash collection after you confirm.
//                 </p>

//                 <button
//                     onClick={paymentSubmit}
//                     disabled={isSubmitting}
//                     className={`w-full py-3 rounded-xl text-white font-semibold transition ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
//                         }`}
//                 >
//                     {isSubmitting ? 'Processing...' : 'Confirm & Continue'}
//                 </button>

//                 <button
//                     onClick={() => navigate(-1)}
//                     className="mt-4 text-sm text-gray-500 hover:underline"
//                 >
//                     Go back
//                 </button>
//             </div>
//         </div>
//     );
// }



import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useGetPlansByIdQuery } from '../../../store/api/app/Plans/plansApiSlice';
import { useGetStoresByIdQuery, useUpdateStoresMutation } from '../../../store/api/app/store/storeApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function PlanPayment() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const { isAuth, auth } = useSelector((state) => state.auth);
    const { store_id } = auth.user;

    const [searchParams] = useSearchParams();
    const selectedPlan = searchParams.get('selectedPlan');

    const { data: planData } = useGetPlansByIdQuery(selectedPlan);
    const { data: storeData } = useGetStoresByIdQuery(store_id);

    const [submit, { isLoading, isSuccess, isError, error }] = useUpdateStoresMutation();

    const paymentSubmit = async () => {
        if (!paymentMethod) {
            toast.error('Please select a payment method!');
            return;
        }

        if (paymentMethod === 'manual' && !transactionId.trim()) {
            toast.error('Please provide the transaction ID for manual payment!');
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = {
                slug: storeData?.data?.slug,
                plan_id: parseInt(selectedPlan),
                pm_type: paymentMethod,
                transaction_id: transactionId || null,
            };

            const response = await submit({ id: store_id, data: payload }).unwrap();

            console.log("response", response);
            if (response?.status !== 'success') {
                throw new Error(response?.message || 'Error occurred from server!');
            } else {
                if (paymentMethod === 'online' && response?.data?.payment_url) {
                    window.location.href = response.data.payment_url;
                    return;
                }
                
                toast.success(response?.message);
                navigate('/store/dashboard');
            }
        } catch (err) {
            console.error('Submit failed:', err);
            toast.error(err.message || 'Something went wrong!');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Your Plan</h2>
                <p className="text-gray-600 mb-6">
                    You're about to purchase this plan.
                </p>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
                    <p className="text-sm text-gray-500 mb-1">Plan Name:</p>
                    <h3 className="text-lg font-semibold text-gray-800">{planData?.data?.name}</h3>
                    <p className="text-sm text-gray-500 mt-2">Plan Duration:</p>
                    <h3 className="text-lg font-semibold text-gray-800">{planData?.data?.duration_value} {planData?.data?.duration_type}</h3>
                    <p className="text-sm text-gray-500 mt-2">Amount Payable:</p>
                    <h3 className="text-lg font-semibold text-green-600">{planData?.data?.amount}</h3>
                </div>

                <div className="text-left mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Payment Method</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">-- Select Payment Method --</option>
                        <option value="manual">Manual Payment</option>
                        <option value="online">Online Payment</option>
                    </select>
                </div>

                {paymentMethod === 'manual' && (
                    <div className="text-left mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                        <input
                            type="text"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="Enter transaction ID"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                )}

                <p className="text-sm text-gray-500 mb-4">
                    A representative will contact you for cash collection if you choose manual payment.
                </p>

                <button
                    onClick={paymentSubmit}
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-xl text-white font-semibold transition ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                        }`}
                >
                    {isSubmitting ? 'Processing...' : 'Confirm & Continue'}
                </button>

                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 text-sm text-gray-500 hover:underline"
                >
                    Go back
                </button>
            </div>
        </div>
    );
}
