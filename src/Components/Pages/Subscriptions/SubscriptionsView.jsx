import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetSubscriptionsByIdQuery } from "../../../store/api/app/Subscriptions/subscriptionsApiSlice";

const SubscriptionsView = ({ isOpen, onClose, data }) => {
  const { data: viewData } = useGetSubscriptionsByIdQuery(data?.id);
  const items = [
    {
      status: "Status",
      value: viewData?.data?.status,
    },
    {
      title: "Plan",
      value: viewData?.data?.name,
    },
    {
      title: "Description",
      value: viewData?.data?.description,
    },
    {
      title: "Price",
      value: viewData?.data?.price,
    },
    {
      title: "Type",
      value: viewData?.data?.duration_type,
    },
    {
      title: "Duration",
      value: viewData?.data?.duration,
    },
  ];
  return (
    <div>
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        title="Subscriptions"
        items={items}
      />
    </div>
  );
};

export default SubscriptionsView;
