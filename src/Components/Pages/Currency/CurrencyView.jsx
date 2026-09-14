import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetFeaturesByIdQuery } from "../../../store/api/app/Features/featuresApiSlice";

const CurrencyView = ({ isOpen, onClose, data }) => {
  const { data: viewData } = useGetFeaturesByIdQuery(data?.id);
  const items = [
    {
      status: "Status",
      value: viewData?.data?.status,
    },
    {
      title: "Name",
      value: viewData?.data?.name,
    },
  ];
  return (
    <div>
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        title="Features"
        items={items}
      />
    </div>
  );
};

export default CurrencyView;
