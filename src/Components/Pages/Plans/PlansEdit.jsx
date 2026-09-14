import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import PlansForm from "./PlansForm";
import { useGetPlansByIdQuery } from "../../../store/api/app/Plans/plansApiSlice";

const getErrorMessage = (error) => {
  return (
    error?.data?.message ||
    error?.error ||
    error?.message ||
    "Something went wrong"
  );
};

const PlansEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetPlansByIdQuery(id, {
      skip: !id,
    });

  if (isLoading || isFetching) return <Loader />;

  if (!id) {
    return <p className="text-red-500">Invalid plan ID</p>;
  }

  if (isError) {
    return <p className="text-red-500">{getErrorMessage(error)}</p>;
  }

  return <PlansForm id={id} data={data?.data} />;
};

export default PlansEdit;