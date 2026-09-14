import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetStoresByIdQuery } from "../../../store/api/app/store/storeApiSlice";
import AccountForm from "./AccountForm";
import { useGetAccountsByIdQuery } from "../../../store/api/app/Account/accountApiSlice";

const AccountEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetAccountsByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <AccountForm id={id} data={data?.data} />
    </div>
  );
};

export default AccountEdit;
