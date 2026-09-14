import React from "react";
import HomeSectionForm from "./HomeSectionForm";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetHomeSectionByIdQuery } from "../../../store/api/app/HomeSection/homeSectionApiSlice";

const HomeSectionEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetHomeSectionByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;
  if (!id) return <Error />;
  return (
    <div>
      <HomeSectionForm id={id} data={data?.data} />
    </div>
  );
};

export default HomeSectionEdit;
