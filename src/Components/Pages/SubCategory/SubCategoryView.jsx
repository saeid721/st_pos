import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetSubCategoriesByIdQuery } from "../../../store/api/app/SubCategory/subCategoryApiSlice";
import { useParams } from "react-router-dom";

const SubCategoryView = ({ isOpen, onClose, data }) => {
  const { id } = useParams();
  const { data: viewData } = useGetSubCategoriesByIdQuery(id);
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
      title: "Category",
      value: viewData?.data?.category?.name,
    },
    
  ];
  return (
    <div>
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        title="Sub Category Details"
        items={items}
      />
    </div>
  );
};

export default SubCategoryView;
