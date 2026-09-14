import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetSubscribersByIdQuery } from "../../../store/api/app/Subscriber/subscriberApiSlice";

const SubscriberView = ({ isOpen, onClose, data }) => {
  const { data: viewData } = useGetSubscribersByIdQuery(data?.id);
  const items = [
    {
      status: "Status",
      value: viewData?.data?.status,
    },
    {
      title: "Name",
      value: viewData?.data?.first_name + " " + viewData?.data?.last_name,
    },
    {
      image: "Profile",
      value: viewData?.data?.profile,
    },
    {
      title: "Phone",
      value: viewData?.data?.phone,
    },
    {
      title: "Email",
      value: viewData?.data?.email,
    },
    {
      title: "Address",
      value: viewData?.data?.address,
    },
  ];
  return (
    <div>
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        title="Subscriber"
        items={items}
      />
    </div>
  );
};

export default SubscriberView;
