import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetFeaturesByIdQuery } from "../../../store/api/app/Features/featuresApiSlice";
import AssetTypesForm from "./AssetTypesForm";
import { useGetAssetTypesByIdQuery } from "../../../store/api/app/AssetTypesApi/featuresApiSlice";

const AssetTypesEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetAssetTypesByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <AssetTypesForm id={id} data={data?.data} />
    </div>
  );
};

export default AssetTypesEdit;
