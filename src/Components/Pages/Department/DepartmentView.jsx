import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetCategoriesByIdQuery } from "../../../store/api/app/Category/categoryApiSlice";
import { useGetDepartmentsByIdQuery } from "../../../store/api/app/Department/departmentApiSlice";
import { useParams } from "react-router-dom";

const DepartmentView = ({ isOpen, onClose, data }) => {
  const { id } = useParams();
  const { data: viewData } = useGetDepartmentsByIdQuery(id);
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
        title="Category Details"
        items={items}
      />
    </div>
  );
};

export default DepartmentView;
