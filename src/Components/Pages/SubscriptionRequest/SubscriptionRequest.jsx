import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useGetStoresByPaginationQuery, useGetSubscriptionRequestByPaginationQuery, useUpdateStoresMutation } from "../../../store/api/app/store/storeApiSlice";
import { IoMdLogIn } from "react-icons/io";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../../../store/api/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/api/auth/authSlice";
import { useNavigate } from "react-router-dom";
const SubscriptionRequest = () => {
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
  } = useGetSubscriptionRequestByPaginationQuery({
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
      {
        Header: "Trial ends",
        accessor: "trial_ends_at",
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
      // {
      //   Header: "Plan Ends",
      //   accessor: "plan_ends_at",
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
        Header: "Transaction ID",
        accessor: "transaction_id",
      },
      {
        Header: "Status",
        accessor: "payment_status", // assuming this is the field name
        Cell: ({ row }) => {
          const [payment, setPayment] = useState(row.original.payment_status || "pending");
          const [updateStore] = useUpdateStoresMutation();

          console.log("row.original", row.original.id);

          const handleStatusChange = async (e) => {
            const newPayment = e.target.value;
            setPayment(newPayment);

            try {
              const payload = {
                plan_id: row.original.plan_id,
                slug: row.original.slug,
                payment: newPayment,
              };
              const res = await updateStore({ id: row.original.id, data: payload }).unwrap();
              toast.success("Payment status updated!", res);
            } catch (err) {
              toast.error("Failed to update status.");
              console.error(err);
            }
          };

          return (
            <select
              value={payment}
              onChange={handleStatusChange}
              className="border border-gray-300 rounded-md p-1 text-sm"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          );
        },
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
        />
      )}

      {/* <StoreView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="Store" /> */}
    </div>
  );
};

export default SubscriptionRequest;
