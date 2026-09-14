import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useGetStoresByPaginationQuery, useGetSubscriptionRequestByPaginationQuery, useGetUserCreatedStoreByPaginationQuery, useUpdateStoresMutation } from "../../../store/api/app/store/storeApiSlice";
import { IoMdLogIn } from "react-icons/io";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../../../store/api/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/api/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useGetStoreTransactionsByPaginationQuery } from "../../../store/api/app/StoreTransaction/storeTransactionApiSlice";
const StoreTransaction = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");

  const { isAuth, auth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginUserMutation();
  const {
    data,
    isLoading: storeLoading,
    isError,
    error,
  } = useGetStoreTransactionsByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    // search: search,
  });

  const { handleDelete } = useDelete();

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        Header: "Store Name",
        accessor: "store.store",
      },
      {
        Header: "Plan Name",
        accessor: "plan.name",
      },
      {
        Header: "Plan Duration",
        accessor: "duration_type",
        Cell: ({ row }) => {
          const { duration_value, duration_type } = row.original.plan;
          console.log("row.original", row.original);
          console.log("duration_value", duration_value);
          console.log("duration_type", duration_type);
          return (
            <span>{duration_value} {duration_type}</span>
          );
        },
      },
      {
        Header: "Transaction ID",
        accessor: "transaction_id",
      },
      {
        Header: "Note",
        accessor: "note",
      },
    ],
    []
  );

  useEffect(() => {
    if (data?.data?.pagination) {
      setPageCount(data?.data?.pagination?.total_page);
    }
  }, [data]);

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <div>
      {storeLoading && <Loader />}
      {isError && <p>Error: {error.message}</p>}
      {!storeLoading && !isError && data && (
        <CustomPaginationTable
          limit={limit}
          onLimitChange={handleLimitChange}
          columns={columns}
          data={data?.data?.result}
          sortDirection={order}
          setSortDirection={setOrder}
          // addNewButton={{
          //   label: "Add Store",
          // }}
          addNewButton={false}
          showViewAction={false}
          showEditAction={false}
          showDeleteAction={false}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/admin/dashboard/store"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"STORE"}
          showStatus={false}
        />
      )}

      {/* <StoreView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="Store" /> */}
    </div>
  );
};

export default StoreTransaction;
