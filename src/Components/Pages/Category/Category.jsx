import React, { useEffect, useMemo, useState } from "react";

import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetCategoriesByPaginationQuery } from "../../../store/api/app/Category/categoryApiSlice";
import CategoryView from "./CategoryView";
import CategoryPrint from "./CategoryPrint";
import CategoryPdf from "./CategoryPdf";

const Category = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [printButtonClick, setPrintButtonClick] = useState(false);
  const [pdfButtonClick, setPdfButtonClick] = useState(false);

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;

  console.log("auth", auth);

  const { data, isLoading, isError, error } = useGetCategoriesByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    search: search,
    store_id: store_id,
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
            label: "Add Category",
          }}
          showViewAction={false}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/category"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"CATEGORY"}

          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <CategoryPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} store_id={store_id} />
      }
      {
        pdfButtonClick && <CategoryPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} store_id={store_id} />
      }
    </div>
  );
};

export default Category;
