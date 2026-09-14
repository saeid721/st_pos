import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetTaxsByIdQuery } from "../../../store/api/app/Tax/taxApiSlice";
import { useParams } from "react-router-dom";

const TaxView = ({ isOpen, onClose, data }) => {
  const { id } = useParams();
  const { data: viewData } = useGetTaxsByIdQuery(id);
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
      title: "Rate",
      value: viewData?.data?.rate,
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

export default TaxView;
