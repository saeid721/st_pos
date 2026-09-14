import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetCategoriesByIdQuery } from "../../../store/api/app/Category/categoryApiSlice";
import { useParams } from "react-router-dom";

const CategoryView = ({ isOpen, onClose, data }) => {
  const { id } = useParams();
  const { data: viewData } = useGetCategoriesByIdQuery(id);
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
    
  ];
  return (
    <div>
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        title="Category Details"
        items={items}
      />
    </div>
  );
};

export default CategoryView;
