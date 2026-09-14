import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Error from "../../Shared/Error/Error";
import { useGetSuppliersByIdQuery } from "../../../store/api/app/Suppliers/suppliersApiSlice";
import InventoryAdjustmentForm from "./InventoryAdjustmentForm";
import { useGetInventoryAdjustmentByIdQuery } from "../../../store/api/app/InventoryAdjustment/inventoryAdjustmentApiSlice";

const InventoryAdjustmentEdit = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } =
    useGetInventoryAdjustmentByIdQuery(id);

  if (isLoading || isFetching) return <Loader />;

  if (!id) return <Error />;
  return (
    <div>
      <InventoryAdjustmentForm id={id} data={data?.data} />
    </div>
  );
};

export default InventoryAdjustmentEdit;
