import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetApplicationFeaturesByIdQuery } from "../../../store/api/app/ApplicationFeatures/applicationFeaturesApiSlice";

const ApplicationFeaturesView = ({ isOpen, onClose, data }) => {
  const { data: viewData } = useGetApplicationFeaturesByIdQuery(data?.id);
  const items = [
    {
      status: "Status",
      value: viewData?.data?.status,
    },
    {
      image: "Icon",
      value: viewData?.data?.icon,
    },
    {
      title: "Title",
      value: viewData?.data?.title,
    },
    {
      title: "Short Descripton",
      value: viewData?.data?.short_description,
    },
  ];
  return (
    <div>
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        title="ApplicationFeatures"
        items={items}
      />
    </div>
  );
};

export default ApplicationFeaturesView;
