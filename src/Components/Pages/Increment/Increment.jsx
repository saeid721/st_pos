import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import IncrementView from "./IncrementView";
import { useGetSalaryIncrementsByPaginationQuery } from "../../../store/api/app/Increment/incrementApiSlice";
import IncrementPrint from "./IncrementPrint";
import IncrementPdf from "./IncrementPdf";

const Increment = () => {
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

  const { data, isLoading, isError, error } = useGetSalaryIncrementsByPaginationQuery({
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
        Header: "Image",
        accessor: "photo",
      },
      {
        Header: "Employee Name",
        accessor: "employee.name",
      },
      {
        Header: "Emp ID",
        accessor: "employee.emp_id",
      },
      {
        Header: "Increment Reason",
        accessor: "reason",
      },
      {
        Header: "Basic Salary",
        accessor: "basic_salary",
      },
      {
        Header: "Increment Amount",
        accessor: "increment_amount",
      },
      {
        Header: "Present Salary",
        accessor: "employee.salary",
      },
      {
        Header: "Date",
        accessor: "increment_date",
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
      //   Header: "Note",
      //   accessor: "note",
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
            label: "Add Salary Increments",
          }}
          showViewAction={true}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/salary-increments"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"SALARY_INCREMENTS"}

          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <IncrementPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} store_id={store_id} />
      }
      {pdfButtonClick && <IncrementPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} store_id={store_id} />}
    </div>
  );
};

export default Increment;
