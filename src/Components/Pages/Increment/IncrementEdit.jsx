import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import IncrementForm from "./IncrementForm";
import { useGetSalaryIncrementsByIdQuery } from "../../../store/api/app/Increment/incrementApiSlice";

const IncrementEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetSalaryIncrementsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <IncrementForm id={id} data={data?.data} />
    </div>
  );
};

export default IncrementEdit;
