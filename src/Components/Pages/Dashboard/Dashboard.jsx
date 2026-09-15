import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardComponents/DashboardCard";
import { useGetMonthlySubscriptionCountsQuery } from "../../../store/api/app/Subscriptions/subscriptionsApiSlice";
import DashboardSubscriptionCountCard from "./DashboardComponents/DashboardSubscriptionCountCard";
import { useSelector } from "react-redux";
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";
import { use } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetPlansQuery } from "../../../store/api/app/Plans/plansApiSlice";
import PlanModal from "../../Shared/PlanModal/PlanModal";

const LineChartComponent = React.lazy(() => import("../../Shared/LineChartComponent/LineChartLineChartComponent"));
const StoreDashboard = React.lazy(() => import("./StoreDashboard/StoreDashboard"));

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [year, setYear] = useState(new Date().getFullYear()); // Default to the current year
  const [showModal, setShowModal] = useState(false);
  const [daysLeft, setDaysLeft] = useState(null);

  const { data, isLoading } = useGetMonthlySubscriptionCountsQuery({ year });

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;

  const { data: storeData } = useGetStoresByIdQuery(store_id);
  const { data: plansData } = useGetPlansQuery()
  console.log("plansData", plansData);


  // Transform API data into the format needed for the LineChartComponent
  const getDataForChart = (data) => {
    if (!data || !data.data) return []; // Handle loading or no data

    return data.data.map((item) => {
      const counts = item.counts.reduce((acc, count) => {
        const [planName, countValue] = Object.entries(count)[0]; // Get the first entry of the count object
        acc[planName] = countValue; // Map plan name to its count
        return acc;
      }, {});

      return {
        name: item.month,
        ...counts, // Spread counts to include dynamic plan names
      };
    });
  };

  const chartData = getDataForChart(data);

  useEffect(() => {
    if (!storeData || !storeData.data) return;

    const planEndsAt = new Date(storeData.data.plan_ends_at);
    const today = new Date();

    // Calculate days left
    const timeDiff = planEndsAt.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (pathname.includes("/store/dashboard")) {
      if (daysDiff <= 0) {
        setShowModal(true);
      } else if (daysDiff <= 3) {
        setDaysLeft(daysDiff);
      }
    }
  }, [storeData, pathname]);


  return (
    <div>
      {/* 🔔 Notification bar */}
      {daysLeft && (
        <div className="bg-red-400 border border-white-400 text-white px-4 py-3 rounded mb-4">
          <p>
            {daysLeft === 1
              ? "1 day left on your current plan."
              : `${daysLeft} days left on your current plan.`}
          </p>
        </div>
      )}
      {/* <h2 className="text-xl font-semibold mt-8 mb-6">Dashboard</h2> */}
      {/* <DashboardCard /> */}

      {/* <div className="mt-6">
        <div className="col-span-3">
          <div className="px-4 py-8 bg-white shadow-lg rounded-md mb-4">
            <div className="flex justify-between mb-6">
              <h3 className="text-xl font-semibold">Subscriber</h3>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="border border-gray-400 py-1 px-2 text-lg font-semibold"
              >
                {[...Array(10)].map((_, index) => {
                  const optionYear = new Date().getFullYear() - index;
                  return (
                    <option key={optionYear} value={optionYear}>
                      {optionYear}
                    </option>
                  );
                })}
              </select>
            </div>
            {!isLoading ? (
              <React.Suspense fallback={<div className="min-h-[280px] flex items-center justify-center text-sm text-slate-500">Loading chart...</div>}><LineChartComponent data={chartData} /></React.Suspense>
            ) : (
              <p>Loading data...</p>
            )}
          </div>



        </div>


        <div>
          <DashboardSubscriptionCountCard />
        </div>


      </div> */}

      {
        (pathname.includes("/store/dashboard") && (
          <React.Suspense fallback={<div className="min-h-[280px] flex items-center justify-center text-sm text-slate-500">Loading dashboard...</div>}><StoreDashboard /></React.Suspense>
        ))
      }

    </div>
  );
};

export default Dashboard;
