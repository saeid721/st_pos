import React from "react";
import SubscriptionsForm from "./SubscriptionsForm";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetSubscriptionsByIdQuery } from "../../../store/api/app/Subscriptions/subscriptionsApiSlice";

const SubscriptionsEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetSubscriptionsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <SubscriptionsForm id={id} data={data?.data} />
    </div>
  );
};

export default SubscriptionsEdit;
