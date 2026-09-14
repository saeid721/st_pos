import React from "react";
import HomeSectionDetailsForm from "./HomeSectionDetailsForm";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetHomeSectionDetailsByIdQuery } from "../../../store/api/app/HomeSection/homeSectionDetailsApiSlice";

const HomeSectionDetailsEdit = () => {
  const { detailsId } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetHomeSectionDetailsByIdQuery(detailsId);
  if (isLoading || isFetching) return <Loader />;

  if (!detailsId) return <Error />;
  return (
    <div>
      <HomeSectionDetailsForm id={detailsId} data={data?.data} />
    </div>
  );
};

export default HomeSectionDetailsEdit;
