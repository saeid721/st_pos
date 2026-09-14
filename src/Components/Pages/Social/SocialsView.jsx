import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetSocialsByIdQuery } from "../../../store/api/app/Socials/socialsApiSlice";

const SocialsView = ({ isOpen, onClose, data }) => {
  const { data: viewData } = useGetSocialsByIdQuery(data?.id);
  const items = [
    {
      status: "Status",
      value: viewData?.data?.status,
    },
    {
      image: "Image",
      value: viewData?.data?.image,
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
        title="Socials"
        items={items}
      />
    </div>
  );
};

export default SocialsView;
