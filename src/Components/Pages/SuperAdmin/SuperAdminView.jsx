import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetSuperAdminsByIdQuery } from "../../../store/api/app/SuperAdmin/superAdminApiSlice";
const SuperAdminView = ({ isOpen, onClose, data }) => {
  const { data: viewData } = useGetSuperAdminsByIdQuery(data?.id);
  const items = [
    {
      status: "Status",
      value: viewData?.data?.status,
    },
    {
      title: "Email",
      value: viewData?.data?.email,
    },
    {
      title: "Role",
      value: viewData?.data?.role_id,
    },
  ];
  return (
    <div>
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        title="Industry"
        items={items}
      />
    </div>
  );
};

export default SuperAdminView;
