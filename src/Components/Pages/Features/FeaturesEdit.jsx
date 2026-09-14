import React from "react";
import FeaturesForm from "./FeaturesForm";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetFeaturesByIdQuery } from "../../../store/api/app/Features/featuresApiSlice";

const FeaturesEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetFeaturesByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <FeaturesForm id={id} data={data?.data} />
    </div>
  );
};

export default FeaturesEdit;
