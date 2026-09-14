import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetFeaturesByIdQuery } from "../../../store/api/app/Features/featuresApiSlice";
import { useGetAssetTypesByIdQuery } from "../../../store/api/app/AssetTypesApi/featuresApiSlice";
import { useParams } from "react-router-dom";

const AssetTypesView = ({ isOpen, onClose, data }) => {
  const { id } = useParams();
  const { data: viewData } = useGetAssetTypesByIdQuery(id);
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
      title: "Note",
      value: viewData?.data?.note,
    },
  ];
  return (
    <div>
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        title="Asset Type Details"
        items={items}
      />
    </div>
  );
};

export default AssetTypesView;
