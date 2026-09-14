import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import StoreForm from "./StoreForm";
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";

const StoreEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetStoresByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <StoreForm id={id} data={data?.data} />
    </div>
  );
};

export default StoreEdit;
