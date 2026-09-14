import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetSuperAdminsByIdQuery } from "../../../store/api/app/SuperAdmin/superAdminApiSlice";
import { useGetStoreUsersByIdQuery } from "../../../store/api/app/StoreUser/StoreUserApiSlice";
const StoreUserView = ({ isOpen, onClose, data }) => {
  const { data: viewData } = useGetStoreUsersByIdQuery(data?.id);
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

export default StoreUserView;
