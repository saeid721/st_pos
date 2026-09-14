import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";

const StoreView = ({ isOpen, onClose, data }) => {
  const { data: viewData } = useGetStoresByIdQuery(data?.id);
  const items = [
    {
      status: "Status",
      value: viewData?.data?.status,
    },
    {
      title: "Owner Name",
      value: viewData?.data?.owner_name,
    },
    {
      title: "Email",
      value: viewData?.data?.email,
    },
    {
      title: "Store Name",
      value: viewData?.data?.store,
    },
    {
      title: "Plan ",
      value: viewData?.data?.plan_id,
    },
  ];
  return (
    <div>
      <ViewModal isOpen={isOpen} onClose={onClose} data={data} title="Plan" items={items} />
    </div>
  );
};

export default StoreView;
