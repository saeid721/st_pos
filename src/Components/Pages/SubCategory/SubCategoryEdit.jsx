import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";
import SubCategoryForm from "./SubCategoryForm";
import { useGetSubCategoriesByIdQuery } from "../../../store/api/app/SubCategory/subCategoryApiSlice";

const SubCategoryEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetSubCategoriesByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <SubCategoryForm id={id} data={data?.data} />
    </div>
  );
};

export default SubCategoryEdit;
