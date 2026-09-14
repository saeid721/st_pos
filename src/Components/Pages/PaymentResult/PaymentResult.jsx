import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get('status');
  const invoice = searchParams.get('invoice');

  const isSuccess = status === 'Successful';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100 px-4 text-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="mb-6">
          {isSuccess ? (
            <>
              <svg
                className="mx-auto mb-4 h-16 w-16 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <h1 className="text-2xl font-bold text-green-700">Payment Successful!</h1>
              <p className="text-gray-600 mt-2">Your transaction has been completed successfully.</p>
              <p className="text-sm text-gray-500 mt-1">Transaction ID: {invoice}</p>
            </>
          ) : (
            <>
              <svg
                className="mx-auto mb-4 h-16 w-16 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <h1 className="text-2xl font-bold text-red-600">Payment Canceled!</h1>
              <p className="text-gray-600 mt-2">Your transaction was not completed.</p>
              <p className="text-sm text-gray-500 mt-1">Please try again or contact support.</p>
            </>
          )}
        </div>

        <button
          onClick={() => navigate('/store/dashboard')}
          className={`mt-6 w-full py-3 px-6 rounded-xl text-white font-semibold transition-all duration-300 ${
            isSuccess ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentResult;
