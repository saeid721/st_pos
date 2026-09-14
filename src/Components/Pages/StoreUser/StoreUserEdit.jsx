import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetSuperAdminsByIdQuery } from "../../../store/api/app/SuperAdmin/superAdminApiSlice";
import StoreUserForm from "./StoreUserForm";
import { useGetStoreUsersByIdQuery } from "../../../store/api/app/StoreUser/StoreUserApiSlice";

const StoreUserEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetStoreUsersByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <StoreUserForm id={id} data={data?.data} />
    </div>
  );
};

export default StoreUserEdit;
