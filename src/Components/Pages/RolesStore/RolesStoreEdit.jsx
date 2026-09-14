import React from "react";
import { useParams } from "react-router-dom";
import { useGetRolesByIdQuery } from "../../../store/api/app/Roles/rolesApiSlice";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import RolesStoreForm from "./RolesStoreForm";
import { useGetRolesStoreByIdQuery } from "../../../store/api/app/Roles/rolesStoreApiSlice";

const RolesStoreEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
  useGetRolesStoreByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <RolesStoreForm id={id} data={data?.data} />
    </div>
  );
};

export default RolesStoreEdit;
