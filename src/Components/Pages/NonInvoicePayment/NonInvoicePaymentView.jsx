import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetCategoriesByIdQuery } from "../../../store/api/app/Category/categoryApiSlice";
import { useGetAccountsByIdQuery } from "../../../store/api/app/Account/accountApiSlice";
import { useParams } from "react-router-dom";

const NonInvoicePaymentView = ({ isOpen, onClose, data }) => {
  const { id } = useParams();
  const { data: viewData } = useGetAccountsByIdQuery(id);
  console.log("viewData", viewData);
  const items = [
    {
      status: "Status",
      value: viewData?.data?.status,
    },
    {
      title: "Bank Name",
      value: viewData?.data?.bank_name,
    },
    {
      title: "Branch Name",
      value: viewData?.data?.branch_name,
    },
    {
      title: "Account Number",
      value: viewData?.data?.account_number,
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
        title="Non Invoice Payment Details"
        items={items}
      />
    </div>
  );
};

export default NonInvoicePaymentView;
