import React from "react";
import { Progress } from "../../../ui/progress";

const DashboardTarget = () => {
  return (
    <div>
      <div className="px-4 py-8 bg-white shadow-md rounded-sm mb-6">
        <h3 className="mb-4 text-2xl font-semibold">Targets</h3>
        <div className="relative w-full rounded-2xl mb-4">
          <Progress value={73} className="h-[40px]" />
          <div
            className="absolute top-0 left-0 h-full bg-[#F4E8FE]"
            style={{ width: "73%" }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[#973DEF] font-semibold">
            Donation Goal 73%
          </span>
        </div>
        <div className="relative w-full rounded-2xl mb-4">
          <Progress value={59} className="h-[40px]" />
          <div
            className="absolute top-0 left-0 h-full bg-[#ECF2FF]"
            style={{ width: "59%" }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[#5284FE] font-semibold">
            Sales 59%
          </span>
        </div>
        <div className="relative w-full rounded-2xl mb-4">
          <Progress value={86} className="h-[40px]" />
          <div
            className="absolute top-0 left-0 h-full bg-[#EEFAF8]"
            style={{ width: "86%" }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[#72D7C3] font-semibold">
            Likes 86%
          </span>
        </div>
        <div className="relative w-full rounded-2xl mb-4">
          <Progress value={68} className="h-[40px]" />
          <div
            className="absolute top-0 left-0 h-full bg-[#FEEAF3]"
            style={{ width: "68%" }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[#EE6399] font-semibold">
            Shares 68%
          </span>
        </div>
      </div>
      <div className="px-4 py-8 bg-white shadow-md rounded-sm mb-6">
        <h3 className="mb-4 text-2xl font-semibold">Targets</h3>
        <div className="flex gap-4 items-center mb-5">
          <div className="">
            <img
              src="/person.jpg"
              className="w-[40px] h-[40px] rounded-full"
              alt=""
            />
          </div>
          <div className="">
            <p className="text-lg">Sales</p>
            <p className="text-lg font-semibold">$78,344</p>
          </div>
        </div>
        <div className="flex gap-4 items-center mb-5">
          <div className="">
            <img
              src="/person.jpg"
              className="w-[40px] h-[40px] rounded-full"
              alt=""
            />
          </div>
          <div className="">
            <p className="text-lg">Music</p>
            <p className="text-lg font-semibold">59%</p>
          </div>
        </div>
        <div className="flex gap-4 items-center mb-5">
          <div className="">
            <img
              src="/person.jpg"
              className="w-[40px] h-[40px] rounded-full"
              alt=""
            />
          </div>
          <div className="">
            <p className="text-lg">Podcast</p>
            <p className="text-lg font-semibold">59%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTarget;
