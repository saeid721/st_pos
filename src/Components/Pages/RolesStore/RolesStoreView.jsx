import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetRolesByIdQuery } from "../../../store/api/app/Roles/rolesApiSlice";
import { useGetRolesStoreByIdQuery } from "../../../store/api/app/Roles/rolesStoreApiSlice";

const RolesStoreView = ({ isOpen, onClose, data }) => {
  const { data: viewData } = useGetRolesStoreByIdQuery(data?.id);
  const items = [
    {
      status: "Status",
      value: viewData?.data?.status,
    },
    {
      title: "Role",
      value: viewData?.data?.name,
    },
  ];
  return (
    <div>
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        title="Roles"
        items={items}
      />
    </div>
  );
};

export default RolesStoreView;
