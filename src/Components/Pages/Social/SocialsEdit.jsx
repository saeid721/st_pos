import React from "react";
import SocialsForm from "./SocialsForm";
import { useParams } from "react-router-dom";
import { useGetSocialsByIdQuery } from "../../../store/api/app/Socials/socialsApiSlice";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";

const SocialsEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetSocialsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <SocialsForm id={id} data={data?.data} />
    </div>
  );
};

export default SocialsEdit;
