import React from "react";
import RolesForm from "./RolesForm";
import { useParams } from "react-router-dom";
import { useGetRolesByIdQuery } from "../../../store/api/app/Roles/rolesApiSlice";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";

const RolesEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetRolesByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <RolesForm id={id} data={data?.data} />
    </div>
  );
};

export default RolesEdit;
