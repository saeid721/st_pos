import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetAssetTypesByIdQuery } from "../../../store/api/app/AssetTypesApi/featuresApiSlice";
import AssetsForm from "./AssetsForm";
import { useGetAssetsByIdQuery } from "../../../store/api/app/AssetsApi/assetsApiSlice";

const AssetsEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetAssetsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <AssetsForm id={id} data={data?.data} />
    </div>
  );
};

export default AssetsEdit;
