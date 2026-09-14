import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useGetRolesQuery } from "../../../store/api/app/Roles/rolesApiSlice";
import CustomTable from "../../Shared/Tables/CustomTable";
import RolesStoreView from "./RolesStoreView";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { useGetRolesStoreQuery } from "../../../store/api/app/Roles/rolesStoreApiSlice";

const RolesStore = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: genresData, isLoading, isError, error } = useGetRolesStoreQuery();
  const location = useLocation();
  const navigate = useNavigate();

  const { handleDelete } = useDelete();

  const handleView = (rowData) => {
    setSelectedData(rowData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Role",
        accessor: "name",
      },
    ],
    []
  );

  const handleAddNew = () => {
    navigate(`${location.pathname}/new`);
  };

  if (isLoading) return <Loader />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <CustomTable
        columns={columns}
        data={genresData?.data || []}
        onAddNew={handleAddNew}
        showViewAction={true}
        showEditAction={true}
        showDeleteAction={true}
        handleView={handleView}
        handleDelete={handleDelete}
        editPath={location.pathname}
        showStatus={true}
        path={"ROLE"}
      />
      {/* <RolesStoreView
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={selectedData}
        title="Roles"
      /> */}
    </>
  );
};

export default RolesStore;
