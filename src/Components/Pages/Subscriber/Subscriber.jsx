import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
// import SliderView from "./SliderView";
import { useGetSubscribersByPaginationQuery } from "../../../store/api/app/Subscriber/subscriberApiSlice";
import SubscriberView from "./SubscriberView";

const Subscriber = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useGetSubscribersByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    // search: search,
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

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: (row) => `${row.first_name} ${row.last_name}`,
        id: "name", // Ensure a unique ID for this column
      },
      {
        Header: "Profile",
        accessor: "profile",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Address",
        accessor: "address",
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
          //   addNewButton={{
          //     label: "Add Slider",
          //   }}
          showViewAction={true}
          //   showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => {}}
          handleDelete={handleDelete}
          editPath="/admin/slider"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"Subscriber"}
        />
      )}

      <SubscriberView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="Subscriber" />
    </div>
  );
};

export default Subscriber;
