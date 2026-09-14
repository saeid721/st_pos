import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import HomeSectionView from "./HomeSectionView";
import { useGetHomeSectionByPaginationQuery } from "../../../store/api/app/HomeSection/homeSectionApiSlice";

const HomeSection = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useGetHomeSectionByPaginationQuery({
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
  const selectField = [
    { name: "Genres", value: "genres" },
    { name: "Upcoming", value: "upcoming" },
    { name: "Poster", value: "poster" },
    { name: "All Movies", value: "all_movies" },
    { name: "All Series", value: "all_series" },
    { name: "Top Movies", value: "top_movies" },
    { name: "Top Series", value: "top_series" },
    { name: "Selected Movies", value: "selected_movies" },
    { name: "Selected Series", value: "selected_series" },
    { name: "Slider Poster", value: "slider_poster" },
    { name: "Application Features", value: "application_features" },
    { name: "Favourite Personalities", value: "favorite_personalities" },
    { name: "Blogs", value: "blogs" },
    { name: "Continue Watch", value: "continue_watch" }, // Added this option
  ];
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Section Type",
        accessor: "section_type",
        Cell: ({ value }) => {
          const matchedField = selectField.find((field) => field.value === value);
          return matchedField ? matchedField.name : value;
        },
      },
      {
        Header: "Sort Order",
        accessor: "sort_order",
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
          addNewButton={{
            label: "Add HomeSection",
          }}
          showViewAction={true}
          showEditAction={true}
          showDeleteAction={true}
          showDetailAction={true}
          detailActionPath={"homesection"}
          handleView={handleView}
          handleEdit={() => {}}
          handleDelete={handleDelete}
          editPath="/admin/homesection"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"HOME_SECTION"}
        />
      )}

      <HomeSectionView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="HomeSection" />
    </div>
  );
};

export default HomeSection;
