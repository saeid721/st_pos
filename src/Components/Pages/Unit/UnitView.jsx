import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetCategoriesByIdQuery } from "../../../store/api/app/Category/categoryApiSlice";
import { useGetBrandsByIdQuery } from "../../../store/api/app/Brand/brandApiSlice";
import { useGetUnitsByIdQuery } from "../../../store/api/app/Unit/unitApiSlice";
import { useParams } from "react-router-dom";

const UnitView = ({ isOpen, onClose, data }) => {
  const { id } = useParams();
  const { data: viewData } = useGetUnitsByIdQuery(id);
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
        title="Unit Details"
        items={items}
      />
    </div>
  );
};

export default UnitView;
