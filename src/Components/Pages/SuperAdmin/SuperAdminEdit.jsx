import React from "react";
import SuperAdminForm from "./SuperAdminForm";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetSuperAdminsByIdQuery } from "../../../store/api/app/SuperAdmin/superAdminApiSlice";

const SuperAdminEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetSuperAdminsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <SuperAdminForm id={id} data={data?.data} />
    </div>
  );
};

export default SuperAdminEdit;
