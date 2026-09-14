import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetCategoriesByIdQuery } from "../../../store/api/app/Category/categoryApiSlice";
import { useGetBrandsByIdQuery } from "../../../store/api/app/Brand/brandApiSlice";
import { useParams } from "react-router-dom";

const BrandView = ({ isOpen, onClose, data }) => {
  const { id } = useParams();
  const { data: viewData } = useGetBrandsByIdQuery(id);
  console.log("viewData", viewData);
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
      title: "Code",
      value: viewData?.data?.code,
    },
    {
      image: "Photo",
      value: viewData?.data?.photo,
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
        title="Brand Details"
        items={items}
      />
    </div>
  );
};

export default BrandView;
