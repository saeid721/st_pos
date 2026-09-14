import React from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../Shared/Breadcrumb/Breadcrumb";

export default function MainContent({ isExpanded, isPOSPage }) {
  return (
    <div
      className={`px-3 pb-14 transition-all duration-300 ${
        isPOSPage
          ? "pt-3"
          : isExpanded
          ? "pt-3 md:pl-[18.75rem]"
          : "pt-3 md:pl-[5.75rem]"
      }`}
    >
      <Outlet />
    </div>
  );
}