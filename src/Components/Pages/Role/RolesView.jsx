import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetRolesByIdQuery } from "../../../store/api/app/Roles/rolesApiSlice";

const RolesView = ({ isOpen, onClose, data }) => {
  const { data: viewData } = useGetRolesByIdQuery(data?.id);
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
      {/* <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        title="Roles"
        items={items}
      /> */}
    </div>
  );
};

export default RolesView;
