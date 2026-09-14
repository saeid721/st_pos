import React from "react";
import { useLocation } from "react-router-dom";
import PageHeader from "./PageHeader";

const PageRoute = ({ children }) => {
  const { pathname } = useLocation();
  const isDashboardPage = pathname.includes("/dashboard");
  const isPosPage = pathname.toLowerCase().includes("/pos");

  return (
    <>
      {isDashboardPage && !isPosPage && <PageHeader />}
      {children}
    </>
  );
};

export default PageRoute;