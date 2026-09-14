import React, { useEffect, useMemo, useState } from "react";
import {
  useGetStatusWisedSubscriptionsByPaginationQuery,
  useUpdateSubscriptionstatusMutation,
} from "../../../store/api/app/Subscriptions/subscriptionsApiSlice";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import SubscriptionsView from "./SubscriptionsView";
import { useForm } from "react-hook-form";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import { toast } from "react-toastify";
import FormattedDateTime from "../../Shared/FormattedDateTime/FormattedDateTime";
import DateTimePicker from "../../Shared/DateTimePicker/DateTimePicker";

const Subscriptions = () => {
  const { control, watch } = useForm();

  const [selectedData, setSelectedData] = useState(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  console.log("from", fromDate);
  console.log("to", toDate);

  const paymentStatus = watch("paymentStatus");
  const status = watch("status");
  const planId = watch("planId");

  const selectPaymentStatus = [
    { value: "paid", label: "Paid" },
    { value: "unpaid", label: "Unpaid" },
    { value: "failed", label: "Failed" },
  ];

  const selectStatus = [
    { value: "pending", label: "Pending" },
    { value: "rejected", label: "Rejected" },
    { value: "suspended", label: "Suspended" },
    { value: "active", label: "Active" },
    { value: "deactivated", label: "Deactivated" },
  ];

  const { data, isLoading, isError, error } = useGetStatusWisedSubscriptionsByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    // search: search,
    payment_status: paymentStatus,
    status: status,
    plan_id: planId,
    from_date: fromDate,
    to_date: toDate,
  });

  console.log("data", data);

  const { handleDelete } = useDelete();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (rowData) => {
    setSelectedData(rowData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [updateStatus] = useUpdateSubscriptionstatusMutation();

  const handleStatus = async (id, newStatus, newPaymentStatus) => {
    const res = await updateStatus({ id, status: newStatus, payment_status: newPaymentStatus });
    if (res?.data?.status === "success") {
      toast.success("Status Updated Successfully");
    } else {
      toast.error(res?.data?.message);
    }
  };

  const [updatePaymentStatus] = useUpdateSubscriptionstatusMutation();

  const handlePaymentStatus = async (id, newPaymentStatus, newStatus) => {
    const res = await updatePaymentStatus({ id, payment_status: newPaymentStatus, status: newStatus });
    if (res?.data?.status === "success") {
      toast.success("Payment Status Updated Successfully");
    } else {
      toast.error(res?.data?.message);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Plan",
        accessor: "plan.name",
      },

      {
        Header: "End Date",
        Cell: (row) => {
          return (
            <div className="">
              <FormattedDateTime date={row?.cell?.row?.original?.end_date} />
            </div>
          );
        },
      },

      {
        Header: "Created Date",
        Cell: (row) => {
          return (
            <div className="">
              <FormattedDateTime date={row?.cell?.row?.original?.created_at} />
            </div>
          );
        },
      },

      {
        Header: "Subscriber Info",
        Cell: (row) => {
          return (
            <div className="">
              <p>
                {" "}
                <span className="font-semibold">Name:</span> {row?.cell?.row?.original?.subscriber?.first_name}{" "}
                {row?.cell?.row?.original?.subscriber?.last_name}
              </p>
              <p className="mt-1">
                {" "}
                <span className="font-semibold">Phone:</span> {row?.cell?.row?.original?.subscriber?.phone}
              </p>
              <p className="mt-1">
                {" "}
                <span className="font-semibold">LoggedIn Device:</span>{" "}
                {row?.cell?.row?.original?.subscriber?._count?.loggedin_device}
              </p>
            </div>
          );
        },
      },

      {
        Header: "Status",
        Cell: (row) => {
          return (
            <div className="">
              <p
                className={`border border-orange-300 p-1 text-center mb-2 cursor-pointer  ${
                  row?.cell?.row?.original?.status === "pending" ? "bg-yellow-500 text-white font-semibold" : ""
                }`}
                onClick={() => handleStatus(row?.cell?.row?.original?.id, "pending", row?.cell?.row?.original?.payment_status)}
              >
                pending
              </p>
              <p
                className={`border border-orange-300 p-1 text-center mb-2 cursor-pointer  ${
                  row?.cell?.row?.original?.status === "active" ? "bg-green-500 text-white font-semibold" : ""
                }`}
                onClick={() => handleStatus(row?.cell?.row?.original?.id, "active", row?.cell?.row?.original?.payment_status)}
              >
                Active
              </p>
              <p
                className={`border border-orange-300 p-1 text-center mb-2 cursor-pointer  ${
                  row?.cell?.row?.original?.status === "deactivated" ? "bg-orange-500 text-white font-semibold" : ""
                }`}
                onClick={() =>
                  handleStatus(row?.cell?.row?.original?.id, "deactivated", row?.cell?.row?.original?.payment_status)
                }
              >
                Deactivated
              </p>
              <p
                className={`border border-orange-300 p-1 text-center mb-2 cursor-pointer  ${
                  row?.cell?.row?.original?.status === "rejected" ? "bg-red-500 text-white font-semibold" : ""
                }`}
                onClick={() => handleStatus(row?.cell?.row?.original?.id, "rejected", row?.cell?.row?.original?.payment_status)}
              >
                Rejected
              </p>
              <p
                className={`border border-orange-300 p-1 text-center mb-2 cursor-pointer  ${
                  row?.cell?.row?.original?.status === "suspended" ? "bg-red-500 text-white font-semibold" : ""
                }`}
                onClick={() => handleStatus(row?.cell?.row?.original?.id, "suspended", row?.cell?.row?.original?.payment_status)}
              >
                Suspended
              </p>
            </div>
          );
        },
      },

      {
        Header: "Payment Status",
        Cell: (row) => {
          return (
            <div className="">
              <p
                className={`border border-orange-300 p-1 text-center mb-2 cursor-pointer  ${
                  row?.cell?.row?.original?.payment_status === "unpaid" ? "bg-yellow-500 text-white font-semibold" : ""
                }`}
                onClick={() => handlePaymentStatus(row?.cell?.row?.original?.id, "unpaid", row?.cell?.row?.original?.status)}
              >
                Unpaid
              </p>
              <p
                className={`border border-orange-300 p-1 text-center mb-2 cursor-pointer  ${
                  row?.cell?.row?.original?.payment_status === "paid" ? "bg-green-500 text-white font-semibold" : ""
                }`}
                onClick={() => handlePaymentStatus(row?.cell?.row?.original?.id, "paid", row?.cell?.row?.original?.status)}
              >
                Paid
              </p>

              <p
                className={`border border-orange-300 p-1 text-center mb-2 cursor-pointer  ${
                  row?.cell?.row?.original?.payment_status === "failed" ? "bg-red-500 text-white font-semibold" : ""
                }`}
                onClick={() => handlePaymentStatus(row?.cell?.row?.original?.id, "failed", row?.cell?.row?.original?.status)}
              >
                Failed
              </p>
            </div>
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
    <div className="mt-10">
      <div className="mb-4">
        <DateTimePicker setFromDate={setFromDate} setToDate={setToDate} />
      </div>

      <form>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CustomReactSelect
            control={control}
            name={"paymentStatus"}
            label={"Select Payment Status"}
            placeholder={"Select Payment Status"}
            required={false}
            options={
              selectPaymentStatus?.map((item) => ({
                value: item.value,
                label: item.label,
              })) || []
            }
          />

          <CustomReactSelect
            control={control}
            name={"status"}
            label={"Select  Status"}
            placeholder={"Select Status"}
            required={false}
            options={
              selectStatus?.map((item) => ({
                value: item.value,
                label: item.label,
              })) || []
            }
          />

          <CustomReactSelect
            control={control}
            name={"planId"}
            label={"Select  Plan"}
            placeholder={"Select Plan"}
            required={false}
            options={
              plansData?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
            isLoading={isLoadingPlans}
          />
        </div>
      </form>

      {isLoading && <Loader />}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && !isError && data && (
        <CustomPaginationTable
          limit={limit}
          onLimitChange={handleLimitChange}
          columns={columns}
          data={data?.data?.result}
          sortDirection={order}
          setSortDirection={setOrder}
          addNewButton={false}
          showViewAction={false}
          showEditAction={false}
          showDeleteAction={false}
          handleView={handleView}
          handleEdit={() => {}}
          handleDelete={handleDelete}
          editPath="/admin/subscription"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          showStatus={false}
          path={"SUBSCRIPTION"}
        />
      )}

      <SubscriptionsView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="Subscriptions" />
    </div>
  );
};

export default Subscriptions;
