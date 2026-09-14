import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import CategoryForm from "./CategoryForm";
import { useGetCategoriesByIdQuery } from "../../../store/api/app/Category/categoryApiSlice";

const CategoryEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetCategoriesByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <CategoryForm id={id} data={data?.data} />
    </div>
  );
};

export default CategoryEdit;
