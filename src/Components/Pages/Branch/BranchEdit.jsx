import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetPlansByIdQuery } from "../../../store/api/app/Plans/plansApiSlice";
import BranchForm from "./BranchForm";
import { useGetBranchesByIdQuery } from "../../../store/api/app/Branch/branchApiSlice";

const BranchEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetBranchesByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <BranchForm id={id} data={data?.data} />
    </div>
  );
};

export default BranchEdit;
