import React from 'react';
import { useGetPlansQuery } from '../../../store/api/app/Plans/plansApiSlice';
import { useNavigate } from 'react-router-dom';
import { useSystemSettings } from '../../../lib/SystemSettingsProvider';

const StoreSubscription = () => {
  const navigate = useNavigate();

  const { settings } = useSystemSettings();

  const { data: plansData } = useGetPlansQuery()

  const handlePlanClick = (planId) => {
    console.log("planId", planId);
    navigate(`/store/dashboard/payment?selectedPlan=${planId}`);
  };

  return (
    <div>
      <div>
        {/* Modal Title */}
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-10">
          Choose Your Plan
        </h2>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plansData?.data?.map((plan) => (
            <div
              key={plan.id}
              className="relative bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition hover:scale-[1.02] duration-300"
            >
              {/* Plan Image */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={plan.image.replace("/public", "")}
                  alt={plan.name}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-indigo-500 shadow-md"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>
              </div>

              {/* Plan Features */}
              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li><strong>💵 Amount:</strong> {settings?.currency}{plan.amount}</li>
                <li><strong>⏱ Duration:</strong> {plan.duration_value} {plan.duration_type}</li>

              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handlePlanClick(plan.id)}
                className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2.5 rounded-xl text-base font-semibold shadow-md hover:from-indigo-600 hover:to-blue-600 transition"
              >
                Purchase Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreSubscription;