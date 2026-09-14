import React from "react";
import { useSystemSettings } from "../../../lib/SystemSettingsProvider";

const PlanModal = ({ plans, handlePlanClick, payment, storeData }) => {

  console.log("plans::", plans);
  console.log("payment::", payment);

  const { settings } = useSystemSettings();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6 overflow-auto">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl w-full max-w-5xl p-8 border border-gray-200 relative">

        {payment === "pending" ? (
          <div className="bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg p-4 mb-6 text-center">
            <p className="text-lg font-medium">
              ✅ Your subscription request has been received.
            </p>
            <p className="text-sm mt-2">
              Please wait while an admin reviews your request. Your plan will be activated once approved.
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Thank you for your patience.
            </p>
          </div>
        ) : (
          <>
            {/* Modal Title */}
            <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-10">
              Choose Your Plan
            </h2>

            {/* Plans Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {plans
                ?.filter((plan) => {
                  if (storeData?.data?.has_trial && plan.is_trial) return false;
                  return true;
                })
                .map((plan) => (
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
          </>
        )}


      </div>
    </div>
  );
};

export default PlanModal;
