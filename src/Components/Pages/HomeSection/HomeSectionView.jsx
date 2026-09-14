import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetHomeSectionByIdQuery } from "../../../store/api/app/HomeSection/homeSectionApiSlice";

const HomeSectionView = ({ isOpen, onClose, data }) => {
  const { data: viewData } = useGetHomeSectionByIdQuery(data?.id);
  const items = [
    {
      status: "Status",
      value: viewData?.data?.status,
    },
    {
      title: "Title",
      value: viewData?.data?.title,
    },
    {
      title: "Sort Order",
      value: viewData?.data?.sort_order,
    },
    {
      title: "Section Type",
      value: viewData?.data?.section_type,
    },
  ];
  return (
    <div>
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        title="Home Section"
        items={items}
      />
    </div>
  );
};

export default HomeSectionView;
