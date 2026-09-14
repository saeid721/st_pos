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
const UserCreatedStore = () => {
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
  } = useGetUserCreatedStoreByPaginationQuery({
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
        accessor: "store",
      },
      {
        Header: "Owner Name",
        accessor: "owner_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      // {
      //   Header: "Trial ends",
      //   accessor: "trial_ends_at",
      //   Cell: ({ value }) => {
      //     // Format the date
      //     return new Intl.DateTimeFormat("en-US", {
      //       year: "numeric",
      //       month: "long",
      //       day: "numeric",
      //       hour: "2-digit",
      //       minute: "2-digit",
      //       second: "2-digit",
      //     }).format(new Date(value));
      //   },
      // },
      {
        Header: "Plan Ends",
        accessor: "plan_ends_at",
        Cell: ({ value }) => {
          // Format the date
          return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(new Date(value));
        },
      },
      {
        Header: "Store Ready",
        accessor: "is_ready",
        Cell: ({ row }) => {
          const [isReady, setIsReady] = useState(row.original.is_ready || false);
          const [updateStore] = useUpdateStoresMutation();

          const handleStatusChange = async (e) => {
            const newValue = e.target.value === "true"; // convert string to boolean
            setIsReady(newValue);

            try {
              const payload = {
                slug: row.original.slug,
                is_ready: newValue,
              };
              await updateStore({ id: row.original.id, data: payload }).unwrap();
              toast.success("Store readiness updated!");
            } catch (err) {
              toast.error("Failed to update store readiness.");
              console.error(err);
            }
          };

          return (
            <select
              value={isReady.toString()} // convert boolean to string for the select value
              onChange={handleStatusChange}
              className="border border-gray-300 rounded-md p-1 text-sm"
            >
              <option value="true">Ready</option>
              <option value="false">Not Ready</option>
            </select>
          );
        },
      }


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
        />
      )}

      {/* <StoreView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="Store" /> */}
    </div>
  );
};

export default UserCreatedStore;
