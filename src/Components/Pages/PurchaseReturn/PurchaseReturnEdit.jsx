import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import PurchaseReturnForm from "./PurchaseReturnForm";
import { useGetPurchaseReturnsByIdQuery } from "../../../store/api/app/PurchaseReturn/purchaseReturnApiSlice";

const PurchaseReturnEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetPurchaseReturnsByIdQuery(id);

  console.log("data,,", data);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <PurchaseReturnForm id={id} data={data?.data} />
      {/* asld;kfjlsadf */}
    </div>
  );
};

export default PurchaseReturnEdit;
