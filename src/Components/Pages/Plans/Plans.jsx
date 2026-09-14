import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import PlansView from "./PlansView";
import { useSelector } from "react-redux";
import { useGetFeaturesByPaginationQuery } from "../../../store/api/app/Features/featuresApiSlice";
import { useGetPlansByPaginationQuery } from "../../../store/api/app/Plans/plansApiSlice";

const Plans = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");

  const { isAuth, auth } = useSelector((state) => state.auth);

  console.log("auth", auth);

  const { data, isLoading, isError, error } = useGetPlansByPaginationQuery({
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
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Image",
        accessor: "image",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Duration Type",
        accessor: "duration_type",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Is Trial",
        accessor: "is_trial",
        Cell: ({ value }) => {
          return value ? "Yes" : "No";
        },
      },
      {
        Header: "Trial Days",
        accessor: "trial_days",
      },
      // {
      //   Header: "Limit Clients",
      //   accessor: "limit_clients",
      // },
      // {
      //   Header: "Limit Invoices",
      //   accessor: "limit_invoices",
      // },
      // {
      //   Header: "Limit Employees",
      //   accessor: "limit_employees",
      // },
      // {
      //   Header: "Limit Domains",
      //   accessor: "limit_domains",
      // },
      // {
      //   Header: "Limit Purchases",
      //   accessor: "limit_purchases",
      // },
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
      {isLoading && <Loader />}
      {isError && <p>Error: {error?.message}</p>}
      {!isLoading && !isError && data && (
        <CustomPaginationTable
          limit={limit}
          onLimitChange={handleLimitChange}
          columns={columns}
          data={data?.data?.result}
          sortDirection={order}
          setSortDirection={setOrder}
          addNewButton={{
            label: "Add Plans",
          }}
          showViewAction={false}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => {}}
          handleDelete={handleDelete}
          editPath="/admin/plans"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"PLAN"}
        />
      )}

      {/* <PlansView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="Plans" /> */}
    </div>
  );
};

export default Plans;
