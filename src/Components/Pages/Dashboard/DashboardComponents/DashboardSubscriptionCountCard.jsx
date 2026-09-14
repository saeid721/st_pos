import React, { useState } from "react";
import { useGetSUbscriptionsCountReportQuery } from "../../../../store/api/app/Report/reportApiSlice";
import DateTimePicker from "../../../Shared/DateTimePicker/DateTimePicker";

const DashboardSubscriptionCountCard = () => {
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { data, isLoading } = useGetSUbscriptionsCountReportQuery({
    current_month: currentMonth,
    current_year: currentYear,
    from_date: fromDate,
    to_date: toDate,
  });

  const getRandomColor = () => {
    const colors = [
      "bg-red-200",
      "bg-blue-200",
      "bg-green-200",
      "bg-yellow-200",
      "bg-purple-200",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div className="mt-5 mb-10 shadow-sm shadow-green-400">
      {/* <div className='border border-gray-300 p-5'>
                <h2 className='text-xl font-semibold px-5 text-center'>Filtering</h2>
                <div className=' flex gap-5 mt-3'>
                    <div
                        className=' border border-gray-200 text-sm font-semibold cursor-pointer px-5  py-2 rounded-md hover:bg-green-500 hover:text-white'
                        onClick={() => setCurrentMonth('current_month')}
                    >
                        <p>Current Month</p>
                    </div>

                    <div
                        className=' border border-gray-200 text-sm font-semibold cursor-pointer px-5  py-2 rounded-md hover:bg-green-500 hover:text-white '
                        onClick={() => setCurrentYear('current_year')}
                    >
                        <p>Current Year</p>
                    </div>

                   <div>
                   <DateTimePicker
                        setFromDate={setFromDate}
                        setToDate={setToDate}
                    />
                   </div>

                </div>

            </div> */}

      <div className="mt-5">
        <p className="font-bold text-xl md:px-3">Status Wise Subscriptions</p>
        <div className="p-5 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-3">
          {data?.data?.statusWiseCount?.map((sub, index) => (
            <div
              key={index}
              className={`border ${getRandomColor()} p-3 rounded-md`}
            >
              <p className="text-center uppercase font-semibold text-sm">
                {sub?.status}
              </p>
              <div className="mt-5 grid grid-cols-2">
                <p className="text-sm font-semibold">{sub?.plan}</p>
                <div className="border-l border-gray-500">
                  <p className="text-sm text-center">
                    <span className="font-semibold">Count: </span>
                    {sub?.count}
                  </p>
                  <p className="text-sm text-center">
                    <span className="font-semibold">Total: </span>
                    {sub?.totalAmount?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="font-bold text-xl md:px-3">
          {" "}
          Payment Status Wise Subscriptions
        </p>
        <div className="p-5 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-3">
          {data?.data?.paymentStatusWiseCount?.map((sub, index) => (
            <div
              key={index}
              className={`border ${getRandomColor()} p-3 rounded-md`}
            >
              <p className="text-center uppercase font-semibold text-sm">
                {sub?.payment_status}
              </p>
              <div className="mt-5 grid grid-cols-2">
                <p className="text-sm font-semibold">{sub?.plan}</p>
                <div className="border-l border-gray-500">
                  <p className="text-sm text-center">
                    <span className="font-semibold">Count: </span>
                    {sub?.count}
                  </p>
                  <p className="text-sm text-center">
                    <span className="font-semibold">Total: </span>
                    {sub?.totalAmount?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSubscriptionCountCard;
