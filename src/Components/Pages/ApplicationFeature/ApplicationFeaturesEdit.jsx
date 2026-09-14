import React from "react";
import ApplicationFeaturesForm from "./ApplicationFeaturesForm";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetApplicationFeaturesByIdQuery } from "../../../store/api/app/ApplicationFeatures/applicationFeaturesApiSlice";

const ApplicationFeaturesEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetApplicationFeaturesByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <ApplicationFeaturesForm id={id} data={data?.data} />
    </div>
  );
};

export default ApplicationFeaturesEdit;
