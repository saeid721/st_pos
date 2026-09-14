import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetBrandsByIdQuery } from "../../../store/api/app/Brand/brandApiSlice";
import UnitForm from "./UnitForm";
import { useGetUnitsByIdQuery } from "../../../store/api/app/Unit/unitApiSlice";

const UnitEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetUnitsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <UnitForm id={id} data={data?.data} />
    </div>
  );
};

export default UnitEdit;
