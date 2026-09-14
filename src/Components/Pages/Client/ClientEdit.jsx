import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetBrandsByIdQuery } from "../../../store/api/app/Brand/brandApiSlice";
import ClientForm from "./ClientForm";
import { useGetClientsByIdQuery } from "../../../store/api/app/Client/clientApiSlice";

const ClientEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetClientsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <ClientForm id={id} data={data?.data} />
    </div>
  );
};

export default ClientEdit;
