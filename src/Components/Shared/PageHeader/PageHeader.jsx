import React from "react";
import Breadcrumb, { getPageTitle } from "../Breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";

const PageHeader = ({ title, breadcrumbs }) => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-slate-200/70">
      <h1 className="text-xl font-bold text-gray-800 mb-2 md:mb-0">
        {title || getPageTitle(pathname)}
      </h1>
      <div>
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </div>
    </div>
  );
};

export default PageHeader;
