import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetPlansByIdQuery } from "../../../store/api/app/Plans/plansApiSlice";
import { useParams } from "react-router-dom";

const InventoryView = ({ isOpen, onClose, data }) => {
  const { id } = useParams();
  const { data: viewData } = useGetPlansByIdQuery(id);
  const items = [
    {
      status: "Status",
      value: viewData?.data?.status,
    },
    {
      title: "Name",
      value: viewData?.data?.name,
    },
    {
      title: "Amount",
      value: viewData?.data?.amount,
    },
    {
      title: "Duration Type",
      value: viewData?.data?.duration_type	,
    },
    {
      title: "Description",
      value: viewData?.data?.description,
    },
    {
      title: "limit_clients",
      value: viewData?.data?.limit_clients,
    },
    {
      title: "limit_invoices",
      value: viewData?.data?.limit_invoices,
    },
    {
      title: "limit_employees",
      value: viewData?.data?.limit_employees,
    },
    {
      title: "limit_domains",
      value: viewData?.data?.limit_domains,
    },
    {
      title: "limit_purchases",
      value: viewData?.data?.limit_purchases,
    },
  ];
  return (
    <div>
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        title="Plan"
        items={items}
      />
    </div>
  );
};

export default InventoryView;
